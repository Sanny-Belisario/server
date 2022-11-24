const express = require('express');
const meditacoesRouter = express.Router(); 
const meditacoes = require('../apis/meditacoes.json');

meditacoesRouter.route('').get((req, res) => {
    res.send(meditacoes);
})

meditacoesRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = meditacoes.meditacoes.length
    for (j = 0; j < tamanho; j++) {
        if (meditacoes.meditacoes[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = meditacoes.meditacoes[j];
        }
    }
    res.send(result)
})

module.exports=meditacoesRouter;