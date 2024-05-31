// 1. Crear un servidor con Express en el puerto 3000.
const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);
});

// 2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
const nombres = [
    'Juan',
    'Jocelyn',
    'Astrid',
    'Maria',
    'Ignacia',
    'Javier',
    'Brian'
];

app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios: nombres });
});

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el 
//arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const autorizacion = req.params.usuario; 
    const validacion = nombres;
    validacion.includes (autorizacion)
    ? next ()
    : res.send ('<center><img src="/img/who.jpeg"></center>');
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort. 

app.get('/abracadabra/conejo/:n',(req, res) =>{
    const n = Math.floor(Math.random() * (4)) + 1;
    const numero = req.params.n;
    numero == n
    ? res.sendFile(__dirname + '/assets/img/conejito.jpg')
    : res.sendFile(__dirname + '/assets/img/voldemort.jpg')
});

//6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.

app.get("*",(req,res) =>{
    res.send("<center><h1>Esta página no existe...</h1></center>");
});