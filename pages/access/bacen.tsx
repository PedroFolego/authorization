// @ts-nocheck
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";

export default function Bacen({ name }) {
  return (
    <>
      <h1>{name}</h1>
      <div>Página Bacen</div>
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

  const { user } = session;

  const allowedRoles = ["user_bacen", "service_admin", "super_admin"]

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
