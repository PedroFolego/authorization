// @ts-nocheck
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ButtonAnbima from "../components/ButtonAnbima";
import ButtonBacen from "../components/ButtonBacen";
import LogoutButton from "../components/logout-btn";

export default function Home({ role, name }) {

  const bacen = role.some((r) => r == "user_bacen");
  const admin = role.some((r) => r == "super_admin");
  const anbima = role.some((r) => r == "user_anbima");

  return (
    <>
      <h1>HOME</h1>
      <h1>Olá {name}</h1>
      <LogoutButton />
      {/* {!!role.userManagement && <ComponentUserManagement/>} */}
      {(!!anbima || !!admin) && <ButtonAnbima />}
      {(!!bacen || !!admin) && <ButtonBacen />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }
  console.log(session.user);

  return {
    props: {
      role: session.user.role,
      name: session.user.name,
    },
  };
};
