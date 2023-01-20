import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { authZodSchema } from '$lib/zod';
import RegisterServices from '@services/register.services';
import { COOKEYS, cookieOptions, INPUT } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
  if (locals.user) throw redirect(303, '/');
};
const register: Action = async ({ request, cookies }) => {
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
  
  const response = await RegisterServices.register({ username, password })
    .catch(({ response }) => {
      return { message: response.data.message };
    });
  
  if ('message' in response) {
    return fail(303, { internalError: response.message || 'Internal server error' });
  }
  
  cookies.set(COOKEYS.JWT_TOKEN, response.data.access_token, cookieOptions);
  
  throw redirect(303, '/');
};

export const actions: Actions = {
  register
};