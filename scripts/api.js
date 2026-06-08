const apiComsumo = await fetch(
  "https://fakestoreapi.com/products/category/men's clothing"
);

export async function api() {
  const resposta = await fetch(apiComsumo);

  if (!resposta.ok) {
    throw new Error("Erro ao consumir a API");
  }

  const dados = await resposta.json();
  return dados.products;
}
