// @ts-nocheck
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonAnbima from "../components/ButtonAnbima";
import ButtonBacen from "../components/ButtonBacen";
import ButtonManagement from "../components/ButtonManagement";
import LogoutButton from "../components/logout-btn";

const roles = [
  "user_bacen",
  "super_admin",
  "user_anbima",
  "user_management_admin",
  "service_admin",
];

export default function Home({ role, name }) {
  const [rolesState, setRolesState] = useState({});

  useEffect(() => {
    let auxObj = {};
    roles.forEach((option) => {
      role.some((r) => r == option) &&
        (auxObj = { ...auxObj, [option]: !!option });
    });
    setRolesState(auxObj);
  }, [role]);

  const {
    user_anbima,
    user_management_admin,
    service_admin,
    user_bacen,
    super_admin,
  } = rolesState;

  const ambimaUser = user_anbima || service_admin || super_admin;
  const bacenUser = user_bacen || service_admin || super_admin;
  const managementUser = user_management_admin || super_admin;

  return (
    <>
      <h1>HOME</h1>
      <h1>Olá {name}</h1>
      <LogoutButton />
      {/* {!!role.userManagement && <ComponentUserManagement/>} */}
      {ambimaUser && <ButtonAnbima />}
      {bacenUser && <ButtonBacen />}
      {managementUser && <ButtonManagement />}
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
