async function deleteFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        location.assign('/dash');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delPostBtn').addEventListener('click', deleteFormHandler);