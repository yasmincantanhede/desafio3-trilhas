document.addEventListener("DOMContentLoaded", function () {
    const formularioCadastro = document.querySelector("form");
    const botaoInscricao = document.querySelector(".botoes .inscricao");
  
    if (formularioCadastro && botaoInscricao) {
      botaoInscricao.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
  
        // Verificar se todos os campos obrigatórios estão preenchidos
        const camposObrigatorios = formularioCadastro.querySelectorAll("[required]");
        let todosPreenchidos = true;
  
        camposObrigatorios.forEach(campo => {
          if (!campo.value.trim()) {
            todosPreenchidos = false;
            // Adicione um feedback visual para o usuário (opcional)
            campo.classList.add("campo-invalido");
          } else {
            campo.classList.remove("campo-invalido");
          }
        });

        // Verificar se os termos foram aceitos
        const termosCheckbox = document.getElementById("termos");
        const termosAceitos = termosCheckbox && termosCheckbox.checked;
  
        if (!termosAceitos) {
          todosPreenchidos = false;
          // Adicione um feedback visual para o usuário (opcional)
          if (termosCheckbox) {
            termosCheckbox.classList.add("campo-invalido");
          }
        } else if (termosCheckbox) {
          termosCheckbox.classList.remove("campo-invalido");
        }
  
        if (todosPreenchidos && termosAceitos) {
          // Se todos os campos estiverem preenchidos, exibe o alerta
          salvarDadosFormulario();
          alert("Inscrição realizada com sucesso!");
          window.location.href = "index.html";
        } else {
          alert("Por favor, preencha todos os campos obrigatórios e selecione pelo menos uma trilha e aceite os termos.");
        }
      });
    }
});