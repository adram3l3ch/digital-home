import { useId } from "react";
import styles from "./styles.module.scss";
import { SwitchProps } from "./types";

const Switch = (props: SwitchProps) => {
    const id = useId();
    return (
        <div className={styles.wrapper}>
            <input {...props} type="checkbox" id={"toggle" + id} />
            <label htmlFor={"toggle" + id} id={"label" + id}></label>
        </div>
    );
};

export default Switch;
