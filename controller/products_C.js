const {getAll,add,getOne,deleteOne,updateOne} = require('../model/products_M');

async function getAllProducts(req, res) {
    try {
        
        let products = await getAll(req.user.id);
        
        if(products.length == 0){
            return res.status(400).json({message:"no products found"});
        }
        res.status(200).json(products);
        
    } catch (err) {
        res.status(500).json({message:"Server error"});
    }
}


module.exports = {
    getAllProducts,
    //addCategory,
    //getCategory,
    //deleteCategory,
    //updateCategory
};