import styles from "./styles.module.scss";
import { DropdownProps } from "./types";

const Dropdown = (props: DropdownProps) => {
    const { optionProps, selectProps, className, options } = props;
    return (
        <div className={className}>
            <select className={styles.wrapper} {...selectProps}>
                {options.map(o => (
                    <option {...optionProps} {...o.props} value={o.id} key={o.id}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
