import { atualizarContadorCarrinho } from "./global.js";

export function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  alert(`${produto.title} adicionado ao carrinho!`);
}

function removerDoCarrinho(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  renderizarCarrinho();
  atualizarContadorCarrinho();
}

function renderizarCarrinho() {
  const container = document.getElementById("container-carrinho");
  if (!container) return; // Se não estiver na página de carrinho, interrompe a execução

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    container.innerHTML = "<p class='carrinho-vazio'>Seu carrinho está vazio.</p>";
    return;
  }

  let total = 0;
  const itensHtml = carrinho.map((produto, index) => {
    total += produto.price;
    return `
      <div class="item-carrinho">
        <img src="${produto.image}" alt="${produto.title}">
        <div class="detalhes-item">
          <h3>${produto.title}</h3>
          <p>R$ ${produto.price.toFixed(2)}</p>
        </div>
        <button class="btn-remover" data-index="${index}">Remover</button>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="lista-carrinho">${itensHtml}</div>
    <div class="resumo-carrinho">
      <h3>Total: R$ ${total.toFixed(2)}</h3>
      <button class="btn-finalizar">Finalizar Compra</button>
    </div>
  `;

  container.querySelectorAll(".btn-remover").forEach(botao => {
    botao.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      removerDoCarrinho(index);
    });
  });

  const btnFinalizar = container.querySelector(".btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      alert("Compra realizada com sucesso! Obrigado por comprar na UpStyle.");
      localStorage.removeItem("carrinho");
      window.location.href = "index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);
