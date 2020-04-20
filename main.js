const audioContext = new AudioContext();

let oscillator;
const compressor = audioContext.createDynamicsCompressor()
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;

document.querySelector(".play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440はA4(4番目のラ)
  oscillator
  .connect(compressor)
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
  rateText.innerHTML = "range:" + e.target.value;
});
depth.gain.value = 0;
lfo.frequency.value = 0;

//28	130.813	ド	C3	
//29	138.591		C#3	
//30	146.832	レ	D3	
//31	155.563		D#3	
//32	164.814	ミ	E3	
//33	174.614	ファ	F3	
//34	184.997		F#3	
//35	195.998	ソ	G3	
//36	207.652		G#3	
//37	220.000	ラ	A3	
//38	233.082		A#3	
//39	246.942	シ	B3
const thresholdController = document.querySelector("#threshold");

thresholdController.addEventListener("input", e => {
  compressor.threshold.value = e.target.value;
});