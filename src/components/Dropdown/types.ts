import { HTMLProps } from "react";

export type DropdownProps = {
    className?: string;
    selectProps?: HTMLProps<HTMLSelectElement>;
    optionProps?: HTMLProps<HTMLOptionElement>;
    options: { id: string; label: string; props?: HTMLProps<HTMLOptionElement> }[];
};
