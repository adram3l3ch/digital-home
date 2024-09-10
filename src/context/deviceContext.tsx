import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { RiSofaLine } from "react-icons/ri";
import { Cleaner, SmartLamp, Speaker } from "../utils";

const ROOMS = [
    {
        id: "bedroom",
        title: "Bedroom",
        devices: ["bedroom_smart_lamp", "bedroom_vacuum_cleaner", "hexa_lamp"],
        Icon: LuBedDouble,
    },
    {
        id: "kitchen",
        title: "Kitchen",
        devices: ["kitchen_smart_lamp", "kitchen_vacuum_cleaner"],
        Icon: GiForkKnifeSpoon,
    },
    {
        id: "living_room",
        title: "Living room",
        devices: ["living_room_smart_lamp", "tv_lamp", "strip_lamp"],
        Icon: RiSofaLine,
    },
    {
        id: "bathroom",
        title: "Bathroom",
        devices: ["bathroom_smart_lamp"],
        Icon: PiShower,
    },
];

const DEVICES = [
    new SmartLamp(
        "living_room_smart_lamp",
        "Smart Lamp",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimage_gallery2%2FLamp.png&f=1&nofb=1&ipt=3b4d48884bc753a47745cd5a744ecabe0bb06c79b1e81252cc9a290969c95873&ipo=images",
        0.7,
        true,
    ),
    new SmartLamp(
        "bedroom_smart_lamp",
        "Smart Lamp",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimage_gallery2%2FLamp.png&f=1&nofb=1&ipt=3b4d48884bc753a47745cd5a744ecabe0bb06c79b1e81252cc9a290969c95873&ipo=images",
        0.2,
    ),
    new SmartLamp(
        "bathroom_smart_lamp",
        "Smart Lamp",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimage_gallery2%2FLamp.png&f=1&nofb=1&ipt=3b4d48884bc753a47745cd5a744ecabe0bb06c79b1e81252cc9a290969c95873&ipo=images",
    ),
    new SmartLamp(
        "kitchen_smart_lamp",
        "Smart Lamp",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimage_gallery2%2FLamp.png&f=1&nofb=1&ipt=3b4d48884bc753a47745cd5a744ecabe0bb06c79b1e81252cc9a290969c95873&ipo=images",
        1,
        true,
    ),
    new SmartLamp(
        "bedroom_hexa_lamp",
        "Hexa Lamp",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcololight.com%2Fcdn%2Fshop%2Ffiles%2F15_1d5ffa63-b628-47d7-8b1a-5a8272b0a309.webp%3Fv%3D1690448441%26width%3D533&f=1&nofb=1&ipt=06066cbe922688bb7960eb0acf6279df6e0d28281a4dbf4ac42aeda456719943&ipo=images",
        1,
        true,
    ),
    new SmartLamp(
        "strip_lamp",
        "RGB Strip Light",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0416%2F2728%2F7713%2Fproducts%2F65c9203d-9232-4ec3-b660-46af72a89641_1600x.jpg%3Fv%3D1603049712&f=1&nofb=1&ipt=c26ef527e580982083d319cba51d534a584c897064e163863a1d42b63abae6bc&ipo=images",
        1,
    ),
    new SmartLamp(
        "tv_lamp",
        "TV Backlight",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0556%2F4203%2F0246%2Ffiles%2F2_30a9d33a-760a-45c5-b554-c64b57b42707.jpg%3Fv%3D1636599224&f=1&nofb=1&ipt=afb69da7f0fef1d0819394897f99f3af08bb0d13cfb497a02e37cd489b46b8b0&ipo=images",
        0.5,
        true,
    ),
    new Cleaner("bedroom_vacuum_cleaner", "Robot vacuum cleaner", "https://pngimg.com/d/robot_vacuum_PNG40.png", 0.9),
    new Cleaner("kitchen_vacuum_cleaner", "Robot vacuum cleaner", "https://pngimg.com/d/robot_vacuum_PNG40.png", 0.5),
    new Speaker(
        "speaker",
        "SONY HT-S40R",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F8a12461d-9a2b-4818-a624-441de04ac907.415d4f2d812c1cd52876371facb0f256.jpeg&f=1&nofb=1&ipt=3476e598653e9d4a658ad41b5a2e8befa3759190842148f2a312cb435adbb832&ipo=images",
        {
            playing: false,
            time: 1000 * 60 * 2,
            current_position: 0.75,
        },
    ),
];

type DeviceContext = {
    rooms: typeof ROOMS;
    setRooms: Dispatch<SetStateAction<typeof ROOMS>>;
    devices: typeof DEVICES;
    setDevices: Dispatch<SetStateAction<typeof DEVICES>>;
    changeBrightness: (id: string, brightness: number) => void;
    changeStatus: (id: string, status: boolean) => void;
};

const DeviceContext = createContext<DeviceContext | null>(null);

export const DeviceContextProvider = (props: { children: JSX.Element }) => {
    const [rooms, setRooms] = useState(ROOMS);
    const [devices, setDevices] = useState(DEVICES);

    const changeBrightness = (id: string, brightness: number) => {
        setDevices(ps => ps.map(d => (d.id === id ? (d as SmartLamp).changeBrightness(brightness) : d)));
    };

    const changeStatus = (id: string, status: boolean) => {
        setDevices(ps => ps.map(d => (d.id === id ? d.changeStatus(status) : d)));
    };

    return (
        <DeviceContext.Provider value={{ rooms, setRooms, devices, setDevices, changeBrightness, changeStatus }}>
            {props.children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => {
    return useContext(DeviceContext)!;
};
