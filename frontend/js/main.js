import * as API from './api.js';
import * as UI from './ui.js';
import * as Media from './media.js';

// Dữ liệu mẫu
const questionBank = [
    "Hãy giới thiệu về bản thân.",
    "Tại sao bạn chọn công ty chúng tôi?",
    "Điểm mạnh của bạn là gì?",
    "Bạn xử lý áp lực như thế nào?",
    "Mục tiêu 5 năm tới của bạn?"
];

// State quản lý trạng thái
let state = {
    questions: [],
    currentIndex: 0,
    token: '',
    folder: '',
    isPaused: false,
    timerInterval: null,
    seconds: 0
};

document.addEventListener('DOMContentLoaded', async () => {
    await Media.initWebcam();
    UI.updateStatus('ready', 'Sẵn sàng');
    
    // Setup Speech Recognition
    Media.initSpeech((transcript) => {
        console.log("User said:", transcript);
        if (transcript.includes('hết') || transcript.includes('xong')) {
            handleNextQuestion();
        }
    });

    setupEvents();
});

function setupEvents() {
    document.getElementById('startBtn').addEventListener('click', handleStart);
    document.getElementById('nextBtn').addEventListener('click', handleNextQuestion);
    document.getElementById('completeBtn').addEventListener('click', handleFinish);
}

async function handleStart(e) {
    e.preventDefault();
    const name = document.getElementById('candidateName').value;
    state.token = document.getElementById('candidateToken').value;

    if (!name || !state.token) return alert('Nhập đủ thông tin!');

    UI.updateStatus('pending', 'Đang xác thực...');
    
    // 1. Verify Token
    const isTokenValid = await API.verifyTokenAPI(state.token);
    if (!isTokenValid) return alert('Token sai!');

    // 2. Start Session
    const folder = await API.startSessionAPI(state.token, name);
    if (!folder) return alert('Lỗi server!');
    state.folder = folder;

    // 3. UI Setup
    state.questions = questionBank.slice(0, 3); // Lấy 3 câu demo
    UI.displayQuestions(state.questions);
    UI.activateQuestionUI(0);
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('completeBtn').disabled = false;

    // 4. Start Recording Question 1
    startQuestionLogic();
}

function startQuestionLogic() {
    UI.updateStatus('recording', 'Đang ghi hình...');
    Media.startRecording();
    Media.startListening();
    startTimer();
}

async function handleNextQuestion() {
    stopTimer();
    Media.stopListening();
    UI.updateStatus('pending', 'Đang lưu...');
    UI.toggleModal(true);
    UI.updateUploadStatus(`Đang upload câu ${state.currentIndex + 1}...`);

    // 1. Lấy Video Blob
    const videoBlob = await Media.stopRecording();
    
    // 2. Upload
    if (videoBlob) {
        await API.uploadVideoAPI(state.token, state.folder, state.currentIndex, videoBlob);
    }

    // 3. Chuyển câu
    state.currentIndex++;
    if (state.currentIndex < state.questions.length) {
        UI.toggleModal(false);
        UI.activateQuestionUI(state.currentIndex);
        startQuestionLogic(); // Ghi hình câu tiếp theo
    } else {
        handleFinish();
    }
}

async function handleFinish() {
    stopTimer();
    Media.stopListening();
    UI.updateUploadStatus('Đang hoàn tất session...');
    
    // Upload nốt câu cuối nếu chưa
    const videoBlob = await Media.stopRecording();
    if (videoBlob) {
        await API.uploadVideoAPI(state.token, state.folder, state.currentIndex, videoBlob);
    }

    // Gọi API Finish
    await API.finishSessionAPI(state.token, state.folder, state.questions.length);
    
    UI.updateUploadStatus('Phỏng vấn thành công!');
    UI.updateStatus('ready', 'Hoàn thành');
    setTimeout(() => UI.toggleModal(false), 2000);
}

// Timer Logic đơn giản
function startTimer() {
    state.timerInterval = setInterval(() => {
        state.seconds++;
        const mins = Math.floor(state.seconds / 60).toString().padStart(2, '0');
        const secs = (state.seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = `${mins}:${secs}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(state.timerInterval);
}