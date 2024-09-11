import { Dashboard } from "../pages";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { IoMusicalNotes, IoMusicalNotesOutline, IoShieldCheckmark, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdDashboard, MdLightbulb, MdLightbulbOutline, MdOutlineDashboard } from "react-icons/md";
import { RiTempColdFill, RiTempColdLine } from "react-icons/ri";

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
        id: "devices",
        title: "Devices",
        link: "/devices",
        Icon: MdLightbulbOutline,
        ActiveIcon: MdLightbulb,
    },
    {
        id: "music",
        title: "Music",
        link: "/music",
        Icon: IoMusicalNotesOutline,
        ActiveIcon: IoMusicalNotes,
    },
    {
        id: "temperature",
        title: "Temperature",
        link: "/temperature",
        Icon: RiTempColdLine,
        ActiveIcon: RiTempColdFill,
    },
    {
        id: "shield",
        title: "Shield",
        link: "/shield",
        Icon: IoShieldCheckmarkOutline,
        ActiveIcon: IoShieldCheckmark,
    },
    {
        id: "notifications",
        title: "Notifications",
        link: "/notifications",
        Icon: IoMdNotificationsOutline,
        ActiveIcon: IoMdNotifications,
    },
];
