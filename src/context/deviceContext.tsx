import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { RiSofaLine } from "react-icons/ri";

const ROOMS = [
    {
        id: "bedroom",
        title: "Bedroom",
        devices: ["smart_lamp", "vacuum_cleaner", "hexa_lamp"],
        Icon: LuBedDouble,
    },
    {
        id: "kitchen",
        title: "Kitchen",
        devices: ["smart_lamp", "vacuum_cleaner"],
        Icon: GiForkKnifeSpoon,
    },
    {
        id: "living_room",
        title: "Living room",
        devices: ["smart_lamp", "tv_lamp", "strip_lamp"],
        Icon: RiSofaLine,
    },
    {
        id: "bathroom",
        title: "Bathroom",
        devices: ["smart_lamp"],
        Icon: PiShower,
    },
];

const DEVICES = [
    {
        id: "smart_lamp",
        category: "smart_lamp",
        title: "Smart Lamp",
        status: false,
        brightness: 0.7,
    },
    {
        id: "hexa_lamp",
        category: "smart_lamp",
        title: "Hexa Light Panel",
        status: false,
        brightness: 0,
    },
    {
        id: "strip_lamp",
        category: "smart_lamp",
        title: "RGB Strip Light",
        status: false,
        brightness: 0,
    },
    {
        id: "tv_lamp",
        category: "smart_lamp",
        title: "TV Backlight",
        status: false,
        brightness: 0.7,
    },
    {
        id: "vacuum_cleaner",
        category: "cleaner",
        title: "Robot vacuum cleaner",
        status: false,
        filter_status: 0.9,
        next_cleaning: new Date(),
        battery: 0.8,
        cleaning_data: [
            {
                start_time: new Date(),
                time_taken: 1000 * 60 * 30,
                area_cleaned: 75,
            },
        ],
    },
    {
        id: "speaker",
        category: "speaker",
        title: "SONY HT-S40R ",
        status: false,
        track: {
            playing: false,
            time: 1000 * 60 * 2,
            current_position: 0.75,
        },
    },
];

type DeviceContext = {
    rooms: typeof ROOMS;
    setRooms: Dispatch<SetStateAction<typeof ROOMS>>;
    devices: typeof DEVICES;
    setDevices: Dispatch<SetStateAction<typeof DEVICES>>;
};

const DeviceContext = createContext<DeviceContext | null>(null);

export const DeviceContextProvider = (props: { children: JSX.Element }) => {
    const [rooms, setRooms] = useState(ROOMS);
    const [devices, setDevices] = useState(DEVICES);
    return <DeviceContext.Provider value={{ rooms, setRooms, devices, setDevices }}>{props.children}</DeviceContext.Provider>;
};

export const useDeviceContext = () => {
    return useContext(DeviceContext)!;
};
