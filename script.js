document.addEventListener("DOMContentLoaded", function () {
    // Campos do formulário
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const documentoInput = document.getElementById("documento");
    const uploadDocumento = document.querySelector(".upload-documento");
    const emailInput = document.getElementById("email");
    const mensagemErro = document.getElementById("mensagem-erro");
    const cepInput = document.getElementById("cep");
    const comprovanteInput = document.getElementById("comprovante");
    const uploadComprovante = document.querySelector(".upload-comprovante");
    const trilhas = document.querySelectorAll(".trilha");
    const form = document.querySelector("form");

    // Máscara para CPF
    if (cpfInput) {
        cpfInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            e.target.value = value;
        });
    }

    // Máscara para telefone
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            e.target.value = value;
        });
    }

    // Exibir nome do arquivo selecionado (Documento)
    if (documentoInput) {
        documentoInput.addEventListener("change", function () {
            uploadDocumento.textContent = documentoInput.files.length > 0 
                ? documentoInput.files[0].name 
                : "Clique aqui para selecionar o arquivo";
        });
    }

    // Validação de e-mail
    if (emailInput) {
        emailInput.addEventListener("input", function (e) {
            const email = e.target.value;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (regex.test(email)) {
                mensagemErro.style.display = "none";
                emailInput.style.border = "";
            } else {
                mensagemErro.textContent = "⚠ Insira um e-mail válido";
                mensagemErro.style.display = "inline";
                emailInput.style.border = "2px solid #DC2626";
            }
        });
    }

    // Máscara e busca de endereço pelo CEP
    if (cepInput) {
        cepInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "").slice(0, 8);
            if (value.length >= 5) {
                value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
            }
            e.target.value = value;

            if (value.length === 9) {
                fetch(`https://viacep.com.br/ws/${value.replace("-", "")}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById("rua").value = data.logradouro || "";
                            document.getElementById("cidade").value = data.localidade || "";
                            document.getElementById("uf").value = data.uf || "";
                        } else {
                            alert("CEP não encontrado.");
                        }
                    })
                    .catch(() => alert("Erro ao buscar o CEP."));
            }
        });
    }

    // Exibir nome do arquivo selecionado (Comprovante de residência)
    if (comprovanteInput) {
        comprovanteInput.addEventListener("change", function () {
            uploadComprovante.textContent = comprovanteInput.files.length > 0 
                ? comprovanteInput.files[0].name 
                : "Clique aqui para selecionar o arquivo";
        });
    }

    // Seleção de trilhas
    if (trilhas) {
        trilhas.forEach(trilha => {
            trilha.addEventListener("click", function () {
                trilhas.forEach(t => t.classList.remove("selecionada"));
                this.classList.add("selecionada");
            });
        });
    }

    // Validação final do formulário antes do envio
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            // Validar Nome
            const nome = document.getElementById("nome").value.trim();
            if (!nome) {
                alert("O nome é obrigatório.");
                isValid = false;
            }

            // Validar Data de Nascimento
            const dataNascimento = document.getElementById("data-nascimento").value;
            if (!dataNascimento) {
                alert("A data de nascimento é obrigatória.");
                isValid = false;
            }

            // Validar CPF (11 dígitos numéricos)
            if (cpfInput && cpfInput.value.replace(/\D/g, "").length !== 11) {
                alert("CPF inválido. Verifique o número digitado.");
                isValid = false;
            }

            // Validar E-mail
            if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert("E-mail inválido.");
                isValid = false;
            }

            // Validar Telefone (11 dígitos numéricos)
            if (telefoneInput && telefoneInput.value.replace(/\D/g, "").length !== 11) {
                alert("Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
                isValid = false;
            }

            // Validar CEP (8 dígitos numéricos)
            if (cepInput && cepInput.value.replace(/\D/g, "").length !== 8) {
                alert("CEP inválido.");
                isValid = false;
            }

            // Validar seleção de trilha
            const trilhaSelecionada = document.querySelector(".trilha.selecionada");
            if (!trilhaSelecionada) {
                alert("Selecione uma trilha de aprendizagem.");
                isValid = false;
            }

            // Validar checkbox dos Termos
            const termosCheckbox = document.getElementById("termos");
            if (!termosCheckbox.checked) {
                alert("Você precisa aceitar os Termos e Condições.");
                isValid = false;
            }

            if (isValid) {
                alert("Formulário enviado com sucesso!");
                form.submit();
            }
        });
        
    }
});
