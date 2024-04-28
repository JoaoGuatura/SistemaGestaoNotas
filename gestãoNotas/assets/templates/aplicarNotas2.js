document.addEventListener('DOMContentLoaded', function() {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const segundaMedia = parseFloat(dados.prova2 || 0) + parseFloat(dados.AEP2 || 0) + parseFloat(dados.prova_integrada2 || 0);
        dados.segundaMedia = segundaMedia.toFixed(2);

        if (segundaMedia >= 7) {
            dados.status = "Aprovado";
        } else if (segundaMedia < 5) {
            dados.status = "Reprovado";
        } else {
            dados.status = "Recuperação";
        }

        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Ra}</td>
            <td>${dados.nome}</td>
            <td>${dados.email}</td>
            <td>${dados.prova2 || ''}</td>
            <td>${dados.AEP2 || ''}</td>
            <td>${dados.prova_integrada2 || ''}</td>
            <td>${dados.segundaMedia}</td>
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
            prova2: colunas[3].querySelector('input') ? colunas[3].querySelector('input').value : colunas[3].innerText,
            AEP2: colunas[4].querySelector('input') ? colunas[4].querySelector('input').value : colunas[4].innerText,
            prova_integrada2: colunas[5].querySelector('input') ? colunas[5].querySelector('input').value : colunas[5].innerText,
        };
        tabelaDados.push(aluno);
    });

    localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
    calcularNota(); 
}

function calcularNota() {
    const corpoTabela = document.getElementById('table_Content');
    const linhas = corpoTabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const colunas = linhas[i].getElementsByTagName('td');
        let totalNotas = 0;

        for (let j = 3; j <= 5; j++) {
            const nota = parseFloat(colunas[j].querySelector('input') ? colunas[j].querySelector('input').value : colunas[j].innerText);
            if (!isNaN(nota)) {
                totalNotas += nota;
            }
        }

        const segundaMedia = totalNotas.toFixed(2);
        colunas[6].innerText = segundaMedia;

        const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
        if (tabelaDados[i]) {
            tabelaDados[i].segundaMedia = segundaMedia;
            localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));
        }
    }
}