const express = require('express');
const loginRouter = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('../database/db')
/* GET users listing. */
loginRouter.route('').post(async (req, res) => {
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
module.exports = loginRouter;