import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";
import { IUserSession } from "../../interfaces";

type IBacen = {
  name: string;
}

export default function Bacen({ name }: IBacen) {
  return (
    <>
      <h1>{name}</h1>
      <div>Página Bacen</div>
      <LogoutButton />
    </>
  );
}

export const getServerSideProps = async (ctx: CtxOrReq) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }

  const { user } = session;

  const userType = user as IUserSession;

  const allowedRoles = ["user_bacen", "service_admin", "super_admin"];

  if (!userType.role.some((r) => allowedRoles.includes(r))) {
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
