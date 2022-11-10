import React, { createContext, useState } from "react";
import { singInRequestData } from "../service/auth";
import Router from "next/router";

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

  const singIn = async ({ email, password }: ISingInData) => {
    const data = await singInRequestData({
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
    <AuthContext.Provider value={{ user, singIn, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
