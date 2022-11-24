const express = require('express');
const asmrRouter = express.Router(); 
const asmr = require('../apis/asmr.json');

asmrRouter.route('').get((req, res) => {
    res.send(asmr);
})

asmrRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = asmr.asmr.length
    for (j = 0; j < tamanho; j++) {
        if (asmr.asmr[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = asmr.asmr[j];
        }
    }
    res.send(result)
})

module.exports=asmrRouter;