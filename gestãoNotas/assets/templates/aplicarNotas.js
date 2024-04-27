document.addEventListener('DOMContentLoaded', function() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
    <td>${dados.Ra}</td>
    <td>${dados.nome}</td>
    <td>${dados.email}</td>
    <td>${dados.prova1 ? dados.prova1 : `<input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
    <td>${dados.AEP1 ? dados.AEP1 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
    <td>${dados.prova_integrada1 ? dados.prova_integrada1 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
    <td>${dados.prova2 ? dados.prova2 : `<input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
    <td>${dados.AEP2 ? dados.AEP2 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
    <td>${dados.prova_integrada2 ? dados.prova_integrada2 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
`;
        corpoTabela.appendChild(novaLinha);
    });

    const btnExibirBimestre1 = document.querySelector('#exibirBimestre1');
    btnExibirBimestre1.addEventListener('click', function() {
        btnToggle(); 
        exibirNotasBimestre1(); 
    });

    document.getElementById("form").addEventListener('submit', function(event) {
        event.preventDefault(); 
        adicionaDadosAluno();
    });
});

function exibirNotasBimestre1() {
    const primeiro_bimestre = document.getElementById('primeiro_bimestre');
    primeiro_bimestre.style.display = 'table-row';
}

function btnToggle() {
    const hiddenElements = document.querySelectorAll('.hidden-header, .notasParte, .notaInput');
    hiddenElements.forEach(element => {
        element.style.display = (element.style.display === 'none') ? 'table-cell' : 'none';
    });
}

function calcularPrimeiraMedia() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    tabelaDados.forEach(function(aluno) {
        const prova1 = parseFloat(aluno.prova1) || 0;
        const AEP1 = parseFloat(aluno.AEP1) || 0;
        const prova_integrada1 = parseFloat(aluno.prova_integrada1) || 0;
        const media_bimestral1 = (prova1 + AEP1 + prova_integrada1) / 3;
        aluno.media_bimestral1 = media_bimestral1.toFixed(1);
    });
    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

function enviarNotas() {
    const tabelaDados = [];
    const linhas = document.querySelectorAll('#table_Content tr');

    linhas.forEach(function(linha) {
        const colunas = linha.querySelectorAll('td');
        const aluno = {
            Ra: colunas[0].innerText,
            nome: colunas[1].innerText,
            email: colunas[2].innerText,
            prova1: colunas[3].querySelector('input') ? colunas[3].querySelector('input').value : colunas[3].innerText,
            AEP1: colunas[4].querySelector('input') ? colunas[4].querySelector('input').value : colunas[4].innerText,
            prova_integrada1: colunas[5].querySelector('input') ? colunas[5].querySelector('input').value : colunas[5].innerText,
            prova2: colunas[6].querySelector('input') ? colunas[6].querySelector('input').value : colunas[6].innerText,
            AEP2: colunas[7].querySelector('input') ? colunas[7].querySelector('input').value : colunas[7].innerText,
            prova_integrada2: colunas[8].querySelector('input') ? colunas[8].querySelector('input').value : colunas[8].innerText
        };
        tabelaDados.push(aluno);
    });

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

function atualizarTabelaNotas(tabelaDados) {
    const corpoTabela = document.getElementById('table_Content');

    corpoTabela.innerHTML = '';

    tabelaDados.forEach(function(aluno) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${aluno.Ra}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1 || ''}</td>
            <td>${aluno.AEP1 || ''}</td>
            <td>${aluno.prova_integrada1 || ''}</td>
            <td>${aluno.prova2 || ''}</td>
            <td>${aluno.AEP2 || ''}</td>
            <td>${aluno.prova_integrada2 || ''}</td>
            <td class="mediaBimestral1">${aluno.media_bimestral1 || ''}</td>
        `;
        corpoTabela.appendChild(novaLinha);
    });
}

function calcularNota() {
    const corpoTabela = document.getElementById('table_Content');
    const linhas = corpoTabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        let totalNotas = 0;

        // Iterar pelas colunas de notas e somar seus valores
        for (let j = 3; j <= 5; j++) {
            const nota = parseFloat(colunas[j].innerText);
            if (!isNaN(nota)) {
                totalNotas += nota;
            }
        }

        // Definir a soma das notas na coluna correspondente
        colunas[6].innerText = totalNotas.toFixed(2);
    }
}
function atualizarTabelaNotas(tabelaDados) {
    const corpoTabela = document.getElementById('table_Content');

    corpoTabela.innerHTML = '';

    tabelaDados.forEach(function(aluno) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${aluno.Ra}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1 || ''}</td>
            <td>${aluno.AEP1 || ''}</td>
            <td>${aluno.prova_integrada1 || ''}</td>
            <td>${aluno.prova2 || ''}</td>
            <td>${aluno.AEP2 || ''}</td>
            <td>${aluno.prova_integrada2 || ''}</td>
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
        <label for="prova_integrada1">Prova Integrada 1:</label>
        <input type="number" min="0" max="1" step="0.01" id="prova_int1" value="${aluno.prova_integrada1 || ''}">
        <br>
        <label for="prova2">Prova 2:</label>
        <input type="number" min="0" max="8" step="0.01" id="prova2" value="${aluno.prova2 || ''}">
        <br>
        <label for="AEP1">AEP 2:</label>
        <input type="number" min="0" max="1" step="0.01" id="AEP2" value="${aluno.AEP2 || ''}">
        <br>
        <label for="prova_integrada2">Prova Integrada 2:</label>
        <input type="number" min="0" max="1" step="0.01" id="prova_int2" value="${aluno.prova_integrada2 || ''}">
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

function salvarEdicaoNotas(aluno) {
    const prova1 = document.getElementById('prova1').value;
    const AEP1 = document.getElementById('AEP1').value;
 

    
    aluno.prova1 = prova1;
    aluno.AEP1 = AEP1;
   

    
    atualizarTabelaNotas(tabelaDados);

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}


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
