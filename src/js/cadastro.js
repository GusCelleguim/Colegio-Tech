function capitalizeName(input) {

        let words = input.value.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (words[i]) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
            }
        }
        input.value = words.join(' ');

}





// Validação do Cep

function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const cepFormatado = document.getElementById('cep').value;

    // Verifica se o CEP tem exatamente 8 dígitos e segue o formato XXXXX-XXX
    const cepValido = /^[0-9]{5}-[0-9]{3}$/.test(cepFormatado);

    if (cepValido) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!("erro" in data)) {
                    document.getElementById('street').value = data.logradouro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.uf;
                } else {
                    alert("CEP não encontrado.");
                    limparCampos();
                }
            })
            .catch(() => {
                alert("Erro ao buscar CEP. Verifique sua conexão e tente novamente.");
                limparCampos();
            });
    } else {
        alert("Por favor, insira um CEP válido no formato XXXXX-XXX.");
        limparCampos();
    }
}

function limparCampos() {
    document.getElementById('street').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
}

// Adiciona máscara automática ao digitar no campo de CEP
document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
        value = value.slice(0, 8);  // Limita o valor a 8 caracteres numéricos
    }
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value;
});




// email

function verificarEmail() {
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domainPart] = email.split('@');

    const maxLengthTotal = 254;
    const maxLengthLocal = 64;
    const maxLengthDomain = 255;

    const aviso = document.getElementById('aviso');
    const sugestoes = document.getElementById('sugestoes');

    aviso.textContent = "";
    sugestoes.textContent = "";

    // Verifica se o comprimento total do e-mail é válido
    if (email.length > maxLengthTotal) {
        aviso.textContent = "O endereço de e-mail é muito longo. O máximo permitido é 254 caracteres.";
        return;
    }

    // Verifica se o local-part tem até 64 caracteres
    if (localPart && localPart.length > maxLengthLocal) {
        aviso.textContent = "A parte antes do '@' (nome de usuário) é muito longa. O máximo permitido é 64 caracteres.";
        return;
    }

    // Verifica se o domain-part tem até 255 caracteres
    if (domainPart && domainPart.length > maxLengthDomain) {
        aviso.textContent = "A parte após o '@' (domínio) é muito longa. O máximo permitido é 255 caracteres.";
        return;
    }

    // Sugere provedores populares se o e-mail estiver incompleto
    if (email.includes('@') && !emailRegex.test(email)) {
        const dominiosPopulares = {
            "gmail.com": "Gmail - Google",
            "outlook.com": "Outlook - Microsoft",
            "yahoo.com": "Yahoo Mail - Yahoo",
            "protonmail.com": "ProtonMail - Proton AG",
            "icloud.com": "iCloud Mail - Apple",
            "aol.com": "AOL Mail - AOL",
            "zoho.com": "Zoho Mail - Zoho Corporation",
            "gmx.com": "GMX Mail - Global Mail eXchange",
            "mail.com": "Mail.com - 1&1 Mail & Media Inc.",
            "yandex.com": "Yandex Mail - Yandex",
            "tutanota.com": "Tutanota - Tutanota",
            "mail.ru": "Mail.ru - Mail.Ru Group"
        };

        let sugestao = "Sugestões de domínio: ";
        for (let dominio in dominiosPopulares) {
            if (domainPart && dominio.startsWith(domainPart)) {
                sugestao += `${dominiosPopulares[dominio]}, `;
            }
        }
        sugestoes.textContent = sugestao.slice(0, -2); // Remove a última vírgula e espaço
    }

    // Exibe um aviso se o e-mail estiver completo e válido
    if (emailRegex.test(email)) {
        aviso.textContent = "O endereço de e-mail parece válido.";
    }
}




ocument.getElementById('mail').addEventListener('input', function () {
    const email = this.value;
    const errorDiv = document.getElementById('emailError');
    const emailSuggestions = document.getElementById('emailSuggestions');

    // Regex para verificar a parte local e a parte do domínio do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domain] = email.split('@');

    // Checa se o email é válido e atende aos requisitos de comprimento
    const isValidEmail = emailRegex.test(email) &&
        localPart && localPart.length <= 64 &&
        domain && domain.length <= 255 &&
        email.length <= 254;

    // Checa se o email contém números (não permitido no domínio)
    const hasNumbers = domain && /\d/.test(domain);

    // Validação: se o e-mail for inválido ou se o domínio contiver números, exibe o erro
    if (!isValidEmail || hasNumbers) {
        errorDiv.style.display = 'block';
    } else {
        errorDiv.style.display = 'none';
    }

    // Sugestões de domínios para autocompletar
    const domainSuggestions = [
        "gmail.com",
        "outlook.com",
        "yahoo.com",
        "protonmail.com",
        "icloud.com",
        "aol.com",
        "zoho.com",
        "gmx.com",
        "mail.com",
        "yandex.com",
        "tutanota.com",
        "mail.ru"
    ];

    // Limpa as sugestões anteriores
    emailSuggestions.innerHTML = '';

    if (domain && !email.includes(' ')) {
        const filteredSuggestions = domainSuggestions.filter(suggestion => suggestion.startsWith(domain));
        filteredSuggestions.forEach(suggestion => {
            const option = document.createElement('option');
            option.value = localPart + '@' + suggestion;
            emailSuggestions.appendChild(option);
        });
    }

    // Liga o campo de input ao datalist
    this.setAttribute('list', 'emailSuggestions');
});


