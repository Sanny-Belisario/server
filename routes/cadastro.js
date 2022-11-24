const express = require('express');
const cadastroRouter = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('../database/db')
/* GET users listing. */
cadastroRouter.route('').post(async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senhaN = req.body.senha;
  console.log(nome)
  console.log(email)
  console.log(senhaN)
  const senha = md5(senhaN.toString())
  procurar = "SELECT idcadastro, nome, email FROM cadastro WHERE nome='" + nome + "' and email='"
    + email + "' and senha='" + senha + "'";
  const check = await mysql.query(procurar);
  console.log(check)
  result = null;
  if (check == '') {
    sql = "INSERT INTO cadastro (nome, email, senha) VALUES ('" + nome + "', '" + email + "', '" 
      + senha + "' )"
    const users = await mysql.query(sql);
    sqlDois = "SELECT idcadastro, nome, email FROM cadastro WHERE nome='" + nome + "' and email='"
    + email + "' and senha='" + senha + "'"
    const teste = await mysql.query(sqlDois);
    if (teste[0].idcadastro) {
      const id = teste[0].idcadastro;
      var token = jwt.sign({ id }, 'YoungOff', { expiresIn: 1800 });
      console.log("Se cadastrou e gerou token!");
      result = { auth: true, token: token, user: teste[0] }
    }
  } else {
    result = "Usuário já existe";
  }
  res.send(result);
})
module.exports = cadastroRouter;