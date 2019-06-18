document.addEventListener("DOMContentLoaded", function(){
    fetchComments()
})

function fetchComments(){
    fetch("http://localhost:3000/api/v1/comments")
    .then(res => res.json())
    .then(data => {populateComments(data)})
}

function populateComments(comments){
    console.log(comments)
    comments.forEach(comment => {populateComment(comment)
    })
}

function populateComment(comment){
    console.log(comment)
    const commentUl = document.getElementById("commentUl")
    const li = document.createElement("li")
    li.innerText = comment.content
    commentUl.append(li)
}