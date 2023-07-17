const express=require('express');
const router=express.Router();
const path=require('path');

const conecction=require('../database/conecction'); 
const { json } = require('body-parser');
router.use(express.json());

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/login.html'))
    //res.sendFile(path.join(__dirname,'../public/html/login.html'));  
     
  });

router.post('/login', (req,res)=>{
  
    let identification,password, data;
    
    identification=req.body.identification;
    password=req.body.password;
    let statement=`select * from administrador where cedula='${identification}' and contraseña='${password}'`;
    conecction.query(statement,(err,results)=>{
      if(results.length>0){ 
    
         
 
        res.redirect('/sesion');

      } else{
        
        res.sendStatus(401);
      }

    })

    
 
  
 
  });

 
router.get('/sesion',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/sesion.html'))  
})

//TERMINAR DE CUADRAR MAÑANA
router.post('/sesion/agregar', (req,res)=>{
 
  let referencia=req.body.referencia;
  console.log(referencia)
  let nombre=req.body.nombre;
  let talla=req.body.talla;
  let precio=req.body.precio;
  let muestra=req.body.url;
  console.log( `Esta es la imagen ${muestra}`)

  let statement=`insert into jean values('${referencia}','${nombre}','${talla}','${precio}','1085034314','${muestra}')`
  conecction.query(statement, (err, result)=>{
    if(result.affectedRows>0){
      res.status(200)
      console.log(result)
    }

  })
    
})
router.get('/sesion/productos',(req,res)=>{
  conecction.query('select referencia,nombre,talla,precio, muestra as url from jean',(err,results)=>{
    if(results.length>0){ 
      let resultsJSON=JSON.stringify(results)
 
 
    res.json(results)
      
    } else{
    //res.render(path.join(__dirname,'../views/sesion'),{'datosJeans':'false'})
      
    }
})})

router.delete('/sesion/:id',(req,res)=>{

  let referencia=req.params.id;
  console.log(referencia+' Este es el id a eliminar')
  conecction.query(`delete from jean where referencia='${referencia}'`,(err,result)=>{
   //SI HAY ERROR ESTABLECER 'err' DENTRO DEL CALL BACK

   if(result.affectedRows>0){
      res.status(200)
    }
  });

});

router.patch('/sesion/:id',(req,res)=>{
  let referencia=req.params.id
  let nombre= req.body.nombre 
  let talla= req.body.talla
  let precio= req.body.precio

 console.log(`DATOS A EDITAR DESDE AHORA ${referencia}, ${nombre},${talla},${precio}`)
  let statement=`update jean set nombre='${nombre}', talla='${talla}',precio='${precio}' where referencia='${referencia}'`
  console.log(statement)
  conecction.query( statement,(err,result)=>{
    

  })

})

module.exports=router;  
