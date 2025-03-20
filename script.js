const cpfInput = document.getElementById('cpf');

if (cpfInput) { // Verifica se o elemento existe na página
    cpfInput.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Aplica a formatação
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    e.target.value = value;
    });
}

const telefoneInput = document.getElementById('telefone');

if (telefoneInput) { // Verifica se o elemento existe na página
    telefoneInput.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Aplica a formatação
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    e.target.value = value;
    });
}

const documentoInput = document.getElementById('documento');
const uploadDocumento = document.querySelector('.upload-documento');

if (documentoInput) { // Verifica se o elemento existe na página
    documentoInput.addEventListener('change', function () {
      if (documentoInput.files.length > 0) {
        uploadDocumento.textContent = documentoInput.files[0].name; // Exibe o nome do arquivo
      } else {
        uploadDocumento.textContent = 'Clique aqui para selecionar o arquivo'; // Volta ao texto padrão
      }
    });
}

const emailInput = document.getElementById('email');
const mensagemErro = document.getElementById('mensagem-erro');

if (emailInput) { // Verifica se o elemento existe na página
    emailInput.addEventListener('input', function (e) {
    const email = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar e-mail

    if (regex.test(email)) {
        mensagemErro.style.display = 'none'; // Esconde a mensagem de erro se o e-mail for válido
        emailInput.style.border = ''; // Remove a borda vermelha se o e-mail for válido
    } else {
        mensagemErro.textContent = '⚠ Insira um e-mail válido';
        mensagemErro.style.display = 'inline'; // Exibe a mensagem de erro se o e-mail for inválido
        emailInput.style.border = '2px solid #DC2626'; // Adiciona borda vermelha se o e-mail for inválido
    }
    });
}
const cepInput = document.getElementById('cep');

if (cepInput) { // Verifica se o elemento existe na página

    cepInput.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Aplica a formatação
    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');

    e.target.value = value;

    // Busca o endereço se o CEP estiver completo
    if (value.length === 9) {
        fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
            } else {
            alert('CEP não encontrado.');
            }
        })
        .catch(error => {
            alert('Erro ao buscar o CEP.');
        });

        console.log(data);
    }
    });
}

const comprovanteInput = document.getElementById('comprovante');
const uploadComprovante = document.querySelector('.upload-comprovante');

if (comprovanteInput) { // Verifica se o elemento existe na página
    comprovanteInput.addEventListener('change', function () {
      if (comprovanteInput.files.length > 0) {
        uploadComprovante.textContent = comprovanteInput.files[0].name; // Exibe o nome do arquivo
      } else {
        uploadComprovante.textContent = 'Clique aqui para selecionar o arquivo'; // Volta ao texto padrão
      }
    });
}

const trilhas = document.querySelectorAll('.trilha');

if (trilhas) { // Verifica se o elemento existe na página
    trilhas.forEach(trilha => {
    trilha.addEventListener('click', function () {
        // Remove a classe 'selecionada' de todas as trilhas
        trilhas.forEach(t => t.classList.remove('selecionada'));
        // Adiciona a classe 'selecionada' à trilha clicada
        this.classList.add('selecionada');
    });
    });
}