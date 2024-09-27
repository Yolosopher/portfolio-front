"use client";

import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

type MessagePopupProps = {
    title: string;
    description: string;
    variant: "default" | "destructive" | "doubt";
};

const MessagePopup = ({ description, title, variant }: MessagePopupProps) => {
    useEffect(() => {
        toast({
            title,
            description,
            variant,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>MessagePopup</div>;
};

export default MessagePopup;
