import DBContainer from "../containers/prodContainer.js";
import MySQLCon from "../config/mysqlConfig.js";

const DB = new DBContainer(MySQLCon, "productos")

export const getAllProducts = async (req,res) => {
    const productos = await DB.getAll();
    res.render('index', {productos})
}

export const getProductByID = async (req,res) => {
    const {id} = req.params;
    const menu = await DB.getProductById(id);
    res.send(menu)
}

export const addProduct = async (req,res) => {
    const {body} = req;
    await DB.addProduct(body);
    res.send(body)
}

export const editProduct = async (req,res) => {
    const {body} = req;
    const {id} = req.params;
    await DB.editProduct(body, id);
    res.send(body)
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    const result = await DB.deleteProduct(id);
    res.send({ result })
}

export default { getAllProducts, getProductByID, addProduct, editProduct, deleteProduct}