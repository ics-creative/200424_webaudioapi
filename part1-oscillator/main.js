const audioContext = new AudioContext()

document.querySelector("#play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440はA4(4番目のラ)
  oscillator.connect(audioContext.destination);
  oscillator.start();
})