
const getInput=()=>{
    let identification=document.getElementById('identification').value;
    let password=document.getElementById('password').value;
    let credenciales={
        identification:identification,
        password:password
    };
    fetch('/login',{
        method:'POST',
        headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credenciales)
    })

    .then((res)=>{
     
        console.log(res)
        if(res.ok){
            console.log(res.url)
            console.log(`ruta correcta ${res.url}`)
            window.location.href= `${res.url}`;
            return res.json();
        }else{
       
            const errorCredenciales= document.createElement('h5');     
            errorCredenciales.style.fontFamily='sans-serif';
            errorCredenciales.innerText='Credenciales incorrectas';
            errorCredenciales.setAttribute('id', 'credenciales');
            const divLogin= document.getElementById('divLogin');
            divLogin.appendChild(errorCredenciales);
            
            console.log(`ruta incorrecta ${res.url}`);
            throw new Error('Error en la solicitud');
        }
    })
.catch((err)=>{
    console.log(err)

    });
}


 
 