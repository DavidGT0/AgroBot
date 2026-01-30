const { getAll, getBycategoriesName, add, getOne, deleteCategoryFromDB, update } = require('../model/categories_M.js');

async function getAllcategories(req, res) {
    try {
        let user_id = req.user.id;
        let categories = await getAll(user_id);

        if (categories.length === 0) {
            return res.status(200).json({ message: "אין לך קטגוריות עדיין", categories: [] });
        }
        res.status(200).json({ message: "ok", categories });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

async function addcategories(req, res) {
    try {
        let vegetables_or_fruits = req.body.vegetables_or_fruits;
        let userId = req.user.id;

        if (!vegetables_or_fruits) {
            return res.status(400).json({ message: "חובה לשלוח שם קטגוריה (vegetables_or_fruits)" });
        }
        let existingCategory = await getBycategoriesName(vegetables_or_fruits, userId);
        if (existingCategory) {
            return res.status(409).json({ message: "כבר יצרת קטגוריה בשם זה" });
        }
        let newCategoryId = await add(vegetables_or_fruits, userId);
        if (!newCategoryId) {
            return res.status(500).json({ message: "שגיאה בשמירת הקטגוריה בדאטה-בייס" });
        }

        res.status(201).json({ message: "נוסף בהצלחה", id: newCategoryId });
    } catch (err) {
        console.error("Error adding category:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getOneCategory(req, res) {
    try {
        let userId = req.user.id;
        let category = await getOne(req.params.id, userId);

        if (!category) {
            return res.status(404).json({ message: "הקטגוריה לא נמצאה או שאינה שייכת לך" });
        }
        res.status(200).json({ message: "ok", category });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const result = await deleteCategoryFromDB(id, userId);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "לא ניתן למחוק: הקטגוריה לא נמצאה או שאינה שייכת לך" });
        }

        res.status(200).json({ message: "הקטגוריה נמחקה בהצלחה" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

async function updateCategory(req, res) {
    try {
        let id = req.params.id;
        let userId = req.user.id;
        let vegetables_or_fruits = req.body.vegetables_or_fruits;

        if (!vegetables_or_fruits) {
            return res.status(400).json({ message: "חובה לשלוח שם קטגוריה לעדכון" });
        }
        let affectedRows = await update(id, userId, vegetables_or_fruits);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "לא ניתן לעדכן: הקטגוריה לא נמצאה או שאינה שייכת לך" });
        }

        res.status(200).json({ message: "הקטגוריה עודכנה בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = {
    getAllcategories,
    addcategories,
    getOneCategory,
    deleteCategory,
    updateCategory,
};