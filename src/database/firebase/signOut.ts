import { auth } from "./firebase";

export function signOut() {
   auth.signOut();
}