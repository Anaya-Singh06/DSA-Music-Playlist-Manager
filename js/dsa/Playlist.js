class Playlist {
    constructor(loggerCallback) {
        this.head = null;
        this.count = 0;
        this.k = 0;
        this.currentPlayingNode = null;
        this.log = loggerCallback || console.log;
    }

    addSong(title, artist) {
        const newNode = new SongNode(title, artist);
        this.count++;

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.currentPlayingNode = newNode;
        } else {
            const tail = this.head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = this.head;
            this.head.prev = newNode;
        }

        this.log(`Added: "${title}"`);
        this.rebuildSkipPointers();
    }

    rebuildSkipPointers() {
        if (!this.head) return;

        this.k = Math.floor(Math.sqrt(this.count));
        if (this.k === 0) this.k = 1;

        this.log(`Rebuilding Skip Pointers. n=${this.count}, k=${this.k}`);

        let current = this.head;
        let skipTarget = this.head;
        let i = 0;

        do {
            current.skipPointer = null;

            if (i > 0 && i % this.k === 0) {
                skipTarget.skipPointer = current;
                skipTarget = current;
            }

            current = current.next;
            i++;
        } while (current !== this.head);
    }

    jumpToIndex(targetIndex) {
        if (!this.head) return;

        let idx = (targetIndex - 1) % this.count;
        if (idx < 0) idx += this.count;
        
        let current = this.currentPlayingNode;
        let currentIndex = this.getNodeIndex(current);
        let targetAbsIndex = idx + 1; 

        this.log(`Requested Jump to #${targetAbsIndex}. Current is #${currentIndex}.`);

        if (targetAbsIndex < currentIndex) {
             current = this.head;
             currentIndex = 1;
             this.log("Target is behind. Resetting scan to Head (Index 1).");
        }

        let steps = 0;
        while (currentIndex !== targetAbsIndex) {
            if (current.skipPointer && (currentIndex + this.k <= targetAbsIndex)) {
                current = current.skipPointer;
                currentIndex += this.k;
                this.log(`🚀 EXPRESS JUMP! Advanced to #${currentIndex} (${current.title})`);
            } else {
                current = current.next;
                currentIndex++;
                this.log(`🚶 Step (local). Advanced to #${currentIndex} (${current.title})`);
            }
            steps++;
        }

        this.currentPlayingNode = current;
        this.log(`✅ Arrived at "${current.title}" in ${steps} ops.`);
    }

    simpleSkip(k) {
        if(!this.currentPlayingNode) return;
        if(k === 1) this.currentPlayingNode = this.currentPlayingNode.next;
        if(k === -1) this.currentPlayingNode = this.currentPlayingNode.prev;
    }

    getNodeIndex(node) {
        if(!this.head) return 0;
        let curr = this.head;
        let i = 1;
        do {
            if(curr === node) return i;
            curr = curr.next;
            i++;
        } while(curr !== this.head);
        return -1;
    }
}