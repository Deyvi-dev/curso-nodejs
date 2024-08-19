const express = require("express")

const app = express()

const port = 3000

app.get("/", (req, res)=>{
    res.send("olá a todos!")
})

app.listen(port, ()=>{
    console.log(`servidor online na porta http://localhost:${port}`)
})