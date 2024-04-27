window.onload = function () {
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

function criaDivAluno(){
    const card = document.createElement("div");
    
}


