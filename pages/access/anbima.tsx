// @ts-nocheck
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";

export default function Ambima({ name }) {
  return (
    <>
      <h1>{name}</h1>
      <div>Página Anbima</div>
      <LogoutButton />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }

  const allowedRoles = ["user_anbima", "service_admin", "super_admin"]

  if (!user.role.some((r) => allowedRoles.includes(r))) {
    return {
      redirect: { destination: "/home" },
    };
  }

  return {
    props: {
      name: user?.name,
    },
  };
}
