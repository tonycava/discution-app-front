import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import socket from '$lib/socket/webSocketClient';
import UserServices from '@services/user.services';
import StatusCode from 'status-code-enum';
import { messageZodSchema } from '$lib/zod';

export const actions: Actions = {
  default: async ({ locals, request, cookies }) => {
    const form = await request.formData();
    const message = form.get('message') as string;
    const jwtToken = cookies.get('jwt_token') as string;

    const { status } = await UserServices.isAuthorized(jwtToken)
    .catch((e) => { console.log('error', e); }) as { status: number };

    const result = messageZodSchema.safeParse(message);

    if (!result.success) {
      const error = result.error.format();
      return fail(400, { internalError: error?._errors.join(", ") ?? "" });
    }

    if (status === StatusCode.ClientErrorUnauthorized) {
      cookies.delete('jwt_token');
      cookies.delete('user');
      return redirect(300, '/login');
    }

    socket.emit('newMessage', { message, userId: locals.user.id, roomId: "0" });
  },
};