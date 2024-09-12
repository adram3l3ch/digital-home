import { ChangeEvent, useState } from "react";
import { useDeviceContext } from "../../context";
import styles from "./styles.module.scss";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Switch } from "../Switch";
import { Slider } from "../Slider";
import { GoSun } from "react-icons/go";
import { SmartLamp } from "../../utils";
import { Dropdown } from "../Dropdown";

const Lights = () => {
    const { devices, rooms, changeBrightness, changeStatus } = useDeviceContext();
    const [selectedRoom, setSelectedRoom] = useState("living_room");
    const [selectedLampIndex, setSelectedLampIndex] = useState(0);

    const selectedRoomDevices = rooms.find(r => r.id === selectedRoom)?.devices || [];
    const lights = devices.filter(d => d.category === "smart_lamp" && selectedRoomDevices.includes(d.id)) as SmartLamp[];

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

    const brightness = selectedLamp.status ? (selectedLamp.brightness || 0) * 100 : 0;

    const style = { "--value": `${brightness || 0}%` } as { [k: string]: string };

    const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLampIndex(0);
        setSelectedRoom(e.target.value);
    };

    return (
        <section className={styles.wrapper} style={style}>
            <header>
                <Dropdown
                    className={styles.dropdown}
                    selectProps={{ value: selectedRoom, onChange: handleRoomChange }}
                    options={rooms.map(r => ({ id: r.id, label: r.title }))}
                />
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
