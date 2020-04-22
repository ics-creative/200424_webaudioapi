window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

let oscillator;
const lfo = ctx.createOscillator();
const depth = ctx.createGain();
let isPlaying = false;

lfo.frequency.value = 10;
depth.gain.value = 50;

document.querySelector("#play").addEventListener("click", () => {
  // 再生中なら二重に再生されないようにする
  if(isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, ctx.currentTime);

  // lfoの作成
  lfo.type = "sine";
  // lfoの周波数を30に設定
  lfo.frequency.setValueAtTime(10, ctx.currentTime);

  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();

  // gainNodeのgainプロパティにlfoをつなげる
  lfo.connect(depth).connect(oscillator.frequency);
  lfo.start();

  isPlaying = true
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});

// ビブラートの速さを調節
document.querySelector("#hz-plus").addEventListener("click", () => {
  lfo.frequency.setValueAtTime(lfo.frequency.value + 3, ctx.currentTime);
});

document.querySelector("#hz-minus").addEventListener("click", () => {
  if (lfo.frequency.value > 3) {
    lfo.frequency.setValueAtTime(lfo.frequency.value - 3, ctx.currentTime);
  }
});

//ビブラートの深さを調節
document.querySelector("#depth-plus").addEventListener("click", () => {
  depth.gain.value += 5;
});

document.querySelector("#depth-minus").addEventListener("click", () => {
  if (lfo.frequency.value > 5) {
    depth.gain.value -= 5;
  }
});
