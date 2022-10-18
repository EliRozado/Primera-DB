import knex from "knex";

class MSGContainer {
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

    async saveMSG(msg){
        try{
            return await this.knex.insert(msg).into(this.table);
        }catch(e){
            throw new Error(e)
        }
    }
}

export default MSGContainer;