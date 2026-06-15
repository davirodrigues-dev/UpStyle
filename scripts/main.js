import { api } from "./api.js";
import { criarCardProduto } from "./utils.js";
import { adicionarAoCarrinho } from "./carrinho.js";

async function renderizarProdutos() {
  try {
    const todosProdutos = await api();

    const apenasRoupas = todosProdutos.filter(
      (produto) =>
        produto.category === "men's clothing" ||
        produto.category === "women's clothing"
    );

    const produtosAleatorios = apenasRoupas
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const containerProdutos = document.querySelector(".produtos");
    if (!containerProdutos) {
      console.warn("Container de produtos não encontrado nesta página.");
      return;
    }

    produtosAleatorios.forEach(produto => {
      const card = criarCardProduto(produto);
      containerProdutos.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao renderizar produtos:", error);
  }
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);
