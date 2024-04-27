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

function calcularNota(){
    const tabela = document.getElementById("table_Content");
    const fileira = tabela.getElementsByTagName("tr");
    const resultadoBimestre1 = document.getElementById("resultadoBimestre1");
    const resultadoBimestre2 = document.getElementById("resultadoBimestre2");

    resultadoBimestre1.innerHTML = "";
    resultadoBimestre2.innerHTML = "";


    for (let i = 1; i < fileira.length; i++) {
        let celulas = fileira[i].getElementsByTagName("td");
        let totalNotaBimestre1 = 0;
        let totalNotaBimestre2 = 0;

   
        for (let j = 3; j < celulas.length; j++) {
            let nota = parseFloat(celulas[j].textContent);
            if (j < 6) {
                totalNotaBimestre1 += nota;
            } else {
                totalNotaBimestre2 += nota;
            }
        }
        resultadoBimestre1.innerHTML += "Total Nota Bimestre 1 para o aluno " + (i + 1) + ": " + totalNotaBimestre1 + "<br>";
        resultadoBimestre2.innerHTML += "Total Nota Bimestre 2 para o aluno " + (i + 1) + ": " + totalNotaBimestre2 + "<br>";

}
}
