import "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUJOkUtn1K6fXByPv7s0jJqzcl321EExI",
    authDomain: "minha-semana-b0f1d.firebaseapp.com",
    projectId: "minha-semana-b0f1d",
    storageBucket: "minha-semana-b0f1d.appspot.com",
    messagingSenderId: "365545587087",
    appId: "1:365545587087:web:1595facb659070b2d8cbfa",
    measurementId: "G-CQM194SX69"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

// Declarando algumas variáveis que serão usadas.
var db = firebase.firestore()

const MINHA_SEMANA_COLLECTION = 'usersMinhaSemana'

const USER_UID = localStorage.getItem('uid')
const COLLECTION = db.collection(MINHA_SEMANA_COLLECTION)
const DOC_REF = db.collection(MINHA_SEMANA_COLLECTION).doc(USER_UID)

var tarefas = new Object()
var countTarefasRealizadas = 0

var ids = []
var delTarefa = []
var concTarefa = []

var tarConc = document.getElementById("tarefasConcluidas")
var mostrarTarefa = document.querySelectorAll('.mostrarTarefaDoDia')
var tables = document.querySelectorAll("table")
var addTarefa = document.querySelectorAll('.botaoAdd')
var btnEsc = document.querySelectorAll('.botaoEsc')


tables.forEach(function(el){
    ids.push(el.id) 
})

// Função para buscar as informações salvas do localStorage e exibir ao usuário.
onload = DOC_REF.get().then( doc => {
        
    tarefas = {}
    tarefas = doc.data()

    if(!tarefas){
        DOC_REF.set({})
    }

    Object.keys(tarefas).forEach( dayWeek => {

        let keysWeekDay = tarefas[dayWeek]

        Object.keys(keysWeekDay).forEach( hour => {

            let keysHourDay = keysWeekDay[hour]

            if(keysHourDay.checked == true){

                countTarefasRealizadas += 1
                document.getElementById(dayWeek).innerHTML += '<tr><td>' +hour+ '</td><td>'+ keysHourDay.task +'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/checked.png"></td></tr></label>';
            }
            else{
                document.getElementById(dayWeek).innerHTML += '<tr><td>' +hour+ '</td><td>'+ keysHourDay.task +'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/no-checked.png"></td></tr></label>';
            }
        })    
    })
    tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
    getDeletarEConcluirTarefas()
})

// Função para adicionar uma nova tarefa no localStorage e no HTML.
addTarefa.forEach((el) => {

    el.addEventListener('click', () => {

        let styleInputArea = el.previousElementSibling.style;
        let taskHour = el.previousElementSibling.children[0].children[0].value;
        let taskValue = el.previousElementSibling.children[1].value;
        let getIdDayWeek = el.previousElementSibling.previousElementSibling.id
        
        if (styleInputArea.display == 'none'){
            styleInputArea.display = 'inline-block';
        }
        else{

            DOC_REF.get().then( doc => {
                
                tarefas = {}
                tarefas = doc.data()
                
                if(tarefas[getIdDayWeek]){
                    if(taskHour == ""){
                        alert("Por favor, defina um horário para sua tarefa!")
                    }
                    else if(taskHour in tarefas[getIdDayWeek]){
                        alert("Você não pode deifinir duas tarefas com o mesmo horário")
                    }
                    else{
    
                        document.getElementById(getIdDayWeek).innerHTML += '<tr><td>' +taskHour+ '</td><td>'+taskValue+'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/no-checked.png"></td></tr>';
                        getDeletarEConcluirTarefas()

                        DOC_REF.set({
    
                            [getIdDayWeek]: {
                                [taskHour]: {
                                    task: taskValue,
                                    checked: false
                                }
                            }
                        },{merge: true})
                    }
                }
                else {

                    document.getElementById(getIdDayWeek).innerHTML += '<tr><td>' +taskHour+ '</td><td>'+taskValue+'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/no-checked.png"></td></tr>';
                    getDeletarEConcluirTarefas()

                    DOC_REF.set({
    
                        [getIdDayWeek]: {
                            [taskHour]: {
                                task: taskValue,
                                checked: false
                            }
                        }
                    },{merge: true})
                }   
            })    
        }        
    })
})

// Função para deletar todas as tarefas/tarefas concluídas do localStorage e faz o reload da página.
botaoDel.addEventListener('click', () => {
    let conf = confirm('Você deseja realmente deletar todas as tarefas?');

    if(conf === true){
        DOC_REF.delete().then(() => {

            document.location.reload(true)
        })
    }
})

// Função para fechar a area de input caso o usuário não queira add nenhuma tarefa.
btnEsc.forEach((el) => {
    el.addEventListener('click', () => {
        el.parentNode.style.display = 'none'
    })
})

// Função que apenas exibe/esconde as tarefas relacionadas ao dia da semana clicado.
mostrarTarefa.forEach((el, index) => {
    el.addEventListener('click', () => {

        let input = el.nextElementSibling.nextElementSibling
        let btn = el.nextElementSibling.nextElementSibling.nextElementSibling

        if(el.nextElementSibling.style.display == "none"){
            el.nextElementSibling.style.display = "table"
        }

        else{
            el.nextElementSibling.style.display = "none"
            input.style.display = "none"
        }

        if(btn.style.display == "none"){
            btn.style.display = "inline-block"
        }

        else{
            btn.style.display = "none"
        }
    })
})

// Função para dar um check nas tarefas concluídas salvando-as no localStorage e puxando o length de todas elas para exibir a quantidade no HTML.
function getDeletarEConcluirTarefas(){

    delTarefa = document.querySelectorAll('.delTarefa')
    concTarefa = document.querySelectorAll('.concTarefa')

    delTarefa.forEach((el) => {
        el.addEventListener('click', () => {
            
            tarefas = {}
            countTarefasRealizadas = 0
            
            let key = el.parentNode.parentNode.parentNode.parentNode.id
            let obj = el.parentNode.previousElementSibling.previousElementSibling.innerHTML
            let element = el.parentNode.parentNode

            element.parentElement.remove()

            DOC_REF.get().then( doc => {

                tarefas = doc.data()[key]
                delete tarefas[obj]

                DOC_REF.update({
                    [key]: firebase.firestore.FieldValue.delete()
                })

                Object.keys(tarefas).forEach( hour => {
                    
                    console.log(hour)
                    DOC_REF.set({
                        [key]: {
                            [hour]: {
                                task: tarefas[hour].task,
                                checked: tarefas[hour].checked
                            }
                        }
                    },{merge: true})
                })
                
            })
        })
        
    })

    concTarefa.forEach((el) => {
        el.addEventListener('click', () =>{

            tarefas = {}

            let dia = el.parentNode.parentNode.parentNode.parentNode.id
            let hour = el.parentNode.previousElementSibling.previousElementSibling.innerHTML
            console.log(hour)
            let origin = window.location.origin
            let arrPathName = window.location.pathname.split('/')
            arrPathName.splice(arrPathName.length - 1, 1, 'imagens/no-checked.png')

            if(el.src == origin + arrPathName.join('/')){

                el.src = "imagens/checked.png"

                DOC_REF.set({
                    
                    [dia]: {
                        [hour]: {
                            checked: true
                        }
                    }
                },{merge: true})

                countTarefasRealizadas += 1
                tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
            }
            else{
                el.src="imagens/no-checked.png"

                DOC_REF.set({
                    
                    [dia]: {
                        [hour]: {
                            checked: false
                        }
                    }
                },{merge: true})

                countTarefasRealizadas -= 1
                tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
            }
        })
    })
}