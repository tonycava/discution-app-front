import type { Handle } from '@sveltejs/kit';
import { COOKEYS, cookieOptions } from '$lib/utils';
import UserServices from '@services/user.services';

export const handle: Handle = async ({ event, resolve }) => {
  const jwtToken = event.cookies.get(COOKEYS.JWT_TOKEN);
  const user = event.cookies.get("user");
  
  if (user) {
    event.locals.user = JSON.parse(user);
    return resolve(event);
  }
  
  const userResponse = await UserServices.getUser(jwtToken)
    .catch(() => ({ message: 'Invalid token' }));
  
  if ('message' in userResponse) return resolve(event);
  
  event.locals.user = userResponse.data;
  event.cookies.set(COOKEYS.USER, JSON.stringify(userResponse.data), cookieOptions);
  
  return resolve(event);
};