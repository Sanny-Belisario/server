const express = require('express');
const livrosRouter = express.Router(); 
const livros = require('../apis/livros.json');

livrosRouter.route('').get((req, res) => {
    res.send(livros);
})

livrosRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = livros.livros.length
    for (j = 0; j < tamanho; j++) {
        if (livros.livros[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = livros.livros[j];
        }
    }
    res.send(result)
})

module.exports=livrosRouter;