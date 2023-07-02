process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var livroRouter = require("./src/routes/livro");
var medidasRouter = require("./src/routes/medidas");

app.use(express.json({limit:'500mb'}));
app.use(express.urlencoded({ limit:'500mb',extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/livro", livroRouter);
app.use("/medidas", medidasRouter)

app.listen(PORTA);
