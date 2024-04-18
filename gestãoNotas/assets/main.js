function adicionaRegistroAlunos() {
    try {
        const Ra = document.getElementById("Ra").value;
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        
        if (!Ra || !nome || !email) {
            throw new Error("Por favor, preencha todos os campos.");
        }
        
        if (Ra.length !== 8 || !/^\d+$/.test(Ra)) {
            throw new Error("Por favor, insira um RA válido com 8 dígitos.");
        }
        
        const novaLinha = document.createElement("tr");
    
        novaLinha.innerHTML = `
            <td>${Ra}</td>
            <td>${nome}</td>
            <td>${email}</td>
        `;
    
        const corpoTabela = document.getElementById('table_Content');
        corpoTabela.appendChild(novaLinha);
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("form").addEventListener('submit', function(event) {
    event.preventDefault(); 
    adicionaRegistroAlunos();
});