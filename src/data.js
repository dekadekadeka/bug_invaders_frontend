let user_id = 0
let game_id = 0

   document.addEventListener("DOMContentLoaded", function(){
        fetchComments()
        createUserForm = document.getElementById("userForm")
        createUserForm.addEventListener("submit", createUser)
        createCommentForm = document.getElementById("createCommentForm")
        createCommentForm.addEventListener("submit", createComment)
        console.log("THis is my score", score)
        console.log("This is my user id", user_id )
        console.log("This is my game id", game_id)

   
    })

    function saveGame(){
        let newGame = {"user_id": user_id, "score": score}

        fetch("http://localhost:3000/api/v1/games", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newGame)
          }).then (res => res.json())
          .then(res => {
              console.log("This is my game", res)
              game_id = res.id
          })

    }

    function createUser(e){
        e.preventDefault()
        
        userNameInput = document.getElementById("userNameInput")
        emailInput = document.getElementById("emailInput")
        let newUser = {"username": userNameInput.value, "email": emailInput.value}

        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newUser)
          }).then (res => res.json())
          .then(res => {
              console.log("This is my user", res)
              user_id = res.id
              console.log("This is my user id", user_id)
          }).then(e.target.reset())
          .then(alert("New user created!"))
    }

    function fetchComments(){
        fetch("http://localhost:3000/api/v1/comments")
        .then(res => res.json())
        .then(data => {populateComments(data)})
    }

    function populateComments(comments){
        comments.forEach(comment => {populateComment(comment)
        })
    }


    function populateComment(comment){
        const commentUl = document.getElementById("commentUl")
        const li = document.createElement("li")
        li.innerText = comment.content
        commentUl.append(li)
    }

    function createComment(e){
        e.preventDefault()
        const commentInput = document.getElementById("commentContentInput")
        let newComment = {"content": commentInput.value, "user_id": user_id, "game_id": game_id}
        fetch("http://localhost:3000/api/v1/comments", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newComment)
          }).then(e.target.reset())
          .then(alert("New comment created!"))
          .then(populateComment(newComment))
    }


