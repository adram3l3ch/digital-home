import { Switch } from "../Switch";
import styles from "./styles.module.scss";
import { useDeviceContext } from "../../context";
import { Cleaner, SmartLamp, Speaker } from "../../utils";
import { ChangeEvent, useCallback, useEffect } from "react";
import { CircularInput, CircularProgress, CircularTrack, CircularThumb } from "react-circular-input";
import { colors } from "../../constants";
import { IoPause, IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TfiControlShuffle, TfiLoop } from "react-icons/tfi";

const isSpeaker = (device: Speaker | Cleaner | SmartLamp): device is Speaker => {
    return device.category === "speaker";
};

const Speakers = () => {
    const { devices, setDevices } = useDeviceContext();
    const speaker = devices.find(d => d.id === "speaker") as Speaker;

    const updateSpeakerStatus = useCallback(
        (status: boolean) => {
            setDevices(ps => {
                const speaker = ps.find(d => d.category === "speaker") as Speaker;
                const a = speaker.changePlayingStatus(status);
                return ps.map(d => (isSpeaker(d) ? a : d));
            });
        },
        [setDevices],
    );

    const updateSpeakerTime = useCallback(() => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.changePosition();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    }, [setDevices]);

    const handlePlayNext = useCallback(() => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.playNext();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    }, [setDevices]);

    const handlePlayPrevious = useCallback(() => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.playPrevious();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    }, [setDevices]);

    useEffect(() => {
        speaker.audio.addEventListener("loadeddata", () => updateSpeakerStatus(true));
        speaker.audio.addEventListener("play", () => updateSpeakerStatus(true));
        speaker.audio.addEventListener("pause", () => updateSpeakerStatus(false));
        speaker.audio.addEventListener("timeupdate", updateSpeakerTime);
        speaker.audio.addEventListener("ended", handlePlayNext);

        return () => {
            speaker.audio.removeEventListener("loadeddata", () => updateSpeakerStatus(true));
            speaker.audio.removeEventListener("play", () => updateSpeakerStatus(true));
            speaker.audio.removeEventListener("pause", () => updateSpeakerStatus(false));
            speaker.audio.removeEventListener("timeupdate", updateSpeakerTime);
            speaker.audio.removeEventListener("ended", handlePlayNext);
            speaker.audio.remove();
            updateSpeakerStatus(false);
        };
    }, [updateSpeakerStatus, speaker.audio, updateSpeakerTime, handlePlayNext]);

    const handleToggleStatus = () => {
        if (speaker.playing) {
            updateSpeakerStatus(false);
        } else updateSpeakerStatus(true);
    };

    const handleSeek = (value: number) => {
        const newTime = speaker.time * value;
        speaker.audio.currentTime = newTime;
    };

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.changeStatus(e.target.checked);
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    };

    const handleToggleLoop = () => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.toggleLoopMode();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    };

    const handleToggleShuffle = () => {
        setDevices(ps => {
            const speaker = ps.find(d => d.category === "speaker") as Speaker;
            const a = speaker.toggleShuffle();
            return ps.map(d => (isSpeaker(d) ? a : d));
        });
    };

    const timePercent = speaker.time ? speaker.current_position / speaker.time : 0;

    return (
        <section className={styles.wrapper}>
            <header>
                <div className={styles.details}>
                    <h4>Speakers</h4>
                    <p>{speaker.status ? "Playing" : "Not Playing"}</p>
                </div>
                <Switch checked={speaker.status} onChange={handleStatusChange} />
            </header>
            <div className={styles.player}>
                <div className={styles.time}>
                    {speaker.time_string} | <span>{speaker.current_position_string}</span>
                </div>
                <img src={speaker.song?.album_cover} />
                <CircularInput value={timePercent} onChange={handleSeek} style={{ width: "13rem", height: "13rem" }}>
                    <CircularTrack stroke={colors.primary500} strokeWidth="2px" />
                    <CircularProgress stroke={colors.primary100} strokeWidth="2px" />
                    {speaker.time && <CircularThumb fill={colors.primary100} r="4px" />}
                </CircularInput>
            </div>
            <div className={styles.controls}>
                <button onClick={handleToggleLoop} className={speaker.loop ? styles.loop : ""}>
                    <TfiLoop size="1.5rem" />
                </button>
                <button onClick={handlePlayPrevious}>
                    <TbPlayerTrackPrevFilled size="1.5rem" />
                </button>
                <button onClick={handleToggleStatus} className={styles.playPause}>
                    {speaker.playing ? <IoPause size="2rem" /> : <IoPlay size="2rem" />}
                </button>
                <button onClick={handlePlayNext}>
                    <TbPlayerTrackNextFilled size="1.5rem" />
                </button>
                <button onClick={handleToggleShuffle} className={speaker.shuffle ? styles.shuffle : ""}>
                    <TfiControlShuffle size="1.5rem" />
                </button>
            </div>
        </section>
    );
};

export default Speakers;
