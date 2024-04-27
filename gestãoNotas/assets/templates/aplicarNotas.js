document.addEventListener('DOMContentLoaded', function() {
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
});

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
    const hiddenElements = document.querySelectorAll('.hidden-header, .notasParte, .notaInput');
    hiddenElements.forEach(element => {
        element.style.display = (element.style.display === 'none') ? 'table-cell' : 'none';
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

        const alunoJSON = JSON.stringify(btnSalvaNotas);

        const notasBimestre1 = {
            prova1: prova1,
            AEP1: AEP1,
            prova_integrada1: provaIntegrada1 

        };

        localStorage.setItem(`notasBimestre${bimestre}_${aluno.Ra}`, JSON.stringify(notasBimestre1));

        cardInput.remove();
    });
}


function exibirNotasBimestre1() {
    const primeiro_bimestre = document.getElementById('primeiro_bimestre');
    primeiro_bimestre.style.display = 'table-row';
}

function enviarNotas() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const camposNotas = document.querySelectorAll('.notaInput');

    camposNotas.forEach(function(campo, index) {
        const alunoIndex = Math.floor(index / 8); // Índice do aluno (cada aluno tem 8 campos de notas)
        const notaIndex = index % 8; // Índice da nota dentro do conjunto de notas do aluno

        const valorNota = campo.value.trim(); 
        if (tabelaDados[alunoIndex]) {
            if (notaIndex === 0) {
                tabelaDados[alunoIndex].prova1 = valorNota;
            } else if (notaIndex === 1) {
                tabelaDados[alunoIndex].AEP1 = valorNota;
            } else if (notaIndex === 2) {
                tabelaDados[alunoIndex].prova_integrada1 = valorNota;
            } else if (notaIndex === 3) {
                tabelaDados[alunoIndex].media_bimestral1 = valorNota;
            } else if (notaIndex === 4) {
                tabelaDados[alunoIndex].prova2 = valorNota;
            } else if (notaIndex === 5) {
                tabelaDados[alunoIndex].AEP2 = valorNota;
            } else if (notaIndex === 6) {
                tabelaDados[alunoIndex].prova_integrada2 = valorNota;
            } else if (notaIndex === 7) {
                tabelaDados[alunoIndex].media_bimestral2 = valorNota;
            }
        }
    });

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));

      // Atualiza a tabela com as notas enviadas
      atualizarTabelaNotas(tabelaDados);
}

function atualizarTabelaNotas(tabelaDados) {
    const corpoTabela = document.getElementById('table_Content');

    // Limpa a tabela
    corpoTabela.innerHTML = '';

    // Recria a tabela com os dados atualizados
    tabelaDados.forEach(function(aluno) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${aluno.Ra}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1 || ''}</td>
            <td>${aluno.AEP1 || ''}</td>
            <td>${aluno.prova_integrada1 || ''}</td>
            <td>${aluno.media_bimestral1 || ''}</td>
            <td>${aluno.prova2 || ''}</td>
            <td>${aluno.AEP2 || ''}</td>
            <td>${aluno.prova_integrada2 || ''}</td>
            <td>${aluno.media_bimestral2 || ''}</td>
        `;
        corpoTabela.appendChild(novaLinha);
    });
}

function adicionarBotoesEditar() {
    const botoesEditar = document.querySelectorAll('.editar-notas');
    
    botoesEditar.forEach(botao => {
        botao.addEventListener('click', function() {
            const linha = this.closest('tr');
            const alunoIndex = linha.rowIndex - 1; 
            const aluno = tabelaDados[alunoIndex];
            if (aluno) {
                abrirFormularioEdicao(aluno);
            } else {
                console.error('Aluno não encontrado.');
            }
        });
    });
}

function abrirFormularioEdicao(aluno) {
    const formulario = document.createElement('form');
    formulario.innerHTML = `
        <label for="prova1">Prova 1:</label>
        <input type="number" min="0" max="8" step="0.01" id="prova1" value="${aluno.prova1 || ''}">
        <br>
        <label for="AEP1">AEP 1:</label>
        <input type="number" min="0" max="1" step="0.01" id="AEP1" value="${aluno.AEP1 || ''}">
        <br>
        <label for-"prova_integrada1">Prova Integrada 1:</label>
        <input type="number" min="0" max="1" step="0.01" id="prova_int1" value="${aluno.provaIntegrada1 || ''}">
        <br>

        <label for="prova2">Prova 2:</label>
        <input type="number" min="0" max="8" step="0.01" id="prova2" value="${aluno.prova2 || ''}">
        <br>
        <label for="AEP1">AEP 2:</label>
        <input type="number" min="0" max="1" step="0.01" id="AEP2" value="${aluno.AEP2 || ''}">
        <br>
        <label for-"prova_integrada2">Prova Integrada 2:</label>
        <input type="number" min="0" max="1" step="0.01" id="prova_int2" value="${aluno.provaIntegrada2 || ''}">
        <br>
      
        <button id="salvarEdicao">Salvar</button>
    `;

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        salvarEdicaoNotas(aluno);
        fecharFormularioEdicao();
    });

    document.body.appendChild(formulario);

    const botaoSalvarEdicao = formulario.querySelector('#salvarEdicao');
    botaoSalvarEdicao.addEventListener('click', function() {
        formulario.dispatchEvent(new Event('submit'));
    });
}

// Salva as alterações feitas nas notas do aluno
function salvarEdicaoNotas(aluno) {
    const prova1 = document.getElementById('prova1').value;
    const AEP1 = document.getElementById('AEP1').value;
    // Obtenha os valores dos outros inputs

    // Atualize as notas do aluno
    aluno.prova1 = prova1;
    aluno.AEP1 = AEP1;
    // Atualize as outras notas

    // Atualize a tabela com as notas atualizadas
    atualizarTabelaNotas(tabelaDados);

    // Atualize o armazenamento local
    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

// Fecha o formulário de edição
function fecharFormularioEdicao() {
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.remove();
    }
}

let formularioEdicaoAberto = false;

function toggleFormularioEdicao(aluno) {
    if (formularioEdicaoAberto) {
        fecharFormularioEdicao();
    } else {
        abrirFormularioEdicao(aluno);
    }
    formularioEdicaoAberto = !formularioEdicaoAberto;
}