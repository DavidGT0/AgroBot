const db = require("../config/db_config");

async function getAll(userId) {
    let sql = `SELECT * FROM categoris WHERE user_id = ?`;
    let [rows] = await db.query(sql, [userId]);
    return rows;
}

async function getBycategoriesName(vegetables_or_fruits, userId) {
    let sql = `SELECT * FROM categoris WHERE vegetables_or_fruits = ? AND user_id = ?`;
    let [result] = await db.query(sql, [vegetables_or_fruits, userId]);
    return result[0];
}

async function add(vegetables_or_fruits, userId) {
    let sql = `INSERT INTO categoris (vegetables_or_fruits, user_id) VALUES (?, ?)`;
    let [result] = await db.query(sql, [vegetables_or_fruits, userId]);
    return result.insertId;
}

async function getOne(id, userId) {
    let sql = `SELECT * FROM categoris WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [id, userId]);
    return result[0];
}

async function deleteCategoryFromDB(id, userId) {
    const sqlProducts = 'DELETE FROM products WHERE category_id = ? AND user_id = ?';
    await db.query(sqlProducts, [id, userId]);
    const sqlCategory = 'DELETE FROM categoris WHERE id = ? AND user_id = ?';
    let [result] = await db.query(sqlCategory, [id, userId]);

    return result;
}

async function update(id, userId, vegetables_or_fruits) {
    let sql = `UPDATE categoris SET vegetables_or_fruits = ? WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [vegetables_or_fruits, id, userId]);
    return result.affectedRows;
}

module.exports = {
    getAll,
    getBycategoriesName,
    add,
    getOne,
    deleteCategoryFromDB,
    update
};