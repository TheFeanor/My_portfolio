// entername
var placeholder = document.querySelector('#placeholder')
var submit = document.querySelector('#submit')
var helloStranger = document.querySelector('#helloStranger')
var entername = document.querySelector('.entername')

function submitClicker() {
    console.log('clicked!')
    entername.classList.add('displaynone')
    helloStranger.textContent = 'Привіт, ' + placeholder.value + '! Радий бачити тебе на своєму сайті :)'
    helloStranger.classList.remove('displaynone')
}

submit.addEventListener('click', submitClicker)

// paint
var paint = document.getElementById('paint')
var ctx = paint.getContext('2d')
var myColor = 'red'

changeColor = function () {
    if (document.getElementById('red').checked) {
        myColor = document.getElementById('red').value
    } else if (document.getElementById('green').checked) {
        myColor = document.getElementById('green').value
    } else if (document.getElementById('blue').checked) {
        myColor = document.getElementById('blue').value
    } else if (document.getElementById('yellow').checked) {
        myColor = document.getElementById('yellow').value
    } else if (document.getElementById('purple').checked) {
        myColor = document.getElementById('purple').value
    } else {
        myColor = 'black'
    }
}


paint.onmousedown = function(event) {
    paint.onmousemove = function (event) {
                            
        var x = event.offsetX
        var y = event.offsetY   

        changeColor()
        ctx.fillStyle = myColor
        ctx.strokeStyle = myColor
        
        ctx.lineWidth = 20
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(x, y)
    }
    paint.onmouseup = function () {
        ctx.beginPath()
        paint.onmousemove = null
    }
}



// clearboard
var clearbutton = document.querySelector('#clearbutton')

function clearBoard() {
    ctx.clearRect(0, 0, paint.width, paint.height)
}

clearbutton.addEventListener('click', clearBoard)


//box-game

var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame () {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
    hide($start)

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)
        
        if (time <=0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = 'rgb(55, 204, 241)'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}


function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(20, 120)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.backgroundColor = randomColor()
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function randomColor() {
    var randomR = String(getRandom(0,255))
    var randomG = String(getRandom(0,255))
    var randomB = String(getRandom(0,255))
    return 'rgb(' + randomR + ', ' + randomG + ', ' + randomB + ')'
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}