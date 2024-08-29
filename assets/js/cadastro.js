document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('rua').value = data.logradouro;
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
            });
    } else {
        alert('CEP inválido!');
    }
});

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        ramo: document.getElementById('ramo').value
    };

    // Armazenando os dados em JSON no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
});



next.js

function exportarParaExcel() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length === 0) {
        alert('Nenhum dado para exportar!');
        return;
    }

    const ws = XLSX.utils.json_to_sheet(usuarios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuários');

    XLSX.writeFile(wb, 'usuarios.xlsx');
}

// Chame essa função para exportar os dados, por exemplo, ao clicar em um botão
document.getElementById('exportar').addEventListener('click', exportarParaExcel);
