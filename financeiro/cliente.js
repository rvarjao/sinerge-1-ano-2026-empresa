document.addEventListener("DOMContentLoaded", () => {

    let clienteLogado = JSON.parse(localStorage.getItem("clienteLogado"));

    if (!clienteLogado) {
        alert("Você precisa estar logado!");
        window.location.href = "../cliente/cliente.html";
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    // agora bate pelo EMAIL do cliente logado
    let meusPedidos = pedidos.filter(p =>
        p.cliente === clienteLogado.email
    );

    let tabela = document.getElementById("tabelaPedidos");

    tabela.innerHTML = "";

    meusPedidos.forEach(p => {

        let statusClass = "";

        if (p.status === "Recebido" || p.status === "Entregue") {
            statusClass = "status-ok";
        } else if (p.status === "Em Produção") {
            statusClass = "status-producao";
        } else {
            statusClass = "status-pendente";
        }

        tabela.innerHTML += `
            <tr>
                <td>${p.produto}</td>
                <td>R$ ${Number(p.valor).toFixed(2)}</td>
                <td>${p.data}</td>
                <td class="${statusClass}">${p.status}</td>
            </tr>
        `;
    });

});