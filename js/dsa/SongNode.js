class SongNode {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
        this.next = null;
        this.prev = null;
        this.skipPointer = null;
    }
}