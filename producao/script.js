const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzZJT6RIi6i5XMHLBA_TpK05jsW51PPaqLiv8_FcldpEsjWysc864cua7YGr26JuHDQ/exec";

const formulario = document.getElementById("relatorio");
const botaoSalvar = formulario.querySelector(".salvar");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  const dados = {
    setor: formulario.setor.value,
    responsavel: formulario.responsavel.value,
    data: formulario.data.value,
    atividades: formulario.atividades.value,
    problemas: formulario.problemas.value,
    solucoes: formulario.solucoes.value,
    observacoes: formulario.observacoes.value,
  };

  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    alert("Relatório salvo com sucesso!");
    formulario.reset();
  } catch (erro) {
    alert("Erro ao salvar. Verifique sua conexão e tente novamente.");
  } finally {
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Salvar Relatório";
  }
});


// =====================================================
//  EXERCÍCIO: Complete o código para listar relatórios
// =====================================================

function listarRelatorios() {

    // 1) Pegue os elementos da página usando document.getElementById
    //    - o botão tem id "btn-listar"
    //    - a div onde aparece a lista tem id "lista-relatorios"
    const btn = ____;
    const lista = ____;

    // 2) Enquanto carrega, desabilite o botão e mude o texto dele
    //    - btn.disabled = ????
    //    - btn.textContent = "????"
    //    - lista.innerHTML = "" (limpa a lista)
    ____;
    ____;
    ____;

    // 3) Crie um nome único para o callback (JSONP)
    //    Usamos Date.now() para gerar um número diferente a cada clique
    const callbackName = "cb_" + Date.now();

    // 4) Registre a função de callback no objeto window
    //    Quando o Google responder, ele vai chamar essa função passando os dados
    window[callbackName] = function (dados) {
        delete window[callbackName];

        // 5) Verifique se existem dados
        //    Se dados.length for 0, mostre "Nenhum relatório encontrado."
        //    Senão, monte a tabela HTML
        if (____) {
            lista.innerHTML = "<p>Nenhum relatório encontrado.</p>";
        } else {

            // 6) Monte o HTML da tabela
            //    Comece com o <thead> (cabeçalho) e depois percorra os dados
            //    com forEach para criar cada <tr> (linha)
            //    Cada relatório (r) tem: r.data, r.setor, r.responsavel,
            //    r.atividades, r.problemas, r.solucoes, r.observacoes
            let html = "<table><thead><tr><th>Data</th><th>Setor</th><th>Responsável</th><th>Atividades</th><th>Problemas</th><th>Soluções</th><th>Observações</th></tr></thead><tbody>";

            dados.forEach(r => {
                html += `<tr>
                    <td>${____}</td>
                    <td>${____}</td>
                    <td>${____}</td>
                    <td>${____}</td>
                    <td>${____}</td>
                    <td>${____}</td>
                    <td>${____}</td>
                </tr>`;
            });

            html += "</tbody></table>";

            // 7) Coloque o HTML dentro da div lista
            //    Use: lista.innerHTML = ????
            ____;
        }

        // 8) Reabilite o botão e restaure o texto original
        btn.disabled = ____;
        btn.textContent = "____";
    };

    // 9) Crie uma tag <script> para fazer a requisição JSONP
    //     O src deve ser a URL do Google + "?callback=" + callbackName
    //     Depois adicione essa tag ao document.body
    const script = document.createElement("script");
    script.src = ____;
    script.onerror = function () {
        delete window[callbackName];
        lista.innerHTML = "<p>Erro ao carregar relatórios.</p>";
        btn.disabled = false;
        btn.textContent = "Listar Relatórios";
    };
    document.body.appendChild(script);
}
