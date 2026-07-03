// =========================
// VARIÁVEIS GLOBAIS
// =========================

let receitas = 0;
let despesas = 0;
let producaoTotal = 0;

// =========================
// SAFE NUMBER
// =========================

function safeNumber(value) {
    return isNaN(Number(value)) ? 0 : Number(value);
}

// =========================
// LOCALSTORAGE
// =========================

function carregarDados() {
    receitas = safeNumber(localStorage.getItem("receitas"));
    despesas = safeNumber(localStorage.getItem("despesas"));
    producaoTotal = safeNumber(localStorage.getItem("producaoTotal"));
}

function salvarDados() {
    localStorage.setItem("receitas", receitas);
    localStorage.setItem("despesas", despesas);
    localStorage.setItem("producaoTotal", producaoTotal);

    atualizarTudo();
}

// =========================
// DASHBOARD
// =========================

function atualizarDashboard() {

    const lucro = receitas - despesas - producaoTotal;

    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    };

    set("receitaTotal", "R$ " + receitas.toFixed(2));
    set("despesaTotal", "R$ " + despesas.toFixed(2));
    set("lucroLiquido", "R$ " + lucro.toFixed(2));
    set("custoProducao", "R$ " + producaoTotal.toFixed(2));

    set("relReceita", "R$ " + receitas.toFixed(2));
    set("relDespesa", "R$ " + despesas.toFixed(2));
    set("relLucro", "R$ " + lucro.toFixed(2));
    set("relProducao", "R$ " + producaoTotal.toFixed(2));
}

// =========================
// RELATÓRIOS
// =========================

function atualizarRelatorios() {
    const lucro = receitas - despesas - producaoTotal;

    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    };

    set("relReceita", "R$ " + receitas.toFixed(2));
    set("relDespesa", "R$ " + despesas.toFixed(2));
    set("relLucro", "R$ " + lucro.toFixed(2));
    set("relProducao", "R$ " + producaoTotal.toFixed(2));
}

// =========================
// ATUALIZA TUDO
// =========================

function atualizarTudo() {
    atualizarDashboard();
    atualizarRelatorios();
}

// =========================
// NAVEGAÇÃO (CORRIGIDA)
// =========================

function iniciarSistema() {

    const links = document.querySelectorAll(".sidebar ul li");
    const paginas = document.querySelectorAll(".pagina");

    links.forEach((item, index) => {

        item.addEventListener("click", (e) => {
            e.preventDefault();

            links.forEach(l => l.classList.remove("active"));
            item.classList.add("active");

            paginas.forEach(p => p.style.display = "none");

            if (paginas[index]) {
                paginas[index].style.display = "block";
            }
        });
    });

    paginas.forEach((p, i) => {
        p.style.display = i === 0 ? "block" : "none";
    });
}

// =========================
// CLIENTES
// =========================

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function atualizarClientes() {

    const tabela = document.getElementById("tabelaClientes");
    if (!tabela) return;

    tabela.innerHTML = "";

    clientes.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.email}</td>
            </tr>
        `;
    });
}

// =========================
// PEDIDOS ADMIN
// =========================

function atualizarPedidosAdmin() {

    const tabela = document.getElementById("tabelaReceber");
    if (!tabela) return;

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    tabela.innerHTML = "";

    pedidos.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.cliente}</td>
                <td>${p.produto}</td>
                <td>R$ ${Number(p.valor).toFixed(2)}</td>
                <td>${p.data}</td>
                <td>${p.forma}</td>
                <td>${p.status}</td>
                <td>
                    <button onclick="alterarStatus(${p.id}, 'Em Produção')">Produção</button>
                    <button onclick="alterarStatus(${p.id}, 'Enviado')">Enviar</button>
                    <button onclick="alterarStatus(${p.id}, 'Entregue')">Entregue</button>
                </td>
            </tr>
        `;
    });
}

// =========================
// ALTERAR STATUS
// =========================

function alterarStatus(id, novoStatus) {

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos = pedidos.map(p => {
        if (p.id === id) {
            return { ...p, status: novoStatus };
        }
        return p;
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    atualizarPedidosAdmin();
}

// =========================
// INICIALIZAÇÃO GERAL
// =========================

document.addEventListener("DOMContentLoaded", () => {

    carregarDados();
    atualizarTudo();
    iniciarSistema();

    // =========================
    // BOTÃO RECEBER
    // =========================

    const btnReceber = document.getElementById("btnReceber");

    if (btnReceber) {
        btnReceber.addEventListener("click", () => {

            const cliente = document.getElementById("cliente").value;
            const produto = document.getElementById("produto").value;
            const valor = Number(document.getElementById("valorReceber").value);
            const data = document.getElementById("dataReceber").value;
            const forma = document.getElementById("formaPagamento").value;

            if (!cliente || !produto || !valor) {
                alert("Preencha todos os campos!");
                return;
            }

            const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

            pedidos.push({
                id: Date.now(),
                cliente,
                produto,
                valor,
                data,
                forma,
                status: "Pendente"
            });

            localStorage.setItem("pedidos", JSON.stringify(pedidos));

            receitas += valor;

            salvarDados();

            atualizarPedidosAdmin();

            alert("Pedido cadastrado!");
        });
    }

    // =========================
    // BOTÃO CLIENTE
    // =========================

    const btnCliente = document.getElementById("btnCadastrarCliente");

    if (btnCliente) {
        btnCliente.addEventListener("click", () => {

            const nome = document.getElementById("nomeCliente").value;
            const email = document.getElementById("emailCliente").value;
            const senha = document.getElementById("senhaCliente").value;

            if (!nome || !email || !senha) {
                alert("Preencha todos os campos!");
                return;
            }

            const existe = clientes.some(c => c.email === email);

            if (existe) {
                alert("Email já cadastrado!");
                return;
            }

            clientes.push({ nome, email, senha });

            localStorage.setItem("clientes", JSON.stringify(clientes));

            atualizarClientes();

            alert("Cliente cadastrado com sucesso!");
        });
    }

    atualizarClientes();
    atualizarPedidosAdmin();
});