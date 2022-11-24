const express = require('express');
const tecnicasAjudaRouter = express.Router(); 
const tecnicasAjuda = require('../apis/tecnicas-ajuda.json');

tecnicasAjudaRouter.route('').get((req, res) => {
    res.send(tecnicasAjuda);
})

tecnicasAjudaRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = tecnicasAjuda.tecnicasAjuda.length
    for (j = 0; j < tamanho; j++) {
        if (tecnicasAjuda.tecnicasAjuda[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = tecnicasAjuda.tecnicasAjuda[j];
        }
    }
    res.send(result)
})

module.exports=tecnicasAjudaRouter;