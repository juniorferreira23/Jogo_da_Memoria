const game = { //Receber todas as váriavéis dentro de um elemento acho que é isso que é meio que criar uma biblioteca, tendo vários metodos dentro que tratam tipos de projetos.

    cards: [],

    techs: [ //Para criar uma lógica para algo primeiro temos que estabelecer todos os elementos que estaram presentes no projetos e cria-los.
        'bootstrap',
        'css',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongodb',
        'node',
        'react',
        'redux'
    ],

    firstCard: null,
    secondCard: null,

    createCards: function(){ // 1- Criando as 20 cartas do jogo
        
        this.techs.forEach(tech => {

            this.cards.push(this.createPairCard(tech))
        })

        this.cards = this.cards.flatMap(pair => pair) //flatMap() pegou um array de objetos que estavam separados em [{},{}],[{}{}],... e refez o array colocando todos os objetos dentro de um só array [{},{},{},{},...]

        this.cards = this.shuffleCards(this.cards)
    },

    createPairCard: function(tech){ //2- OBS: Eu fiquei em dúvida de como poderia fazer para trabalhar duas vezes com o valor em um loop, pensei em chamar outro loop dentro, mas aqui fiz como ensinado e foi de callback que retorna dois objetos em um array.
        return [{
            id: tech + this.createIdCard(),
            icon: tech,
            flipped: false
        },{
            id: tech + this.createIdCard(),
            icon: tech,
            flipped: false
        }]
    },

    createIdCard: function(){ // Gerando numero random para o Id
        return parseInt(Math.random() * 1000)
    },

    setCard: function(id){ // 6.2 - verificação para o flip retornando true para segui na função flipCard
        
        let card = this.cards.filter(card => card.id === id)[0] // Pega o obj card, filtra buscando o card.id que é igual ao id passado
        
        if(card.flipped){ //verificando se já foi virado a carta
            return false
        }

        if(!this.firstCard){ // Se a primeira carta estiver vazia

            this.firstCard = card
            this.firstCard.flipped = true // deixa claro no objeto que a carta esta virada
            return true
        }else if(!this.secondCard){// Se a segunda carta estiver vazia

            this.secondCard = card
            this.secondCard.flipped = true
            return true
        }
    },

    checkMatch: function(){ // 6.5 - verifica se as cartas são iguais

        if(this.firstCard.icon == this.secondCard.icon){

            return true
        }
    },

    unflipped: function(){ // 6.7- remove o flipped do obj
        
        this.firstCard.flipped = false
        this.secondCard.flipped = false
    },

    clearChoiceCards: function(){ // 6.9 - limpando as variaveis das duas escolhas de cartas
        game.firstCard = null
        game.secondCard = null
    },

    shuffleCards: function(arr){
        for (let i = arr.length - 1; i > 0; i--){

            const j = Math.floor(Math.random() * (i + 1)); //OBS bug encontrado ao usar a formula para um numero random tem que se usar ponto e vírgula se não não respeita o tempo de processo da constante j

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }
}