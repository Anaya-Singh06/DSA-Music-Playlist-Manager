const logToUI = (msg) => {
    const consoleDiv = document.getElementById('logConsole');
    consoleDiv.innerHTML += `<div>> ${msg}</div>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
};

const myPlaylist = new Playlist(logToUI);

function renderPlaylist() {
    const container = document.getElementById('playlistVisualizer');
    container.innerHTML = '';

    if (!myPlaylist.head) return;

    document.getElementById('statN').innerText = `Total Songs (n): ${myPlaylist.count}`;
    document.getElementById('statK').innerText = `Skip Interval (k = √n): ${myPlaylist.k}`;

    let current = myPlaylist.head;
    let i = 1;

    do {
        const isActive = (current === myPlaylist.currentPlayingNode);
        const hasSkip = (current.skipPointer !== null);
        let skipTargetIdx = -1;
        if(hasSkip) skipTargetIdx = myPlaylist.getNodeIndex(current.skipPointer);

        const div = document.createElement('div');
        div.className = `node-card ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div class="song-index">#${i}</div>
            <div class="song-title">${current.title}</div>
            <div class="song-artist">${current.artist}</div>
            ${isActive ? '<div style="color:#1DB954; font-size:10px; margin-top:5px;">🔊 NOW PLAYING</div>' : ''}
            ${hasSkip ? `<div class="skip-badge">🚀 Express Lane -> #${skipTargetIdx}</div>` : ''}
        `;
        container.appendChild(div);

        current = current.next;
        i++;
    } while (current !== myPlaylist.head);
}

function uiAddSong() {
    const t = document.getElementById('inputTitle').value;
    const a = document.getElementById('inputArtist').value;
    if(!t || !a) return alert("Please enter title and artist");
    
    myPlaylist.addSong(t, a);
    renderPlaylist();
    
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputArtist').value = '';
}

function uiJumpToIndex() {
    const idx = parseInt(document.getElementById('inputIndex').value);
    if(!idx) return;
    myPlaylist.jumpToIndex(idx);
    renderPlaylist();
}

function uiSkip(k) {
    myPlaylist.simpleSkip(k);
    renderPlaylist();
}

window.onload = function() {
    logToUI("System initialized...");
    myPlaylist.addSong("Bohemian Rhapsody", "Queen");
    myPlaylist.addSong("Stairway to Heaven", "Led Zeppelin");
    myPlaylist.addSong("Hotel California", "Eagles");
    myPlaylist.addSong("Smells Like Teen Spirit", "Nirvana");
    myPlaylist.addSong("Imagine", "John Lennon");
    myPlaylist.addSong("Billie Jean", "Michael Jackson");
    myPlaylist.addSong("Hey Jude", "The Beatles");
    myPlaylist.addSong("Sweet Child O' Mine", "Guns N' Roses");
    renderPlaylist();
};