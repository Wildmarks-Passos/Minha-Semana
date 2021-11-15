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
var tarefas = new Object()
var countTarefasRealizadas = 0
var tarConc = document.getElementById("tarefasConcluidas")
var ids = []
var delTarefa = []
var concTarefa = []
var mostrarTarefa = document.querySelectorAll('.mostrarTarefaDoDia')
var tables = document.querySelectorAll("table")
var addTarefa = document.querySelectorAll('.botaoAdd')
var btnEsc = document.querySelectorAll('.botaoEsc')

tables.forEach(function(el){
  ids.push(el.id) 
})

// Função para buscar as informações salvas do localStorage e exibir ao usuário.
onload = function(){

    for(var i = 0;i < tables.length;i++){
    if(ids[i] in localStorage){
        tarefas = {}
        tarefas = JSON.parse(localStorage.getItem(ids[i]));
        let tarefasConc = JSON.parse(localStorage.getItem(ids[i]+"_checkeds"))

        countTarefasRealizadas += Object.keys(tarefasConc).length
        let quant = Object.keys(tarefas);
        for(var j = 0;j < quant.length;j++){

        let objs = Object.keys(tarefas);
        let valores = Object.values(tarefas);
        
        if(objs[j] in tarefasConc){
            document.getElementById(ids[i]).innerHTML += '<tr><td>' +objs[j]+ '</td><td>'+ valores[j] +'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/checked.png"></td></tr></label>';
        }else{
            document.getElementById(ids[i]).innerHTML += '<tr><td>' +objs[j]+ '</td><td>'+ valores[j] +'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/no-checked.png"></td></tr></label>';
        }
        }
    }
    }
    tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
    
    getDeletarEConcluirTarefas()
    console.log(delTarefa)

}

// Função para adicionar uma nova tarefa no localStorage e no HTML.
addTarefa.forEach((el) => {

    el.addEventListener('click', () => {

        let a = el.previousElementSibling.style;

        let b = el.previousElementSibling.children[0].children[0].value;

        let c = el.previousElementSibling.children[1].value;

        let d = el.previousElementSibling.previousElementSibling.id

        if (a.display == 'none'){
          a.display = 'inline-block';

          if (localStorage.getItem(d) == null){
            tarefas = {};
            localStorage.setItem(d, JSON.stringify(tarefas));
            localStorage.setItem(d+"_checkeds", JSON.stringify(tarefas));
          }
        }
        else {
      
          tarefas = JSON.parse(localStorage.getItem(d));
          if(b == ""){
            alert("Por favor, defina um horário para sua tarefa!")
          }
          else if(b in tarefas){
            alert("Você não pode deifinir duas tarefas com o mesmo horário")
          }
          else{
            tarefas[b] = c;
            localStorage.setItem(d, JSON.stringify(tarefas));
            
            document.getElementById(d).innerHTML += '<tr><td>' +b+ '</td><td>'+c+'</td><td><img class="delTarefa" src="imagens/lixeira.jpg"><img class="concTarefa" src="imagens/no-checked.png"></td></tr>';
          }
        }
        getDeletarEConcluirTarefas()
    })
})


// Função para deletar todas as tarefas/tarefas concluídas do localStorage e faz o reload da página.
botaoDel.addEventListener('click', () => {
    let conf = confirm('Você deseja realmente deletar todas as tarefas?');

    if(conf === true){
    localStorage.clear()
    document.location.reload(true)
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
            tarefas = JSON.parse(localStorage.getItem(key))
            let element = el.parentNode.parentNode
            delete tarefas[obj]
            element.parentElement.remove()
            localStorage.setItem(key, JSON.stringify(tarefas))
            tarefas = JSON.parse(localStorage.getItem(key+"_checkeds"))
            delete tarefas[obj]
            localStorage.setItem(key+"_checkeds", JSON.stringify(tarefas))
    
            ids.forEach(function(ele){
                if(ele+"_checkeds" in localStorage){
                    tarefas = JSON.parse(localStorage.getItem(ele+"_checkeds"))
                    countTarefasRealizadas += Object.keys(tarefas).length
                }
                })
                
            tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
        })
        
    })

    concTarefa.forEach((el) => {
        el.addEventListener('click', () =>{
            tarefas = {}
            countTarefasRealizadas = 0
            let dia = el.parentNode.parentNode.parentNode.parentNode.id
            let key = el.parentNode.previousElementSibling.previousElementSibling.innerHTML
            let origin = window.location.origin
            let arrPathName = window.location.pathname.split('/')
            arrPathName.splice(arrPathName.length - 1, 1, 'imagens/no-checked.png')

            if(el.src == origin + arrPathName.join('/')){

                el.src = "imagens/checked.png"

                tarefas = JSON.parse(localStorage.getItem(dia+"_checkeds"))

                tarefas[key] = "checked"
                
                localStorage.setItem(dia+"_checkeds", JSON.stringify(tarefas))
                
                ids.forEach(function(el){
                if(el+"_checkeds" in localStorage){
                    tarefas = JSON.parse(localStorage.getItem(el+"_checkeds"))
                    countTarefasRealizadas += Object.keys(tarefas).length
                }
                })

                tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
            }
            else{
                el.src="imagens/no-checked.png"

                tarefas = JSON.parse(localStorage.getItem(dia+"_checkeds"))

                delete tarefas[key]

                localStorage.setItem(dia+"_checkeds", JSON.stringify(tarefas))
                
                ids.forEach(function(el){
                if(el+"_checkeds" in localStorage){
                    tarefas = JSON.parse(localStorage.getItem(el+"_checkeds"))
                    countTarefasRealizadas += Object.keys(tarefas).length
                }
                })

                tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
            }
        })
    })
}
