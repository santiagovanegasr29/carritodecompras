const express = require('express')
const app = express()
const { insertNewProduct, findAllProduct } = require('../databases/realmSchemas')



app.get('/get', (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    findAllProduct().then(allProduct => {
        console.log("hola")
        response.send({
            status: "success",
            message: "pruduct esuccessfully",
            date: JSON.stringify(allProduct)
        })


    }).catch((error) => {
        response.send({
            status: "failed",
            message: `Insert Product error: ${error}`
        })


    })

})

app.post('/insert', (request, response) => {
    const { name, price, id } = request.body
    response.setHeader('Content-Type', 'aplication/json');

    insertNewProduct({ name, price, id }).then(insertedProduct => {
        response.send({
            status: "seccess",
            message: `Insert new Product successfully`,
            data: insertedProduct
        })
    }).catch((error) => {
        response.send({
            status: "failed",
            message: `Insert Product error: ${error}`
        })


    })
})

module.exports = {
    app
}