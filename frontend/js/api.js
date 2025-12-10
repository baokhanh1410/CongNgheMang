const BASE_URL = 'http://localhost:3000/api';

export async function verifyTokenAPI(token) {
    try {
        const response = await fetch(`${BASE_URL}/verify-token`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function startSessionAPI(token, userName) {
    try {
        const response = await fetch(`${BASE_URL}/session/start`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, userName })
        });
        const data = await response.json();
        return data.ok ? data.folder : null;
    } catch (error) {
        return null;
    }
}

export async function uploadVideoAPI(token, folder, index, videoBlob) {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('folder', folder);
    formData.append('questionIndex', index + 1);
    formData.append('video', videoBlob, `Q${index + 1}.webm`);

    try {
        const response = await fetch(`${BASE_URL}/upload-one`, { 
            method: 'POST',
            body: formData 
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

export async function finishSessionAPI(token, folder, count) {
    try {
        const response = await fetch(`${BASE_URL}/session/finish`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, folder, questionsCount: count })
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}