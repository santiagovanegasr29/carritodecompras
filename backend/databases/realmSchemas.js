const Realm = require('realm')
const PRODUC_SCHEMA = "Product"
const Promise = require('promise');

const productSchema = {
    name: PRODUC_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        price: 'string'
    }
}
const databaseOptions = {
    path: 'RealmInNodeJS.realm',
    schema: [productSchema],

}
insertNewProduct = newProduct => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PRODUC_SCHEMA, newProduct)
            resolve(newProduct)
        })

    }).catch((error) => reject(error))

})
findAllProduct = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allProduct = realm.objects(PRODUC_SCHEMA)
        resolve(allProduct)
    }).catch((error) => {
        reject(error)
    })

})

module.exports = {
    insertNewProduct,
    findAllProduct
}


// findAllProduct().then((allProduct) => {
//     console.log(`allProduct = ${JSON.stringify(allProduct)}`)

// })