
/*
 * GET home page.
 */


exports.index = function(req, res){
    res.render('index', { 
        title: process.cwd()
    })
}

exports.phack = function(req,res){
    res.render('phack',{
        photo: req.params.photo
    })
}