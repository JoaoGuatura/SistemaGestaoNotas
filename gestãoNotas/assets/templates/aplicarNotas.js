window.onload = function () {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
        <td>${dados.Ra}</td>
        <td>${dados.nome}</td>
        <td>${dados.email}</td>
        <td> <input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="10" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        <td> <input type="number" min="0" max="10" step="0.01" class="notaInput" placeholder="Insira a nota"></td>
        `;
        corpoTabela.appendChild(novaLinha);
    });

    
    const selectAluno = document.querySelectorAll('.nomeAluno');
    selectAluno.forEach(nome => {
        nome.addEventListener('click', function(){
            const alunoSelecionado = tabelaDados.find(aluno => aluno.nome === nome.textContent);
            if (alunoSelecionado) {
                verificaCardExiste(alunoSelecionado);
            }
        });
    });
}

document.getElementById("form").addEventListener('submit', function(event) {
    event.preventDefault(); 
    adicionaDadosAluno();
});

function adicionarCamposNotas() {
    const tabela = document.getElementById("table_Content");
    const fileiras = tabela.getElementsByTagName("tr");

    for (let i = 0; i < fileiras.length; i++) {
        const celulas = fileiras[i].getElementsByTagName("td");
        for (let j = 0; j < celulas.length; j++) {
            if (j >= 3 && j <= 8) { 
                celulas[j].innerHTML = `<input type="number" class="notaInput" />`;
            }
        }
    }
    const botaoEnviarNotas = document.querySelector('.botaoEnviar button');
    botaoEnviarNotas.disabled = false;
}


function btnToggle() {
    const hiddenHeaders = document.querySelectorAll(".hidden-header");

    hiddenHeaders.forEach(header => {
        
        if (header.style.visibility === "hidden") {
            header.style.visibility = "visible";
        } else {
            header.style.visibility = "hidden";
        }
    });
}

function btnToggle2() {

    const hiddenHeaders = document.querySelectorAll(".hidden-header2");

    hiddenHeaders.forEach(header => {
        if (header.style.visibility === "hidden") {
            header.style.visibility = "visible";
        } else {
            header.style.visibility = "hidden";
        }
    });
}

function verificaCardExiste(aluno) {

    const cardExiste = document.querySelector('.card');
    cardExiste ? cardExiste.remove() : criarNovoCard(aluno);
}  

function criarNovoCard(aluno){
    const card = document.createElement("div");
    card.className = "card";
    

    card.innerHTML = `
        <p><strong>Nome:</strong> ${aluno.nome}</p>
        <p><strong>RA:</strong> ${aluno.Ra}</p>
        <p><strong>Email:</strong> ${aluno.email}</p>
        <button class="editarBimestre1">Editar Notas do 1º Bimestre</button>
        <button class="editarBimestre2">Editar Notas do 2º Bimestre</button>
    `;
    document.body.appendChild(card);


    const btnEditarBimestre1 = card.querySelector('.editarBimestre1');
    const btnEditarBimestre2 = card.querySelector('.editarBimestre2');
    
    btnEditarBimestre1.addEventListener('click', function() {
       
        criarCardInput(aluno, '1');
    });
    
    btnEditarBimestre2.addEventListener('click', function() {
     
        console.log("Editar notas do 2º Bimestre");
    });
}

function criarCardInput(aluno, bimestre) {
    const cardInputExistente = document.querySelector('.cardInput');

    if (cardInputExistente) {
        cardInputExistente.remove();
    }

    const cardInput = document.createElement("div");
    cardInput.className = "cardInput";
    cardInput.innerHTML = `
        <input type="number" id="prova1" placeholder="Nota da Prova 1">
        <input type="number" id="AEP1" placeholder="Nota da AEP 1">
        <input type="number" id="prova_integrada1" placeholder="Nota da Prova Integrada 1">
        <button id="salvarNotas">Salvar</button>
    `;

    document.body.appendChild(cardInput);

    const btnSalvaNotas = cardInput.querySelector('#salvarNotas'); 
    btnSalvaNotas.addEventListener('click', function() {
        const prova1 = document.getElementById('prova1').value;
        const AEP1 = document.getElementById('AEP1').value;
        const provaIntegrada1 = document.getElementById('prova_integrada1').value;

        const notasBimestre1 = {
            prova1: prova1,
            AEP1: AEP1,
            prova_integrada1: provaIntegrada1 
        };

        localStorage.setItem(`notasBimestre${bimestre}_${aluno.Ra}`, JSON.stringify(notasBimestre1));

        cardInput.remove();
    });
}


