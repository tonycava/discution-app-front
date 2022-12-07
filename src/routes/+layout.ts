import type { Load } from '@sveltejs/kit';
import Cookies from 'js-cookie';
import { user } from '$lib/stores/user.stores';

export const load: Load = async () => {
  const userStr = Cookies.get('user') ?? '{}';
  user.set(JSON.parse(userStr));
};