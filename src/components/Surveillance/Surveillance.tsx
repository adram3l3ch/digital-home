import { SurveillanceProps } from "./types";
import styles from "./styles.module.scss";
import { RiTempColdLine } from "react-icons/ri";
import { IoWaterOutline } from "react-icons/io5";
import { PiLightningLight, PiWind } from "react-icons/pi";

const VIDEO_URL =
    "https://www.youtube.com/embed/7DFMj_0wB5s?si=VVGp9IS-f1k1esmB&autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&mute=1&loop=1&playlist=7DFMj_0wB5s";

const Surveillance = (props: SurveillanceProps) => {
    const { humidity, power, temperature, wind } = props;
    return (
        <section className={styles.wrapper}>
            <div className={styles.stats}>
                <div className={styles.live}>
                    <div className={styles.indicator} />
                    Live
                </div>
                <div className={styles.statusPill}>
                    <RiTempColdLine size={15} />
                    {temperature}
                </div>
                <div className={styles.statusPill}>
                    <IoWaterOutline size={15} />
                    {humidity}
                </div>
                <div className={styles.statusPill}>
                    <PiLightningLight size={15} />
                    {power}
                </div>
                <div className={styles.statusPill}>
                    <PiWind size={15} />
                    {wind}
                </div>
            </div>
            <article className={styles.video}>
                <iframe
                    src={VIDEO_URL}
                    title="CCTV"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </article>
        </section>
    );
};

export default Surveillance;
