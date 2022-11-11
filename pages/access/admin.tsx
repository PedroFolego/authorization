import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Admin() {
  return (
    <div>Página Admin</div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({ req });


  // console.log(session);
  
  return {
    props: {

    }
  }
}
