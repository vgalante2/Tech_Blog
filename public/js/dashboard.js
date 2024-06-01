document.addEventListener('DOMContentLoaded', function() {
    const postDiv = document.getElementById('post-div')   
    async function addListeners(){
        const newPostButton = document.getElementById('new-post-button')
        const newPostForm = document.getElementById('new-post-form')
        newPostButton.addEventListener('click', function (event) {
            newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none'})

        const postElements = document.querySelectorAll('.post');
        postElements.forEach(post => {
            post.addEventListener('click', () => {
                const postId = post.getAttribute('data-post-id');
                window.location.href = `post/${postId}`;
            });
        })
    }
    addListeners().then(console.log('added listeners'))
})