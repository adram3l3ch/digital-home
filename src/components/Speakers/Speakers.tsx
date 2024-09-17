import { Switch } from "../Switch";
import styles from "./styles.module.scss";
import { useDeviceContext } from "../../context";
import { Speaker } from "../../utils";
import { ChangeEvent, useEffect } from "react";
import { CircularInput, CircularProgress, CircularTrack, CircularThumb } from "react-circular-input";
import { colors } from "../../constants";
import { IoPause, IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TfiControlShuffle, TfiLoop } from "react-icons/tfi";

const Speakers = () => {
    const {
        devices,
        changeStatus,
        handlePlayNext,
        handlePlayPrevious,
        handleToggleLoop,
        handleToggleShuffle,
        initializeSong,
        updateSpeakerTime,
        updateSpeakerPlayingStatus,
    } = useDeviceContext();

    const speaker = devices.find(d => d.id === "speaker") as Speaker;

    useEffect(() => {
        const handleMediaFunctionKeysPress = (event: KeyboardEvent) => {
            switch (event.code) {
                case "MediaTrackNext":
                    console.log("object");
                    handlePlayNext(speaker.id);
                    break;
                case "MediaTrackPrevious":
                    handlePlayPrevious(speaker.id);
                    break;
                default:
                    break;
            }
        };

        speaker.audio.addEventListener("loadeddata", () => initializeSong(speaker.id));
        speaker.audio.addEventListener("play", () => updateSpeakerPlayingStatus(true, speaker.id));
        speaker.audio.addEventListener("pause", () => updateSpeakerPlayingStatus(false, speaker.id));
        speaker.audio.addEventListener("timeupdate", () => updateSpeakerTime(speaker.id));
        speaker.audio.addEventListener("ended", () => handlePlayNext(speaker.id));
        document.addEventListener("keydown", handleMediaFunctionKeysPress);

        return () => {
            speaker.audio.removeEventListener("loadeddata", () => initializeSong(speaker.id));
            speaker.audio.removeEventListener("play", () => updateSpeakerPlayingStatus(true, speaker.id));
            speaker.audio.removeEventListener("pause", () => updateSpeakerPlayingStatus(false, speaker.id));
            speaker.audio.removeEventListener("timeupdate", () => updateSpeakerTime(speaker.id));
            speaker.audio.removeEventListener("ended", () => handlePlayNext(speaker.id));
            document.removeEventListener("keydown", handleMediaFunctionKeysPress);
        };
    }, [updateSpeakerPlayingStatus, updateSpeakerTime, handlePlayNext, initializeSong, handlePlayPrevious, speaker.id, speaker.audio]);

    const handleToggleStatus = () => {
        if (speaker.playing) {
            updateSpeakerPlayingStatus(false, speaker.id);
        } else updateSpeakerPlayingStatus(true, speaker.id);
    };

    const handleSeek = (value: number) => {
        const newTime = speaker.audio.duration * value;
        speaker.audio.currentTime = newTime;
    };

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(speaker.id, e.target.checked);
    };

    const timePercent = speaker.audio.currentTime ? speaker.audio.currentTime / speaker.audio.duration : 0;

    return (
        <section className={styles.wrapper}>
            <header>
                <div className={styles.details}>
                    <h4>Speakers</h4>
                    <p>{speaker.title}</p>
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
                    {speaker.audio.duration && <CircularThumb fill={colors.primary100} r="4px" />}
                </CircularInput>
            </div>
            <div className={styles.controls}>
                <button onClick={() => handleToggleLoop(speaker.id)} className={speaker.loop ? styles.loop : ""} title="Loop">
                    <TfiLoop size="1.5rem" />
                </button>
                <button onClick={() => handlePlayPrevious(speaker.id)} title="Previous">
                    <TbPlayerTrackPrevFilled size="1.5rem" />
                </button>
                <button onClick={handleToggleStatus} className={styles.playPause} title="Play/Pause">
                    {speaker.playing ? <IoPause size="2rem" /> : <IoPlay size="2rem" />}
                </button>
                <button onClick={() => handlePlayNext(speaker.id)} title="Next">
                    <TbPlayerTrackNextFilled size="1.5rem" />
                </button>
                <button onClick={() => handleToggleShuffle(speaker.id)} className={speaker.shuffle ? styles.shuffle : ""} title="Shuffle">
                    <TfiControlShuffle size="1.5rem" />
                </button>
            </div>
        </section>
    );
};

export default Speakers;
