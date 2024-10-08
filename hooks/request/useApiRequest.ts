"use client";
import CONFIG from "@/config";
import { authContext } from "@/context/authContext";
import { useRouter } from "@/i18n/routing";
import { useContext } from "react";

type ApiRequestParams = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    auth?: boolean;
    apiAuth?: boolean;
};

const useApiRequest = () => {
    const authCtx = useContext(authContext);

    const token = authCtx?.token;

    const request = async ({
        body,
        method,
        url,
        auth,
        apiAuth,
    }: ApiRequestParams): Promise<
        { success: true; data: any } | { success: false; error: any } | void
    > => {
        const path = url.startsWith("http")
            ? url
            : `${CONFIG.backend_url}${url}`;
        try {
            if (auth && !token) {
                throw new Error("Unauthorized");
            }
            const payload: any = {
                method: method || "GET",
                headers: {},
            } as RequestInit;

            if (body) {
                if (body instanceof FormData) {
                    payload.body = body;
                } else {
                    payload.headers["Content-Type"] = "application/json";
                    payload.body = JSON.stringify(body);
                }
            }
            if (auth) {
                payload.headers["Authorization"] = `Bearer ${token}`;
            } else if (apiAuth) {
                payload.headers[
                    "Authorization"
                ] = `Bearer ${CONFIG.img_store_key}`;
            }

            const res = await fetch(path, payload);

            if (res.status === 204) {
                return {
                    success: true,
                    data: null,
                };
            }

            const data = res.headers
                .get("Content-Type")
                ?.startsWith("application/json")
                ? await res.json()
                : await res.blob();

            if (!path.includes("login") && !apiAuth && res.status === 401) {
                throw new Error("Unauthorized");
            }

            if (res.status >= 400) {
                return {
                    success: false,
                    error: data,
                };
            }

            return {
                success: true,
                data,
            };
        } catch (error: any) {
            if (error.message === "Unauthorized" && auth) {
                authCtx?.removeToken();
            } else {
                return { success: false, error: error.message };
            }
        }
    };

    return request;
};

export default useApiRequest;
