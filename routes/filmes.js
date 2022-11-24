const express = require('express');
const filmesRouter = express.Router(); 
const filmes = require('../apis/filmes.json');

filmesRouter.route('').get((req, res) => {
    res.send(filmes);
})

filmesRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = filmes.filmes.length
    for (j = 0; j < tamanho; j++) {
        if (filmes.filmes[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = filmes.filmes[j];
        }
    }
    res.send(result)
})

module.exports=filmesRouter;