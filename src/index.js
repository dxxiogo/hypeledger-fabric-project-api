const express = require('express');
const router = require('../src/routes/routes')


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Servidor ativo!</h1>');
});



server.listen(5000, () => {
    console.log('Servidor rodando na porta 3333');
})

server.use(router);