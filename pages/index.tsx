// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { getSession, LiteralUnion, signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/home" },
    };
  }

  return {
    props: {},
  };
};

export default function Login() {
  const { register, handleSubmit } = useForm();
  // const { user, singIn, isAuth } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState(false);
  const router = useRouter();
  const handleCheck = async (data: any) => {
    const { email, password } = data;

    const req = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (req.error) {
      setErrorLogin(true);
      return;
    }

    router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit(handleCheck)}>
      <label>
        E-mail
        <input type='text' {...register("email")} />
      </label>
      <label>
        Senha
        <input type='text' {...register("password")} />
      </label>
      <button type='submit'>Login</button>
      {errorLogin && <span>Login Inválido</span>}
    </form>
  );
}
