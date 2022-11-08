const express = require('express')

const routes = express.Router()

const CarsController = require('./controllers/CarsControllers')

// Imoveis
routes.get('/car',           CarsController.findAll)
routes.get('/car/:id',       CarsController.find)
routes.post('/car',          CarsController.create)
routes.put('/car/:id',       CarsController.update)
routes.delete('/car/:id',    CarsController.delete)

module.exports = routes;