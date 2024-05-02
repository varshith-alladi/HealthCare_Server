const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const helmet = require('helmet')
require('dotenv').config()

// routers
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const serviceRoutes = require('./routes/service')
const userRoutes = require('./routes/user')
const { accessLogStream } = require('./middlewares/morganMiddleware')

// swagger/openapi
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ElectraMart API",
            version: "1.0.0",
            description: "This is documentation for ElectraMart API",
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              }
            }
          },
          security: [{
            bearerAuth: []
          }],
        servers: [
            {
                url: "http://localhost:5000",
            }
        ]
    },
    apis: ["./controllers/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

// setup the logger
app.use(morgan("tiny", { stream: accessLogStream }));

// database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on ${process.env.PORT}`)
    })
})
.catch((err) => {
   console.log(err.message)
})

// routes
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/services",serviceRoutes)
app.use("/api/users", userRoutes)




