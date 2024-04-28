document.addEventListener('DOMContentLoaded', function() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const primeiraMedia = parseFloat(dados.prova1 || 0) + parseFloat(dados.AEP1 || 0) + parseFloat(dados.prova_integrada1 || 0);
        dados.primeiraMedia = primeiraMedia.toFixed(2);

        if (primeiraMedia >= 7) {
            dados.status = "Aprovado";
        } else if (primeiraMedia < 5) {
            dados.status = "Reprovado";
        } else {
            dados.status = "Recuperação";
        }

        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Ra}</td>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
            <td>${dados.prova1 ? dados.prova1 : `<input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td>${dados.AEP1 ? dados.AEP1 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td>${dados.prova_integrada1 ? dados.prova_integrada1 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td>${dados.primeiraMedia}</td>
            <td>${dados.status}</td>
        `;
        corpoTabela.appendChild(novaLinha);
    });
});

function calcularStatus(media) {
    if (media >= 7) {
        return "Aprovado";
    } else if (media >= 4 && media < 7) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
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
            <td>${aluno.primeiraMedia || ''}</td>
            <td>${aluno.status || ''}</td>
            
            
        `;

        const primeiraMedia = parseFloat(aluno.prova1 || 0) + parseFloat(aluno.AEP1 || 0) + parseFloat(aluno.prova_integrada1 || 0);
        aluno.primeiraMedia = primeiraMedia.toFixed(2);

        if (primeiraMedia >= 7) {
            aluno.status = "Aprovado";
        } else if (primeiraMedia < 5) {
            aluno.status = "Reprovado";
        } else {
            aluno.status = "Recuperação";
        }
        corpoTabela.appendChild(novaLinha);
    });
}

function calcularNota() {
    const corpoTabela = document.getElementById('table_Content');
    const linhas = corpoTabela.getElementsByTagName('tr');
    const tabelaDados = [];

    for (let i = 0; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        let totalNotas = 0;

        for (let j = 3; j <= 5; j++) {
            const nota = parseFloat(colunas[j].innerText);
            if (!isNaN(nota)) {
                totalNotas += nota;
            }
        }

        const primeiraMedia = totalNotas.toFixed(2);
        colunas[6].innerText = primeiraMedia;

        const aluno = {
            Ra: colunas[0].innerText,
            nome: colunas[1].innerText,
            email: colunas[2].innerText,
            prova1: colunas[3].innerText,
            AEP1: colunas[4].innerText,
            prova_integrada1: colunas[5].innerText,
            primeiraMedia: primeiraMedia
        };
        tabelaDados.push(aluno);
    }

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
        `;
        corpoTabela.appendChild(novaLinha);
    });
}



