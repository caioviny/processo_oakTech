// Referências aos elementos do DOM
const formContainer = document.getElementById('form-container');
const listagemContainer = document.getElementById('listagem-container');
const produtoForm = document.getElementById('produto-form');
const produtoTabela = document.getElementById('produto-tabela').querySelector('tbody');
const novoProdutoBtn = document.getElementById('novo-produto');
const valorInput = document.getElementById('valor');

// Lista para armazenar os produtos
let produtos = [];

// Formata o valor em tempo real no input
valorInput.addEventListener('input', () => {
    const valor = valorInput.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    valorInput.value = valorFormatado;
});

// Manipula o evento de submissão do formulário
produtoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(valorInput.value.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    const disponivel = document.getElementById('disponivel').value;

    // Adiciona o produto à lista e ordena por valor
    produtos.push({ nome, descricao, valor, disponivel });
    produtos.sort((a, b) => a.valor - b.valor);

    // Atualiza a tabela e exibe a listagem
    atualizarTabela();
    formContainer.style.display = 'none';
    listagemContainer.style.display = 'block';
});

// Exibe o formulário para cadastrar um novo produto
novoProdutoBtn.addEventListener('click', () => {
    formContainer.style.display = 'block';
    listagemContainer.style.display = 'none';
    produtoForm.reset();
});

// Atualiza a tabela com os produtos cadastrados
function atualizarTabela() {
    produtoTabela.innerHTML = '';
    produtos.forEach((produto) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${produto.nome}</td><td>${formatarValor(produto.valor)}</td>`;
        produtoTabela.appendChild(row);
    });
}

// Formata o valor para exibição na tabela
function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}