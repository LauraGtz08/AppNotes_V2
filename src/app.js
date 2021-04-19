// CARGAR MÓDULOS QUE REQUERIMOS PARA EL SERVIDOR WEB
const express = require("express")
const notes = require("./notes.js")

//CONSTRUIR SERVIDOR WEB CON "EXPRESS"
//CREAR UN OBJETO APP QUE REPRESENTA LA APP WEB MEDIANTE EL SERVIDOR
const app = express();

//DEFINIR EL PUERTO DE ESCUCHA DEL SERVIDOR
const port = 3000;

//DEFINIR EL MOTOR DE PLANTILLAS
// [SET]:
// 1ER PARÁMETRO: ¿CUÁL ES EL MOTOR DE PLANTILLAS?
// 2DO PARÁMETRO: INDICAR COMO TAL EL MOTOR DE PLANTILLAS
app.set("view engine", "ejs")
//INDICAR QUE ES UN DIRECTORIO ESTÁTICO QUE SE ENCUENTRA EN "VIEWS"
//app.use(express.static(__dirname+"/views"))
// VA AL PUNTO [2]

//[GET]:
// PETICIÓN QUE VA A RECIBIR UNA RUTA, LA CUAL SERÁ EL INDEX.EJS
//DEFINIR FUNCIÓN MANEJADORA PARA LA PETICIÓN, LA CUAL TIENE 2 PARÁMETROS
// 1ER PARÁMETRO: REQUEST
// 2DO PARÁMETRO: RESPONSE
//[1]:
//app.get("/", function(request, response){
   // response.send("Hello world :)") //RESPUESTA HTML VÁLIDA
//})

//[2]:
app.use(express.static("public"))


//[1]:
app.get("/", function(request, response){
    response.render("index", {
        message: "WELCOME TO APP NOTES"
    })
})


// MIDDLEWARE DE EXPRESS: EXTRAER 
// LOS VALORES DEL BODY DE LA PETICIÓN HTTP
app.use(express.urlencoded({
    extended: true
}));


app.post("/add_note", function(request, response){
    const title = request.body.title
    const body = request.body.body
    //CREAR NOTA
    notes.addNote(title, body)
    //MANDAR RESPUESTA
    response.redirect("/notes_created") // GET A ESA RUTA
})

app.get("/notes_created", function(request, response){
    response.render("notes_created") //CREAR VISTA EN LA CARPETA "VIEWS"
})

//[MÉTODO LISTEN]:
// MECANISMO DE ESCUCHA DONDE PUEDE RECIBIR PETICIONES
app.listen(port, function(){
    console.log("Listening at http://localhost:3000/")
})