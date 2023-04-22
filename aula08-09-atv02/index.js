const express = require("express");
const app = express();
const produtoRota = require("./rotas/produtos")
var expressLayouts = require('express-ejs-layouts')
const indexRoute = require('./rotas/index.rotas')

app.use(express.json())

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use('/static', express.static('public'))
app.use("/api/produtos", produtoRota)
app.use('/', indexRoute)

app.listen(8080, () => {
  console.log(`Servidor pronto na porta 8080 no ambiente ${process.env.NODE_ENV}`);
});