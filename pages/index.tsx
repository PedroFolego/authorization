// @ts-nocheck
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { getSession, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // console.log(session);
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

    Router.push("home");
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
