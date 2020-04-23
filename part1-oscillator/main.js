window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
let oscillator;
// 再生中でtrue
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if(isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // 440HzはA4(4番目のラ)
  oscillator.connect(ctx.destination);
  oscillator.start();
  isPlaying = true
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});