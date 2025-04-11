function salvarDados() {
  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('data-nascimento').value;
  const cpf = document.getElementById('cpf').value;
  const sexo = document.getElementById('sexo').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const senha = document.getElementById('senha').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const cidade = document.getElementById('cidade').value;
  const uf = document.getElementById('uf').value;
  const termos = document.getElementById('termos').checked;
  const trilhasSelecionadas = [];
  const trilhasDivs = document.querySelectorAll('.trilhas .trilha');

  trilhasDivs.forEach(trilhaDiv => {
    if (trilhaDiv.classList.contains('selecionada')) {
      trilhasSelecionadas.push(trilhaDiv.dataset.trilha);
    }
  });

  const dados = {
    nome: nome,
    dataNascimento: dataNascimento,
    cpf: cpf,
    sexo: sexo,
    email: email,
    telefone: telefone,
    senha: senha,
    cep: cep,
    rua: rua,
    numero: numero,
    cidade: cidade,
    uf: uf,
    termos: termos,
    trilhas: trilhasSelecionadas
  };

  console.log("Dados a serem salvos:", dados);

  // Salvar no localStorage
  localStorage.setItem('cadastro', JSON.stringify(dados));
  alert('Dados salvos com sucesso!');
}

function salvarDadosFormulario() {
  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('data-nascimento').value;
  const cpf = document.getElementById('cpf').value;
  const sexo = document.getElementById('sexo').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const senha = document.getElementById('senha').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const cidade = document.getElementById('cidade').value;
  const uf = document.getElementById('uf').value;
  const termos = document.getElementById('termos').checked;
  const trilhasSelecionadas = [];
  const trilhasDivs = document.querySelectorAll('.trilhas .trilha.selecionada');

  trilhasDivs.forEach(trilhaDiv => {
    trilhasSelecionadas.push(trilhaDiv.dataset.trilha);
  });

  const dados = {
    nome: nome,
    dataNascimento: dataNascimento,
    cpf: cpf,
    sexo: sexo,
    email: email,
    telefone: telefone,
    senha: senha,
    cep: cep,
    rua: rua,
    numero: numero,
    cidade: cidade,
    uf: uf,
    termos: termos,
    trilhas: trilhasSelecionadas
  };

  localStorage.setItem('inscricaoRealizada', 'true'); // Flag para indicar que a inscrição foi feita
  localStorage.setItem('dadosInscricao', JSON.stringify(dados));
  console.log("Dados da inscrição salvos no localStorage:", dados);
}

function carregarDados() {
  if (localStorage.getItem('inscricaRealizada')){
    const dadosSalvos = localStorage.getItem('dadosIncricao');
  } else{
    dadosSalvos = localStorage.getItem('cadastro');
  }
  
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    document.getElementById('nome').value = dados.nome || '';
    document.getElementById('data-nascimento').value = dados.dataNascimento || '';
    document.getElementById('cpf').value = dados.cpf || '';
    document.getElementById('sexo').value = dados.sexo || '-';
    document.getElementById('email').value = dados.email || '';
    document.getElementById('telefone').value = dados.telefone || '';
    document.getElementById('senha').value = dados.senha || '';
    document.getElementById('cep').value = dados.cep || '';
    document.getElementById('rua').value = dados.rua || '';
    document.getElementById('numero').value = dados.numero || '';
    document.getElementById('cidade').value = dados.cidade || '';
    document.getElementById('uf').value = dados.uf || '';
    document.getElementById('termos').checked = dados.termos || false;

    // Carregar seleção das trilhas
    const trilhasDivs = document.querySelectorAll('.trilhas .trilha');
    trilhasDivs.forEach(trilhaDiv => {
      if (dados.trilhas && dados.trilhas.includes(trilhaDiv.dataset.trilha)) {
        trilhaDiv.classList.add('selecionada');
      } else {
        trilhaDiv.classList.remove('selecionada');
      }
    });
  }
}

function apagarDados() {
  const dadosSalvos = localStorage.getItem('cadastro');
  if (dadosSalvos) {
    localStorage.clear();
    console.log("Os dados foram apagados!", dadosSalvos);

    // Salvar no localStorage
    alert('Dados apagados com sucesso!');
  } else {
    alert('Não há dados salvos!');
  }
}