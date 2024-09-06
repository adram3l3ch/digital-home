import { MdInfoOutline, MdOutlineChevronRight } from "react-icons/md";
import styles from "./styles.module.scss";
import { useDeviceContext } from "../../context";
import { IoMdAdd } from "react-icons/io";

const Rooms = () => {
    const { rooms } = useDeviceContext();
    return (
        <section className={styles.wrapper}>
            <header>
                <h4>Rooms</h4>
                <MdInfoOutline size={25} />
            </header>
            <hr />
            <div className={styles.roomsList}>
                {rooms.map(r => (
                    <button className={styles.room} key={r.id}>
                        <div className={styles.icon}>
                            <r.Icon size={20} />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>{r.title}</div>
                            <div className={styles.devices}>{r.devices.length} device(-s)</div>
                        </div>
                        <MdOutlineChevronRight size={20} />
                    </button>
                ))}
            </div>
            <button className={styles.cta}>
                <IoMdAdd size={25} />
                ADD ROOM
            </button>
        </section>
    );
};

export default Rooms;
