const db = require('../config/db.config.js')
const Op =  db.Sequelize.Op

module.exports = Base
function Base(value){
    this.Model = db[`${value}`]
    this.modelName = value
    console.log('-----baseconstructor')
    console.log(this.modelName)
}
Base.prototype.getAllConstructor = function(){
    console.log('----getbaseconst')
    return{
        bruh: "-------------",
        modelName: this.modelName == undefined ? "undefined" : this.Model
    }
}
// FETCH all objects or filter
Base.prototype.findAll = (req, res, next) => {
    console.log('---basefindAll')
    console.log(this.modelName)
    return res.send({
            bruh: "-------------",
            modelName: this.modelName == undefined ? "undefined" : this.Model
        })
    


    // conditions haven't been tested yet
    var conditions = {}
    for(var param in req.query){
        if (req.query.hasOwnProperty(param) && req.query[param] != '' ) {
            conditions[param] = {
                [Op.like]: `%${req.query[param]}%`
            }
        }
    }
    var filters = Object.keys(conditions).length > 0 ? {where: conditions} : {}
    console.log('+++++++++++')
    console.log(this.modelName)
    console.log('+++++++++++')


    this.Model.findAll(filters).then(objects => {
        //send all objects to the client
        res.send(objects)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}


// exports.initClass = (repo) =>{
//     var base = loadClass('Pool')
//     Model = db[`${repo}`]
// }

function create(req, res, next) {
    obj = {}

    //save to MySQL database
    for(key in req.body){
        obj[`${key}`] = req.body[`${key}`]
    }
    Model.create(obj).then(result=> {
        // send created result to client
        res.send(result)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating Model."
        })
    })
}

//FETCH by ID
findById = (req, res, next) => {
    Model.findOne({where: {id: req.params.id}}).then(object => {
        res.send(object)
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving object with id = " + req.params.id
          })
    })
}


update = (req, res, next) => {
    var obj = req.body
    const id = req.params.id
    Model.update( obj, { where: {id: id} 
    }).then(() => {
        res.status(200).send(obj)
    }).catch(err => {
         res.status(500).send({
            message: err.message || `Some error occurred while updating ${modelName} with id = `+ id
        })
    })
}

deleteFunction = (req, res) => {
    const id = req.params.id
    Model.update({
        status: 'DELETED',
        updated_at: new Date()
    }, {
       where: {id: req.params.id} 
    }).then(() => {
        res.status(200).send("Deleted successfully")
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}

// module.exports = initClass
// module.exports = {
//     initClass: initClass,
//     db: db,
//     Op: Op,
//     Model: Model,
//     create: create,
//     update: update,
//     delete: deleteFunction,
//     // findAll: findAll,
//     findById: findById
// }