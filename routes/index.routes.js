const express=require('express');
const path= require('path');
const router=express.Router();
const conecction=require('../database/conecction'); 
const { json } = require('body-parser');
router.use(express.json());

router.get('/',(req,res)=>{
    res.redirect('/home')
})

router.get('/home', (req,res)=>{
    

    res.render(path.join(__dirname,'../views/home.hbs'));

});
router.get('/home/catalogo',(req,res)=>{
    conecction.query('select referencia, muestra,nombre,talla,precio from jean',(err,result)=>{
        console.log(result)
         

        
        res.json(result)
    
        

    })
})

router.get('/historia',(req,res)=>{
    res.render(path.join(__dirname,'../views/partials/historia.hbs'));
    


})
router.get('/quienes_somos',(req,res)=>{
    
    res.render(path.join(__dirname,'../views/partials/quienes.hbs'));

})


module.exports=router;