const express = require('express');
const filmesSaudeMentalRouter = express.Router(); 
const filmesSaudeMental = require('../apis/filmes-saude-mental.json');

filmesSaudeMentalRouter.route('').get((req, res) => {
    res.send(filmesSaudeMental);
})

filmesSaudeMentalRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = filmesSaudeMental.filmesSaudeMental.length
    for (j = 0; j < tamanho; j++) {
        if (filmesSaudeMental.filmesSaudeMental[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = filmesSaudeMental.filmesSaudeMental[j];
        }
    }
    res.send(result)
})

module.exports=filmesSaudeMentalRouter;