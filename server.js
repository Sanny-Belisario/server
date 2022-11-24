const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("./database/db")

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSucessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.listen(3000, () => {
    console.log('Server started!')
})

//Rotas

const asmr = require('./routes/asmr');
const meditacoes = require('./routes/meditacoes');
const relatos = require('./routes/relatos');
const sons = require('./routes/sons');
const tecnicasAjuda = require('./routes/tecnicas-ajuda');
const tecnicasAnsiedade = require('./routes/tecnicas-ansiedade');
const tecnicasPanico = require('./routes/tecnicas-panico');
const filmesSaudeMental = require('./routes/filmes-saude-mental');
const filmes = require('./routes/filmes');
const series = require('./routes/series');
const livros = require('./routes/livros');
const musicas = require('./routes/musicas');
const podcasts = require('./routes/podcasts');
const login = require('./routes/login');
const cadastro = require('./routes/cadastro');
const editarPerfil = require('./routes/editar-perfil');
const favoritos = require('./routes/favoritos');
const continueAssistindo = require('./routes/continue-assistindo');
const historico = require('./routes/historico');

app.use('/asmr', asmr);
app.use('/meditacoes', meditacoes);
app.use('/relatos', relatos);
app.use('/sons', sons);
app.use('/tecnicas-ajuda', tecnicasAjuda);
app.use('/tecnicas-ansiedade', tecnicasAnsiedade);
app.use('/tecnicas-panico', tecnicasPanico);
app.use('/filmes-saude-mental', filmesSaudeMental);
app.use('/filmes', filmes);
app.use('/series', series);
app.use('/livros', livros);
app.use('/musicas', musicas);
app.use('/podcasts', podcasts);
app.use('/login', login);
app.use('/cadastro', cadastro);
app.use('/editar-perfil', editarPerfil);
app.use('/favoritos', favoritos);
app.use('/continue-assistindo', continueAssistindo);
app.use('/historico', historico);

app.use(function (req, res, next) {
    next();
});