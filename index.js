const express=require('express');
const mongoose=require('mongoose');
const {fetchAndStoreData} = require("./controllers/ticker");
const router = require("./routes/ticker");
const path = require("path");

const app=express();
require('dotenv').config()

app.use(router);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const PORT=process.env.PORT || 4000

fetchAndStoreData();
setInterval(fetchAndStoreData,360000)

mongoose.connect(process.env.URI).then(
    app.listen(PORT,()=>{
        console.log(`Server listening on ${PORT}`)
    })
).catch(e => console.log(e))

