document.addEventListener("DOMContentLoaded", function(){
    fetchComments()
    
    

    function fetchComments(){
        fetch("http://localhost:3000/api/v1/comments")
        .then(res => res.json())
        .then(data => console.log(data))
    }

    
    
    
    
        let hero = {
            top: 170,
            left: 460
        };

    let missiles = [];
    let enemies = [
        {top: 150, left: 400},
        {top: 150, left: 460},
        {top: 150, left: 600},

    ]

    function moveHero() {
        document.getElementById("hero").style.left = hero.left + "px";
    }

    document.onkeydown = function(e){
        console.log(e)
        if (e.keyCode === 37) {
            // console.log("left")
            hero.left = hero.left - 10;
            moveHero()
        } else if (e.keyCode === 39) {
            // console.log("RIGHT")
            hero.left = hero.left + 10;
            moveHero()
        } else if (e.keyCode === 32) {
            console.log("FIRE")
            e.preventDefault()
            missiles.push({
                left: hero.left + 15,
                top: hero.top +240 
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
            missiles[i].top = missiles[i].top - 10;
            
        }
    }

    function moveEnemies(){
        for(i=0; i < enemies.length; i++) {
            enemies[i].top = enemies[i].top + 10;
            
        }
    }

    function drawEnemies(){
        document.getElementById("enemy").innerHTML = '';
        for(i=0; i < enemies.length; i++) {
            document.getElementById("missiles").innerHTML += `
            <div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px;'></div>;`
        }
    }

    function collisionDetection(){
        
    }

    function gameLoop(){
        setTimeout(gameLoop, 500)
        moveMissiles()
        drawMissiles()
        moveEnemies()
        drawEnemies()
    }
    gameLoop()


    



    










})






