"use client";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../../context/authContext";
import AdminHeader from "@/components/shared/admin/header/AdminHeader";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <AdminHeader />
      <Toaster />
      {children}
    </AuthProvider>
  );
};

export default AdminLayout;
