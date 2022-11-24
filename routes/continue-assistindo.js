const express = require('express');
const continueAssistindo = express.Router();
const mysql = require('../database/db');
const md5 = require('md5');
const asmr = require('../apis/asmr.json');
const meditacoes = require('../apis/meditacoes.json');
const relatos = require('../apis/relatos.json');
const sons = require('../apis/sons.json');
const tecnicasAjuda = require('../apis/tecnicas-ajuda.json');
const tecnicasAnsiedade = require('../apis/tecnicas-ansiedade.json');
const tecnicasPanico = require('../apis/tecnicas-panico.json');

continueAssistindo.route('/:iduser').get(async (req, res) => {
    const user = req.params['iduser'];
    procurarUser = "SELECT idcadastro FROM cadastro WHERE idcadastro='" + user + "'";
    const idcadastro = await mysql.query(procurarUser);
    procurar = "SELECT idVideo, tipo FROM continue_assistindo WHERE cadastro='" + idcadastro[0].idcadastro + "'";
    const contAssist = await mysql.query(procurar);
    console.log(idcadastro)
    console.log(contAssist)
    result = contAssist;
    //console.log(result);
    res.send(result);
})

continueAssistindo.route('').post(async (req, res) => {
    const idVideo = req.body.idVideo;
    const tipo = req.body.tipo;
    const cadastro = req.body.idcadastro;
    procurar = "SELECT idcadastro, nome, email FROM cadastro WHERE idcadastro='" + cadastro + "'";
    const check = await mysql.query(procurar);
    const idcadastro = check[0].idcadastro;
    console.log(check)
    result = null;
    if (check != '') {
        sql = "INSERT INTO continue_assistindo (idVideo, tipo, cadastro) VALUES ('" + idVideo + "', '" + tipo + "', '" + idcadastro + "')"
        const favoritos = await mysql.query(sql);
        procurarDois = "SELECT * FROM continue_assistindo WHERE idVideo='" + idVideo + "' and tipo like '" + tipo + "' and cadastro= '" + idcadastro + "'";
        const checkFav = await mysql.query(procurarDois);
        result = { favoritos, checkFav };
    }
    res.send(result);
})

continueAssistindo.route('/:iduser/:id').delete(async (req, res) => {
    const idContinueAssistindo = req.params['id'];
    const user = req.params['iduser'];
    procurarUser = "SELECT idcadastro FROM cadastro WHERE idcadastro='" + user + "'";
    const idcadastro = await mysql.query(procurarUser);
    sql = "SELECT * FROM continue_assistindo WHERE idContinueAssistindo = '" + idContinueAssistindo + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
    const checkFav = await mysql.query(sql);
    if (checkFav != '') {
        deletar = "DELETE FROM continue_assistindo WHERE idContinueAssistindo = '" + idContinueAssistindo + "' and cadastro ='" + idcadastro[0].idcadastro + "'";
        const deleta = await mysql.query(deletar);
        console.log(deleta);
        if (deleta != '') {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
})

module.exports = continueAssistindo;