export function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contadores = document.querySelectorAll('nav ul li a span');
    contadores.forEach(span => {
        span.textContent = carrinho.length;
    });
}

export function gerenciarSessao() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const menuAuth = document.getElementById('menu-auth');

    if (usuarioLogado && menuAuth) {
        menuAuth.innerHTML = `
            <span style="color: #7C3AED">Olá, ${usuarioLogado.nome.split(' ')[0]}</span>
            <a href="#" id="logout" style="margin-left: 10px; font-size: 0.8em; color: #ff4d4d;">Sair</a>
        `;
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.reload();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorCarrinho();
    gerenciarSessao();

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});