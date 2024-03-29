const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:"secretCoder",
    resave: true, 
    saveUninitialized:true,   
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://zerowaldo:coderhouse@waldo555.0pbi0ns.mongodb.net/ecommerce", ttl: 100
    })
}))

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



//Cambios passport: 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Srv escuchando en el puerto ${PUERTO}`);
});

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);


