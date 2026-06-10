import { api } from "./api.js";

let todosOsProdutos = []; 

function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.category = produto.category;
  card.innerHTML = `
    <img src="${produto.image}" alt="${produto.title}" class="card-img">
    <div class="card-body">
      <h3 class="card-title">${produto.title}</h3>
        <p class="card-price">R$ ${produto.price.toFixed(2)}</p>
        <div class="card-buttons">
          <button class="card-button add-to-cart">Adicionar ao Carrinho</button>
          <button class="btn-comprar buy-now">Comprar</button>
        </div>
    </div>
  `;
  return card;
}

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
