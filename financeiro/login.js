document.getElementById("entrar").addEventListener("click", fazerLogin);

// também permite ENTER
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fazerLogin();
    }
});

function fazerLogin() {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const erro = document.getElementById("erro");

    erro.innerText = "";

    // =========================
    // VALIDAÇÃO BÁSICA
    // =========================
    if (!email || !senha) {
        erro.innerText = "Preencha email e senha!";
        return;
    }

    // =========================
    // LOGIN ADMIN FIXO
    // =========================
    if (email === "admin@nexus.com" && senha === "123") {

        localStorage.setItem("usuarioLogado", JSON.stringify({
            tipo: "admin",
            email
        }));

        window.location.href = "../admin/index.html";
        return;
    }

    // =========================
    // LOGIN CLIENTE
    // =========================
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    let clienteEncontrado = clientes.find(c =>
        c.email === email && c.senha === senha
    );

    if (clienteEncontrado) {

        localStorage.setItem("clienteLogado", JSON.stringify({
            tipo: "cliente",
            ...clienteEncontrado
        }));

        window.location.href = "cliente/cliente.html";
        return;
    }

    // =========================
    // ERRO
    // =========================
    erro.innerText = "Email ou senha inválidos!";
}