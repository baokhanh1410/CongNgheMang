export function updateStatus(status, text) {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    statusDot.classList.remove('status-ready', 'status-recording', 'status-paused');

    if (status === 'ready') statusDot.classList.add('status-ready');
    else if (status === 'recording') statusDot.classList.add('status-recording');
    else if (status === 'paused') statusDot.classList.add('status-paused');

    statusText.textContent = text;
}

export function displayQuestions(questions) {
    const list = document.getElementById('questionsList');
    list.innerHTML = '';
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question-card';
        div.id = `question-${index}`;
        div.innerHTML = `<div class="question-number">Câu ${index + 1}</div><div class="question-text">${q}</div>`;
        list.appendChild(div);
    });
}

export function activateQuestionUI(index) {
    document.querySelectorAll('.question-card').forEach(c => c.classList.remove('active'));
    const current = document.getElementById(`question-${index}`);
    if (current) current.classList.add('active');
}

export function toggleModal(show) {
    document.getElementById('completionModal').style.display = show ? 'flex' : 'none';
}

export function updateUploadStatus(text) {
    document.getElementById('uploadStatus').textContent = text;
}

// Giả lập AI (Giữ nguyên logic cũ)
export function startAIAnalysis() {
    setInterval(() => {
        // Logic random icon mắt/mũi/miệng ở đây...
        // Mô phỏng thay đổi trạng thái mắt ngẫu nhiên
        const eyeStates = ['Bình thường', 'Hơi lệch', 'Rất lệch'];
        const focusStates = ['Tốt', 'Trung bình', 'Kém'];
        const audioStates = ['Rõ ràng', 'Nhiễu', 'Khó nghe'];

        const randomEyeState = Math.floor(Math.random() * 10);
        const randomFocusState = Math.floor(Math.random() * 10);
        const randomAudioState = Math.floor(Math.random() * 10);

        // Lưu phân tích AI
        if (currentQuestionIndex < interviewData.aiAnalysis.length) {
            interviewData.aiAnalysis[currentQuestionIndex] = {
                eyeStatus: randomEyeState < 7 ? 'Bình thường' : randomEyeState < 9 ? 'Hơi lệch' : 'Rất lệch',
                focusStatus: randomFocusState < 7 ? 'Tốt' : randomFocusState < 9 ? 'Trung bình' : 'Kém',
                audioStatus: randomAudioState < 8 ? 'Rõ ràng' : randomAudioState < 10 ? 'Nhiễu' : 'Khó nghe',
                timestamp: new Date().toISOString()
            };
        }

        // Cập nhật trạng thái mắt
        if (randomEyeState < 7) {
            document.getElementById('eyeStatusIcon').className = 'feedback-icon feedback-good';
            document.getElementById('eyeStatusIcon').textContent = '✓';
            document.getElementById('eyeStatusText').textContent = 'Hướng nhìn: Bình thường';
        } else if (randomEyeState < 9) {
            document.getElementById('eyeStatusIcon').className = 'feedback-icon feedback-warning';
            document.getElementById('eyeStatusIcon').textContent = '!';
            document.getElementById('eyeStatusText').textContent = 'Hướng nhìn: Hơi lệch';
        } else {
            document.getElementById('eyeStatusIcon').className = 'feedback-icon feedback-danger';
            document.getElementById('eyeStatusIcon').textContent = '✗';
            document.getElementById('eyeStatusText').textContent = 'Hướng nhìn: Rất lệch';
        }

        // Cập nhật trạng thái tập trung
        if (randomFocusState < 7) {
            document.getElementById('focusStatusIcon').className = 'feedback-icon feedback-good';
            document.getElementById('focusStatusIcon').textContent = '✓';
            document.getElementById('focusStatusText').textContent = 'Tập trung: Tốt';
        } else if (randomFocusState < 9) {
            document.getElementById('focusStatusIcon').className = 'feedback-icon feedback-warning';
            document.getElementById('focusStatusIcon').textContent = '!';
            document.getElementById('focusStatusText').textContent = 'Tập trung: Trung bình';
        } else {
            document.getElementById('focusStatusIcon').className = 'feedback-icon feedback-danger';
            document.getElementById('focusStatusIcon').textContent = '✗';
            document.getElementById('focusStatusText').textContent = 'Tập trung: Kém';
        }

        // Cập nhật trạng thái âm thanh
        if (randomAudioState < 8) {
            document.getElementById('audioStatusIcon').className = 'feedback-icon feedback-good';
            document.getElementById('audioStatusIcon').textContent = '✓';
            document.getElementById('audioStatusText').textContent = 'Âm thanh: Rõ ràng';
        } else if (randomAudioState < 10) {
            document.getElementById('audioStatusIcon').className = 'feedback-icon feedback-warning';
            document.getElementById('audioStatusIcon').textContent = '!';
            document.getElementById('audioStatusText').textContent = 'Âm thanh: Nhiễu';
        } else {
            document.getElementById('audioStatusIcon').className = 'feedback-icon feedback-danger';
            document.getElementById('audioStatusIcon').textContent = '✗';
            document.getElementById('audioStatusText').textContent = 'Âm thanh: Khó nghe';
        }
    }, 3000);
}