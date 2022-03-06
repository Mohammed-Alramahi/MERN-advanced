const serverErrorHandler = (err, req, res, next) => {
    
    const status = err.statusCode || 500;
    const message = err.message || 'Someting went wrong';
    res.status(status).json({
        success: false,
        error: message
    });
}
module.exports=serverErrorHandler;