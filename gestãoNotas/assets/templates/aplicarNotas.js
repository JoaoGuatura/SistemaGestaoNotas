document.addEventListener('DOMContentLoaded', function() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Ra}</td>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
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
        aluno.media_bimestral1 = media_bimestral1.toFixed(2);
    });
    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

function enviarNotas() {
    calcularPrimeiraMedia(); // Adiciona cálculo da primeira média antes de enviar notas
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const camposNotas = document.querySelectorAll('.notaInput');

    camposNotas.forEach(function(campo, index) {
        const alunoIndex = Math.floor(index / 6); 
        const notaIndex = index % 6;

        const valorNota = campo.value.trim(); 
        if (tabelaDados[alunoIndex]) {
            if (notaIndex === 0) {
                tabelaDados[alunoIndex].prova1 = valorNota;
            } else if (notaIndex === 1) {
                tabelaDados[alunoIndex].AEP1 = valorNota;
            } else if (notaIndex === 2) {
                tabelaDados[alunoIndex].prova_integrada1 = valorNota;
            } else if (notaIndex === 3) {
                tabelaDados[alunoIndex].prova2 = valorNota;
            } else if (notaIndex === 4) {
                tabelaDados[alunoIndex].AEP2 = valorNota;
            } else if (notaIndex === 5) {
                tabelaDados[alunoIndex].prova_integrada2 = valorNota;
            }
        }
    });

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
      
    atualizarTabelaNotas(tabelaDados);
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
    calcularPrimeiraMedia(); 
    atualizarTabelaNotas(JSON.parse(localStorage.getItem('tabelaDados')) || []);
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

