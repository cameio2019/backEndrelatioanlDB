// import database from "../config.js";

export default class Products{
    constructor(database, table){
        this.database = database
        this.table = table

        if (table ==='products'){
        this.database.schema.hasTable('products').then(result=>{
            if(!result){
                this.database.schema.createTable('products',table=>{
                    table.increments();
                    table.string('name').notNullable();
                    table.string('title').notNullable();
                    table.string('description').notNullable();
                    table.float('price').notNullable();
                    table.integer('stock').notNullable().defaultTo(200);
                    table.string('code').notNullable();
                    table.string('thumbnail').notNullable();
                    table.timestamps(true,true);
                }).then(result=>{
                    console.log("Tabla de Productos creada correctamente.");
                })
            }
        })
    }else if (table === 'chats') {
        this.database.schema.hasTable('chats').then(result => {
            if (!result) {
                this.database.schema.createTable('chats', table => {
                table.increments()
                table.string('email').notNullable()
                table.string('message').notNullable()
                table.timestamps(true, true)
                }).then(result => {
                console.log('Tabla chat creada correctamente.')
            })
            }
        })
    }
}
    
    
    getProducts = async () =>{
        try{
            let products = await this.database.select().table('products');
            return {status:"success",payload:products}
        }catch(error){
            return {status:"error",message:error}
        }
    }
    getProdById = async (id) =>{
        try{
            let prod = await this.database.select().table('products').where('id',id).first();
            if(prod){
                return {status:"success",payload:prod}
            }else{
                return {status:"error",message:"No se encuentra el ID."}
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }
    registrarProd = async (prod) =>{
        try{
            let existe = await this.database.select().table('products').where('name',prod.name).first();
            if(existe) return {status:"error",message:"El producto ya existe."}
            let result = await this.database.table('products').insert(prod);
            return {status:"success",payload:`Producto creado con el id: ${result[0]}`}
        }catch(error){
            console.log(error);
            return {status:"error", message:error}
        }
    }

    async updateProduct (id, prod) {
        try {
            const update = await this.database.update(prod).table('products').where('id', id)
            if (!update) throw new Error('No es posible actulizar el producto.')
            return { status: 'success', payload: 'Producto actulizado correctamente.' }
        } catch (err) {
            console.log(`Error: ${err}`)
            return { status: 'error', message: err.message }
        }
    }
    
    async deleteProdById (id) {
        try {
            const deleted = await this.database.del().table('products').where('id', id)
            if (!deleted) throw new Error('Error al intentar eliminar el producto.')
            return { status: 'success', payload: 'Producto eliminado correctamente.' }
        } catch (err) {
            console.log(`Error: ${err}`)
            return { status: 'error', message: err.message }
        }
}
    
    async saveMessage (message) {
        try {
            await this.database.insert(message).table('chats')
            return { status: 'success', payload: 'Chat guardado correctamente.' }
        } catch (err) {
            console.log(`Error: ${err}`)
            return { status: 'error', message: err.message }
        }
    }
    
    async getMessages () {
        try {
            const chats = await this.database.select().table('chats')
            return { status: 'success', payload: chats }
        } catch (err) {
            console.log(`Error: ${err}`)
            return { status: 'error', message: err.message }
        }
    }
}