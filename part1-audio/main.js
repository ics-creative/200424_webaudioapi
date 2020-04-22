const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
// Web Audio API内で使える形に変換
const track = audioContext.createMediaElementSource(audioElement);

// 出力につなげる
track.connect(audioContext.destination);

document.querySelector("#play").addEventListener("click", () => {
    if(audioContext.state === "suspended") {
        audioContext.resume();
    }
    audioElement.play();
});

// audioElementを一時停止する
document.querySelector("#pause").addEventListener("click", () => {
    audioElement.pause();
});