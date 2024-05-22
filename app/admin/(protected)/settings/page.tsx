import { fetchSettings } from "@/actions/settings";
import SettingForm from "@/components/admin/setting/SettingForm";
import { Loader } from "lucide-react";
import { revalidateTag } from "next/cache";

const AdminSettingPage = async () => {
  const setting = await fetchSettings();

  const refetchSetting = async () => {
    "use server";
    revalidateTag("setting");
  };

  return (
    <div className="container flex flex-col gap-3">
      <div className="relative mt-6 flex md:justify-center items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold md:text-center text-left">
          Admin | Settings
        </h1>
      </div>
      <div className="flex flex-col justify-center items-start">
        {!setting.data ? (
          <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background">
            <Loader size={16} className="animate animate-spin w-max h-max" />
          </div>
        ) : (
          <SettingForm setting={setting.data} refetch={refetchSetting} />
        )}
      </div>
    </div>
  );
};
export default AdminSettingPage;
