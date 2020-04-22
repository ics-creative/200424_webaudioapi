const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5;

let oscillator

document.querySelector("#play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator.stop();
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