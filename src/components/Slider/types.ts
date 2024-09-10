import { HTMLProps } from "react";
import { IconType } from "react-icons";

export type SliderProps = HTMLProps<HTMLInputElement> & {
    Icon?: IconType;
};
