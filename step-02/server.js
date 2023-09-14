const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('/home/kelvin/lab/WebRTC/lab-webrtc/step-02'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});