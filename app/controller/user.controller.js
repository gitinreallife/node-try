const Bluebird = require('bluebird')
const Util = require('util')
const Base = require('./_base.controller.js')

class User extends Base{
    findAll(req, res, next){
        console.log('thissssssssss')
        console.log(this)
        res.send(this.getAllConstructor())
    }
}
// Util.inherits(User, Base)
module.exports = User

// // FETCH all objects or filter
// User.prototype.findAll = (req, res, next) => {
//     // conditions haven't been tested yet
//     var conditions = {}
//     for(var param in req.query){
//         if (req.query.hasOwnProperty(param) && req.query[param] != '' ) {
//             conditions[param] = {
//                 [Op.like]: `%${req.query[param]}%`
//             }
//         }
//     }
//     var filters = Object.keys(conditions).length > 0 ? {where: conditions} : {}

//     User.findAll(filters).then(objects => {
//         //send all objects to the client
//         res.send(objects)
//     }).catch(err => {
//          res.status(500).send({
//             message: err.message || "Some error occurred."
//         })
//     })
// }




//FETCH by email
exports.findByEmail = (req, res)=> {
    User.findOne({
        where: {
            email: req.params.email
        }
    }).then(user => {
        if(user === null){
            res.status(404).send("Error User not found with email: "+ req.params.email)
        }else{
            res.send(user)    
        }
    }).catch(err => {
        res.status(500).send({
            message: "(500) Error retrieving User with email = " + req.params.email
          })
    })
}

//FETCH by phone number
exports.findByMobilePhone = (req, res)=> {
    User.findOne({
        where: {
            mobile_phone: req.params.mobile_phone
        }
    }).then(user => {
        if(user === null){
            res.status(404).send("(404)Error User not found with phone number: "+ req.params.email)
        }else{
            res.send(user)    
        }
    }).catch(err => {
        res.status(500).send({
            message: "(500) Error retrieving User with Phone Number = " + req.params.mobile_phone
          })

    })
}


// FETCH list users by status
exports.findListByStatus = (req, res) => {
    User.findAll({
        where: {
            status: req.params.status
        }
    }).then(users => {
        //send all user to the client
        res.send(users)
    }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}


