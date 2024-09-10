import { Devices, Lights, Rooms, Surveillance } from "../../components";
import styles from "./styles.module.scss";

const Dashboard = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.surveillance}>
                <Surveillance humidity="50%" power="350W" temperature="24K" wind="80%" />
            </div>
            <div className={styles.rooms}>
                <Rooms />
            </div>
            <div className={styles.devices}>
                <Devices />
            </div>
            <div className={styles.lights}>
                <Lights />
            </div>
        </section>
    );
};

export default Dashboard;
