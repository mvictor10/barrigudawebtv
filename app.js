// app.js - VERSÃO DEPURADA E SEGURA
const CHANNEL_ID = "UC6YMH2FVrVRN1KNO9-aH-SA";

window.assistir = function(videoID) {
    const modal = document.getElementById('video-modal');
    const playerFrame = document.getElementById('player-frame');
    
    // Busca os dados no dados.js
    const item = youtubeLives.find(v => v.videoID === videoID);
    let finalURL = "";

    // Lógica de construção da URL (Depuração de strings)
    if (videoID === "LIVE_AUTOMATICA") {
        finalURL = `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1&mute=0&rel=0&enablejsapi=1`;
    } 
    else if (item && item.playlistID) {
        // Para playlists, usamos o ID do vídeo + ID da playlist limpos
        finalURL = `https://www.youtube.com/embed/${videoID}?list=${item.playlistID}&autoplay=1&rel=0&enablejsapi=1`;
    } 
    else {
        finalURL = `https://www.youtube.com/embed/${videoID}?autoplay=1&rel=0&enablejsapi=1`;
    }

    if (modal && playerFrame) {
        // Aplica a URL e abre o modal
        playerFrame.src = finalURL;
        modal.style.display = "flex";
        
        // Se o player der erro visual, o console mostrará aqui:
        console.log("Tentando carregar no Iframe: " + finalURL);
    }
};

window.fecharPlayer = function() {
    const modal = document.getElementById('video-modal');
    const playerFrame = document.getElementById('player-frame');
    modal.style.display = "none";
    playerFrame.src = ""; // Para o som na hora
};

function render() {
    const container = document.getElementById('live-container');
    if (!container || typeof youtubeLives === 'undefined') return;

    // No seu app.js, dentro da função render()
    container.innerHTML = youtubeLives.map((video, index) => {
        // Se for um dos 3 primeiros da lista, ganha badge de RECENTE
        const isNew = index < 3; 
        const thumbID = video.videoID;

        return `
            <article class="live-card" onclick="assistir('${video.videoID}')">
                <div class="thumb-wrapper">
                    ${isNew ? '<span class="badge-new">RECENTE</span>' : ''}
                    <span class="status-badge ${video.tipo === 'live' ? 'online' : 'offline'}">
                        ${video.categoria}
                    </span>
                    <img src="https://img.youtube.com/vi/${thumbID}/hqdefault.jpg">
                    <div class="play-icon">▶</div>
                </div>
                <div class="info-content">
                    <h3>${video.titulo}</h3>
                    <p>Postado em: ${video.data_adicionado || 'Data antiga'}</p>
                </div>
            </article>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', render);