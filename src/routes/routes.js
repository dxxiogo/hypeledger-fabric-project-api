const { Router } = require('express');
const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
} = require('../controllers/ProductController'); 

const router = Router();

router.get('/produtos', getAllProducts);            

router.post('/produtos', createProduct);              

router.put('/produtoss/:id', updateProduct);           

router.delete('/produtos/:id', deleteProduct);       

router.get('/produtos/:id', getProduct);             

module.exports = router;
