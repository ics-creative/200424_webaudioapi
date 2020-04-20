const audioContext = new AudioContext()
const gainNode = audioContext.createGain()
// 音量の初期値を0.5にする
gainNode.gain.value = 0.5

let lfo

document.querySelector("#play").addEventListener("click", () => {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  // lfoの作成
  lfo = audioContext.createOscillator()
  lfo.type = "sine"
  // lfoの周波数を30に設定
  lfo.frequency.setValueAtTime(10, audioContext.currentTime)

  // ここでgainNodeをつなげる
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();

  // gainNodeのgainプロパティにlfoをつなげる
  lfo.connect(gainNode.gain)
  lfo.start()
})

// ビブラートの速さを調節
document.querySelector("#plus").addEventListener("click", () => {
  lfo.frequency.value += 5
})

document.querySelector("#minus").
  addEventListener("click", () => {
    lfo.frequency.value -= 5
  })