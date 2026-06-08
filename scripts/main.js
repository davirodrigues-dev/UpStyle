import { api } from "./api.js";

async function renderizarProdutos() {
  try {
    const produtos = await api();
  } catch (error) {
    console.error("Erro ao renderizar produtos:", error);
  }
}

renderizarProdutos();
