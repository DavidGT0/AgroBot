const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT id,name,email,userName FROM users`;
    let [rows] = await db.query(sql);
    return rows;
}

async function getOne(id){
    let sql = `SELECT id,name,email,userName FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);
    return result[0];
}

async function remove(id){
    await db.query(`DELETE FROM tasks WHERE user_id = ?`, [id]);

    await db.query(`DELETE FROM categories WHERE user_id = ?`, [id]);

    let sql = `DELETE FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);
    return result.affectedRows;
}

async function update(id,user){
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set = keys.map(k=>`${k}=?`).join(',');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    let [result] = await db.query(sql,[...values,id]);
    return result.affectedRows;
}

async function getByUserName(userName){
    let sql = `SELECT * FROM users WHERE userName = ?`;
    let [result] = await db.query(sql,[userName]);
    return result[0];
}

async function getByEmail(email){
    let sql = `SELECT * FROM users WHERE email = ?`;
    let [result] = await db.query(sql,[email]);
    return result[0];
}

async function addUser({name,email,userName,pass}){
    let sql = `INSERT INTO users (name,email,userName,pass) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql,[name,email,userName,pass]);
    return result.insertId;
}

module.exports ={
    getAll,
    getOne,
    remove,
    update,
    getByUserName,
    getByEmail,
    addUser
}