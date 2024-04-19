
document.getElementById("form").addEventListener('submit', function(event) {
    event.preventDefault(); 

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
        
        if(/\d/.test(nome)){
            throw new Error("Não é possível inserir números no nome.");
        }

        if (!/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            throw new Error("Insira um email válido.");
        }


        const novaLinha = document.createElement("tr");
    
        novaLinha.innerHTML = `
            <td>${Ra}</td>
            <td>${nome}</td>
            <td>${email}</td>
        `;
    
        const corpoTabela = document.getElementById('table_Content');
        corpoTabela.appendChild(novaLinha);

    const contaAluno = {
        ra: Ra,
        nome: nome,
        email: email
    };
    
    const contaAlunoJSON = JSON.stringify(contaAluno);
        localStorage.setItem('contaAluno', contaAlunoJSON);
    } catch (error) {
        alert(error.message);
    }

});

