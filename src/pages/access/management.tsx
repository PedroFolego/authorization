import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import LogoutButton from "../../components/logout-btn";
import { IUserSession } from "../../interfaces";

export default function Ambima() {
  return (
    <>
      <h1>Cadastre um usuário</h1>
      <form>
        <label htmlFor="email">
        Digite o email
        <input type="email" id="email" />
        </label>
        <label htmlFor="password">
        Digite a senha
        <input type="password" id="password" />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      <LogoutButton />
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
  
  const allowedRoles = ["super_admin", "user_management_admin"]

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
