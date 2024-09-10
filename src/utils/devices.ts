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
    constructor(
        public id: string,
        public title: string,
        public image: string,
        public track = { playing: false, time: 1000 * 60 * 2, current_position: 0.75 },
        public playing = false,
        public status = false,
    ) {
        super(id, "speaker", title, image, status);
    }

    changePlayingStatus(status: boolean) {
        this.playing = status;
        return this;
    }
}
