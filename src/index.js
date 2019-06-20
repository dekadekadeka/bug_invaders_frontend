let score = 0
let gameStatus = false
let lives = 5
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("keydown", actions)
    const startBtn = document.getElementById("startButton")
    startBtn.addEventListener("click", gameStart)


    

    let missiles = [];
    let enemies = [];
    
    

    function gameStart(){
        if (user_id === 0){
            alert("Sign in to play!")
        }else{
            missiles = []
            gameStatus = true
            startBtn.disabled = true
        createEnemies()
        gameLoop()
        }
    }
    

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }


    function increaseScore(){
        const scoreDisplaySpan = document.getElementById("currentScoreSpan")
        scoreDisplaySpan.innerText = parseInt(scoreDisplaySpan.innerText) + 10 
        score = scoreDisplaySpan.innerText
        console.log(score)
    }

    function resetScore(){
        const scoreDisplaySpan = document.getElementById("currentScoreSpan")
        scoreDisplaySpan.innerText = 0 
        score = scoreDisplaySpan.innerText
        console.log(score)
    }

    function decreaseLives(){
        const currentLivesSpan = document.getElementById("currentLivesSpan")
        currentLivesSpan.innerText = parseInt(currentLivesSpan.innerText) -1
        lives = currentLivesSpan.innerText
        console.log(lives)
    }

    function resetLives(){
        const currentLivesSpan = document.getElementById("currentLivesSpan")
        currentLivesSpan.innerText = 5
        lives = currentLivesSpan.innerText
        console.log(lives)
    }
    
        let hero = {
            top: 960,
            left: 890
        };

   

    function moveHero() {
        document.getElementById("hero").style.left = hero.left + "px";
    }

    function actions(e){
            if (e.keyCode === 37 && gameStatus === true) {
                e.preventDefault()
                // console.log(hero.left)
                if(hero.left >= 280) {
                hero.left = hero.left - 30;
                
                moveHero()
                }
            } else if (e.keyCode === 39 && gameStatus === true) {
                e.preventDefault()
                // console.log("RIGHT")
                // console.log(hero.left)
                if(hero.left <= 1540)
                hero.left = hero.left + 30;
                moveHero()
            } else if (e.keyCode === 32 && gameStatus === true) {
                // console.log("FIRE")
                e.preventDefault()
                missiles.push({
                    left: hero.left + 15,
                    top: hero.top + 10 
                })
                drawMissiles()
                // console.log(missiles)
            }
    }

    function drawMissiles(){
        document.getElementById("missiles").innerHTML = ''
        for(i=0; i < missiles.length; i++) {
            document.getElementById("missiles").innerHTML += 
            `<div class='missile' style='left:${missiles[i].left}px; top:${missiles[i].top}px;'></div>`;
            missiles[i].top
            missiles[i].left
        }
    }

    function moveMissiles(){
        for(i=0; i < missiles.length; i++) {
            if(missiles[i].top > 260) {
            missiles[i].top = missiles[i].top - 10;
            } else {
                missiles.splice(i, 1)
            }
        }
    }

   
    function createEnemies() {
        for(i=0; i < getRandomArbitrary(1, 10) ; i++){
        enemies.push({top: 200, left: getRandomArbitrary(400, 1300)})
        }
    }

    function moveEnemies(){
        for(i=0; i < enemies.length; i++) {
            if (enemies[i].top < 950) {
            enemies[i].top = enemies[i].top + 10;
            } else {
                decreaseLives()
                enemies.splice(i, 1)
            }
        }
    }

    function drawEnemies(){
        document.getElementById("enemy").innerHTML = ''
        for(i=0; i < enemies.length; i++) {
            document.getElementById("missiles").innerHTML += `
            <div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px;'></div>`
        }
    }

    function collisionDetection(){
        for(k=0; k < enemies.length; k++) {
            for(i=0; i < missiles.length; i++) {
                if (
                    (missiles[i].top <= enemies[k].top + 50) &&
                    (missiles[i].top > enemies[k].top) &&
                    (missiles[i].left >= enemies[k].left) &&
                    (missiles[i].left <= enemies[k].left + 100)
                ){
                    console.log("HIT")
                    enemies.splice(k, 1)
                    missiles.splice(i, 1)
                    increaseScore()
                }
            }
        }
    }

    function gameLoop(){
        // let time = 100
        let timer = setTimeout(gameLoop, 50)
        moveMissiles()
        drawMissiles()
        if (enemies.length >= 1) {
        moveEnemies()
        drawEnemies()
        collisionDetection()

        } else if (lives <= 0){
            clearTimeout(timer)
            completeGame()
            
            
        } else if (enemies.length === 0) {
            createEnemies()
        } 
    }

    function completeGame(){
        alert("Oh snap GAME OVER!")
        saveGame()
        fetchGames()
        allTimeScores()
        resetLives()
        resetScore()
        gameStatus = false
        startBtn.disabled = false
        console.log("FINISHED")
    }
    

    const changeAvatarButton = document.getElementById("avatar")
    changeAvatarButton.addEventListener("click", function(){
        let num = Math.round(getRandomArbitrary(1,2))
        let hero = document.getElementById("hero")
        console.log(num)
        if (num === 1) {
            hero.style.backgroundImage = "url(assets/cat_transparent.png)"
        } else if (num === 2) {
            hero.style.backgroundImage = "url(assets/ninja_coder.png)"
        }
        console.log(hero)
    }) 

    



    


})






