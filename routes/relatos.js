const express = require('express');
const relatosRouter = express.Router(); 
const relatos = require('../apis/relatos.json');

relatosRouter.route('').get((req, res) => {
    res.send(relatos);
})

relatosRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = relatos.relatos.length
    for (j = 0; j < tamanho; j++) {
        if (relatos.relatos[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = relatos.relatos[j];
        }
    }
    res.send(result)
})

module.exports=relatosRouter;