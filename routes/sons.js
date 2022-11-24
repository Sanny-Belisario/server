const express = require('express');
const sonsRouter = express.Router(); 
const sons = require('../apis/sons.json');

sonsRouter.route('').get((req, res) => {
    res.send(sons);
})

sonsRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = sons.sons.length
    for (j = 0; j < tamanho; j++) {
        if (sons.sons[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = sons.sons[j];
        }
    }
    res.send(result)
})

module.exports=sonsRouter;