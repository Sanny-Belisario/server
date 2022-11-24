const express = require('express');
const historicoRouter = express.Router();
const mysql = require('../database/db');
const md5 = require('md5');
const filmesSaudeMental = require('../apis/filmes-saude-mental.json');
const filmes = require('../apis/filmes.json');
const series = require('../apis/series.json');
const livros = require('../apis/livros.json');

historicoRouter.route('/:iduser').get(async (req, res) => {
    const user = req.params['iduser'];
    procurarUser = "SELECT idcadastro FROM cadastro WHERE idcadastro='" + user + "'";
    const idcadastro = await mysql.query(procurarUser);
    procurar = "SELECT idConteudo, tipo FROM historico WHERE cadastro='" + idcadastro[0].idcadastro + "'";
    const historico = await mysql.query(procurar);
    console.log(idcadastro)
    console.log(historico)
    result = [];
    //console.log(result);
    res.send(result);
})

historicoRouter.route('').post(async (req, res) => {
    const idConteudo = req.body.idConteudo;
    const tipo = req.body.tipo;
    const cadastro = req.body.idcadastro;
    procurar = "SELECT idcadastro, nome, email FROM cadastro WHERE idcadastro='" + cadastro + "'";
    const check = await mysql.query(procurar);
    const idcadastro = check[0].idcadastro;
    console.log(check)
    result = null;
    if (check != '') {
        sql = "INSERT INTO historico (idConteudo, tipo, cadastro) VALUES ('" + idConteudo + "', '" + tipo + "', '" + idcadastro + "')"
        const favoritos = await mysql.query(sql);
        procurarDois = "SELECT * FROM historico WHERE idConteudo='" + idConteudo + "' and tipo like '" + tipo + "' and cadastro= '" + idcadastro + "'";
        const checkFav = await mysql.query(procurarDois);
        result = { favoritos, checkFav };
    }
    res.send(result);
})

historicoRouter.route('/:iduser/:id').delete(async (req, res) => {
    const idHistorico = req.params['id'];
    const user = req.params['iduser'];
    procurarUser = "SELECT idcadastro FROM cadastro WHERE idcadastro='" + user + "'";
    const idcadastro = await mysql.query(procurarUser);
    sql = "SELECT * FROM historico WHERE idHistorico = '" + idHistorico + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
    const checkFav = await mysql.query(sql);
    if (checkFav != '') {
        deletar = "DELETE FROM historico WHERE idHistorico = '" + idHistorico + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
        const deleta = await mysql.query(deletar);
        console.log(deleta);
        if (deleta != '') {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
})

module.exports = historicoRouter;