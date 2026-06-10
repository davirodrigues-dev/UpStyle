export async function api() {
  const resposta = await fetch("https://fakestoreapi.com/products");

  if (!resposta.ok) {
    throw new Error("Erro ao consumir a API");
  }

  const dados = await resposta.json();
  return dados;
}
