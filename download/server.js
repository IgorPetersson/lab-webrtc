const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.static('/home/igorpetersson/repos/projects/labs/webrtc/webrtc-web/download/'));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});