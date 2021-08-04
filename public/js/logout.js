async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        location.assign('/');
    } else {
        alert(response.statusText);
    }
}

document.getElementById('logout').addEventListener('click', logout);