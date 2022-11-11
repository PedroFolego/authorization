import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import ButtonAnbima from "../components/ButtonAnbima";
import ButtonBacen from "../components/ButtonBacen";

export default function Home({ role }) {

  const bacen = role.some((r) => r == 'user_bacen' )
  const anbima = role.some((r) => r == 'user_anbima' )

  return (
    <>
      <h1>Olá Usuário Tal</h1>
      {/* {!!role.userManagement && <ComponentUserManagement/>} */}
      {!!bacen && <ButtonAnbima/>}
      {!!anbima && <ButtonBacen/>}
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({ req });
  console.log(session);
  
  if (!session) {
    return {
      redirect: '/'
    }
  }
  
  // console.log(session);
  
  return {
    props: {
      role: session.user.role
    }
  }
}
