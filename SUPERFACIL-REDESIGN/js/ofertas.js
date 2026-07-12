document.addEventListener("DOMContentLoaded", function () {

    const lojasPorEstado = {
        RN: [
            "SuperFácil Emaús",
            "SuperFácil Rodoviária",
            "SuperFácil São Gonçalo",
            "SuperFácil Moema Tinoco",
            "SuperFácil Vale do Sol",
            "SuperFácil Nova Betânia",
            "SuperFácil Alto de São Manoel"
        ],
        PB: [
            "SuperFácil João Pessoa"
        ]
    };

    const estadoSelect = document.getElementById("estado");
    const lojaSelect = document.getElementById("loja");
    const encarteSelect = document.getElementById("encarte");
    const btnVerEncarte = document.getElementById("btnVerEncarte");
    const form = document.getElementById("formEncarte");

    const placeholder = document.getElementById("encartePlaceholder");
    const resultado = document.getElementById("encarteResultado");

    const lojaNome = document.getElementById("lojaSelecionadaNome");
    const encarteNome = document.getElementById("encarteAtualNome");
    const encarteValidade = document.getElementById("encarteAtualValidade");

    const iframe = document.getElementById("encarteFrame");
    const linkAbrir = document.getElementById("linkAbrirPdf");
    const linkBaixar = document.getElementById("linkBaixarPdf");

    // Guarda os encartes da loja selecionada
    let encartesAtuais = [];

    // ==========================
    // ESTADO
    // ==========================
    estadoSelect.addEventListener("change", function () {

        lojaSelect.innerHTML =
            '<option value="" selected disabled>Selecione a loja</option>';

        (lojasPorEstado[this.value] || []).forEach(function (loja) {
            lojaSelect.innerHTML += `<option value="${loja}">${loja}</option>`;
        });

        lojaSelect.disabled = false;

        encarteSelect.innerHTML =
            '<option value="" selected disabled>Selecione o encarte</option>';

        encarteSelect.disabled = true;
        btnVerEncarte.disabled = true;
    });

    // ==========================
    // LOJA
    // ==========================
    lojaSelect.addEventListener("change", function () {

        encartesAtuais = encartesPorLoja[this.value] || [];

        encarteSelect.innerHTML =
            '<option value="" selected disabled>Selecione o encarte</option>';

        encartesAtuais.forEach(function (encarte, index) {

            encarteSelect.innerHTML += `
                <option value="${index}">
                    ${encarte.nome} — ${encarte.validade}
                </option>
            `;

        });

        encarteSelect.disabled = false;
        btnVerEncarte.disabled = true;

    });

    // ==========================
    // ENCARTE
    // ==========================
    encarteSelect.addEventListener("change", function () {

        btnVerEncarte.disabled = false;

    });

    // ==========================
    // BOTÃO
    // ==========================
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        if (
            !estadoSelect.value ||
            !lojaSelect.value ||
            encarteSelect.value === ""
        ) {
            return;
        }

        const encarte = encartesAtuais[parseInt(encarteSelect.value)];

        lojaNome.textContent = lojaSelect.value;
        encarteNome.textContent = encarte.nome;
        encarteValidade.textContent = encarte.validade;

        iframe.src = encarte.pdf;
        linkAbrir.href = encarte.pdf;
        linkBaixar.href = encarte.pdf;

        placeholder.classList.add("d-none");
        resultado.classList.remove("d-none");

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});