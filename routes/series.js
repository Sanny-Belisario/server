const express = require('express');
const seriesRouter = express.Router(); 
const series = require('../apis/series.json');

seriesRouter.route('').get((req, res) => {
    res.send(series);
})

seriesRouter.route('/:id').get((req, res) => {
    const requestedId = req.params['id']
    tamanho = series.series.length
    for (j = 0; j < tamanho; j++) {
        if (series.series[j].id == requestedId) {
            //console.log(asmr.asmr[j])
            result = series.series[j];
        }
    }
    res.send(result)
})

module.exports=seriesRouter;