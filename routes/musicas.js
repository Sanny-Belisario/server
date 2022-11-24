const express = require('express');
const musicasRouter = express.Router(); 
const musicas = require('../apis/musicas.json');

musicasRouter.route('').get((req, res) => {
    res.send(musicas);
})

musicasRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = musicas.musicas.length
    for (j = 0; j < tamanho; j++) {
        if (musicas.musicas[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = musicas.musicas[j];
        }
    }
    res.send(result)
})

module.exports=musicasRouter;