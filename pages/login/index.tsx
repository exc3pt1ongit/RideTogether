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
import MainContainer from "@/components/containers/MainContainer";
import Router, { useRouter } from "next/router";
import { storeSession, isValidSession } from "@/utils/session/utility";
import { loginUser } from "@/utils/session/login";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail]: any = useState<string>("");
  const [password, setPassword]: any = useState<string>("");
  const [error, setError]: any = useState("");

  useEffect(() => {
    if (isValidSession()) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const token = await loginUser(email, password);
    if (token) {
      storeSession(token);
      router.push("/");
      router.reload();
    } else {
      setError("Не вдалося увійти. Будь ласка, спробуйте ще раз.");
    }
  };

  return (
    <MainContainer className="flex justify-center flex-col m-auto h-screen mt-[-70px]">
      <Card className="mx-auto max-w-sm justify-center">
        <CardHeader>
          <CardTitle className="text-2xl">Вхід</CardTitle>
          <CardDescription>
            Введіть свою електронну пошту нижче, щоб увійти до свого облікового
            запису.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Забули пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Увійти
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Ще досі не зареєстровані?{" "}
              <Link href={`/register`} className="underline">
                Зареєструватися!
              </Link>
              {error && (
                <div>
                  <br />
                  <div className="flex items-center justify-center">
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </MainContainer>
  );
}
