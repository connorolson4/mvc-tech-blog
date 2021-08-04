async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const content = document.querySelector('textarea[name="postText"]').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        location.assign('/dash');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.editPost').addEventListener('submit', editFormHandler);