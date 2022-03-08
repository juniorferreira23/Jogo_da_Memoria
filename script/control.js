const FRONT = 'front_card'
const BACK = 'back_card'

startGame()

function startGame(){

    initializeCards(game.createCards())
}

function initializeCards(cards){ // 3- Criando os cards views na pagina

    let gameBoard = document.querySelector('.game_board')
    gameBoard.innerHTML = '' //Limpando o tabuleiro

    game.cards.forEach(card => { 

        let divCard = document.createElement('div') // 4- Criando a div carta
        divCard.classList.add('card')
        divCard.id = card.id
        divCard.dataset.icon = card.icon

        divCard.addEventListener('click', flipCard)

        divCard.appendChild(createCardFace(FRONT, card))
        divCard.appendChild(createCardFace(BACK, card))

        gameBoard.appendChild(divCard)
    });
}

function createCardFace(face, card){ // 5- Criando as Faces da carta

    let divFace = document.createElement('div')

    if(face == FRONT) {
        
        divFace.classList.add(face)

        let divImg = document.createElement('img')
        divImg.src = 'img/' + card.icon + '.png'

        divFace.appendChild(divImg)
        
    }else{

        divFace.classList.add(face)

        divFace.innerHTML = '&lt/&gt'
    }

    return divFace
}

function flipCard() { // 6.1- Criando o flip de cartas
    
    if(game.setCard(this.id)){ // 6.3- verificação se as duas cartas foram selecionadas

        this.classList.add('flip')

        if(game.firstCard && game.secondCard){ // 6.4 verifica se tem as duas cartas

            if(!game.checkMatch()){ // 6.6 - checa se a primeira e segunda carta são diferentes ou iguais
                game.unflipped()
                clearCards()
            }else if(game.checkMatch()){
                console.log('iguais!')
                game.clearChoiceCards()
            }
        }
    }
    
}

function clearCards(){ // 6.8- desvira as cartas e limpa as variaveis firstCard e secondCard
    
    setTimeout(() => {
        let firstCardView = document.getElementById(game.firstCard.id)
        firstCardView.classList.remove('flip')

        let secondCardView = document.getElementById(game.secondCard.id)
        secondCardView.classList.remove('flip')

        game.clearChoiceCards()
    }, 1000);

    
}













































// function createCards(){
//     let gameBoard = document.querySelector('.game_board')

//     game.techs.forEach(tech => {
//         let divCard = document.createElement('div')
//         divCard.classList.add('card')
//         divCard.id = tech + parseInt(Math.random() * 100)
//         divCard.dataset.icon = tech

//         divCard.appendChild(createCardFace(FRONT, tech))
//         divCard.appendChild(createCardFace(BACK,tech))
        
//         gameBoard.appendChild(divCard)
        
//     })
// }

// function createCardFace(face, tech){
//     if(face == FRONT){
//         let divFrontCard = document.createElement('div')
//         divFrontCard.classList.add('front_card')

//         let divFrontCardImg = document.createElement('img')
//         divFrontCardImg.src =  'img/' + tech + '.png'

//         divFrontCard.appendChild(divFrontCardImg)

//         return divFrontCard

//     }else{
//         let divBackCard = document.createElement('div')
//         divBackCard.classList.add('back_card')
//         divBackCard.innerHTML = '&lt/&gt'

//         return divBackCard
//     }
// }