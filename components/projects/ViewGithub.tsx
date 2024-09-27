"use client";

import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo } from "react";
import useClientT from "@/hooks/client-t/useClientT";

const ViewGithub = ({ link, name }: { link: string; name: string }) => {
    const { t } = useClientT();
    const links = useMemo(() => {
        if (link.includes(", ")) {
            const links = link.split(", ");
            const backendLink = links[0]; //first is always backend
            const frontendLink = links[1]; //first is always backend
            return { backendLink, frontendLink };
        }
        return null;
    }, [link]);

    return links ? (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"link"}
                    type="button"
                    className="text-black dark:text-white gap-2 p-0"
                >
                    <Github size={16} />
                    <div className="text-base capitalize">{t("VIEW_CODE")}</div>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="flex flex-col gap-0.5 w-36 p-0.5"
            >
                <Button asChild variant={"link"}>
                    <a
                        href={links.backendLink}
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                        data-umami-event={`Backend Code opened - ${name}`}
                    >
                        {t("BACKEND")}
                    </a>
                </Button>
                <Button asChild variant={"link"}>
                    <a
                        href={links.frontendLink}
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                        data-umami-event={`Frontend Code opened - ${name}`}
                    >
                        {t("FRONTEND")}
                    </a>
                </Button>
            </PopoverContent>
        </Popover>
    ) : (
        <Button
            asChild
            variant={"link"}
            className="text-black dark:text-white gap-2 p-0"
        >
            <a
                href={link}
                target="_blank"
                rel="nofollow noreferrer noopener"
                data-umami-event={`Frontend Code opened - ${name}`}
            >
                <Github size={16} />
                <div className="text-base capitalize">{t("VIEW_CODE")}</div>
            </a>
        </Button>
    );
};
export default ViewGithub;
