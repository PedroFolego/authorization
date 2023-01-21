import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonAnbima from "../components/ButtonAnbima";
import ButtonBacen from "../components/ButtonBacen";
import ButtonManagement from "../components/ButtonManagement";
import LogoutButton from "../components/logout-btn";
import { IUserSession } from "../interfaces";

const roles = [
  "user_bacen",
  "super_admin",
  "user_anbima",
  "user_management_admin",
  "service_admin",
];

type IHome = {
  role: string[];
  name: string;
};

type rolesAccess = {
  user_anbima: string;
  user_management_admin: string;
  service_admin: string;
  user_bacen: string;
  super_admin: string;
};

export const getServerSideProps = async ({ req }: CtxOrReq) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: { destination: "/" },
    };
  }

  const userType = session.user as IUserSession;

  return {
    props: {
      role: userType.role,
      name: userType.name,
    },
  };
};


export default function Home({ role, name }: IHome) {
  const [rolesState, setRolesState] = useState<rolesAccess>({} as rolesAccess);

  useEffect(() => {
    let auxObj = {} as rolesAccess;
    roles.forEach((option) => {
      role.some((r) => r == option) &&
        (auxObj = { ...auxObj, [option]: !!option });
    });
    setRolesState(auxObj);
  }, [role]);

  const {
    user_anbima: userAnbima,
    user_management_admin: userManagementAdmin,
    service_admin: serviceAdmin,
    user_bacen: userBacen,
    super_admin: superAdmin,
  } = rolesState;

  const ambimaUser = userAnbima || serviceAdmin || superAdmin;
  const bacenUser = userBacen || serviceAdmin || superAdmin;
  const managementUser = userManagementAdmin || superAdmin;

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

