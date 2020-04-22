const audioContext = new AudioContext();
let oscillator

document.querySelector("#play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440はA4(4番目のラ)
  oscillator.connect(audioContext.destination);
  oscillator.start();
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", () => {
  oscillator.stop();
});