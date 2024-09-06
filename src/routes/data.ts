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
        Icon: RiTempColdLine,
        ActiveIcon: RiTempColdFill,
    },
    {
        id: "Shield",
        title: "Shield",
        link: "/Shield",
        Icon: IoShieldCheckmarkOutline,
        ActiveIcon: IoShieldCheckmark,
    },
    {
        id: "Notification",
        title: "notification",
        link: "/notification",
        Icon: IoMdNotificationsOutline,
        ActiveIcon: IoMdNotifications,
    },
];
