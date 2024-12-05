import express from "express"; //biblioteca para criar servidores e API web em Node.js
const app = express(); //mesma coisa de colocar express().get etc

app.use(express.json()); //troca automaticamente o tipo do arquivo

const users = [];

//req (request) res (response) pedido e resposta  
app.post('/users', function (req, res) {   //Define uma rota do tipo GET no caminho /hello.
  const body = req.body; //usuario enviou json no body
  users.push(body)       //função de array para adicionar elementos ao final de um array.

  res.status(201).send("usuário criado com sucesso!")  //send(envie) 
});

app.get('/users', function(req, res) {

  res.send(users)
})

app.listen(3000, ()=> {   //Inicia o servidor na porta 3000
    console.log('servidor rodando na porta 3000');
});


