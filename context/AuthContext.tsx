import React, { createContext, useState } from "react";
import { singInRequestData } from "../service/auth";
import Router from "next/router";
import { signIn } from "next-auth/react";

type AuthContextType = {
  user: IUser | null;
  singIn: (data: ISingInData) => Promise<void>;
  isAuth: boolean;
};

type IAuthProvider = {
  children: React.ReactNode;
};

type ISingInData = {
  email: string;
  password: string;
};

type IUser = {
  id: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuth = !!user;

  const signInLogin = async ({ email, password }: ISingInData) => {
    const data = await signIn({
      email,
      password,
    });

    const user = data?.user as IUser | null;

    setUser(user);
    if (user?.role == 'admin') {
      Router.push("/access/admin");
    }
  };

  return (
    <AuthContext.Provider value={{ user, singIn: signInLogin, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
