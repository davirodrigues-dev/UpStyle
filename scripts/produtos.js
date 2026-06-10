import {api} from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const produtos = await api();
    const containerProdutos = document.querySelector('.produtos');

    if (!containerProdutos) {
      console.warn('Container de produtos não encontrado nesta página.');
      return;
    }

    const apenasRoupas = produtos.filter(
      (produto) =>
        produto.category === "men's clothing" ||
        produto.category === "women's clothing"
    );

    const quantidadeExibida = 8;
    const produtosAleatorios = apenasRoupas
      .sort(() => Math.random() - 0.5)
      .slice(0, quantidadeExibida);

    produtosAleatorios.forEach(produto => {
      const card = criarCardProduto(produto);
      containerProdutos.appendChild(card);
    });
  }
  catch (error) {
    console.error('Erro ao renderizar produtos:', error);
  }
});

function criarCardProduto(produto) {
  const card = document.createElement('div');
  card.classList.add('card');
    card.innerHTML = `
    <img src="${produto.image}" alt="${produto.title}" class="card-img">
    <div class="card-body">
      <h3 class="card-title">${produto.title}</h3>
        <p class="card-price">R$ ${produto.price.toFixed(2)}</p>
        <div class="card-buttons">
          <button class="card-button">Adicionar ao Carrinho</button>
          <button class="btn-comprar">Comprar</button>
        </div>
    </div>
  `;
  return card;
}