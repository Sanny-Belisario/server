const express = require('express');
const tecnicasPanicoRouter = express.Router(); 
const tecnicasPanico = require('../apis/tecnicas-panico.json');

tecnicasPanicoRouter.route('').get((req, res) => {
    res.send(tecnicasPanico);
})

tecnicasPanicoRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = tecnicasPanico.tecnicasPanico.length
    for (j = 0; j < tamanho; j++) {
        if (tecnicasPanico.tecnicasPanico[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = tecnicasPanico.tecnicasPanico[j];
        }
    }
    res.send(result)
})

module.exports=tecnicasPanicoRouter;