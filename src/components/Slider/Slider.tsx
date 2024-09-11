import styles from "./styles.module.scss";
import { SliderProps } from "./types";

const Slider = (props: SliderProps) => {
    const style = { "--value": `${props.value || 0}%` } as { [k: string]: string };
    const { Icon, ...inputProps } = props;
    return (
        <div className={styles.wrapper} style={style}>
            <div className={styles.overlay}>
                {Icon && <Icon size="1.5rem" fill="black" />}
                <span>{`${parseInt(`${props.value || 0}`)}%`}</span>
            </div>
            <input type="range" {...inputProps} />
        </div>
    );
};

export default Slider;
