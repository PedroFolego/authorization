import Head from "next/head";
import Image from "next/image";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from 'react-hook-form'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { user, singIn, isAuth } = useContext(AuthContext);

  const handleCheck = async (data: any) => {
    const { email, password } = data;
    await singIn({ email, password });
  };

  return ( 
    <form onSubmit={handleSubmit(handleCheck)}>
      <label>
        E-mail 
        <input type="text" {...register('email')} />
      </label>
      <label>
        Senha
        <input type="text" {...register('password')} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
