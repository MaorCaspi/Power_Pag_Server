const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hello Power Pag!!! :)');
})

module.exports = router