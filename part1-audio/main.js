window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const audioElement = document.querySelector("audio");
// Web Audio API内で使える形に変換
const track = ctx.createMediaElementSource(audioElement);

document.querySelector("#play").addEventListener("click", () => {
    if(ctx.state === "suspended") {
        ctx.resume();
    }
    // 出力につなげる
    track.connect(ctx.destination);
    audioElement.play();
});

// audioElementを一時停止する
document.querySelector("#pause").addEventListener("click", () => {
    audioElement.pause();
});