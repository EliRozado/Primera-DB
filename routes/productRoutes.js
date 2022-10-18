import { Router } from "express";
import { getAllProducts, getProductByID, addProduct, editProduct, deleteProduct} from '../controller/productController.js';
import adminCheck from "../middleware/adminCheck.js";

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductByID)
router.post('/', adminCheck, addProduct)
router.put('/:id', adminCheck, editProduct)
router.delete('/:id', adminCheck, deleteProduct) 

export default router;

