"use client";

import { ISetting } from "@/models/setting";
import { useEffect, useState } from "react";
import ImageStore from "../image-store/ImageStore";
import { Button } from "@/components/ui/button";
import AdminInput from "../input/AdminInput";
import { Loader } from "lucide-react";
import AdminTextArea from "../input/AdminTextArea";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import useApiRequest from "@/hooks/request/useApiRequest";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { toast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SettingFormProps = {
  setting: ISetting;
  refetch: () => void | Promise<void>;
};
const SettingForm = ({ refetch, setting }: SettingFormProps) => {
  const request = useApiRequest();
  const errorHandler = useErrorHandler();
  // loading state
  const [loading, setLoading] = useState<boolean>(true);

  // page stuff
  const [introText, setIntroText] = useState<string>("");

  // Personal Information

  const [aboutMe, setAboutMe] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // Social Media
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");

  useEffect(() => {
    if (!setting) {
      return;
    }

    setIntroText(setting?.intro_text || "");
    setAboutMe(setting?.about_me || "");
    setEmail(setting?.email || "");
    setImage(setting?.image || "");
    setPhone(setting?.phone || "");
    setAddress(setting?.address || "");
    setGithub(setting?.github || "");
    setLinkedin(setting?.linkedin || "");
    setTwitter(setting?.twitter || "");
    setFacebook(setting?.facebook || "");
    setInstagram(setting?.instagram || "");
    setYoutube(setting?.youtube || "");

    setLoading(false);
  }, [setting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: any = {
        intro_text: introText,
        about_me: aboutMe,
        email,
        image,
        phone,
        address,
        // social media
        github,
        linkedin,
        twitter,
        facebook,
        instagram,
        youtube,
      };

      const result = await request({
        url: "/setting",
        method: "PUT",
        body: payload,
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: result.data.message ?? "Setting updated successfully",
          });
          refetch();
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        poppins.className,
        "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start content-start relative"
      )}
    >
      {/* Submit button */}
      <div className="col-span-full bg-secondary rounded-md py-3 flex justify-center items-center">
        <Button
          type="submit"
          className="logvalue"
          onClick={() => console.log(introText)}
          disabled={loading}
        >
          {loading && <Loader size={16} className="animate animate-spin" />}
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      {/* Page Stuff  */}
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-2 w-full"
      >
        <AccordionItem value="1" className="w-full">
          <AccordionTrigger className="text-primary">
            <h2 className="flex-1 text-2xl capitalize text-center font-bold">
              Page Content
            </h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 w-full px-2">
            <AdminTextArea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              disabled={loading}
              label="Into Text"
              placeholder="type into text here..."
              cols={100}
              className="min-h-36"
            />
            <ImageStore
              className="w-1/2 mx-auto"
              currentImageClassName="w-full"
              choosenImageName={image}
              setChoosenImageName={setImage}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Social Media */}
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-2 w-full"
      >
        <AccordionItem value="1" className="w-full">
          <AccordionTrigger className="text-primary">
            <h2 className="flex-1 text-2xl capitalize text-center font-bold">
              Social Media
            </h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 w-full px-2">
            <AdminInput
              value={github}
              type="url"
              onChange={(e) => setGithub(e.target.value)}
              disabled={loading}
              label="Github"
              placeholder="Github URL"
            />
            <AdminInput
              value={linkedin}
              type="url"
              onChange={(e) => setLinkedin(e.target.value)}
              disabled={loading}
              label="Linkedin"
              placeholder="Linkedin URL"
            />
            <AdminInput
              value={twitter}
              type="url"
              onChange={(e) => setTwitter(e.target.value)}
              disabled={loading}
              label="Twitter"
              placeholder="Twitter URL"
            />
            <AdminInput
              value={facebook}
              type="url"
              onChange={(e) => setFacebook(e.target.value)}
              disabled={loading}
              label="Facebook"
              placeholder="Facebook URL"
            />
            <AdminInput
              value={instagram}
              type="url"
              onChange={(e) => setInstagram(e.target.value)}
              disabled={loading}
              label="Instagram"
              placeholder="Instagram URL"
            />
            <AdminInput
              value={youtube}
              type="url"
              onChange={(e) => setYoutube(e.target.value)}
              disabled={loading}
              label="Youtube"
              placeholder="Youtube URL"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Peronsla Information */}
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-2 w-full"
      >
        <AccordionItem value="1" className={`w-full sticky top-[${6 + 4}rem]`}>
          <AccordionTrigger className="text-primary">
            <h2 className="flex-1 text-2xl capitalize text-center font-bold">
              Personal Information
            </h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 w-full px-2">
            <AdminInput
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              label="Email"
              placeholder="Email"
            />
            <AdminInput
              value={phone}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              label="Phone"
              placeholder="Phone"
            />
            <AdminInput
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
              label="Address"
              placeholder="Address"
            />
            <AdminTextArea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              disabled={loading}
              label="About Me"
              placeholder="About Me"
              cols={100}
              className="min-h-36"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
};
export default SettingForm;
