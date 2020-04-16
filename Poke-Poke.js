var user = require('readline-sync') //Biblioteca 
var axios = require('axios') //Biblioteca axios para usar,
var admin = require("firebase-admin");
var serviceAccount = require("./service-poke-poke.json");
var chalk = require('chalk')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://poke-poke-2e86e.firebaseio.com"
}); //Inicializar o firebase juntamente com a minha conta de firebase
//CONECTAR A FIREBASE
var pokepoke = 'Poke-Poke'
var datab = admin.database().ref(pokepoke)

//Pergunta 1 SOBRE "INSCREVER POKEMON"
function cadastrarPoke() {
  var cadastroDoPoke = user.question(' - Informe o nome ou ID do poke: ').toLowerCase() //
  axios.get(`https://pokeapi.co/api/v2/pokemon/${cadastroDoPoke}`)
    .then(resultadoDoPoke => {
      datab.push({
        cadastroDoPoke: cadastroDoPoke,
        pokemon: resultadoDoPoke.data.name,
        tipo: resultadoDoPoke.data.types,
        habilidades: resultadoDoPoke.data.abilities
      })

        //Caso dê algum erro ao cadastrar exibir essa mensagem
        .catch(erro => {
          console.log('Erro ao cadastrar. tente novamente')
          //E volta a aparecer o menu
          menu()
        })

      //Caso consiga cadastrar com sucesso, exibir essa mensagem
      console.log('Pokemon adicionado com sucesso!!!')
      //E volta a aparecer o menu
      menu()
    })

}

//Pergunta 2 SOBRE "APRESENTAR POKEMON"
function mostrarPoke() {
  datab.on('value', snapshot => {
    console.table(snapshot.val())
    menu()
  })
}



//Pergunta 3 SOBRE "EXIBIR POKEMON"
function idNome() {
  var perguntaNomeIdPokemon = user.question(' - Qual o nome ou id que deseja do pokemon? ').toLowerCase() //
  axios.get(`https://pokeapi.co/api/v2/pokemon/${perguntaNomeIdPokemon}`) //
    .then(resultadoIdPokemon => {
      var NomedoPoke = resultadoIdPokemon.data.name //para acessar dentro da api do nome do pokemon
      var TipodePoke = resultadoIdPokemon.data.types //para acessar dentro da api o tipo do pokemon
      var Habilid = resultadoIdPokemon.data.abilities //para acessar dentro da api as habilidades do pokeon
      console.log(chalk.yellow('Nome do Poke e:' + NomedoPoke.toUpperCase())) //
      console.log(chalk.red('Tipo do Poke e:'))
      TipodePoke.map(tipo => {
        console.log(chalk.red(tipo.type.name.toUpperCase()))
      }) //Faz andar em cada elemento, nesse caso estou a cor da informação pra verde e caminhando na pasta type no diretorio name com letra maiuscula
      console.log(chalk.blackBright('Habilidade do seu Poke e:')) //
      Habilid.map(hab => {
        console.log(chalk.blackBright(hab.ability.name.toUpperCase())) //

        menu() //chamando novamente o menu para perguntar se deseja fazer mais alguma operação.
      })

    })

    //CASO TENHA ALGUMA INFORMAÇÃO FORA DA API E DAS INFORMAÇÕES 
    .catch(error => {
      console.log(chalk.redBright('Informacao invalida, tente novamente.'.toUpperCase())) //
      menu()
    })
}
//Pergunta 6 SOBRE "SAIR DO MENU"
function sair() {
  process.exit()
}

// Perguntas iniciais 
function menu() {
  var pergunta1 = user.questionInt(' - Digite 1: Para Inscrever Pokemon.\n - Digite 2: Para Apresentar o Pokemon.\n - Digite 3: Para exibir Pokemon.\n - Digite 4: Para Apresentar os efeitos de habilidades.\n - Digite 5: Para Exibir Vantagem e Desvantagem do seu Pokemon.\n - Digite 6: Para Sair.\n')

  //Definição com IF para perguntas que fiz anteriormente
  if (pergunta1 === 1) {
    cadastrarPoke()
  } //Para cadastrar o Pokemon
  if (pergunta1 === 2) {
    mostrarPoke()
  } //Para apresentar o Pokemon
  if (pergunta1 === 3) {
    idNome()
  } //Para exibir o Pokemon
  // if (pergunta1 === 4) {
  // } //Para Apresentar efeitos e habilidades existente
  // if (pergunta1 === 5) {
  // } //Para exibir Vantagem e Desvantagem
  if (pergunta1 === 6) {
    sair()
  } //Para Sair do APP

}
menu()
