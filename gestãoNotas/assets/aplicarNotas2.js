document.addEventListener('DOMContentLoaded', function() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Ra}</td>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
            <td>${dados.prova2 ? dados.prova2 : `<input type="number" min="0" max="8" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td>${dados.AEP2 ? dados.AEP2 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td>${dados.prova_integrada2 ? dados.prova_integrada2 : `<input type="number" min="0" max="1" step="0.01" class="notaInput" placeholder="Insira a nota">`}</td>
            <td class="mediaBimestral2">${dados.segundaMedia || ''}</td>
        `;
        corpoTabela.appendChild(novaLinha);
    });
});

function enviarNotas() {
    const tabelaDados = [];
    const linhas = document.querySelectorAll('#table_Content tr');

    linhas.forEach(function(linha) {
        const colunas = linha.querySelectorAll('td');
        const aluno = {
            Ra: colunas[0].innerText,
            nome: colunas[1].innerText,
            email: colunas[2].innerText,
            prova2: colunas[3].querySelector('input') ? colunas[3].querySelector('input').value : colunas[3].innerText,
            AEP2: colunas[4].querySelector('input') ? colunas[4].querySelector('input').value : colunas[4].innerText,
            prova_integrada2: colunas[5].querySelector('input') ? colunas[5].querySelector('input').value : colunas[5].innerText,
        };
        tabelaDados.push(aluno);
    });

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
}

function calcularNota() {
    const corpoTabela = document.getElementById('table_Content');
    const linhas = corpoTabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        let totalNotas = 0;

        for (let j = 3; j <= 5; j++) {
            const nota = parseFloat(colunas[j].innerText);
            if (!isNaN(nota)) {
                totalNotas += nota;
            }
        }

        const segundaMedia = totalNotas.toFixed(2);
        colunas[6].innerText = segundaMedia;

        const alunoIndex = i - 1; 
        if (alunoIndex >= 0) {
            const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
            if (tabelaDados[alunoIndex]) {
                tabelaDados[alunoIndex].segundaMedia = segundaMedia;
                localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
            }
        }
    }
}
