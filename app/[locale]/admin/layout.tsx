"use client";

import { AuthProvider } from "@/context/authContext";
import AdminHeader from "@/components/shared/admin/header/AdminHeader";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AuthProvider>
            <AdminHeader />
            {children}
        </AuthProvider>
    );
};

export default AdminLayout;
