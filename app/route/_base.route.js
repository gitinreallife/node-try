module.exports = function(app, path){
    // Create a new bruh
    app.post(`/api/${path}`, bruhs.create)
}