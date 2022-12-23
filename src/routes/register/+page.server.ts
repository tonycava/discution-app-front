import type { Action, Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import { authZodSchema } from "$lib/zod";
import UserServices from "@services/user.services";
import type { User } from "@models/User";
import * as process from "process";
import type { AuthResponse } from '@models/AuthResponse';
import RegisterServices from "@services/register.services";

const register: Action = async ({ request, cookies }) => {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  
  const results = authZodSchema.safeParse({ username, password });
  
  if (!results.success) {
    const error = results.error.format();
    return fail(400, {
      passwordError: error.password?._errors.join(", ") ?? "",
      usernameError: error.username?._errors.join(", ") ?? ""
    });
  }
  
  const { data } = await RegisterServices.register({ username, password })
    .catch(() => ({ message: "Invalid username or password" })) as { data: AuthResponse };
  
  if (!data) {
    return fail(303, { internalError: "Invalid username or password" });
  }
  
  cookies.set("jwt_token", data.access_token, {
    path: '/',
    httpOnly: false,
    domain: "koomei.tonycava.dev",
    sameSite: "lax",
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 3,
  });
  
  const { data: userResponse } = await UserServices.getUser(data.access_token) as { data: User };
  
  const userData: User = {
    id: userResponse.id,
    username: userResponse.username,
    createdAt: userResponse.createdAt,
  };
  
  cookies.set("user", JSON.stringify(userData), {
    path: '/',
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 3,
  });
  
  throw redirect(303, "/");
};

export const actions: Actions = {
  register,
};