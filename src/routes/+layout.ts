import Cookies from 'js-cookie';
import { user } from '$lib/stores/user.stores';
import type { ServerLoad } from '@sveltejs/kit';
import { COOKEYS } from '$lib/utils';

export const load: ServerLoad = async () => {
  const userStr = Cookies.get(COOKEYS.USER) ?? '{}';
  user.set(JSON.parse(userStr));
};