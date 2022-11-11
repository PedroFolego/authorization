// @ts-nocheck
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";

export default function Ambima({ name }) {
  return (
    <>
      <h1>{name}</h1>
      <LogoutButton />
      <div>Página Ambima</div>
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

  if (!user.role.some((r) => r == "user_anbima")) {
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
