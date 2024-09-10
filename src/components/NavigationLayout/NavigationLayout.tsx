import { NavigationLayoutProps } from "./types";
import styles from "./styles.module.scss";
import { RiSettingsLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const LOGO =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F012%2F226%2F005%2Fnon_2x%2Fleaf-black-logo-with-transparent-background-png.png&f=1&nofb=1&ipt=332cb1d7c0ccffcca5046503c289bb3610030c3e63656d27c7d133639f5d223e&ipo=images";

const USER =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallofcelebrities.com%2Fcelebrity%2Fjohn-doe%2Fpictures%2Fxxlarge%2Fjohn-doe_862803.jpg&f=1&nofb=1&ipt=2cd3bef24f3cb5fa27f41e5ab87114dcfe649957ca8ef77319536f8236c8811f&ipo=images";

const NavigationLayout = (props: NavigationLayoutProps) => {
    const { children, routes } = props;
    return (
        <div className={styles.navLayout}>
            <nav>
                <header>
                    <NavLink to="/">
                        <img src={LOGO} alt="Digital Home" />
                    </NavLink>
                </header>
                <section className={styles.navLinks}>
                    {routes?.map(r => (
                        <NavLink to={r.link} className={({ isActive }) => (isActive ? styles.active : "")} key={r.id}>
                            {({ isActive }) => (
                                <div className={styles.navLink}>{isActive ? <r.ActiveIcon size={"1.5rem"} /> : <r.Icon size={"1.5rem"} />}</div>
                            )}
                        </NavLink>
                    ))}
                </section>
                <footer>
                    <NavLink to="/settings">
                        <div>
                            <RiSettingsLine size={"1.5rem"} />
                        </div>
                    </NavLink>
                    <img src={USER} alt="John Doe" />
                </footer>
            </nav>
            <main>
                {<Outlet />}
                {children}
            </main>
        </div>
    );
};

export default NavigationLayout;
