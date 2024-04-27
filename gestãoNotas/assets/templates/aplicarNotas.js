window.onload = function () {
    const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
    const corpoTabela = document.getElementById('table_Content');

    tabelaDados.forEach(function(dados) {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${dados.Ra}</td>
            <td class="nomeAluno">${dados.nome}</td>
            <td>${dados.email}</td>
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
     
       criarCardInput(aluno, '2');
       
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

    <input type="number" id="input_prova${bimestre}" placeholder="Nota da Prova ${bimestre}">
    <input type="number" id="input_AEP${bimestre}" placeholder="Nota da AEP ${bimestre}">
    <input type="number" id="input_prova_integrada${bimestre}" placeholder="Nota da Prova Integrada ${bimestre}">
    <button id="salvarNotas">Salvar</button>
    `;

    document.body.appendChild(cardInput);

    const btnSalvaNotas = cardInput.querySelector('#salvarNotas'); 
    btnSalvaNotas.addEventListener('click', function() {
        const prova = document.getElementById('input_prova' + bimestre).value;
        const AEP = document.getElementById('input_AEP' + bimestre).value;
        const provaIntegrada = document.getElementById('input_prova_integrada' + bimestre).value;

        const notasBimestre = {
            prova: prova,
            AEP: AEP,
            prova_integrada: provaIntegrada 
        };

        localStorage.setItem(`notasBimestre${bimestre}_${aluno.Ra}`, JSON.stringify(notasBimestre));

        const tblProva = document.getElementById(`input_prova${bimestre}`);
        const tblAEP = document.getElementById(`input_aep${bimestre}`);
        const tblProvaIntegrada = document.getElementById(`input_prova_int${bimestre}`);
        
        tblProva.textContent = prova;
        tblAEP.textContent = AEP;
        tblProvaIntegrada.textContent = provaIntegrada;

        cardInput.remove();
        
    });
}