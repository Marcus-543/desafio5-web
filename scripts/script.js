var lista = document.getElementById('tarefas');
var tarefas = [];

var tarefasGuardadas = localStorage.getItem('tarefas');
tarefas = JSON.parse(tarefasGuardadas) || [];

mostrarTarefas();

function mostrarTarefas() {
    lista.innerHTML = ``;
    tarefas.forEach((tarefa, index) => {
        var tarefaItem = document.createElement('div');
        tarefaItem.classList.add('tarefa');
        tarefaItem.innerHTML = `
            <div class="content">
                <label>${tarefa.titulo}</label>
                <br>
                <label>${tarefa.conteudo}</label>
            </div>
            <div class="buttons">
                <button class='edita' onclick='editar(${index})'>Editar</button>
                <br>
                <button class='deleta' onclick='deletar(${index})'>Apagar</button> 
            </div>
        `;
        lista.appendChild(tarefaItem);
    });
}

function cadastrar() {
    var titulo = document.getElementById("titulo").value;
    var conteudo = document.getElementById("conteudo").value;

    if (titulo == '' || conteudo == '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    var novaTarefa = { titulo, conteudo };
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    mostrarTarefas();
}

function editar(index){
    const novoTitulo = prompt('Novo título:', tarefas[index].titulo);
    const novoConteudo = prompt('Nova descrição:', tarefas[index].conteudo);
    if (novoTitulo !== null && novoConteudo !== null) {
        tarefas[index] = { titulo: novoTitulo, conteudo: novoConteudo };
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        mostrarTarefas();
    }
}

function deletar(index){
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    mostrarTarefas();
}
