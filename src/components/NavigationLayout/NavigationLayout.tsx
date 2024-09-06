import { NavigationLayoutProps, NAVLINKS } from "./types";
import styles from "./styles.module.scss";
import { RiSettingsLine } from "react-icons/ri";

const LOGO =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F012%2F226%2F005%2Fnon_2x%2Fleaf-black-logo-with-transparent-background-png.png&f=1&nofb=1&ipt=332cb1d7c0ccffcca5046503c289bb3610030c3e63656d27c7d133639f5d223e&ipo=images";

const USER =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallofcelebrities.com%2Fcelebrity%2Fjohn-doe%2Fpictures%2Fxxlarge%2Fjohn-doe_862803.jpg&f=1&nofb=1&ipt=2cd3bef24f3cb5fa27f41e5ab87114dcfe649957ca8ef77319536f8236c8811f&ipo=images";

const NavigationLayout = (props: NavigationLayoutProps) => {
    const { children } = props;
    return (
        <div className={styles.navLayout}>
            <nav>
                <header>
                    <img src={LOGO} alt="Digital Home" />
                </header>
                <section className={styles.navLinks}>
                    {NAVLINKS.map(n => (
                        <a>
                            <div className={styles.navLink}>
                                <n.Icon size={25} />
                            </div>
                        </a>
                    ))}
                </section>
                <footer>
                    <div>
                        <RiSettingsLine size={25} />
                    </div>
                    <img src={USER} alt="John Doe" />
                </footer>
            </nav>
            <section className={styles.content}>{children}</section>
        </div>
    );
};

export default NavigationLayout;
