
module.exports =(req,res,next) =>{
    if (req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','You are not authorized to view this page');
        res.redirect('/');
    }
}