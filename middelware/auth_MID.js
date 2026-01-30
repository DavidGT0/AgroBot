const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function valuesToAdd(req,res,next){
    let {name,email,userName,pass} = req.body;
    if(!name || !email || !userName || !pass){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

function valuesToLogin(req,res,next){
    let {userName,pass} = req.body;
    if(!userName || !pass){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

async function encrypPass(req,res,next){
    try{
        let pass = req.body.pass;
        let hashPass = await bcrypt.hash(pass,10);
        req.pass = hashPass;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

function isLoggedIn(req, res, next) {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({message: "לא מחובר"});
        }
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "לא מחובר"});
    }
}

module.exports = {
    valuesToAdd,
    encrypPass,
    valuesToLogin,
    isLoggedIn
}