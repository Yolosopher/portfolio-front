"use client";

import { authContext } from "@/context/authContext";
import { useContext } from "react";
import AdminNav from "./AdminNav";
import { Button } from "@/components/ui/button";
import useApiRequest from "@/hooks/request/useApiRequest";
import { LogOut } from "lucide-react";

const AdminHeader = () => {
  const request = useApiRequest();
  const authCtx = useContext(authContext);

  const handleLogout = async () => {
    try {
      await request({
        url: "/auth/logout",
        auth: true,
      });
    } catch (error) {
      // Handle error
    } finally {
      if (authCtx) authCtx.removeToken();
    }
  };

  if (!authCtx?.token) {
    return null;
  }
  return (
    <div className="fixed z-20 bottom-0 left-0 w-full text-secondary-foreground bg-secondary">
      <div className="container py-1.5 flex justify-between items-center w-full">
        <h2 className="hidden md:block font-bold text-lg text-primary">
          Admin Nav
        </h2>
        <div className="flex gap-3 items-center w-full md:w-[unset]">
          <AdminNav />
          <Button
            type="button"
            onClick={handleLogout}
            variant={"destructive"}
            size={"sm"}
            className="w-max p-0.5 h-5 rounded-none aspect-square flex-shrink-0"
          >
            <LogOut size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
