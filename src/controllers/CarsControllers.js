const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async create(req, res) {
        try {

            const {marca, model, color, yearFabrication, yearModel} = req.body

            const verification = await prisma.cars.findMany({ where: {marca: marca, model: model, color: color, yearFabrication: yearFabrication, yearModel: yearModel }})

            if(verification.length != 0) {
                return res.status(400).json({status: 400, message: "Carro já cadastrado!"})
            }

            const result = await prisma.cars.create({
                data: {
                    marca: marca,
                    model: model,
                    color: color,
                    yearFabrication: yearFabrication,
                    yearModel: yearModel
                }
            })
            
            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {
            const carId = parseInt(req.params.id)
            const currentCar = await prisma.cars.findUnique({ where: { id: carId } })
            
            const {marca, model, color, yearFabrication, yearModel} = req.body
            const result = await prisma.cars.update({
                where: {
                    id: carId
                },
                data: {
                    marca: marca || currentCar.marca ,
                    model: model || currentCar.model,
                    color: color || currentCar.color,
                    yearFabrication: yearFabrication || currentCar.yearFabrication,
                    yearModel: yearModel || currentCar.yearModel
                }
            })

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async delete(req, res) {
        try {
            const carId = parseInt(req.params.id)

            const result = await prisma.cars.delete({
                where: {
                    id: carId
                }
            })
            
            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async find(req, res) {
        try {

            const carId = parseInt(req.params.id)

            const result = await prisma.cars.findUnique({where: {id: carId}})
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res) {
        try {

            const result = await prisma.cars.findMany()

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

}