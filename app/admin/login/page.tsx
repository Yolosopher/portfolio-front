"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authContext } from "@/context/authContext";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Role } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect } from "react";

const AdminLogin = () => {
  const router = useRouter();
  const authCtx = useContext(authContext);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.target as HTMLFormElement;

      const email = form.email.value;
      const password = form.password.value;

      const result = await request({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      });
      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          const role = result.data.current_user.role;
          // check if admin
          if (role === Role.USER) {
            errorHandler("You are not authorized to access this page");
            return;
          }
          authCtx?.setToken(result.data.current_user.auth_token);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (authCtx?.token) {
      router.push("/admin");
    }
  }, [authCtx]);

  return (
    <div
      className="flex p-24 justify-center items-center"
      style={{
        height: "calc(100dvh - 6rem)",
      }}
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-3 mx-auto">
        <h1 className="uppercase text-center font-semibold text-2xl">Login</h1>

        <Input name="email" type="email" placeholder="example@example.com" />
        <Input name="password" type="password" placeholder="********" />

        <Button type="submit">Login</Button>
        <Link href={"/"} className="w-max underline mx-auto">
          Go to homepage
        </Link>
      </form>
    </div>
  );
};
export default AdminLogin;
