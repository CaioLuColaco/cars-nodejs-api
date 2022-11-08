const express = require('express')
const routes = require("./src/routes")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()

app.use(express.json())
app.use(routes, swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(process.env.PORT || 3000, function(){
    console.log(`SERVER IS RUNNING ON PORT: ${this.address().port}!`)
})