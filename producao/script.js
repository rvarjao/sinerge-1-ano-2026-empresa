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
