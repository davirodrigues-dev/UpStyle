document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (!formLogin) return;

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Recupera a lista de usuários do localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se existe um usuário com o email e senha correspondentes
        const usuarioLogado = usuarios.find(
            (user) => user.email === email && user.senha === senha
        );

        if (usuarioLogado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            alert(`Seja bem-vindo, ${usuarioLogado.nome}!`);
            window.location.href = "../index.html"; // Sobe um nível para encontrar a index na raiz
        } else {
            // Remove erro anterior se existir
            const erroExistente = formLogin.querySelector(".mensagem-erro");
            if (erroExistente) erroExistente.remove();

            const mensagemErro = document.createElement("p");
            mensagemErro.innerText = "Email ou senha incorretos.";
            mensagemErro.classList.add("mensagem-erro");
            // Insere a mensagem antes do botão de submit
            formLogin.insertBefore(mensagemErro, formLogin.querySelector("button"));
        }
    });
});