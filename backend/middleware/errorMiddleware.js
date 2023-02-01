module.exports = function(err, req, res, next) {
    console.log(err);
    
    if(!err) return next();

    res.status(err.status).json({
        message: err.message,
     })
 };