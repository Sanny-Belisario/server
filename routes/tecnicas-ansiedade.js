const express = require('express');
const tecnicasAnsiedadeRouter = express.Router(); 
const tecnicasAnsiedade = require('../apis/tecnicas-ansiedade.json');

tecnicasAnsiedadeRouter.route('').get((req, res) => {
    res.send(tecnicasAnsiedade);
})

tecnicasAnsiedadeRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = tecnicasAnsiedade.tecnicasAnsiedade.length
    for (j = 0; j < tamanho; j++) {
        if (tecnicasAnsiedade.tecnicasAnsiedade[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = tecnicasAnsiedade.tecnicasAnsiedade[j];
        }
    }
    res.send(result)
})

module.exports=tecnicasAnsiedadeRouter;