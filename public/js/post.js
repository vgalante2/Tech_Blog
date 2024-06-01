document.addEventListener('DOMContentLoaded', function() {
    const postDiv = document.getElementById('post-div')   
    async function addListeners(){

        const editButtons = document.querySelectorAll('.edit-comment')
        editButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                const id = event.target.getAttribute('data-comment-id')
                console.log(id)
                const editForm = document.getElementById(`edit-comment-form-${id}`)
                editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none'
                editForm.addEventListener('submit', async function (event) {
                    event.preventDefault()
                    const newCommentText = document.getElementById(`edit-comment-${id}`).value
                    const comment_id = document.getElementById(`comment-${id}`).value
                    const eventObj = {
                        text: newCommentText,
                        id: comment_id
                    }
                    await fetch('/api/users/auth/comment', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(eventObj)
                    }).then(res => res.json())
                    location.reload()


                })
            })
        })
        const deleteButtons = document.querySelectorAll('.delete-comment')
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function (event) {
                const comment_id = event.target.getAttribute('data-comment-id')
                const eventObj = {
                    id: comment_id
                }
                await fetch('/api/users/auth/comment', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventObj)
                }).then(res => res.json())
                location.reload()
                
            })
        })
    }
    addListeners().then(console.log('added listeners'))
})