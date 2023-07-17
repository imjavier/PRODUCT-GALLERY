const express = require('express'); 

const app = express();
const port = 3100;
const hbs= require('hbs');
const endPointIndex = require('./routes/index.routes');
const path = require('path');
const endPointLogin=require('./routes/login.routes');
const endPoint404=require('./routes/404.routes');
 

 


 
//static files
app.use(express.static( path.join(__dirname,'/public'))); 

//handlebars configurations
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname+'/views/partials',(err)=>{});
app.set('views', path.join(__dirname, 'views'));


app.use(endPointIndex);
app.use(endPointLogin);
app.use(endPoint404); 


 
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});