const db = require('../config/db_config');

// הפונקציה מחזירה את כל הקטגוריות מהטבלה "categories"
async function getAll(user_id) {
    let sql = 'SELECT * FROM products WHERE user_id = ?';
    let [rows]= await db.query(sql,[user_id]);
       
  return rows;
} 


module.exports = {
    getAll,
    //add,
    //getOne,
    //deleteOne,
    //updateOne
    
};