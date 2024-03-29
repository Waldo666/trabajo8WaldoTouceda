//conexion con mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://zerowaldo:coderhouse@waldo555.0pbi0ns.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Waldo555")
.then(()=> console.log("conexion exitosa baby"))
.catch(()=> console.log("Error en la conexion"))

