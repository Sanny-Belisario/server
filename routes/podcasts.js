const express = require('express');
const podcastRouter = express.Router(); 
const podcasts = require('../apis/podcasts.json');

podcastRouter.route('').get((req, res) => {
    res.send(podcasts);
})

podcastRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = podcasts.podcasts.length
    for (j = 0; j < tamanho; j++) {
        if (podcasts.podcasts[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = podcasts.podcasts[j];
        }
    }
    res.send(result)
})

module.exports=podcastRouter;