import { type Writable, writable } from 'svelte/store';
import type { User } from "../../types/User";

export const user: Writable<User | undefined> = writable(undefined);