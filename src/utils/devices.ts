export class Device {
    constructor(
        public id: string,
        public category: string,
        public title: string,
        public image: string,
        public status = false,
    ) {}

    changeStatus(status: boolean) {
        this.status = status;
        return this;
    }
}

export class SmartLamp extends Device {
    constructor(
        public id: string,
        public title: string,
        public image: string,
        public brightness = 0,
        public status = false,
    ) {
        super(id, "smart_lamp", title, image, status);
    }

    changeBrightness(brightness: number) {
        this.brightness = brightness;
        return this;
    }
}

export class Cleaner extends Device {
    constructor(
        public id: string,
        public title: string,
        public image: string,
        public filter_status = 1,
        public next_cleaning = new Date(),
        public battery = 1,
        public cleaning_data = [{ start_time: new Date(), time_taken: 1000 * 60 * 30, area_cleaned: 75 }],
        public status = false,
    ) {
        super(id, "cleaner", title, image, status);
    }
}

export class Speaker extends Device {
    public audio: HTMLAudioElement;
    public time_string = "";
    public current_position_string = "";
    public loop = false;
    public shuffle = false;
    constructor(
        public id: string,
        public title: string,
        public image: string,
        private track?: string,
        public playlist = [] as { id: string; album_cover: string; src: string }[],
        public playing = false,
        public time = 0,
        public current_position = 0,
        public status = false,
    ) {
        super(id, "speaker", title, image, status);
        const currentSong = playlist.find(s => s.id === track);
        this.audio = new Audio(currentSong?.src);
    }

    private getTimeString(time: number) {
        const minuteInS = 60;
        const minutes = Math.floor(time / minuteInS) || 0;
        const seconds = Math.floor(time - minutes * minuteInS) || 0;
        return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
    }

    changePlayingStatus(status: boolean) {
        if (status === this.playing) return this;
        this.time = this.audio.duration;
        this.playing = status;
        if (status) {
            this.audio.play();
            super.changeStatus(true);
        } else this.audio.pause();
        return this;
    }

    changePosition() {
        this.time = this.audio.duration;
        this.current_position = this.audio.currentTime;
        this.current_position_string = this.getTimeString(this.current_position);
        this.time_string = this.getTimeString(this.time);
        return this;
    }

    changeStatus(status: boolean) {
        super.changeStatus(status);
        this.changePlayingStatus(false);
        return this;
    }

    get song() {
        const song = this.playlist.find(s => s.id === this.track);
        return song;
    }

    private changeTrack(by: 1 | -1) {
        const currentSongIndex = this.playlist.findIndex(s => s.id === this.track);
        let nextSongIndex;

        if (this.shuffle) {
            do {
                nextSongIndex = Math.floor(Math.random() * this.playlist.length);
            } while (nextSongIndex === currentSongIndex);
        } else {
            nextSongIndex = currentSongIndex + by;
            if (nextSongIndex >= this.playlist.length || nextSongIndex < 0) {
                if (!this.loop) return this;
                nextSongIndex = by === 1 ? 0 : this.playlist.length - 1;
            }
        }

        const nextSong = this.playlist[nextSongIndex];

        this.audio.src = nextSong.src;
        this.track = nextSong.id;
        this.changePlayingStatus(false);
        this.changePlayingStatus(true);

        return this;
    }

    playNext() {
        return this.changeTrack(1);
    }

    playPrevious() {
        return this.changeTrack(-1);
    }

    toggleLoopMode() {
        this.loop = !this.loop;
        return this;
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        return this;
    }
}
