const audioContext = new AudioContext()

const audioElement = document.querySelector("audio")
// Web Audio API内で使える形に変換
const track = audioContext.createMediaElementSource(audioElement)

// 出力につなげる
track.connect(audioContext.destination)

const playButton = document.querySelector("#play")
playButton.addEventListener("click", () => {
    audioElement.play()
})