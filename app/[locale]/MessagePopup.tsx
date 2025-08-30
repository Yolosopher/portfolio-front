"use client";

import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

type MessagePopupProps = {
    title: string;
    description: string;
    variant: "default" | "destructive" | "doubt";
    uniqueId: string;
};

const MessagePopup = ({
    description,
    title,
    variant,
    uniqueId,
}: MessagePopupProps) => {
    useEffect(() => {
        const alreadyShown = localStorage.getItem(
            `message-popup-shown-${uniqueId}`
        );
        if (!alreadyShown) {
            toast({
                title,
                description,
                variant,
            });
            localStorage.setItem(`message-popup-shown-${uniqueId}`, "true");
        }
    }, [description, title, uniqueId, variant]);
    return null;
};

export default MessagePopup;
