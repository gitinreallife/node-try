module.exports = function(app){
    const bruhs = require('../controller/bruh.controller.js')
    // const _base = require('./_base.route.js')(app, 'bruh')

    // Create a new bruh
    app.post('/api/bruh', bruhs.create)

    //retrieve all bruhs
    app.get('/api/bruhs', bruhs.findAll)

    //retrieve all bruhs by status
    app.get('/api/bruhs/:status', bruhs.findListByStatus)

    //retrieve a single bruh
    app.get('/api/bruh/:bruh_id', bruhs.findById)

    app.get('/api/bruh/filter', bruhs.filter)

    //retrieve a single bruh by email
    app.get('/api/bruh/:email', bruhs.findByEmail)

    //retrieve a single bruh by mobile phone
    app.get('/api/bruh/:mobile_phone', bruhs.findByMobilePhone)

    //update bruh
    app.put('/api/bruh/:bruh_id', bruhs.update)

    //delete bruh
    app.delete('/api/bruh/:bruh_id', bruhs.delete)
}