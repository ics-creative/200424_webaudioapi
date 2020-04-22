const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

let oscillator;
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if(isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, ctx.currentTime);
  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  isPlaying = true
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator.stop();
  isPlaying = false
});

document.querySelector("#plus").addEventListener("click", () => {
  if (gainNode.gain.value < 1) {
    gainNode.gain.value += 0.05;
  }
});

document.querySelector("#minus").addEventListener("click", () => {
  if (gainNode.gain.value > 0) {
    gainNode.gain.value -= 0.05;
  }
});