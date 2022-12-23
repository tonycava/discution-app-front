import type { LayoutLoad } from './$types';
import Cookies from 'js-cookie';
import { user } from '$lib/stores/user.stores';

export const load: LayoutLoad = async () => {
  const userStr = Cookies.get('user') ?? '{}';
  user.set(JSON.parse(userStr));
};