const audioContext = new AudioContext();

let oscillator;
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;

document.querySelector(".play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440はA4(4番目のラ)
  oscillator
    .connect(panner)
    .connect(gainNode)
    .connect(audioContext.destination);
  lfo.connect(depth).connect(oscillator.frequency);
  oscillator.start();
  lfo.start();
});

document.querySelector(".stop").addEventListener("click", () => {
  oscillator.stop();
});

let volumeSlider = document.querySelector("#volume");
const gainText = document.querySelector("#gain-text");

volumeSlider.addEventListener(
  "input",
  e => {
    gainNode.gain.value = e.target.value;
    gainText.innerHTML = "volume:" + e.target.value;
  },
  false
);

const pannerSlider = document.querySelector("#pan");
const panText = document.querySelector("#pan-text");
const panner = new StereoPannerNode(audioContext, { pan: 0 });
pannerSlider.addEventListener(
  "input",
  e => {
    panner.pan.value = e.target.value;
    panText.innerHTML = "pan:" + e.target.value;
  },
  false
);

const hzSlider = document.querySelector("#hz");
const hzText = document.querySelector("#hz-text");
hzSlider.addEventListener("input", e => {
  oscillator.frequency.value = e.target.value;
  hzText.innerHTML = e.target.value + "Hz";
});

const waveButtons = document.querySelectorAll(".wave");
waveButtons.forEach(button => {
  button.addEventListener("click", e => {
    const type = e.target.value;
    oscillator.type = type;
  });
});

const lfo = audioContext.createOscillator();
const depth = audioContext.createGain();
const depthController = document.querySelector("#depth");
const depthText = document.querySelector("#depth-text");

const rateController = document.querySelector("#rate");
const rateText = document.querySelector("#rate-text");
depthController.addEventListener("input", e => {
  depth.gain.value = e.target.value;
  depthText.innerHTML = "depth:" + e.target.value;
});

rateController.addEventListener("input", e => {
  lfo.frequency.value = e.target.value;
  rateText.innerHTML = "depth:" + e.target.value;
});
depth.gain.value = 0;
lfo.frequency.value = 0;
