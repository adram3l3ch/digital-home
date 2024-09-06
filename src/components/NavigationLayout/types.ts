import { IconType } from "react-icons";

type Icon = JSX.Element | IconType;

export type NavigationLayoutProps = {
    children?: JSX.Element | string;
    routes: { id: string; link: string; Icon: Icon; ActiveIcon?: Icon }[];
};
