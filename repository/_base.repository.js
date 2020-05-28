// Repository is for query helpers, middleware that handles data collecting and transaction

var Model, Schema


exports.init = initRepository(modelName)
exports.getById = findById
exports.getByEmail = findByEmail
exports.getList = findAll
exports.create = create

init = (modelName) => {
    var instance = require(`../model/${modelName}.model`)
    return {
        Model: Model = instance.model,
        Schema: Schema = instance.schema
    }
}


create = (obj) => {
    return Model.create(obj).then(result=> {
        res.send(result)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating Model."
        })
    })
}


findById = (id) => {
    return User.findOne({
        where: {id: id}
    })
    // how to handle error
    // .then(object => {
    //     return object
    // }).catch(err => {
    //     return {error: err}
    // })
}

//FETCH by email
findByEmail = (email) => {
    return User.findOne({
        where: { email: email}
    })
}

// FETCH all objects or filter
findAll = (filters) => {
    Model.findAll(filters)
}