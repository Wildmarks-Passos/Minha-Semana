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

firebase.initializeApp(firebaseConfig);

// Declarando algumas variáveis que serão usadas.
tarefas = new Object()
var countTarefasRealizadas = 0
tarConc = document.getElementById("tarefasConcluidas")
var ids = []

tables = document.querySelectorAll("table")

tables.forEach(function(el){
  ids.push(el.id) 
})

// Função para buscar as informações salvas do localStorage e exibir ao usuário.
onload = function(){


  for(var i = 0;i < tables.length;i++){
    if(ids[i] in localStorage){
      tarefas = {}
      tarefas = JSON.parse(localStorage.getItem(ids[i]));
      tarefasConc = JSON.parse(localStorage.getItem(ids[i]+"_checkeds"))

      countTarefasRealizadas += Object.keys(tarefasConc).length
      let quant = Object.keys(tarefas);
      for(var j = 0;j < quant.length;j++){

        objs = Object.keys(tarefas);
        valores = Object.values(tarefas);
        
        if(objs[j] in tarefasConc){
          document.getElementById(ids[i]).innerHTML += '<tr><td>' +objs[j]+ '</td><td>'+ valores[j] +'</td><td><img onclick="delTarefa(this)" src="imagens/lixeira.jpg"><img onclick="concTarefa(this)" src="imagens/checked.png"></td></tr></label>';
        }else{
          document.getElementById(ids[i]).innerHTML += '<tr><td>' +objs[j]+ '</td><td>'+ valores[j] +'</td><td><img onclick="delTarefa(this)" src="imagens/lixeira.jpg"><img onclick="concTarefa(this)" src="imagens/no-checked.png"></td></tr></label>';
        }
      }
    }
  }
  tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
}

// Função para adicionar uma nova tarefa no localStorage e no HTML.
function addTarefa(set, set2, set3, set4){
  
  a = document.getElementById(set).style.display;

  b = document.getElementById(set3).value;

  c = document.getElementById(set4).value;

  if (a === 'none'){
    document.getElementById(set).style.display = 'inline-block';
    if (localStorage.getItem(set2) == null){
      tarefas = {};
      localStorage.setItem(set2, JSON.stringify(tarefas));
      localStorage.setItem(set2+"_checkeds", JSON.stringify(tarefas));
    }
  }
  else {

    tarefas = JSON.parse(localStorage.getItem(set2));
    if(b == ""){
      alert("Por favor, defina um horário para sua tarefa!")
    }
    else if(b in tarefas){
      alert("Você não pode deifinir duas tarefas com o mesmo horário")
    }
    else{
      tarefas[b] = c;
      localStorage.setItem(set2, JSON.stringify(tarefas));
      
      document.getElementById(set2).innerHTML += '<tr><td>' +b+ '</td><td>'+c+'</td><td><img onclick="delTarefa(this)" src="imagens/lixeira.jpg"><img onclick="concTarefa(this)" src="imagens/no-checked.png"></td></tr>';
    }
  }
}

// Função para deletar todas as tarefas/tarefas concluídas do localStorage e faz o reload da página.
function delTarefaAll(set) {

  conf = confirm('Você deseja realmente deletar todas as tarefas?');

  if(conf === true){
    localStorage.clear()
    document.location.reload(true)
  }
}

// Função para fechar a area de input caso o usuário não queira add nenhuma tarefa.
function botaoEsc(set){

  document.getElementById(set).style.display = 'none';
}

// Função que apenas exibe/esconde as tarefas relacionadas ao dia da semana clicado.
function mostrarTarefas(set){

  el = set.nextElementSibling
  input = set.nextElementSibling.nextElementSibling
  btn = set.nextElementSibling.nextElementSibling.nextElementSibling
  if(el.style.display == "none"){
    el.style.display = "table"
  }
  else{
    el.style.display = "none"
    input.style.display = "none"
  }

  if(btn.style.display == "none"){
    btn.style.display = "inline-block"
  }
  else{
    btn.style.display = "none"
  }
}

// Função para deletar apenas a tarefa selecionada.
function delTarefa(set){
  tarefas = {}
  countTarefasRealizadas = 0

  key = set.parentNode.parentNode.parentNode.parentNode.id
  obj = set.parentNode.previousElementSibling.previousElementSibling.innerHTML
  tarefas = JSON.parse(localStorage.getItem(key))
  el = set.parentNode.parentNode
  delete tarefas[obj]
  el.parentElement.remove()
  localStorage.setItem(key, JSON.stringify(tarefas))
  tarefas = JSON.parse(localStorage.getItem(key+"_checkeds"))
  delete tarefas[obj]
  localStorage.setItem(key+"_checkeds", JSON.stringify(tarefas))

  ids.forEach(function(el){
      if(el+"_checkeds" in localStorage){
        tarefas = JSON.parse(localStorage.getItem(el+"_checkeds"))
        countTarefasRealizadas += Object.keys(tarefas).length
      }
    })
    
  tarConc.innerHTML = countTarefasRealizadas + " Tarefas concluídas"
}

// Função para dar um check nas tarefas concluídas salvando-as no localStorage e puxando o length de todas elas para exibir a quantidade no HTML.
function concTarefa(set){
  tarefas = {}
  countTarefasRealizadas = 0
  var dia = set.parentNode.parentNode.parentNode.parentNode.id
  var key = set.parentNode.previousElementSibling.previousElementSibling.innerHTML

  if(set.src == "https://wildmarks-passos.github.io/Minha-Semana/dashboard/imagens/no-checked.png"){
    set.src="imagens/checked.png"

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
    set.src="imagens/no-checked.png"

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
}