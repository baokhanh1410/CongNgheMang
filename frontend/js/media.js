let mediaRecorder;
let recordedChunks = [];
let recognition;

export async function initWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('webcam').srcObject = stream;
        
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export function startRecording() {
    recordedChunks = [];
    if (mediaRecorder && mediaRecorder.state === 'inactive') mediaRecorder.start();
}

export function stopRecording() {
    return new Promise(resolve => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                resolve(blob);
            };
            mediaRecorder.stop();
        } else {
            resolve(null);
        }
    });
}

export function initSpeech(onResultCallback) {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            if (onResultCallback) onResultCallback(transcript);
        };
        
        recognition.onstart = () => document.getElementById('speechIndicator').style.display = 'block';
        recognition.onend = () => document.getElementById('speechIndicator').style.display = 'none';
    }
}

export function startListening() {
    if (recognition) try { recognition.start(); } catch(e) {}
}

export function stopListening() {
    if (recognition) try { recognition.stop(); } catch(e) {}
}