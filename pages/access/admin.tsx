import { GetServerSideProps } from "next"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Admin() {
  return (
    <div>Página Admin</div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {

    }
  }
}