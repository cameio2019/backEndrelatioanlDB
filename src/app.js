import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import Contenedor from './classes/Contenedor.js';
import productsRouter from './routes/products.js';
import carritoRouter from './routes/carrito.js';
import upload from './services/uploader.js';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import { authAdmin}  from './utils.js'
import Products from './services/Products.js'
import { sqlite } from './config.js'


const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();

const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server);

const admin = true;
app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use(express.static(__dirname+'/public'));
app.use('/api/products',productsRouter);
app.use('/api/carrito',carritoRouter);

// app.use((req, res) => {
//     const date = new Date().toISOString()
//     console.log(`[${date}] - ${req.method} ${req.path} not found.`)
//     res.status(404).json({ status: 'error', message: 'Not found' })
// })

app.post('/api/carrito',(req,res)=>{
    let carrId = parseInt(req.body.cid);
    let prodId = parseInt(req.body.pid);
    contenedor.addCarito(carrId,prodId).then(result=>{
        res.send(result);
    })
})

// app.post('/api/products',(req,res)=>{
//     let prodId = parseInt(req.body.pid);
//     contenedor.registrarProd(prodId).then(result=>{
//         res.send(result);
//     })
// })
app.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió el archivo."})
    }
    res.send(files);
})


app.get('/view/products',authAdmin, (req,res)=>{
    contenedor.getAll().then(result=>{
        let data = result.payload;
        let preparedObject ={
            products : data
        }
        res.render('products',preparedObject)
    })
})

//socket
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await contenedor.getAll();
    socket.emit('getProd',products);
})

//chat
let messages = [];

io.on('connection',socket=>{
    console.log(`Cliente ${socket.id} se ha conectado`)
    socket.emit('messlog',messages);
    socket.on('message',data=>{
        messages.push(data)
        io.emit('messlog',messages);
    })
})


const products = new Products(sqlite, 'chats')

io.on('connection', socket => {
    console.log('Cliente conectado.')
    products.getMessages().then(result => {
    if (result.status === 'success') {
        io.emit('chats', result.payload)
    }
})
    
socket.on('chats', data => {
    products.saveMessage(data)
        .then(result => console.log(result))
        .then(() => {
        cont.getMessages().then(result => {
            if (result.status === 'success') {
            io.emit('chats', result.payload)
        }
        })
    })
})
})