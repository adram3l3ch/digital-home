import { PiCubeLight } from "react-icons/pi";
import { useDeviceContext } from "../../context";
import styles from "./styles.module.scss";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiBatteryCharging } from "react-icons/fi";
import { Cleaner } from "../../utils";

const Devices = () => {
    const { devices } = useDeviceContext();
    const vacuum = devices.find(d => d.category === "cleaner")! as Cleaner;
    return (
        <section className={styles.wrapper}>
            <header>
                <h4>Bedroom</h4>
                <div className={styles.title}>{vacuum.title}</div>
            </header>
            <div className={styles.details}>
                <div>
                    <div>{(vacuum.filter_status || 0) * 100}%</div>
                    <div>Filter Status</div>
                </div>
                <img src={vacuum.image} alt="vacuum" />
                <div>
                    <div>10:00 AM</div>
                    <div>Next Cleaning</div>
                </div>
            </div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.icon}>
                        <PiCubeLight size={20} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.value}>
                            {vacuum.cleaning_data?.[0]?.area_cleaned} m<sup>2</sup>
                        </div>
                        <div className={styles.title}>Area cleaned</div>
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.icon}>
                        <AiOutlineClockCircle size={20} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.value}>30 min</div>
                        <div className={styles.title}>Cleaning time</div>
                    </div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.icon}>
                        <FiBatteryCharging size={20} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.value}>{(vacuum.battery || 0) * 100}%</div>
                        <div className={styles.title}>Battery charge</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Devices;
