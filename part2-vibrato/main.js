const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

//
const lfo = audioContext.createOscillator();
const depth = audioContext.createGain();

lfo.frequency.value = 10;
depth.gain.value = 50;

let oscillator

document.querySelector("#play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  // lfoの作成

  lfo.type = "sine";
  // lfoの周波数を30に設定
  lfo.frequency.setValueAtTime(10, audioContext.currentTime);

  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();

  // gainNodeのgainプロパティにlfoをつなげる
  lfo.connect(depth).connect(oscillator.frequency);
  lfo.start();
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator.stop();
});

// ビブラートの速さを調節
document.querySelector("#hz-plus").addEventListener("click", () => {
  lfo.frequency.value += 3;
});

document.querySelector("#hz-minus").addEventListener("click", () => {
  if (lfo.frequency.value > 3) {
    lfo.frequency.value -= 3;
  }
});

//ビブラートの深さを調節
document.querySelector("#depth-plus").addEventListener("click", () => {
  depth.gain.value += 5;
});

document.querySelector("#depth-minus").addEventListener("click", () => {
  if (lfo.frequency.value > 3) {
    depth.gain.value -= 5;
  }
});
