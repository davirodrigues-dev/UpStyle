import { api } from "./api.js";
import { criarCardProduto } from "./utils.js";
import { adicionarAoCarrinho } from "./carrinho.js";

let todosOsProdutos = [];
const containerProdutos = document.querySelector(".produtos");

function exibirProdutos(lista) {
  if (!containerProdutos) return;
  
  containerProdutos.innerHTML = '';
  
  if (lista.length === 0) {
    containerProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  lista.forEach((produto) => {
    const card = criarCardProduto(produto);
    containerProdutos.appendChild(card);
  });
}

async function renderizarProdutosIniciais() {
  try {
    const produtosDaApi = await api();
    todosOsProdutos = produtosDaApi.filter(
      (produto) =>
        produto.category === "men's clothing" ||
        produto.category === "women's clothing"
    );

    const iniciais = [...todosOsProdutos]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    exibirProdutos(iniciais);
  } catch (error) {
    console.error("Erro ao renderizar produtos:", error);
  }
}

function filtrarProdutosPorCategoria(categoria) {
  if (categoria === "todos") {
    exibirProdutos(todosOsProdutos);
    return;
  }

  const mapeamento = {
    "roupas-masculinas": "men's clothing",
    "roupas-femininas": "women's clothing"
  };

  const filtrados = todosOsProdutos.filter(p => p.category === mapeamento[categoria]);
  exibirProdutos(filtrados);
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
