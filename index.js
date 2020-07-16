let scrapsField = document.querySelector("#scrapsField");
let title = document.querySelector("#titleInput");
let messageField = document.querySelector("#messageField");
let addButton = document.querySelector("#addButton");
let position = 0;

let mensagens = JSON.parse(localStorage.getItem("message_list")) || []; //inicializa um array com as mensagens armazenadas.

function renderizaMensagem() {
  //loop que carrega as mensagens do array acima
  for (var i = 0; i < mensagens.length; i++) {
    let scrapfieldElementBox = document.createElement("div"); //cria caixa
    let scrapfieldElementHeader = document.createElement("div"); //cria o titulo da caixa
    let scrapfieldElementBody = document.createElement("div"); //cria o lugar onde vai a mensagem da caixa
    let message = document.createElement("p"); //recebe a mensagem da caixa

    //setta os atributos da caixa de acordo com o bootstrap
    scrapfieldElementBox.setAttribute(
      "class",
      `-webkit message-cards card text-white bg-dark m-2 col-3 caixa${position}`
    );
    scrapfieldElementHeader.setAttribute("class", "card-header");
    scrapfieldElementBody.setAttribute("class", "card-body");
    message.setAttribute("class", "card-text");
    6;

    scrapfieldElementHeader.innerHTML = `${mensagens[i].titulo}`;
    message.innerHTML = `${mensagens[i].mensagem}`;

    //coloca um dentro do outro bonitinho pra não ter briga
    scrapsField.appendChild(scrapfieldElementBox);
    scrapfieldElementBox.appendChild(scrapfieldElementHeader);
    scrapfieldElementBox.appendChild(scrapfieldElementBody);
    scrapfieldElementBody.appendChild(message);
  }
}

renderizaMensagem();

function criaMensagem() {
  //variaveis
  let construtor = { titulo: title.value, mensagem: messageField.value };

  let scrapfieldElementBox = document.createElement("div"); //cria caixa
  let scrapfieldElementHeader = document.createElement("div"); //cria o titulo da caixa
  let scrapfieldElementBody = document.createElement("div"); //cria o lugar onde vai a mensagem da caixa
  let message = document.createElement("p"); //recebe a mensagem da caixa

  //setta os atributos da caixa de acordo com o bootstrap
  scrapfieldElementBox.setAttribute(
    "class",
    `-webkit message-cards card text-white bg-dark m-2 col-3`
  );
  scrapfieldElementHeader.setAttribute("class", "card-header");
  scrapfieldElementBody.setAttribute("class", "card-body");
  message.setAttribute("class", "card-text");

  //verifica se os campos não estão em branco para prosseguir com o código
  if (
    (document.getElementById("titleInput").value &&
      document.getElementById("messageField").value) !== ""
  ) {
    if (addButton.classList.contains("btn-danger")) {
      //verifica se o botão está vermelho
      addButton.innerHTML = "Adicionar"; //muda mensagem para <
      addButton.classList.remove("btn-danger"); //remove a cor vermelha
      addButton.classList.add("btn-dark"); //adiciona a cor preta
    }
    //setta os valores de título e mensagem de acordo com o que estiver nos campos respectivos do site
    scrapfieldElementHeader.innerHTML = `${construtor.titulo}`;
    message.innerHTML = `${construtor.mensagem}`;

    //coloca um dentro do outro bonitinho pra não ter briga
    scrapsField.appendChild(scrapfieldElementBox);
    scrapfieldElementBox.appendChild(scrapfieldElementHeader);
    scrapfieldElementBox.appendChild(scrapfieldElementBody);
    scrapfieldElementBody.appendChild(message);

    mensagens.push(construtor); //coloca o objeto construtor dentro de um array
    saveInStorage(); //salva o código no armazenamento
  } else {
    addButton.innerHTML =
      "Por favor, escreva algo no título e/ou no campo de mensagem!"; //muda a mensagem para <
    addButton.classList.remove("btn-dark"); //remove a cor preta
    addButton.classList.add("btn-danger"); //adiciona a cor vermelha
  }
}

//função que inicializa o armazenamento:
function saveInStorage() {
  localStorage.setItem("message_list", JSON.stringify(mensagens));
}

// função para excluir as mensagens
function deleteMessage(position) {
  mensagens.splice(position, 1);
  criaMensagem();
  saveInStorage();
}
