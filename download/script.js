const videoElement = document.getElementById('video');
const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const downloadLink = document.getElementById('downloadLink');
let mediaRecorder;
let chunks = [];
let recordingTimeout;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        videoElement.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Erro ao acessar a câmera: ', error);
    });

startRecordButton.addEventListener('click', function () {
    console.log("videoElement.srcObject ", videoElement.srcObject)
    mediaRecorder = new MediaRecorder(videoElement.srcObject);
    mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            console.log("2")
            chunks.push(event.data);
        }
    };
    mediaRecorder.onstop = function () {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        downloadLink.href = videoUrl;
        downloadLink.style.display = 'block';
        downloadLink.download = 'record.webm';
        chunks = [];
    };

    mediaRecorder.start();
    startRecordButton.disabled = true;
    stopRecordButton.disabled = false;

    recordingTimeout = setTimeout(function () {
        mediaRecorder.stop();
    }, 30000);
});

stopRecordButton.addEventListener('click', function () {
    mediaRecorder.stop();
    clearTimeout(recordingTimeout);

    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
});
