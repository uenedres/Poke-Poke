var user = require('readline-sync') //Biblioteca 
var axios = require('axios') //Biblioteca axios para usar,
var admin = require("firebase-admin");
var serviceAccount = require("./credenciais-pokemon.json");
var chalk = require('chalk')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pokemon-efe82.firebaseio.com"
});

// Perguntas iniciais 
function menu() {
  var pergunta1 = user.questionInt('Digite 1: Para Inscrever Pokemon') 
  var pergunta2 = user.questionInt('Digite 2: Para Apresentar o Pokemon')
  var pergunta3 = user.questionInt('Digite 3: Para exibir Pokemon')
  var pergunta4 = user.questionInt('Digite 4: Para Apresentar os efeitos de habilidades')
  var pergunta5 = user.questionInt('Digite 5: Para Exibir Vantagem e Desvantagem do seu Pokemon')
  var pergunta6 = user.questionInt('Digite 6: Para Sair')