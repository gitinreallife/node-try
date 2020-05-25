const db = require('../config/db.config.js')
const Bruh = db.bruhs

//Create and save a bruh
exports.create = (req, res) => {

    //save to MySQL database
    Bruh.create({
        name: req.body.name,
        mobile_phone: req.body.mobile_phone,
        email: req.body.email,
        address: req.body.address
    }).then(bruh=> {
        // send created bruh to client
        res.send(bruh)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating Bruh."
        })
    })
}

// FETCH all bruhs or filter
exports.findAll = (req, res) => {
    var conditions = {}
    for(var param in req.query){
        if (req.query.hasOwnProperty(param) && req.query[param] != '' ) {
            conditions[param] = {
                [Op.like]: `%${req.query[param]}`
            }
        }
    }
    var filters = Object.keys(conditions).length > 0 ? {where: conditions} : {}

    Bruh.findAll(filters).then(bruhs => {
        //send all bruh to the client
        res.send(bruhs)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}

//FETCH by ID
exports.findById = (req, res)=> {
    Bruh.findOne({where: {id: req.params.bruh_id}}).then(bruh => {
        res.send(bruh)
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving bruh with id = " + req.params.bruh_id
          })
    })
}

//FETCH by email
exports.findByEmail = (req, res)=> {
    Bruh.findOne({
        where: {
            email: req.params.email
        }
    }).then(bruh => {
        if(bruh === null){
            res.status(404).send("Error bruh not found with email: "+ req.params.email)
        }else{
            res.send(bruh)    
        }
    }).catch(err => {
        res.status(500).send({
            message: "(500) Error retrieving bruh with email = " + req.params.email
          })
    })
}

//FETCH by phone number
exports.findByMobilePhone = (req, res)=> {
    Bruh.findOne({
        where: {
            mobile_phone: req.params.mobile_phone
        }
    }).then(bruh => {
        if(bruh === null){
            res.status(404).send("(404)Error bruh not found with phone number: "+ req.params.email)
        }else{
            res.send(bruh)    
        }
    }).catch(err => {
        res.status(500).send({
            message: "(500) Error retrieving bruh with Phone Number = " + req.params.mobile_phone
          })

    })
}

// update a bruh
exports.update = (req, res) => {
    var bruh = req.body
    const id = req.params.bruh_id
    Bruh.update( bruh, { where: {id: id} 
    }).then(() => {
        res.status(200).send(bruh)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while updating bruh with id = "+ id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.bruh_id
    Bruh.update({
        status: 'DELETED',
        updated_at: new Date()
    }, {
       where: {id: req.params.bruh_id} 
    }).then(() => {
        res.status(200).send(bruh)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}


// FETCH list bruhs by status
exports.findListByStatus = (req, res) => {
    Bruh.findAll({
        where: {
            status: req.params.status
        }
    }).then(bruhs => {
        //send all bruh to the client
        res.send(bruhs)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}

// Filter list bruhs by status
exports.filter = (req, res) => {
    Bruh.findAll({
        where: {
            status: req.params.status
        }
    }).then(bruhs => {
        //send all bruh to the client
        res.send(bruhs)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}
