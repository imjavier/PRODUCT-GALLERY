const express= require('express');
const router= express.Router();

router.get('*', (req,res)=>{
    res.send('404| Page not found');
});

module.exports=router;