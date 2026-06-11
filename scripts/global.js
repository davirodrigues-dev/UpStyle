export function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const contadores = document.querySelectorAll('nav ul li a span');
    contadores.forEach(span => {
        span.textContent = carrinho.length;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorCarrinho();

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});