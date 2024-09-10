import { ChangeEvent, useState } from "react";
import { useDeviceContext } from "../../context";
import styles from "./styles.module.scss";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Switch } from "../Switch";
import { Slider } from "../Slider";
import { GoSun } from "react-icons/go";
import { SmartLamp } from "../../utils";

const Lights = () => {
    const { devices, rooms, changeBrightness, changeStatus } = useDeviceContext();
    const livingRoomDevices = rooms.find(r => r.id === "living_room")?.devices || [];
    const lights = devices.filter(d => d.category === "smart_lamp" && livingRoomDevices.includes(d.id)) as SmartLamp[];

    const [selectedLampIndex, setSelectedLampIndex] = useState(0);
    const selectedLamp = lights?.[selectedLampIndex];

    const handleChangeLamp = (by: -1 | 1) => {
        setSelectedLampIndex(ps => (ps + by === -1 ? lights.length - 1 : ps + by === lights?.length ? 0 : ps + by));
    };

    const handleBrightnessChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeBrightness(selectedLamp.id, +e.target.value / 100);
    };

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(selectedLamp.id, e.target.checked);
    };

    const brightness = (selectedLamp.brightness || 0) * 100;

    const style = { "--value": `${brightness || 0}%` } as { [k: string]: string };

    return (
        <section className={styles.wrapper} style={style}>
            <header>
                <h4>Living room</h4>
            </header>
            <div style={style} className={styles.lightsList}>
                <div className={styles.buttons}>
                    <button onClick={() => handleChangeLamp(-1)}>
                        <MdOutlineChevronLeft size={"2rem"} />
                    </button>
                    <button onClick={() => handleChangeLamp(1)}>
                        <MdOutlineChevronRight size={"2rem"} />
                    </button>
                </div>
                <img src={selectedLamp?.image} alt={selectedLamp?.title} />
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <div className={styles.title}>{selectedLamp?.title}</div>
                    <Switch checked={selectedLamp.status} onChange={handleStatusChange} />
                </div>
                <Slider Icon={GoSun} value={brightness} onChange={handleBrightnessChange} />
            </div>
        </section>
    );
};

export default Lights;
