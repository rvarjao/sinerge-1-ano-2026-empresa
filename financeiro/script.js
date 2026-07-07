// =========================
// VARIÁVEIS GLOBAIS
// =========================

let receitas = 0;
let despesas = 0;
let producaoTotal = 0;


// =========================
// CONVERSÃO SEGURA
// =========================

function safeNumber(valor) {

    return isNaN(Number(valor)) ? 0 : Number(valor);

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


    localStorage.setItem(
        "receitas",
        receitas
    );


    localStorage.setItem(
        "despesas",
        despesas
    );


    localStorage.setItem(
        "producaoTotal",
        producaoTotal
    );


    atualizarTudo();

}



// =========================
// FUNÇÃO DE TEXTO
// =========================

function alterarTexto(id, valor) {

    const elemento = document.getElementById(id);

    if(elemento){

        elemento.innerText = valor;

    }

}



// =========================
// DASHBOARD
// =========================

function atualizarDashboard(){


    const lucro = receitas - despesas - producaoTotal;



    alterarTexto(
        "receitaTotal",
        "R$ " + receitas.toFixed(2)
    );


    alterarTexto(
        "despesaTotal",
        "R$ " + despesas.toFixed(2)
    );


    alterarTexto(
        "lucroLiquido",
        "R$ " + lucro.toFixed(2)
    );


    alterarTexto(
        "custoProducao",
        "R$ " + producaoTotal.toFixed(2)
    );



}



// =========================
// RELATÓRIOS RESUMO
// =========================

function atualizarRelatorios(){


    const lucro = receitas - despesas - producaoTotal;



    alterarTexto(
        "relReceita",
        "R$ " + receitas.toFixed(2)
    );


    alterarTexto(
        "relDespesa",
        "R$ " + despesas.toFixed(2)
    );


    alterarTexto(
        "relLucro",
        "R$ " + lucro.toFixed(2)
    );


    alterarTexto(
        "relProducao",
        "R$ " + producaoTotal.toFixed(2)
    );


}



// =========================
// ATUALIZA SISTEMA TODO
// =========================

function atualizarTudo(){

    atualizarDashboard();

    atualizarRelatorios();

}



// =========================
// NAVEGAÇÃO
// =========================

function iniciarSistema(){


    const links =
    document.querySelectorAll(
        ".sidebar ul li"
    );


    const paginas =
    document.querySelectorAll(
        ".pagina"
    );



    links.forEach(item => {


        item.addEventListener(
            "click",
            function(e){


                e.preventDefault();



                links.forEach(link=>{

                    link.classList.remove(
                        "active"
                    );

                });



                item.classList.add(
                    "active"
                );



                paginas.forEach(pagina=>{

                    pagina.style.display =
                    "none";

                });



                const destino =
                item
                .querySelector("a")
                .getAttribute("href")
                .replace("#","");



                const pagina =
                document.getElementById(
                    destino
                );



                if(pagina){

                    pagina.style.display =
                    "block";

                }



            }
        );


    });



    paginas.forEach(p=>{

        p.style.display="none";

    });



    const inicio =
    document.getElementById(
        "dashboard"
    );


    if(inicio){

        inicio.style.display="block";

    }


}

// =========================
// CLIENTES
// =========================


let clientes = JSON.parse(
    localStorage.getItem("clientes")
) || [];





function atualizarClientes(){


    const tabela =
    document.getElementById(
        "tabelaClientes"
    );


    if(!tabela) return;



    tabela.innerHTML = "";



    clientes.forEach(cliente=>{


        tabela.innerHTML += `

        <tr>

            <td>
                ${cliente.nome}
            </td>


            <td>
                ${cliente.email}
            </td>


        </tr>

        `;


    });


}





// =========================
// CADASTRAR CLIENTE
// =========================


function cadastrarCliente(){



    const nome =
    document.getElementById(
        "nomeCliente"
    ).value;



    const email =
    document.getElementById(
        "emailCliente"
    ).value;



    const senha =
    document.getElementById(
        "senhaCliente"
    ).value;



    if(!nome || !email || !senha){


        alert(
            "Preencha todos os campos!"
        );


        return;


    }





    const existe =
    clientes.some(
        c=>c.email === email
    );



    if(existe){


        alert(
            "Email já cadastrado!"
        );


        return;


    }





    clientes.push({

        id: Date.now(),

        nome,

        email,

        senha

    });





    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );




    atualizarClientes();




    document.getElementById(
        "nomeCliente"
    ).value="";



    document.getElementById(
        "emailCliente"
    ).value="";



    document.getElementById(
        "senhaCliente"
    ).value="";





    alert(
        "Cliente cadastrado!"
    );



}






// =========================
// CONTAS A RECEBER
// =========================



function atualizarPedidosAdmin(){



    const tabela =
    document.getElementById(
        "tabelaReceber"
    );



    if(!tabela) return;





    const pedidos =
    JSON.parse(
        localStorage.getItem(
            "pedidos"
        )
    ) || [];




    tabela.innerHTML="";





    pedidos.forEach(pedido=>{


        tabela.innerHTML += `


        <tr>


            <td>
                ${pedido.cliente}
            </td>


            <td>
                ${pedido.produto}
            </td>


            <td>
                R$ ${Number(
                    pedido.valor
                ).toFixed(2)}
            </td>


            <td>
                ${pedido.data}
            </td>


            <td>
                ${pedido.forma}
            </td>


            <td>
                ${pedido.status}
            </td>


        </tr>


        `;



    });



}






// =========================
// CADASTRAR PEDIDO
// =========================


function cadastrarReceber(){



    const cliente =
    document.getElementById(
        "cliente"
    ).value;



    const produto =
    document.getElementById(
        "produto"
    ).value;



    const valor =
    Number(
        document.getElementById(
            "valorReceber"
        ).value
    );



    const data =
    document.getElementById(
        "dataReceber"
    ).value;



    const forma =
    document.getElementById(
        "formaPagamento"
    ).value;






    if(
        !cliente ||
        !produto ||
        !valor
    ){


        alert(
            "Preencha todos os campos!"
        );


        return;


    }







    const pedidos =
    JSON.parse(
        localStorage.getItem(
            "pedidos"
        )
    ) || [];







    pedidos.push({


        id:Date.now(),


        cliente,


        produto,


        valor,


        data,


        forma,


        status:"Pendente"



    });








    localStorage.setItem(

        "pedidos",

        JSON.stringify(
            pedidos
        )

    );






    receitas += valor;






    salvarDados();






    atualizarPedidosAdmin();







    alert(
        "Pedido cadastrado!"
    );





}

// =========================
// CONTAS A PAGAR
// =========================



function atualizarDespesas(){


    const tabela =
    document.getElementById(
        "tabelaDespesas"
    );



    if(!tabela) return;




    const lista =
    JSON.parse(
        localStorage.getItem(
            "despesasLista"
        )
    ) || [];




    tabela.innerHTML = "";





    lista.forEach(despesa => {



        tabela.innerHTML += `


        <tr>


            <td>
                ${despesa.descricao}
            </td>



            <td>
                ${despesa.categoria}
            </td>



            <td>
                R$ ${Number(
                    despesa.valor
                ).toFixed(2)}
            </td>



            <td>
                ${despesa.data}
            </td>



            <td>
                ${despesa.status}
            </td>



            <td>


                <button 
                onclick="
                excluirDespesa(${despesa.id})
                ">

                    Excluir

                </button>


            </td>



        </tr>


        `;



    });



}






// =========================
// CADASTRAR DESPESA
// =========================


function cadastrarDespesa(){



    const descricao =
    document.getElementById(
        "descricaoDespesa"
    ).value;




    const categoria =
    document.getElementById(
        "categoriaDespesa"
    ).value;




    const valor =
    Number(
        document.getElementById(
            "valorDespesa"
        ).value
    );




    const data =
    document.getElementById(
        "dataDespesa"
    ).value;




    const status =
    document.getElementById(
        "statusDespesa"
    ).value;







    if(
        !descricao ||
        !valor
    ){


        alert(
            "Preencha todos os campos!"
        );


        return;


    }








    const lista =
    JSON.parse(
        localStorage.getItem(
            "despesasLista"
        )
    ) || [];







    lista.push({



        id:Date.now(),



        descricao,



        categoria,



        valor,



        data,



        status



    });







    localStorage.setItem(


        "despesasLista",


        JSON.stringify(lista)


    );






    despesas += valor;






    salvarDados();






    atualizarDespesas();






    limparCamposDespesa();







    alert(
        "Despesa cadastrada!"
    );




}








// =========================
// EXCLUIR DESPESA
// =========================


function excluirDespesa(id){



    let lista =
    JSON.parse(
        localStorage.getItem(
            "despesasLista"
        )
    ) || [];






    const despesa =
    lista.find(
        d => d.id === id
    );







    if(despesa){


        despesas -= Number(
            despesa.valor
        );


    }







    lista =
    lista.filter(
        d => d.id !== id
    );








    localStorage.setItem(


        "despesasLista",


        JSON.stringify(lista)


    );







    salvarDados();






    atualizarDespesas();





}








// =========================
// LIMPAR FORMULÁRIO
// =========================


function limparCamposDespesa(){



    const descricao =
    document.getElementById(
        "descricaoDespesa"
    );


    const valor =
    document.getElementById(
        "valorDespesa"
    );


    const data =
    document.getElementById(
        "dataDespesa"
    );



    if(descricao)
        descricao.value="";



    if(valor)
        valor.value="";



    if(data)
        data.value="";



}

// =========================
// PRODUÇÃO
// =========================



function atualizarProducao(){


    const tabela =
    document.getElementById(
        "tabelaProducao"
    );


    if(!tabela) return;





    const producoes =
    JSON.parse(
        localStorage.getItem(
            "producoes"
        )
    ) || [];




    tabela.innerHTML = "";






    producoes.forEach(item => {



        tabela.innerHTML += `


        <tr>


            <td>
                ${item.produto}
            </td>



            <td>
                ${item.quantidade}
            </td>



            <td>
                R$ ${Number(
                    item.custoUnitario
                ).toFixed(2)}
            </td>



            <td>
                R$ ${Number(
                    item.custoTotal
                ).toFixed(2)}
            </td>



            <td>
                ${item.data}
            </td>



            <td>
                ${item.status}
            </td>



            <td>

                <button onclick="
                excluirProducao(${item.id})
                ">

                    Excluir

                </button>


            </td>



        </tr>


        `;



    });



}








// =========================
// CADASTRAR PRODUÇÃO
// =========================


function cadastrarProducao(){



    const produto =
    document.getElementById(
        "produtoProducao"
    ).value;




    const quantidade =
    Number(
        document.getElementById(
            "quantidadeProducao"
        ).value
    );




    const custoUnitario =
    Number(
        document.getElementById(
            "custoUnitario"
        ).value
    );




    const data =
    document.getElementById(
        "dataProducao"
    ).value;




    const status =
    document.getElementById(
        "statusProducao"
    ).value;








    if(
        !produto ||
        !quantidade ||
        !custoUnitario
    ){


        alert(
            "Preencha todos os campos!"
        );


        return;


    }








    const custoTotal =
    quantidade * custoUnitario;








    const lista =
    JSON.parse(
        localStorage.getItem(
            "producoes"
        )
    ) || [];








    lista.push({



        id: Date.now(),



        produto,



        quantidade,



        custoUnitario,



        custoTotal,



        data,



        status



    });








    localStorage.setItem(


        "producoes",


        JSON.stringify(lista)


    );







    producaoTotal += custoTotal;






    salvarDados();






    atualizarProducao();






    limparCamposProducao();






    alert(
        "Produção cadastrada!"
    );




}








// =========================
// EXCLUIR PRODUÇÃO
// =========================


function excluirProducao(id){



    let lista =
    JSON.parse(
        localStorage.getItem(
            "producoes"
        )
    ) || [];







    const item =
    lista.find(
        p => p.id === id
    );







    if(item){


        producaoTotal -= Number(
            item.custoTotal
        );


    }







    lista =
    lista.filter(
        p => p.id !== id
    );







    localStorage.setItem(


        "producoes",


        JSON.stringify(lista)


    );







    salvarDados();






    atualizarProducao();



}









// =========================
// LIMPAR PRODUÇÃO
// =========================


function limparCamposProducao(){



    const campos = [

        "produtoProducao",

        "quantidadeProducao",

        "custoUnitario",

        "dataProducao"

    ];





    campos.forEach(id=>{


        const campo =
        document.getElementById(id);



        if(campo){

            campo.value="";

        }



    });



}
