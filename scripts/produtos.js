import { api } from "./api.js";
import { criarCardProduto } from "./utils.js";
import { adicionarAoCarrinho } from "./carrinho.js";

let todosOsProdutos = []; 

async function renderizarProdutosIniciais() {
  try {
    const produtosDaApi = await api();
    todosOsProdutos = produtosDaApi.filter(
      (produto) =>
        produto.category === "men's clothing" ||
        produto.category === "women's clothing"
    );

    const containerProdutos = document.querySelector(".produtos");
    if (!containerProdutos) {
      console.warn("Container de produtos não encontrado nesta página.");
      return;
    }

    containerProdutos.innerHTML = '';

    const quantidadeExibida = 8;
    const produtosAleatorios = [...todosOsProdutos]
      .sort(() => Math.random() - 0.5)
      .slice(0, quantidadeExibida);

    produtosAleatorios.forEach((produto) => {
      const card = criarCardProduto(produto);

      card.querySelector('.add-to-cart').addEventListener('click', () => adicionarAoCarrinho(produto));
      card.querySelector('.buy-now').addEventListener('click', () => {
          adicionarAoCarrinho(produto);
          window.location.href = 'carrinho.html';
      });

      containerProdutos.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao renderizar produtos:", error);
  }
}

function filtrarProdutosPorCategoria(categoria) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const produtoCategory = card.dataset.category;

    if (categoria === "todos") {
      card.style.display = "block";
    } else if (
      categoria === "roupas-masculinas" &&
      produtoCategory === "men's clothing"
    ) {
      card.style.display = "block";
    } else if (
      categoria === "roupas-femininas" &&
      produtoCategory === "women's clothing"
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutosIniciais();

  const filtroSelect = document.getElementById("filtro-categoria");
  if (filtroSelect) {
    filtroSelect.addEventListener("change", (event) => {
      const categoriaSelecionada = event.target.value;
      filtrarProdutosPorCategoria(categoriaSelecionada);
    });
  }
});
