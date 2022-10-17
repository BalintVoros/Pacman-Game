document.addEventListener('DOMContentLoaded', () => {

/************************* PÁLYA ELOKESZITESE***********************************/
  
/*** PONTSZAM ***/
  let score = 0
  let start = 0
  const scoreDisplay = document.getElementById('score')
  const width = 28

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,0,1,
    1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,1,0,1,1,0,1,0,1,
    1,0,0,0,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,0,1,1,
    1,1,0,1,1,1,0,1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1,
    1,1,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,
    1,0,1,0,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  ]
  // 0 - szabad helyek
  // 1 - fal


  let squares = []

  createBoard(squares, layout)

/****************************** **********************************/

/********************* ITT TESsZUK LE A PACMANT **********************/

/******** PACMAN LETETELE *************/
  class Pacman {
    constructor(currentIndex) {
      this.currentIndex = currentIndex
    }
  }

  let pacman = new Pacman(490)

  // squares[pacman.currentIndex].classList.add('pac-man')
/*********** ********/

/******* SZELLEMEK LETETELE ********/
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
    }
  }

  ghosts = [
    new Ghost('blinky', 29, 250),
    new Ghost('pinky', 49, 250),
    ]

    // ghosts.forEach(ghost => {
    //   squares[ghost.currentIndex].classList.add(ghost.className)
    //   squares[ghost.currentIndex].classList.add('ghost')
    // })
/*********** ********/


/****** PACMAN MOZGASA ******/
  function movePacman(e) {
    squares[pacman.currentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(
          pacman.currentIndex % width !== 0 &&
          !squares[pacman.currentIndex -1].classList.contains('wall')
          )
        pacman.currentIndex -= 1
        if (squares[pacman.currentIndex -1] === squares[363]) {
          pacman.currentIndex = 391
        }
        break
      case 38:
        if(
          pacman.currentIndex - width >= 0 &&
          !squares[pacman.currentIndex -width].classList.contains('wall') )
        pacman.currentIndex -= width
        break
      case 39:
        if(
          pacman.currentIndex % width < width - 1 &&
          !squares[pacman.currentIndex +1].classList.contains('wall')

        )
        pacman.currentIndex += 1
        if (squares[pacman.currentIndex +1] === squares[392]) {
          pacman.currentIndex = 364
        }
        break
      case 40:
        if (
          pacman.currentIndex + width < width * width &&
          !squares[pacman.currentIndex +width].classList.contains('wall')

        )
        pacman.currentIndex += width
        break
    }
    squares[pacman.currentIndex].classList.add('pac-man')

    pacDotEaten(pacman)
    checkForGameOver(pacman)
    checkForWin(pacman)
  }
/****************** ******************/


  function pacDotEaten(pacman) {
    if (squares[pacman.currentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacman.currentIndex].classList.remove('pac-dot')
    }
  }

function checkForGameOver(pacman) {

  if ( squares[pacman.currentIndex].classList.contains('ghost') &&

    !squares[pacman.currentIndex].classList.contains('scared-ghost') ) {

    ghosts.forEach(ghost => clearInterval(ghost.timerId))

    document.removeEventListener('keyup', movePacman)

    showMessage("Vége a játéknak")

    sendData()

    start = 0
  }
}


function checkForWin() {
  if (score === 250) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    showMessage("Megnyerted a játékot!")
    sendData()
    start = 0
  }
}
  

/***************** ITT INDUL EL A JATEK ***************/

const btn = document.querySelector("#start")

btn.addEventListener("click", (e) => {
  recreateMap()
  start = 1
  
  e.target.classList.add("disabled")
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
})

const reStart = document.querySelector("#restart")

reStart.addEventListener("click", (e) => {
  recreateMap()
  start = 1
  
  document.querySelector("#start").classList.add("disabled")
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
})

/************** *************************************/


function moveGhost(ghost) {
  const directions =  [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]

  checkForGameOver(pacman)
  }, ghost.speed)
}


/** TABLA LERAJZOLASA **/
function createBoard(squares, layout) {
  let grid = document.querySelector('.grid')
  grid.innerHTML = ""

  for ( let i = 0; i < layout.length; i++ ) {

    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    //FEL RAJZOLJUK A VASZNAT
    if( layout[i] === 0 ) {

      squares[i].classList.add('pac-dot')

    } else if ( layout[i] === 1 ) {

      squares[i].classList.add('wall')

    }
  }
}
/***** ******/

/**UZENET MUTATASA */
const showMessage = (msg) => {
  let myModal = new bootstrap.Modal(document.getElementById('myModal'))
  document.querySelector("#start").classList.remove("disabled")
  document.querySelector(".modal-body p").innerText = msg;
  myModal.show()
}
/*** ****/


function recreateMap () {
  score = 0
  squares = []
  start = 1
  createBoard(squares, layout)

  ghosts.forEach(ghost => {
    ghost.speed =  250      
  })

  ghosts[0].currentIndex = ghosts[0].startIndex
  ghosts[1].currentIndex = ghosts[1].startIndex

  pacman.currentIndex = 490

  ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost')
  })
  squares[pacman.currentIndex].classList.add('pac-man')
}

const sendData = () => {
  let data;

  data = {
    "points": document.querySelector("#score").innerText,
    "username": document.querySelector("#username").value
  }

  fetch('http://localhost/insertUser.php', {
    method: 'POST',
    headers:  {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data)
  })
  .catch((error) => {
      console.error('Error:', error)
  })
}


const createList = (list) =>{
  let result = "";

  for(let i = 0; i < list.length; i++)
    result += `<li class="list-group-item">${i+1}. Név: ${list[i].username}  pontok: ${list[i].points}</li>`;
  
  return result;
}

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 84) {
    let div1 = document.querySelector('#scoreboard');
    let div2 = document.querySelector('#helpdesk');

    if ( !div1.classList.contains('show') && !div2.classList.contains('show') ) {
      fetch('http://localhost/topusers.php', {
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
        let result = `<ul class="list-group list-group-flush">
            ${createList(data)}
        </ul>`
  
        let scores = new bootstrap.Modal(document.getElementById('scoreboard'))
        document.querySelector("#scoreboard .modal-body p").innerHTML = result;
        scores.show()
      })
      .catch((error) => {
          console.error('Error:', error)
      })
    }
  }

  if (e.keyCode == 72) {
    let div1 = document.querySelector('#scoreboard');
    let div2 = document.querySelector('#helpdesk');

    if (!div1.classList.contains('show') && !div2.classList.contains('show') ) {
      let helpdesk = new bootstrap.Modal(document.getElementById('helpdesk'))
      helpdesk.show()
    }
  }
})
//s betű gyorsítás
window.addEventListener("keyup", (e) => {
  if (start == 1) {
    if (e.keyCode == 83) {

      ghosts.forEach(ghost => {
          ghost.speed =  Math.round(ghost.speed*0.9)
      })
  
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      ghosts.forEach(ghost => moveGhost(ghost))
    }
//c betű lassítás
    if (e.keyCode == 67) {

      ghosts.forEach(ghost => {
          ghost.speed =  Math.round(ghost.speed*1.1)
      })
  
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      ghosts.forEach(ghost => moveGhost(ghost))
    }
  }

})

})