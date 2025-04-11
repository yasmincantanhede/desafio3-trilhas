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
                            document.getElementById("cep").value = "";
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
});