import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { SmartLamp } from "../utils";
import { DEVICES, ROOMS } from "../constants";

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
        setDevices(ps => ps.map(d => (d.id === id ? (d as SmartLamp).changeBrightness(brightness) && d.changeStatus(brightness !== 0) : d)));
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
