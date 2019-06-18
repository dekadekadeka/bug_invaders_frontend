    document.addEventListener("DOMContentLoaded", function(){
        fetchComments()
        userSubmitBtn = document.getElementById("userSubmit")
        userSubmitBtn.addEventListener("submit", createUser)
    })

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
          }).then(resp => console.log(resp))
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


