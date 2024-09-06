import { Dashboard } from "../pages";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { IoMusicalNotes, IoMusicalNotesOutline, IoShieldCheckmark, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdDashboard, MdLightbulb, MdLightbulbOutline, MdOutlineDashboard } from "react-icons/md";

export const ROUTES_DATA = [
    {
        id: "dashboard",
        title: "Dashboard",
        link: "/",
        Component: Dashboard,
        Icon: MdOutlineDashboard,
        ActiveIcon: MdDashboard,
    },
    {
        id: "Devices",
        title: "devices",
        link: "/devices",
        Icon: MdLightbulbOutline,
        ActiveIcon: MdLightbulb,
    },
    {
        id: "Music",
        title: "music",
        link: "/music",
        Icon: IoMusicalNotesOutline,
        ActiveIcon: IoMusicalNotes,
    },
    {
        id: "Temperature",
        title: "temperature",
        link: "/temperature",
        Icon: IoShieldCheckmarkOutline,
        ActiveIcon: IoShieldCheckmark,
    },
    {
        id: "Shield",
        title: "shield",
        link: "/shield",
        Icon: IoMdNotificationsOutline,
        ActiveIcon: IoMdNotifications,
    },
];
