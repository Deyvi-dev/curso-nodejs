const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erro" });
  }
});

app.post("/users", async (req, res) =>{
    const {name} = req.body
    try{
    const user = await prisma.user.create({
        data:{
            name
        }
    })
    res.status(201).json({message: "usuario criado",  user})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "error ao criard usuario"})
    }
})

app.get("/users/:id", async(req, res) =>{
    const {id} = req.params
    try{
     const user = await prisma.user.findFirst({
        where: {id: Number(id)}
     })
     res.status(200).json(user)
    }catch(error){
    res.status(400).json({message: "erro ao obter usuario"})
    }
})

app.delete("/users/:id", async (req, res)=>{
    const {id} = req.params

    try{
       await prisma.user.delete({
        where: {id:  Number(id)}
       }) 
       res.status(200).json({message: "usuario deletado com sucesso"})
    }catch{
        res.status(500).json({message: "erro ao deletar o usuario"})
    }       
})
app.listen(port, () => {
  console.log(`servidor online na porta http://localhost:${port}`);
});
