import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import { RiSofaLine } from "react-icons/ri";

export const ROOMS = [
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
