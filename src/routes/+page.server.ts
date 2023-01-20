import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import UserServices from '@services/user.services';
import StatusCode from 'status-code-enum';
import { messageZodSchema } from '$lib/zod';
import { COOKEYS, INPUT } from '$lib/utils';
import GroupServices from '@services/group.services';
import { z } from 'zod';
import type { Group } from '@models/User';
import type { AxiosResponse } from 'axios';
import socket from '$lib/socket/webSocketClient';

export const load: ServerLoad = async ({ url, cookies }) => {
  const groupId = url.searchParams.get('groupId');
  const token = cookies.get(COOKEYS.JWT_TOKEN);

  const groups = await GroupServices.getGroupByUserId(token)
    .catch(() => undefined);

  if (!groups) {
    cookies.delete(COOKEYS.JWT_TOKEN);
    cookies.delete(COOKEYS.USER);
    throw redirect(StatusCode.RedirectSeeOther, '/login');
  }

  if (!groupId) return {
    message: 'Please choose a group or create one !',
    groups: groups.data
  };

  const isGroupIdValidUUID = z.string().uuid().safeParse(groupId).success;

  if (!isGroupIdValidUUID) throw redirect(StatusCode.RedirectSeeOther, '/');

  const group: Group = groups.data.find((group: Group) => group.id === groupId);
  if (!group) throw redirect(StatusCode.RedirectSeeOther, '/');

  return {
    groupIn: group.name,
    groups: groups.data
  };
};


export const actions: Actions = {
  default: async ({  request, cookies, url, locals }) => {
    const form = await request.formData();
    const message = form.get(INPUT.MESSAGE) as string;
    const jwtToken = cookies.get(COOKEYS.JWT_TOKEN);

    const { status } = await UserServices.isAuthorized(jwtToken)
      .catch((e) => {
        console.log('error', e);
      }) as AxiosResponse;

    const result = messageZodSchema.safeParse(message);

    if (!result.success) {
      const error = result.error.format();
      return fail(400, { internalError: error?._errors.join(', ') ?? '' });
    }

    if (status === StatusCode.ClientErrorUnauthorized) {
      cookies.delete(COOKEYS.JWT_TOKEN);
      cookies.delete(COOKEYS.USER);
      return redirect(300, '/login');
    }

    const groupId = url.searchParams.get("groupId")
    socket.emit('newMessage', { message, userId: locals.user.id, groupId });
  }
};