var lista = document.getElementById('tarefas');
var tarefas = [];

var tarefasGuardadas = localStorage.getItem('tarefas');
tarefas = JSON.parse(tarefasGuardadas) || [];

mostrarTarefas();

function mostrarTarefas() {
    var count = 1;
    lista.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        var tarefaItem = document.createElement('div');
        var separador = document.createElement('hr');
        tarefaItem.classList.add('tarefa');
        tarefaItem.innerHTML = `
            <div class="content">
                <label>Título: ${tarefa.titulo}</label>
                <br>
                <label>Conteúdo: ${tarefa.conteudo}</label>
            </div>
            <div class="buttons">
                <button class='edita' onclick='editar(${index})'>Editar</button>
                <br>
                <button class='deleta' onclick='deletar(${index})'>Apagar</button> 
            </div>
        `;
        lista.appendChild(tarefaItem);
        if (count != tarefas.length) {
            lista.appendChild(separador);
        }
        count = count + 1;
    });
}

function cadastrar() {
    var titulo = document.getElementById("titulo").value;
    var conteudo = document.getElementById("conteudo").value;

    if (titulo == '' || conteudo == '') {
        alert('Por favor, preencha todos os campos.');
    }else{
        var novaTarefa = { titulo, conteudo };
        document.getElementById("titulo").value ='';
        document.getElementById("conteudo").value ='';

        tarefas.push(novaTarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        mostrarTarefas();
    }
}

function editar(index){
    var novoTitulo = prompt('Novo título:', tarefas[index].titulo);
    while (novoTitulo == ''){
        novoTitulo = prompt('Novo título:', tarefas[index].titulo);
    }

    var novoConteudo = prompt('Novo Conteudo:', tarefas[index].conteudo);
    while (novoConteudo == ''){
        novoConteudo = prompt('Novo Conteudo:', tarefas[index].conteudo);
    }

    if (novoTitulo !== null && novoConteudo !== null) {
        tarefas[index] = { titulo: novoTitulo, conteudo: novoConteudo };
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        mostrarTarefas();
    }
}

function deletar(index){
    var confirmacao = confirm('Tem certeza de que deseja excluir esta tarefa?');
    if (confirmacao) {
        tarefas.splice(index, 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        mostrarTarefas();
    }
}
