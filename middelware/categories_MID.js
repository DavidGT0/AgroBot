function validValues(req, res, next) {
    let vegetables_or_fruits = req.body.vegetables_or_fruits;
    if (!vegetables_or_fruits) {
        return res.status(400).json({ message: "חסרים נתונים: חובה לשלוח vegetables_or_fruits" });
    }
    next();
}

function isValidId(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID is not valid" });
    }

    req.id = id;
    next();
}

module.exports = {
    validValues,
    isValidId
}