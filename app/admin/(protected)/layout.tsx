"use client";

import { authContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const AdminProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const authCtx = useContext(authContext);

  useEffect(() => {
    if (!authCtx?.token) {
      router.push("/admin/login");
    }
  }, [authCtx]);

  return <>{children}</>;
};

export default AdminProtectedLayout;
