function adicionaDadosAluno() {
    
    try {
        const Ra = document.getElementById("input_ra").value;
        const nome = document.getElementById("input_nome").value;
        const email = document.getElementById("input_email").value;
        
        if (!Ra || !nome || !email) {
            throw new Error("Por favor, preencha todos os campos.");
        }
        
        if (Ra.length !== 8 || !/^\d+$/.test(Ra)) {
            throw new Error("Por favor, insira um RA válido com 8 dígitos.");
        }

        if(/\d/.test(nome)){
            throw new Error("Não é possível inserir números no nome.");
        }

        if (!/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            throw new Error("Insira um email válido."); 
        }
        
        const novaLinha = document.createElement("tr")
    
        novaLinha.innerHTML = `
            <td>${Ra} </td> 
            <td>${nome}</td> 
            <td>${email}</td>

        `;
    
        const corpoTabela = document.getElementById('table_Content');
        corpoTabela.appendChild(novaLinha);

        const dados = {Ra, nome, email};
        const tabelaDados = JSON.parse(localStorage.getItem('tabelaDados')) || [];
        tabelaDados.push(dados);
        localStorage.setItem('tabelaDados', JSON.stringify(tabelaDados));

    } catch (error) {
        alert(error.message);
    }
}
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
