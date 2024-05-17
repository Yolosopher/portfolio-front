"use client";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../../context/authContext";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <Toaster />
      {children}
    </AuthProvider>
  );
};

export default AdminLayout;
