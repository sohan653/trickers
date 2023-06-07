const express=require('express');
const {getTickers} = require("../controllers/ticker");

const router=express.Router();

router.get('/tickers',getTickers)


module.exports=router;