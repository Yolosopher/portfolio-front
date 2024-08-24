import { ITechStack } from "./tech";

export interface IProject {
    _id: string;
    name: string;
    stack: ITechStack[];
    description: string;
    github: string;
    preview: string;
    image: string;
    group: string;
    priority: number;
    hidden: boolean;
}

export interface IProjectPopulated extends Omit<IProject, "stack"> {
    stack: ITechStack[];
}
