import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getAge = (date: string) => {
    const dateOfBirth = new Date(date);

    const monthDiff = new Date(Date.now() - dateOfBirth.getTime());

    const year = monthDiff.getUTCFullYear();

    return Math.abs(year - 1970);
};
