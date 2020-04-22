window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

let sampleSource;
// 再生中でtrue
let isPlaying = false;

// 音源を取得しAudioBuffer形式に変換して返す関数
async function setupSample() {
  const response = await fetch("../sample.mp3");
  const arrayBuffer = await response.arrayBuffer();
  // Web Audio APIで使える形式に変換
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// AudioBufferをctxに接続し再生する関数
function playSample(ctx, audioBuffer) {
  sampleSource = ctx.createBufferSource();
  // 変換されたバッファーを音源として設定
  sampleSource.buffer = audioBuffer;
  // 出力につなげる
  sampleSource.connect(ctx.destination);
  sampleSource.start();
  isPlaying = true
}

document.querySelector("#play").addEventListener("click", async () => {
  // 再生中なら二重に再生されないようにする
  if(isPlaying) return;
  const sample = await setupSample();
  playSample(ctx, sample);
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", async () => {
  sampleSource?.stop();
  isPlaying = false
});
