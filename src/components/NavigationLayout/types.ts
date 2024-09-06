import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { IoMusicalNotes, IoMusicalNotesOutline, IoShieldCheckmark, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdDashboard, MdLightbulb, MdLightbulbOutline, MdOutlineDashboard } from "react-icons/md";

export type NavigationLayoutProps = {
    children: JSX.Element | string;
};

export const NAVLINKS = [
    {
        Icon: MdOutlineDashboard,
        ActiveIcon: MdDashboard,
    },
    {
        Icon: MdLightbulbOutline,
        ActiveIcon: MdLightbulb,
    },
    {
        Icon: IoMusicalNotesOutline,
        ActiveIcon: IoMusicalNotes,
    },
    {
        Icon: IoShieldCheckmarkOutline,
        ActiveIcon: IoShieldCheckmark,
    },
    {
        Icon: IoMdNotificationsOutline,
        ActiveIcon: IoMdNotifications,
    },
];
