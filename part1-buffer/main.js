const audioContext = new AudioContext();

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
  const sampleSource = audioContext.createBufferSource();
  // 変換されたバッファーを音源として設定
  sampleSource.buffer = audioBuffer;
  // 出力につなげる
  sampleSource.connect(audioContext.destination);
  sampleSource.start();
}

const playButton = document.querySelector("#play");
playButton.addEventListener("click", async () => {
  const sample = await setupSample();
  playSample(audioContext, sample);
});
