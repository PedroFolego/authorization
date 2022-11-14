import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";

export const getServerSideProps = async ({ req }: CtxOrReq) => {
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
  const [errorLogin, setErrorLogin] = useState(false);
  const router = useRouter();
  const handleCheck: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;

    const req = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (req?.error) {
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
