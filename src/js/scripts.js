const button = document.querySelector('.btn-button');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');
let minhaLista = [];

function adicionarNovaTarefa() {
    const novaTarefa = input.value.trim();

    if (novaTarefa !== '') {
        minhaLista.push({
            tarefa: novaTarefa,
            concluida: false
        });
        mostrarTarefas();
        input.value = '';
    } else {
        alert('O campo não pode estar vazio. Por favor, insira uma tarefa.');
    }
}

function mostrarTarefas() {
    let novaLi = '';
    minhaLista.forEach((item, posicao) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="./src/img/tchek.png" alt="tchek" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./src/img/lixeira.png" alt="lixeira" onclick="deletarItem(${posicao})">
        </li>
        `;
    });
    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(minhaLista));
}

function concluirTarefa(posicao) {
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaLista.splice(posicao, 1);
    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('lista');
    if (tarefasLocalStorage) {
        minhaLista = JSON.parse(tarefasLocalStorage);
    }
    mostrarTarefas();
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
