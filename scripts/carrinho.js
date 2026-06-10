import "./produtos.js";
import { api } from "./api.js";
import "./main.js";

const carrinho = [];

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    
}