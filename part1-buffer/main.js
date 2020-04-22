const audioContext = new AudioContext();

let sampleSource

// 音源を取得しAudioBuffer形式に変換して返す関数
async function setupSample() {
  const response = await fetch("../sample.mp3");
  const arrayBuffer = await response.arrayBuffer();
  // Web Audio APIで使える形式に変換
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// AudioBufferをaudioContextに接続し再生する関数
function playSample(audioContext, audioBuffer) {
  sampleSource = audioContext.createBufferSource();
  // 変換されたバッファーを音源として設定
  sampleSource.buffer = audioBuffer;
  // 出力につなげる
  sampleSource.connect(audioContext.destination);
  sampleSource.start();
}

document.querySelector("#play").addEventListener("click", async () => {
  const sample = await setupSample();
  playSample(audioContext, sample);
});

// oscillatorを破棄し再生を停止する
document.querySelector("#stop").addEventListener("click", async () => {
  sampleSource.stop();
});
