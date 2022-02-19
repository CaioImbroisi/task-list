let list = document.querySelector('#lista-tarefas')
let btnAdd = document.querySelector('#criar-tarefa');
let btnRemoveAll = document.querySelector('#apaga-tudo');
let btnRemoveDone = document.querySelector('#remover-finalizados');
let btnRemoveSelected = document.querySelector('#remover-selecionado')
let btnSave = document.querySelector('#salvar-tarefas')
let btnMoveUp = document.querySelector('#mover-cima')
let btnMoveDown = document.querySelector('#mover-baixo')
let btnTheme = document.querySelector('#mudar-tema')
//Função para o botão adicionar itens a lista (Verifiquei na W3Schools sobre como
//adicionar o conteúdo escrito na input.(usando .value))

function addTask() {
    let taskList = document.querySelector('#lista-tarefas');
    let li = document.createElement('li');
    let inputText = document.querySelector('#texto-tarefa').value;
    li.className = 'listItems'
    li.textContent = inputText;
    taskList.appendChild(li)
    document.querySelector('#texto-tarefa').value = '';
}
btnAdd.addEventListener('click', addTask)


//remover tudo
function resetTask() {
    let taskList = document.querySelectorAll('.listItems')
    for (i = 0; i < taskList.length; i += 1) {
        taskList[i].remove()
    }
}
btnRemoveAll.addEventListener('click', resetTask)

// Remover Finalizados
function removeDoneTask() {
    let taskList = document.querySelectorAll('.completed')
    for (i = 0; i < taskList.length; i += 1)
        taskList[i].remove()
}
btnRemoveDone.addEventListener('click', removeDoneTask)

//Remover Selecionados
function removeSelectedTask() {
    let taskList = document.querySelectorAll('.item-selected')
    for (i = 0; i < taskList.length; i += 1)
        taskList[i].remove()
}
btnRemoveSelected.addEventListener('click', removeSelectedTask)


// Marcar de cinza ao clicar (consultei os trabalhos de alguns alunos)
function markTask(event) {
    let selectedItem = document.querySelector('.item-selected')
    if (selectedItem) {
        selectedItem.classList.remove('item-selected')
    }
    event.target.classList.add('item-selected')
}
list.addEventListener('click', markTask);


// Adicionar palavra riscada na tarefa (tive que consultar a documentação sobre como verificar
// se um elemento/classe contem algo e descobri o contains)
function riskTask(event) {
    if (event.target.classList.contains('completed')) {
        event.target.classList.remove('completed');
    } else {
        event.target.classList.add('completed');
    }
}
list.addEventListener('dblclick', riskTask);


// Salvar as tarefas no Local Storage (consultei a documentação da Trybe)
function saveTask() {
    let taskList = document.querySelector("ol");
    localStorage.setItem("taskList", taskList.innerHTML)
}
btnSave.addEventListener('click', saveTask)

window.onload = function () {
    let items = localStorage.getItem("taskList");
    let taskList = document.querySelector("ol");
    taskList.innerHTML = items;
}


// Mover item selecionado para cima 
//(https://www.w3schools.com/jsref/met_node_insertadjacentelement.asp)
//(https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)
function moveTaskUp() {
    if (checkItemSelected() && allowedToMoveUp()) {
        let selectedItem = document.querySelector('.item-selected')
        let moveTo = selectedItem.previousElementSibling;
        moveTo.insertAdjacentElement('beforebegin', selectedItem)
    }
}
btnMoveUp.addEventListener('click', moveTaskUp)


// Mover item selecionado para baixo
function moveTaskDown() {
    if (checkItemSelected() && allowedToMoveDown()) {
        let selectedItem = document.querySelector('.item-selected')
        let moveTo = selectedItem.nextElementSibling;
        moveTo.insertAdjacentElement('afterend', selectedItem)
    }
}
btnMoveDown.addEventListener('click', moveTaskDown)

// Esta função verifica se há itens selecionados (item da lista com BG cinza).
// Esta função esta aplicada nas funções "MoveTaskUp" e "MoveTaskDown".
// A aplicação desta função foi necessária para passar no NPM Test
// porém não vi problemas para o usuário final, apenas gera erro no console.
function checkItemSelected() {
    let checkGray = document.querySelector('.item-selected')
    if (checkGray === null || checkGray === undefined) {
        return false
    } else {
        return true;
    }
}


//Esta função verifica se o item selecinado esta próximo ao seu elemento pai (ol)
//Caso ao apertar "Mover Para Cima" seja o elemento pai (ol), ele retorna False
//e não gera erro ao forçar subir o item mesmo quando esta fora dos limites da lista.
//Conteúdo retirado do estudo de repositórios de alunos envolvidos no projeto.
// Aluna: Isadora Saraiva - Obrigado :)
function allowedToMoveUp() {
    let selectedItem = document.querySelector('.item-selected');
    let moveUpLimit = document.querySelector('#lista-tarefas');
    if (selectedItem === moveUpLimit.firstElementChild) {
        return false;
    }
    return true;
}


//Esta função verifica se o item selecinado esta na última posição da lista.
//Caso ao apertar "Mover Para Baixo" além do fim da lista, ele retorna False
//e não gera erro ao forçar descer o item mesmo quando não é possível.
//Conteúdo retirado do estudo de repositórios de alunos envolvidos no projeto.
// Aluna: Isadora Saraiva - Obrigado :)
function allowedToMoveDown() {
    let selectedItem = document.querySelector('.item-selected');
    let moveDownLimit = document.querySelector('#lista-tarefas');
    if (selectedItem === moveDownLimit.lastElementChild) {
        return false;
    }
    return true;
}



//Função para mudar os temas :)
function changeTheme() {
    let body = document.body;
    body.classList.toggle('body-dark');
    let title = document.querySelector('.titleBG')
    title.classList.toggle('titleBG-dark')
    let container = document.querySelector('.container')
    container.classList.toggle('container-dark')
    let bgList = document.querySelector('.bglist')
    bgList.classList.toggle('bglist-dark')
    let bgInput = document.querySelector('.bginput')
    bgInput.classList.toggle('bginput-dark')
    let bgButtons = document.querySelector('.bgbuttons')
    bgButtons.classList.toggle('bgbuttons-dark')
}
btnTheme.addEventListener('click', changeTheme);