var gameVersionSpan = document.getElementById('game-version');
fetch('http://localhost:3000/version', {
    method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        gameVersionSpan.innerText = data.version;
    });