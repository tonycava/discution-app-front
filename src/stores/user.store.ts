import { writable } from "svelte/store";
import type { User } from "../types/User";

const user = writable<User | null>(null);