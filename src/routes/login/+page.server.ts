import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import LoginServices from '@services/login.services';
import { authZodSchema } from '$lib/zod';
import type { AuthResponse } from '@models/AuthResponse';
import { COOKEYS, cookieOptions, INPUT } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
  if (cookies.get("jwt_token")) throw redirect(303, '/');
};

const login: Action = async ({ request, cookies }) => {
  const form = await request.formData();
  const username = form.get(INPUT.USERNAME) as string;
  const password = form.get(INPUT.PASSWORD) as string;

  const results = authZodSchema.safeParse({ username, password });

  if (!results.success) {
    const error = results.error.format();
    const passwordError = error.password?._errors.join(', ') ?? '';
    const usernameError = error.username?._errors.join(', ') ?? '';
    return fail(400, {
      internalError: passwordError || usernameError || 'Internal server Error',
    });
  }

  const { data } = await LoginServices.login({ username, password })
                                      .catch(() => ({ message: 'Invalid username or password' })) as { data: AuthResponse };

  if (!data) {
    return fail(303, { internalError: 'Invalid username or password' });
  }

  cookies.set(COOKEYS.JWT_TOKEN, data.access_token, cookieOptions);

  throw redirect(303, '/');
};

export const actions: Actions = {
  login
};