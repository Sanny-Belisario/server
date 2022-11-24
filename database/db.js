const jwt = require('jsonwebtoken');
async function connect() {
    const mysql = require('mysql2/promise');
    if(global.connection && global.connection.state!=="disconnected"){
        return global.connection;
    }
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "youngoff"
    });
    console.log("Conexão estabelecida");
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

verifyJWT= async (token, perfil)=>{ 
    //console.log(token)
    if (!token){
       resp= { auth: false, message: 'Token não informado.' }; 
    }
    
    jwt.verify(token, 'YoungOff', function(err, decoded) { 
          if (err){
             resp= { auth: false, message: 'Token inválido!' };
          }
          if(decoded){
             resp= {auth:true, idUser:decoded.id};
          }
    });
 
    if(resp.auth){
       sql="SELECT idcadastro, nome, email FROM cadastro WHERE idcadastro="+resp.idUser;
       usuario= await  mysql.query(sql);
       usuario[0].perfil=usuario[0].perfil.split(",");
       if(usuario[0].perfil.indexOf(perfil)<0){
          resp= { auth: false, message: 'Perfil Inválido!' };
       }
    }
    return resp;
 } 

module.exports = {query, verifyJWT}