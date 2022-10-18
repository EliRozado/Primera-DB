import knex from "knex";

class DBContainer {
    // get, post, put, delete

    constructor(config, tabla){
        this.knex = knex(config);
        this.table = tabla;
    }

    async getAll(){
        try{
            return await this.knex.select('*').from(this.table);
        }catch(e){
            throw new Error(e)
        }
    }

    async getProductById(id){
        try{
            return await this.knex.select('*').from(this.table).where({id});
        }catch(e){
            throw new Error(e)
        }
    }

    async addProduct(product){
        try{
            return await this.knex.insert(product).into(this.table);
        }catch(e){
            throw new Error(e)
        }
    }

    async editProduct(product, id){
        try {
            return await this.knex.from(this.table).where('id', id).update(product);
        } catch(e) {
            throw new Error(e)
        }
    }

    async deleteProduct(id){
        try {
            return await this.knex.from(this.table).where({id}).del();
        } catch(e) {
            throw new Error(e)
        }
    }
}

export default DBContainer;