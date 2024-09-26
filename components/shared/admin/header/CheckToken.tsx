/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { toast } from "@/components/ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { useContext, useEffect } from "react";
import { authContext } from "@/context/authContext";

const CheckToken = () => {
    const authCtx = useContext(authContext);

    const token = authCtx?.token;
    const request = useApiRequest();
    const errorHandler = useErrorHandler();
    useEffect(() => {
        const checkTokenRunner = async () => {
            try {
                const result = await request({
                    url: "/auth/self",
                    auth: true,
                    method: "GET",
                });

                if (result) {
                    if (!result.success) {
                        errorHandler(result.error);
                    } else {
                        // toast({
                        //     title: "Success",
                        //     description:
                        //         result.data.message ?? "Token is valid",
                        // });
                    }
                }
            } catch (error: any) {
                errorHandler(error.message);
            }
        };

        checkTokenRunner();
    }, [token]);
    return null;
};

export default CheckToken;
