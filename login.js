function realizarLogin() {
  const cpfDigitado = document.getElementById('cpf').value;
  const senhaDigitada = document.getElementById('senha').value;

  const cadastroSalvo = localStorage.getItem('dadosInscricao');

  if (cadastroSalvo) {
    const dadosCadastro = JSON.parse(cadastroSalvo);

    if (dadosCadastro.cpf === cpfDigitado && dadosCadastro.senha === senhaDigitada) {
      alert('Login realizado com sucesso!');
      // Redirecionar para a página de inscrição
      window.location.href = 'cadastro.html';
    } else {
      alert('CPF ou senha incorretos.');
    }
  } else {
    alert('Nenhum cadastro encontrado. Por favor, realize o cadastro primeiro.');
    window.location.href = 'cadastro.html'; // Redirecionar para a página de cadastro
  }
}

// Adiciona um listener para o evento de submit do formulário
document.addEventListener('DOMContentLoaded', function() {
  const formularioLogin = document.querySelector('form');
  if (formularioLogin) {
    formularioLogin.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário
      realizarLogin();
    });
  }
});