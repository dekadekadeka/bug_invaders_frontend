document.addEventListener("DOMContentLoaded", function(){
    fetchComments()
    // gameStart()
    document.addEventListener("keydown", actions)
    

    function fetchComments(){
        fetch("http://localhost:3000/api/v1/comments")
        .then(res => res.json())
        .then(data => populateComments(data))
    }

    function populateComments(comments){
        comments.forEach(comment => {populateComment(comment)
        })
    }

    function populateComment(comment) {
        const commentUl = document.getElementById("commentUl")
        const li = document.createElement("li")
        li.innerText = `${comment.content} by ${comment.user_id}`
        commentUl.append(li)
    }


    function increaseScore(){
        const scoreDisplay = document.getElementById("score")
        scoreDisplay.innerText = parseInt(scoreDisplay.innerText) + 10
    }
    
        let hero = {
            top: 960,
            left: 890
        };

    let missiles = [];
    let enemies = [
        {top: 200, left: 950},
        {top: 200, left: 800},
        {top: 200, left: 1100},
        {top: 200, left: 1250},
        {top: 200, left: 1400},
        {top: 200, left: 650},

    ]

    function moveHero() {
        document.getElementById("hero").style.left = hero.left + "px";
    }

    function actions(e){
        if (e.keyCode === 37) {
            e.preventDefault()
            // console.log(hero.left)
            if(hero.left >= 280) {
            hero.left = hero.left - 10;
            
            moveHero()
            }
        } else if (e.keyCode === 39) {
            e.preventDefault()
            // console.log("RIGHT")
            // console.log(hero.left)
            if(hero.left <= 1540)
            hero.left = hero.left + 10;
            moveHero()
        } else if (e.keyCode === 32) {
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
        enemies.push({top: 200, left: 400})
    }

    function moveEnemies(){
        for(i=0; i < enemies.length; i++) {
            console.log(enemies[i].top)
            if (enemies[i].top < 950) {
            enemies[i].top = enemies[i].top + 10;
            } else {
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
                console.log("missile top", missiles[i].top)
                console.log("enemy top", enemies[k].top)
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

    // function gameStart(){
    //     setTimeout(createEnemies, 100)
    //     gameLoop()
    // }

    function gameLoop(){
        setTimeout(gameLoop, 50)
        
        moveMissiles()
        drawMissiles()
        moveEnemies()
        drawEnemies()
        collisionDetection()
    }
    gameLoop()
    


    



    










})






