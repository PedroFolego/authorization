import { GetServerSideProps } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";
import { IUserSession } from "../../interfaces";

export default function Admin() {
  return (
    <>
      <LogoutButton />
      <div>Página Admin</div>
    </>
  );
}

export async function getServerSideProps(ctx: CtxOrReq) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }

  const { user } = session;

  const userType = user as IUserSession;

  if (!userType.role.some((r) => r == "user_admin")) {
    return {
      redirect: { destination: "/home" },
    };
  }

  return {
    props: {
      name: userType.name,
    },
  };
}
