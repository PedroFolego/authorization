import { signOut } from "next-auth/react";
import Router from "next/router";
export default function LogoutButton() {
  const logout = (): void => {
    signOut();
    Router.push("/");
  };
  return <button onClick={logout}>Sign out</button>;
}
