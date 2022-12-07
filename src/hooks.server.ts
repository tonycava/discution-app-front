import type { Handle } from "@sveltejs/kit";
import type { User } from "@models/User";

export const handle: Handle = ({event, resolve}) => {
  const user: User = JSON.parse(event.cookies.get("user") ?? "{}");
  event.locals.user = user;
  
  return resolve(event)
};