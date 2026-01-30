function isValidId(req,res,next){
    let id = parseInt(req.params.id);
    if(isNaN(id) || id <= 0){
        res.status(400).json({message:"ID is not valid"})
    }
    req.id = id;
    next();
}

function valuesToEdit(req,res,next){
    let obj = {};
    if(req.body.name){
        obj.name = req.body.name;
    }
    if(req.body.email){
        obj.email = req.body.email;
    }
    if(req.body.userName){
        obj.userName = req.body.userName;
    }
    let keys = Object.keys(obj);
    if(keys.length === 0){
        return res.status(400).json({message:"חסרים פרמטרים"})
    }

    req.user = obj;
    next();
}

module.exports = {
    isValidId,
    valuesToEdit
}