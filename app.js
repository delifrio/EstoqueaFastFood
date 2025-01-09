const itensEstoque = [
    "Farinha Panko",
    "Farinha de trigo",
    "Farinha",
    "Óleo",
    "Óleo de algodão",
    "Ketchup",
    "Batata palha",
    "Macarrão",
    "Arroz",
    "Leite",
    "Creme de leite",
    "Leite condensado",
    "Caldo de galinha",
    "Caldo de carne",
    "Amaciante",
    "Queijo ralado",
    "Azeite",
    "Molho",
    "Manteiga",
    "Vinagre",
    "Ovos",
    "Sal",
    "Coloral",
    "Açafrão",
    "Feijão ",
    "Macarrão de Lasanha",
];

let estoque = {};

// Carregar estoque do localStorage ou inicializar vazio
function carregarEstoque() {
    const data = localStorage.getItem("estoque");
    estoque = data ? JSON.parse(data) : {};
    atualizarLista();
}

// Salvar estoque no localStorage
function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
}

// Atualizar lista de estoque na interface
function atualizarLista() {
    const lista = document.getElementById("lista-estoque");
    lista.innerHTML = "";

    itensEstoque.forEach((item) => {
        const quantidade = estoque[item] || 0;
        const li = document.createElement("li");
        li.textContent = `${item}: ${quantidade}`;
        lista.appendChild(li);
    });

    const select = document.getElementById("item-selecionado");
    select.innerHTML = "";
    itensEstoque.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// Adicionar ou retirar quantidade
function atualizarEstoque(item, quantidade) {
    if (!estoque[item]) estoque[item] = 0;
    estoque[item] += quantidade;

    if (estoque[item] < 0) estoque[item] = 0;
    salvarEstoque();
    atualizarLista();
}

// Eventos
document.getElementById("adicionar").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    if (!isNaN(quantidade)) {
        atualizarEstoque(item, quantidade);
    }
});

document.getElementById("retirar").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    if (!isNaN(quantidade)) {
        atualizarEstoque(item, -quantidade);
    }
});

// Inicializar
carregarEstoque();
