const audioContext = new AudioContext();

let oscillator;
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;

document.querySelector(".play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440はA4(4番目のラ)
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();
});

document.querySelector(".stop").addEventListener("click", () => {
  oscillator.stop();
});

let volumeSlider = document.querySelector("#volume")
const gainText = document.querySelector(".gain-text");

volumeSlider.addEventListener("input", (e) => {
  gainNode.gain.value = e.target.value
  gainText.innerHTML = gainNode.gain.value
}, false)



