export function criarCardProduto(produto) {
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