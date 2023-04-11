export default function checkSpeechRecognitionAvailable() {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}
