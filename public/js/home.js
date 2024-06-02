document.addEventListener('DOMContentLoaded', function () {
    const postDiv = document.getElementById('post-div')

    async function addListeners() {
        const postElements = document.querySelectorAll('.post');
        postElements.forEach(post => {
            post.addEventListener('click', () => {
                const postId = post.getAttribute('data-post-id');
                window.location.href = `post/${postId}`;
            });
        })
        const toggleButtons = document.querySelectorAll('.toggle-form')
        toggleButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                const id = event.target.getAttribute('data-post-id')
                const commentForm = document.getElementById(`comment-form-${id}`)
                commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none'
                commentForm.addEventListener('submit', async function (event) {
                    event.preventDefault()
                    const commentText = document.getElementById(`comment-${id}`).value
                    const post_id = document.getElementById(`post-${id}`).value
                    const eventObj = {
                        text: commentText,
                        postId: post_id
                    }
                    const comment = await fetch('/api/users/auth/comment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(eventObj)
                    }).then(res => res.json())

                    console.log('Comment submitted:', comment)

                    commentText.value = ''

                    commentForm.style.display = 'none'
                })
            })
        })
        const editButtons = document.querySelectorAll('.edit-post')
        editButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                const id = event.target.getAttribute('data-post-id')
                const editForm = document.getElementById(`edit-post-form-${id}`)
                editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none'
                editForm.addEventListener('submit', async function (event) {
                    event.preventDefault()
                    const newPostText = document.getElementById(`edit-post-${id}`).value
                    const post_id = document.getElementById(`post-${id}`).value
                    const eventObj = {
                        text: newPostText,
                        postId: post_id
                    }
                    await fetch('/api/users/auth/post', {
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
        const deleteButtons = document.querySelectorAll('.delete-post')
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function (event) {
                const post_id = event.target.getAttribute('data-post-id')
                const eventObj = {
                    postId: post_id
                }
                await fetch('/api/users/auth/post', {
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