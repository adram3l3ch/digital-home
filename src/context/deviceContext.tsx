import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { Cleaner, SmartLamp, Speaker } from "../utils";
import { DEVICES, ROOMS } from "../constants";

type DeviceContext = {
    rooms: typeof ROOMS;
    setRooms: Dispatch<SetStateAction<typeof ROOMS>>;
    devices: typeof DEVICES;
    setDevices: Dispatch<SetStateAction<typeof DEVICES>>;
    changeBrightness: (id: string, brightness: number) => void;
    changeStatus: (id: string, status: boolean) => void;
    updateSpeakerPlayingStatus: (status: boolean, id: string) => void;
    initializeSong: (id: string) => void;
    updateSpeakerTime: (id: string) => void;
    handlePlayNext: (id: string) => void;
    handlePlayPrevious: (id: string) => void;
    handleToggleLoop: (id: string) => void;
    handleToggleShuffle: (id: string) => void;
};

const DeviceContext = createContext<DeviceContext | null>(null);

const isSpeaker = (device: Speaker | Cleaner | SmartLamp): device is Speaker => {
    return device.category === "speaker";
};

export const DeviceContextProvider = (props: { children: JSX.Element }) => {
    const [rooms, setRooms] = useState(ROOMS);
    const [devices, setDevices] = useState(DEVICES);

    const changeBrightness = useCallback((id: string, brightness: number) => {
        setDevices(ps => ps.map(d => (d.id === id ? (d as SmartLamp).changeBrightness(brightness) && d.changeStatus(brightness !== 0) : d)));
    }, []);

    const changeStatus = useCallback((id: string, status: boolean) => {
        setDevices(ps => ps.map(d => (d.id === id ? d.changeStatus(status) : d)));
    }, []);

    const findSpeaker = (devices: typeof DEVICES, id: string) => {
        const speaker = devices.find(d => d.id === id) as Speaker;
        return speaker;
    };

    const updateSpeakerPlayingStatus = useCallback(
        (status: boolean, id: string) => {
            setDevices(ps => {
                const speaker = findSpeaker(ps, id);
                if (!speaker) return ps;
                const a = speaker.changePlayingStatus(status);
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const initializeSong = useCallback(
        (id: string) => {
            setDevices(ps => {
                const speaker = findSpeaker(ps, id);
                if (!speaker) return ps;
                const a = speaker.initialize();
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const updateSpeakerTime = useCallback(
        (id: string) => {
            setDevices(ps => {
                const speaker = findSpeaker(ps, id);
                if (!speaker) return ps;
                const a = speaker.changePosition();
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const handlePlayNext = useCallback(
        (id: string) => {
            setDevices(ps => {
                const speaker = findSpeaker(ps, id);
                if (!speaker) return ps;
                const a = speaker.playNext();
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const handlePlayPrevious = useCallback(
        (id: string) => {
            setDevices(ps => {
                const speaker = findSpeaker(ps, id);
                if (!speaker) return ps;
                const a = speaker.playPrevious();
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const handleToggleLoop = useCallback((id: string) => {
        setDevices(ps => {
            const speaker = findSpeaker(ps, id);
            if (!speaker) return ps;
            const a = speaker.toggleLoopMode();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    }, []);

    const handleToggleShuffle = useCallback((id: string) => {
        setDevices(ps => {
            const speaker = findSpeaker(ps, id);
            if (!speaker) return ps;
            const a = speaker.toggleShuffle();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    }, []);

    return (
        <DeviceContext.Provider
            value={{
                rooms,
                setRooms,
                devices,
                setDevices,
                changeBrightness,
                changeStatus,
                handlePlayNext,
                handlePlayPrevious,
                handleToggleShuffle,
                initializeSong,
                updateSpeakerPlayingStatus,
                updateSpeakerTime,
                handleToggleLoop,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => {
    return useContext(DeviceContext)!;
};
