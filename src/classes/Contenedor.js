import fs from 'fs';
import __dirname from '../utils.js';

const prodUrl = __dirname+'/files/products.txt'

class Contenedor{
    async registrarProd(product){
    //     try{
    //         let data = await fs.promises.readFile(prodUrl,'utf-8');
    //         let products = JSON.parse(data);
    //         let id = products[products.length-1].id+1;
    //         prod =Object.assign({id:id},prod);
    //         products.push(prod)
    //         try{
    //             await fs.promises.writeFile(prodUrl,JSON.stringify(products,null,2));
    //             return {status:"success",message:"Producto registrado"}
    //         }catch{
    //             return {statis:"error",message:"Producto no registrado"} 
    //         }
    //     }catch{
    //         prod = Object.assign({id:1},prod)
    //         try{
    //             await fs.promises.writeFile(prodUrl,JSON.stringify([prod],null,2));
    //             return {status:"success", message:"Producto registrado."}
    //         }
    //         catch{
    //             return {status:"error",message:"Producto no registrado."}
    //         }
    //     }
    // }

    let idAsignado = 0;
    try {
        let data = await fs.promises.readFile(prodUrl, "utf-8");
        let products = JSON.parse(data);
        console.log(products);
        if (
        products.some(
        (prod) =>
            prod.name.toLowerCase() === product.name.toLowerCase() ||
            product.code === prod.code
        )
    ) {
        return { status: "error", message: "El producto ya existe." };
    } else {
        let producto = {
            id: products[products.length - 1].id + 1,
            timestamp: product.timestamp,
            name: product.name,
            description: product.description,
            code: product.code,
            price: product.price,
            thumbnail: product.foto,
            stock: product.stock,
        };
        products.push(producto);
        try {
            await fs.promises.writeFile(
            productsURL,
            JSON.stringify(products, null, 2)
        );
            idAsignado = producto.id;
        return {
            status: "success",
            message: "Producto añadido exitosamente. ID: " + idAsignado,
        };
        } catch (error) {
            return {
            status: "error",
            message: "Error al intentar añadir el producto: " + error,
            };
        }
    }
    } catch (error) {
    console.log(error);
    let producto = [
        {
            id: products[products.length - 1].id + 1,
            timestamp: product.timestamp,
            name: product.name,
            description: product.description,
            code: product.code,
            price: product.price,
            thumbnail: product.thumbnail,
            stock: product.stock,
        },
];
        try {
        await fs.promises.writeFile(
            productsURL,
            JSON.stringify(producto, null, 2)
        );
        return {
            status: "success",
            message: "Producto añadido exitosamente. ID: 1",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Error al intentar añadir el producto:" + error,
        };
    }
}
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            return {status:"success",payload:products}
        }catch{
            return {status:"error",message:"Error al obtener los productos solicitados."}
        }
    }
    async getProdById(id){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            let prod = products.find(p => p.id===id)
            if(prod){
                return {status:"success", payload:prod}
            }else{
                return {status:"error",message:"Producto encontrado."}
            }
        }catch{
            return {status:"error",message:"Producto no encontrado."}
        }
    }


    async updateProd(id,body){
        // try{
        //     let data = await fs.promises.readFile(prodUrl,'utf-8');
        //     let products = JSON.parse(data);
        //     if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No hay productos con el ID solicitado."}
        //     let result = products.map(prod=>{
        //         if(prod.id===id){
        //             if(prod){
        //                 body = Object.assign(body,{title:prod.title, price:prod.price, thumbnail:prod.thumbnail, timestamp: product.timestamp, description: product.description, code: product.code,  stock: product.stock})
        //                 body = Object.assign({id:prod.id,...body});
        //                 return body;
        //             }
        //             else{
        //                 body = Object.assign({id:id,...body})
        //                 return body;
        //             }
        //         }else{
        //             return prod;
        //         }
        //     })
        //     try{
        //         await fs.promises.writeFile(prodUrl,JSON.stringify(result,null,2));
        //         return {status:"success", message:"Producto actualizado."}
        //     }catch{
        //         return {status:"error", message:"Error al actualizar el producto."}
        //     }
        // }catch(error){
        //     return {status:"error",message:"Error al actualizar el producto: "+error}
        // }
        try {
            let data = await fs.promises.readFile(prodUrl, "utf-8");
            let products = JSON.parse(data);
            if (!products.some((pr) => pr.id === id))
                return {
                status: "error",
                message: "Ningún producto con el id especificado",
            };
            let result = products.map((product) => {
                if (product.id === id) {
                console.log(body);
                body = Object.assign({ id: id, ...body });
                return body;
            } else {
                return prod;
            }
            });
            try {
                await fs.promises.writeFile(
                prodUrl,
                JSON.stringify(result, null, 2)
                );
            return { status: "success", message: "Producto actualizado correctamente." };
            } catch {
            return { status: "error", message: "Error al actualizar el producto." };
            }
        } catch (error) {
            return {
                status: "error",
                message: "Fallo al actualizar el producto: " + error,
            };
}
    }
    async deleteProd(id){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No se encuentra el ID solicitado."}
            let prod = products.find(p=>p.id===id);
            if(prod){
                try{
                    let prodData = await fs.promises.readFile(prodUrl,'utf-8');
                    let products = JSON.parse(prodData);
                    products.forEach(prod=>{
                        if(prod.id===id){
                            delete prod['prod']
                        }
                    })
                    await fs.promises.writeFile(prodUrl,JSON.stringify(products,null,2));
                }catch(error){
                    return {status:"error", message:"Error al eliminar el producto: "+error}
                }
            }
            let prodtest = products.filter(p=>p.id!==id);
            try{
                await fs.promises.writeFile(prodUrl,JSON.stringify(prodtest,null,2));
                return {status:"success",message:"Producto eliminado."}
            }catch{
                return {status:"error", message:"Producto no eliminado."}
            }
        }catch{
            return {status:"error", message:"Error al eliminar el producto."}
        }
    }

    //Carrito
    //crear carrtio ok
    async crearCarrito(){
        try{
        let data =await fs.promises.readFile('./files/carrito.txt','utf-8');
        let nCart=JSON.parse(data);           
        let nId = nCart[nCart.length-1].id+1;            
        if (nCart.some(res=>res.id===nId)){ 
            return {status:"error",message:"Error..Carrito repetido. "}
        }else{
            let timestamp = Date.now();
            let time = new Date(timestamp);
            let cart = {
                id:nId,
                timestamp:time,
                products:[]
            }                                
            nCart.push(cart);
            try{
                await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(nCart,null,2));                                        
                return {status:"success",message:`Carrito creado satisfactoriamente con el ID ${cart.id}`}

            }catch(err){
                return {status:"error",message:"No se pudo crear el carrito solicitado :("}
            }
        }             
    }catch{             
        let timestamp = Date.now();
        let time = new Date(timestamp);
        let cart = {
            id:1,
            timestamp:time,
            products:[]                
        }    
        try {
            await fs.promises.writeFile('./files/carrito.txt',JSON.stringify([cart]),null,2) 
            return {status:"success",message:`Carrito creado satisfactoriamente con el ID ${cart.id}`}
        }catch(err){
            return {status:"error",message:"No se pudo crear el archivo"}
        }
    }
}

    //mostrar el carrito    OK
    async getCarrito(){
        try{
            const data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            return {status:"success", payload:carrs}
        }catch{
            return {status:"error",message:"Error al obtener los carritos solicitados."}
        }
    }

    //mostrar carrito por ID OK
    async getCarrById(id){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            let carr = carrs.find(c => c.id===id)
            // const products = carr.products
            if(carr){
                return {status:"success", payload:carr}
            }else{
                return {status:"error",message:"Carrito no encontrado."}
            }
        }catch{
            return {status:"error",message:"Error al obtener tu carrito."}
        }
    }

    //add Prod al carrito
    async addProd(cid,pid){
    //     try{
    //         let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
    //         let nCartArray = JSON.parse(data); 
    //         if(!nCartArray.some(cart=>cart.id===cid)) return {status:"error", message:"No existe el carrito con id solicitado."}
    //     let result = nCartArray.map(cart=>{                
    //         if(cart.id===cid){     
    //             let cartProduct = cart                   
    //             cartProduct = Object.assign(cartProduct,{timestamp:cartProduct.timestamp,products:[...cartProduct.products,pid]})                    
    //             cartProduct = Object.assign({...cartProduct,id:cart.id})                    
    //             return cartProduct                    
    //         }else{                                 
    //             return cart;
    //         }
    //     })
    //     try{
    //         await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(result,null,2));
    //         return {status:"success", message:"Producto agregado al carrito."}
    //     }catch{
    //         return {status:"error", message:"Error al agregar el producto solicitado al carrito."}
    //     }
    // }catch(err){
    //     return {status:"error",message:"Error al agregar un producto al carrito."}
    // }

    try {
        let data = await fs.promises.readFile('./files/carrito.txt', "utf-8");
        let carts = JSON.parse(data);
        let pid = await Contenedor
            .getProdById(pid)
            .then((result) => {
            return result.products;
        });
        if (!carts.some((cart) => cart.id === cid))
            return {
            status: "error",
            message: "Ningún carrito con el id especificado",
        };
        let result = carts.map((c) => {
        if (c.id === cid) {
            let cartProducts = Object.assign({
                id: c.id,
                timestamp: c.timestamp,
                products: pid,
            });
            return cartProducts;
        } else {
            return c;
        }
        });
        try {
            await fs.promises.writeFile('./files/carrito.txt', JSON.stringify(result, null, 2));
            return {
            status: "success",
            message: "Productos agregados.",
            pid,
        };
        } catch {
        return { status: "error", message: "Error al agregar los productos solicitados." };
        }
    } catch (error) {
        return {
            status: "error",
            message: "Fallo al actualizar el producto: " + error,
        };
}
}

    async getProdBycart(id) {
        // try {
        //     let data = await fs.promises.readFile("./files/carrito.txt","utf-8")
        //     let carts = JSON.parse(data)
        //     const cart = carts.find(c=> c.id == id)
        //     if (cart) {
        //         if(cart.products.length>0) {
        //             return {status:"success", message:"Productos del carrito solicitado.", payload: cart.products}
        //         } else {
        //             return {status:"error", message:"El carrito se encuentra vacio."}
        //         }
        //     } else {
        //         return {status:"error", message:"Error No se encontró el carrito"}
        //     }
        // } catch (err) {
        //     return {status:"error", message: "No se pudo encontrar el carrito: "+err}
        // }

        try {
            let data = await fs.promises.readFile(cartURL, "utf-8");
            let carts = JSON.parse(data);
            let cart = carts.find((cart) => cart.id === cid);
            return cart
                ? { status: "success", products: cart.products }
                : { status: "error", product: null };
        } catch (error) {
            return {
                status: "error",
                message: "Error al intentar buscar el producto: " + error,
            };
            }
    }  

    //actulizar carrito
    async updateCart(id,body){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            if(!carrs.some(carr=>carr.id===id)) return {status:"error", message:"No hay ningún carrito asigando a ese Id."}
            let result = carrs.map(carr=>{
                if(carr.id===id){
                    if(carr.posProd){
                        body = Object.assign(body,{posProd:true,prod:carr.prod})
                        body = Object.assign({id:carr.id,...body})
                        return body
                    }
                    else{
                        body = Object.assign(body,{posProd:false})
                        body = Object.assign({id:carr.id,...body})
                        return body;
                    }
                }else{
                    return carr;
                }
            })
            try{
                await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(result,null,2));
                return {status:"success", message:"Carrito actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar el carrito (:"}
            }
        }catch{
            return {status:"error",message:"Fallo al actualizar el carrito"}
        }
    }

    //borrar carrito por id ok
    async deleteCarritoId(id){
        try{
            let nCart = JSON.parse(data); 
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let cart = nCart.find(res=>res.id===id);
            if (cart){
                let nCartUpdate = nCart.filter((p)=>p.id!=id)                           
                await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(nCartUpdate),null,2)                 
                return {status:"success",message:"El carrito fue eliminado."} 
            }else{
                return {status:"error",message:"No existe el carrito ha eliminar."}           
            }         
        }catch(err){
            return {status:"error",message:"Error al querer eliminar el carrito."}
        }
    }
//borrar todos los carritos ok
    async delAllCart(){
        try{
            await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(''),null,2);
            return {status:"success",message:"Carritos solicitados eliminados."}         
        }catch(err){
            return {status:"error",message:err}
        }  
    }
}

export default Contenedor;