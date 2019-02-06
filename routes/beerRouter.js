const express = require('express');
const Beer = require('../models/beer');

const beerRouter = express.Router();

// Create a beer
beerRouter.post('/', (req, res) => {
    let beer = new Beer();
    beer.name = req.body.name;
    beer.rating = req.body.rating;
    beer.save((err, document) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send(`Saved your ${document}`);
        }
    });
});

// Get all beers
beerRouter.get('/', (req, res) => {
    Beer.find((err, beers) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json(beers);
        }
    })
});

// Get one beer
beerRouter.get('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json(beer);
        }
    })
});

// Update a beer
beerRouter.put('/:beer_id', (req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            beer.name = req.body.name
            beer.rating = req.body.rating
     
            beer.save((err, document) => {
                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.status(200);
                    res.send(`Beer posted!\n${document}`);
                }
            })
        }
    })
 })

// Delete a beer
 beerRouter.delete('/:beer_id', (req, res) => {
    Beer.deleteOne({
        _id: req.params.beer_id
    }, (err) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send('You successfully deleted beer: ' + req.params.beer_id);
        }
    })
 })

 // Catch-all route
beerRouter.use('/', (req, res) => {
    res.send('Beer router is working!');
});

module.exports = beerRouter;