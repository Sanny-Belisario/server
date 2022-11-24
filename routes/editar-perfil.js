const express = require('express');
const editarRouter = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('../database/db');

editarRouter.route('').get(async (headers, res) => {
    auth = await mysql.verifyJWT(headers['x-access-token'], headers['perfil']);
    if (auth.idUser) {
        if (headers.iduser == auth.idUser) {
            sql = "SELECT nome, email FROM cadastro where idcadastro = " + auth.idUser;
            const users = await mysql.query(sql);
            result = null;
            if (users[0].idcadastro) {
                result = { user: users[0] }
            }
        } else {
            resp = { "status": "null", auth }
        }
    } else {
        resp = { "status": "null", auth }
    }
    sql = "SELECT nome, email FROM cadastro";
    const users = await mysql.query(sql);
    result = null;
    if (users[0].idcadastro) {
        result = { user: users[0] }
    }
    res.send(result);
})

editarRouter.route('').post(async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senhaN = req.body.senha;
    const senha = md5(senhaN.toString())
    sql = "SELECT idcadastro, nome, email FROM cadastro WHERE email='"
        + email + "' and senha='" + senha + "'";
    const users = await mysql.query(sql);
    result = null;
    if (users[0].idcadastro) {
        const id = users[0].idcadastro;
        var token = jwt.sign({ id }, 'YoungOff', { expiresIn: 1800 });
        console.log("Fez login e gerou token!");
        result = { auth: true, token: token, user: users[0] }
    }
    res.send(result);
})
module.exports = editarRouter;