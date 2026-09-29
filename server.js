const express = require("express")
const pedidos = require("../dados.json")

const mostrarPedidos = (req, res) => {
    res.send(pedidos)
}

const mostrarPedido = (req, res) => {
    const id = req.params.id;

    pedidos.forEach((item) => {
        if(item.id ==id){
            res.send(item);
        } else {
            res.send("Pedido não encontrado")
        }
    });
}

function novoPedidos(req, res) {
    if (req.body) {
        const novoID = pedidos.leight + 1;
        req.body.id = novoID
        res.send("Pedido recebido");
        pedidos.push(req.body);
    } else {
        res.send("Erro ao receber o pedido");
    }
}

const excluirPedidos = (req, res) => {
    const id = req.params.id;

    pedidos.forEach((pedidos, indice) => {
        if(pedidos.id == id) {
            pedidos.splice(indice, 1)
        }
    });

    res.send("Pedido Excluido com sucesso!")
};

const alterarPedidos = (req, res) => {
    const id = req.parms.id;
    const dados = req.body;

    pedidos.forEach((pedido) => {
        
            pedido.item = dados.item;
            pedido.dataRegistro = dados.dataRegistro
            pedido.valor = dados.valor
            pedido.patrimonio = dados.patrimonio
        
    });
};

const app =  express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const porta = 3000

app.get("/", mostrarPedidos);
app.get("/:id", mostrarPedido);
app.post("/", novoPedidos);
app.delete("/:id", excluirPedidos);
app.put("/:id", alterarPedidos);


app.listen(porta, () => {
    console.log('Servidor: http://127.0.0.1:${porta}');
});