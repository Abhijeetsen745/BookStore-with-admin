import express from 'express'
import 'dotenv/config';
import conn from './conn/conn.js';
import User from './routes/user.js';
import Book from './routes/book.js';
import Favourite from './routes/favourite.js'
import Cart from './routes/cart.js'
import Order from './routes/order.js';
import cors from 'cors'

conn();
const app = express();
app.use(express.json())
app.use(cors())

//routes
app.use('/api',User)
app.use('/api',Book)
app.use('/api',Favourite)
app.use('/api',Cart)
app.use('/api',Order)

app.get('/',(req,res)=>{
    res.send('Hello World')
    
})

//creating port 
app.listen(process.env.PORT || 4000 , ()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);  
})