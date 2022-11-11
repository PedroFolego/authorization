// @ts-nocheck
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";

export default function Bacen({ name }) {
  return (
    <>
      <LogoutButton />
      <h1>{name}</h1>
      <div>Página Bacen</div>
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

  if (!user.role.some((r) => r == "user_bacen")) {
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
