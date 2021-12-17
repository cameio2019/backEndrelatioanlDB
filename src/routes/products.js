import express from 'express';
// import Contenedor from '../classes/Contenedor.js';
import upload from '../services/uploader.js';
import {io} from '../app.js';
import { authAdmin }  from '../utils.js'
import Products from '../services/Products.js'
import { mariadb } from '../config.js'

const router = express.Router();
// const contenedor  = new Contenedor();
const productService = new Products(mariadb, 'products');


//GETS
router.get('/',(req,res)=>{
    productService.getProducts().then(result=>{
        res.send(result);
    })
})
router.get('/:pid',(req,res)=>{
    let id = parseInt(req.params.pid);
    productService.getProdById(id).then(result=>{
        res.send(result);
    })
})
//POSTS
/* router.post('/',upload.single('thumbnail'),authAdmin,(req,res)=>{
    let file = req.file;
    let prod = req.body;
    prod.thumbnail = `${req.protocol}://${req.hostname}:${8080}/uploads/${file.filename}`;
    productService.registrarProd(prod).then(result=>{
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
        })
    }) */

    router.post('/',(req,res)=>{
        let prod = req.body;
        if(!prod.name) return res.send({status:"error",message:"datos incompletos"})
        productService.registrarProd(prod).then(result=>{
            res.send(result);
        })
    })    


router.put('/',(req,res)=>{
    let prod = req.body;
    console.log(prod);
    const id = Number(req.params.id)
    productService.updateProduct(id, product).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

// //PUT
// router.put('/:pid', upload.single("thumbnail"),authAdmin,(req,res)=>{
//     let file = req.file;
//     let id = parseInt(req.params.pid);
//     let prod = req.body;
//     prod.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
//     contenedor.updateProd(id,prod).then(result=>{
//         res.send(result);
//     })
// })

//DELETES
router.delete('/:pid',authAdmin,(req,res)=>{
    let id= parseInt(req.params.pid);
    productService.deleteProdById(id).then(result=>{
        res.send(result)
    })
})
export default router;