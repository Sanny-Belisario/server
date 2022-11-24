const express = require('express');
const favoritosRouter = express.Router();
const mysql = require('../database/db');
const md5 = require('md5');
const asmr = require('../apis/asmr.json');
const meditacoes = require('../apis/meditacoes.json');
const relatos = require('../apis/relatos.json');
const sons = require('../apis/sons.json');
const tecnicasAjuda = require('../apis/tecnicas-ajuda.json');
const tecnicasAnsiedade = require('../apis/tecnicas-ansiedade.json');
const tecnicasPanico = require('../apis/tecnicas-panico.json');
const filmesSaudeMental = require('../apis/filmes-saude-mental.json');
const filmes = require('../apis/filmes.json');
const series = require('../apis/series.json');
const livros = require('../apis/livros.json');

favoritosRouter.route('/:iduser').get(async (req, res) => {
    const idcadastro = req.params['iduser'];
    procurar = "SELECT * FROM favoritos WHERE cadastro='" + idcadastro + "'";
    const favoritos = await mysql.query(procurar);
    console.log(idcadastro)
    console.log(favoritos)
    result = favoritos;
    res.send(result);
})

favoritosRouter.route('').post(async (req, res) => {
    const idConteudo = req.body.idConteudo;
    const tipo = req.body.tipo;
    const cadastro = req.body.idcadastro;
    procurar = "SELECT idcadastro, nome, email FROM cadastro WHERE idcadastro='" + cadastro + "'";
    const check = await mysql.query(procurar);
    const idcadastro = check[0].idcadastro;
    console.log(check)
    result = null;
    if (check != '') {
        sql = "INSERT INTO favoritos (idConteudo, tipo, cadastro) VALUES ('" + idConteudo + "', '" + tipo + "', '" + idcadastro + "')"
        const favoritos = await mysql.query(sql);
        procurarDois = "SELECT * FROM favoritos WHERE idConteudo='" + idConteudo + "' and tipo like '" + tipo + "' and cadastro= '" + idcadastro + "'";
        const checkFav = await mysql.query(procurarDois);
        result = { favoritos, checkFav };
    }
    res.send(result);
})

favoritosRouter.route('/:iduser/:id').delete(async (req, res) => {
    const idFavoritos = req.params['id'];
    const user = req.params['iduser'];
    procurarUser = "SELECT idcadastro FROM cadastro WHERE idcadastro='" + user + "'";
    const idcadastro = await mysql.query(procurarUser);
    sql = "SELECT * FROM favoritos WHERE idFavoritos = '" + idFavoritos + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
    const checkFav = await mysql.query(sql);
    if (checkFav != '') {
        deletar = "DELETE FROM favoritos WHERE idFavoritos = '" + idFavoritos + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
        const deleta = await mysql.query(deletar);
        console.log(deleta);
        if (deleta != '') {
            res.send(deleta)
        }
    }
})

module.exports = favoritosRouter;