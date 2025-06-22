// script.js (Versão Otimizada para Renderização)

// Simula uma API com muitos produtos e atraso
const fetchProducts = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const products = [];
            for (let i = 1; i <= 17; i++) {
                products.push({
                    id: i,
                    name: `Produto Muito Bom ${i}`,
                    description: `Esta é uma descrição detalhada para o Produto Muito Bom ${i}. Ele tem características incríveis e vai mudar sua vida!`,
                    price: (100 + i).toFixed(2),
                    imageUrl: `https://via.placeholder.com/200x150?text=Produto+${i}`
                });
            }
            resolve(products);
        }, 1500); // Ainda com o atraso de 1.5s para simular rede
    });
};

const productsContainer = document.querySelector('.products-container');
const loadingMessage = document.getElementById('loading-message'); // Pega a mensagem de carregamento

const createProductCard = (product) => {
    // Esta é uma função auxiliar para criar UM card de produto.
    const card = document.createElement('div'); // Cria um novo elemento <div>
    card.classList.add('product-card'); // Adiciona a classe CSS 'product-card'

    // CONSTRÓI O CONTEÚDO DO CARD USANDO backticks (template literals)
    // Isso ainda usa innerHTML, mas apenas para UM elemento, o que é eficiente.
    card.innerHTML = `
        <img src="${product.imageUrl}" alt="Imagem do ${product.name}" loading="lazy">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price">R$ ${product.price}</div>
        <button data-product-id="${product.id}">Adicionar ao Carrinho</button>
    `;

    // Adiciona um Event Listener (melhor que onclick no HTML)
    // Isso é mais eficiente e limpo.
    const addButton = card.querySelector('button');
    addButton.addEventListener('click', () => addToCart(product.id));

    return card; // Retorna o card HTML completo
};

const renderProducts = async () => {
    loadingMessage.style.display = 'block'; // Mostra a mensagem de carregamento
    productsContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

    const products = await fetchProducts();

    // ****** A GRANDE MUDANÇA ESTÁ AQUI ******
    const fragment = document.createDocumentFragment(); // 1. Cria um fragmento de documento
    
    products.forEach(product => {
        const productCard = createProductCard(product); // Cria um card para cada produto
        fragment.appendChild(productCard); // 2. Adiciona o card ao fragmento (no "cesto" invisível)
    });

    productsContainer.appendChild(fragment); // 3. Adiciona o "cesto" inteiro (com todos os cards) de uma vez só!
    // Esta única operação de 'appendChild' é MUITO mais rápida
    // do que manipular o innerHTML 200 vezes.

    loadingMessage.style.display = 'none'; // Esconde a mensagem de carregamento
};

const addToCart = (productId) => {
    // alert(`Produto ${productId} adicionado ao carrinho! (Funcionalidade não implementada)`);
    console.log(`Produto ${productId} adicionado ao carrinho! (Funcionalidade não implementada)`);
    // Melhor usar console.log para não bloquear a interface
};

// Dispara o carregamento e renderização
// Usa DOMContentLoaded para garantir que o HTML esteja pronto antes de tentar manipulá-lo,
// mas sem esperar que imagens e outros recursos grandes carreguem.
document.addEventListener('DOMContentLoaded', renderProducts);