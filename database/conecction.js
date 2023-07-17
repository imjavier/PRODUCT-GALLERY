const mysql=require('mysql');

 
    var conecction=mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',                 
        password: 'abc123',
        database:'rokuzjeans'    
    });

    conecction.connect((error)=>{
        if(error){
            throw error;
        }
        else{console.log('conexión exitosa');}
         
        
    })
   // conecction.query()
     

    


 
module.exports=conecction;