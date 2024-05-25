import MainContainer from "@/components/containers/MainContainer";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidSession, storeSession } from "@/utils/session/utility";
import Router from "next/router";
import { signUpUser } from "@/utils/session/signup";
import { loginUser } from "@/utils/session/login";
import { SignUpUserRequest } from "@/utils/session/types";

const index = () => {
  const [userData, setUserData] = useState<SignUpUserRequest>({
    email: "",
    nickname: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isValidSession()) {
      Router.push("/");
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userData);

    const user = await signUpUser(userData);

    if (!user.details) {
      console.log(user);

      const token = await loginUser(userData.email, userData.password);
      if (token) {
        storeSession(token);
        Router.push("/");
      } else {
        setError("Не вдалося увійти. Будь ласка, спробуйте ще раз.");
      }
    } else {
      setError(user.details);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData((prevUserData: SignUpUserRequest) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <MainContainer className="flex justify-center flex-col m-auto h-screen mt-[-70px]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Реєстрація</CardTitle>
          <CardDescription>
            Введіть свої дані для створення облікового запису.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nickname">Псевдонім</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="exc3pt1on"
                  required
                  name="nickname"
                  value={userData.nickname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Прізвище</Label>
                  <Input
                    id="lastName"
                    placeholder="Шліханов"
                    required
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Ім'я</Label>
                  <Input
                    id="firstName"
                    placeholder="Дмитро"
                    required
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Повторіть пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                  required
                  name="passwordRepeat"
                  value={userData.passwordRepeat}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Створити обліковий запис
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Вже маєте обліковий запис?{" "}
              <Link href={`/login`} className="underline">
                Увійти!
              </Link>
            </div>
            {error && (
              <div>
                <br />
                <div className="flex items-center justify-center">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </MainContainer>
  );
};

export default index;
