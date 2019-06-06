var searchBox = document.getElementById('search-player');
var statsNickname = document.getElementById('stats-nickname');
var soloTable = document.getElementById('stats-solo-table');
var douTable = document.getElementById('stats-duo-table');
var squadTable = document.getElementById('stats-squad-table');

searchBox.addEventListener('submit', () => {searchPlayer(event, searchBox.getElementsByClassName('form-control')[0].value)});

function searchPlayer(event, playerName) {
    event.preventDefault();

    fetch('http://localhost:3000/statistics_by_nickname/'+playerName, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        sessionStorage.setItem('playerData', JSON.stringify(data));
        window.location.href='http://127.0.0.1:5500/views/stats.html';
    });

}

function displayPlayer() {
    sessionStorage.getItem('playerData');
    var response = JSON.parse(sessionStorage.playerData);
    var playerData = response.stats;

    if(!playerData) {
        document.getElementById('error-message').classList.remove('d-none');
        return false;
    }

    fetch('http://localhost:3000/socials/'+playerName, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.stats.link)
            statsNickname.innerText += ' <a href="'+data.stats.link+'"><img src="data:image/png;base64,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" style="width: 64px; height: 64px;"/></a>';
    });

    statsNickname.innerText = playerData.nickname;
    soloTable.getElementsByClassName('actual-kills')[0].innerText = playerData.solo.kills;
    soloTable.getElementsByClassName('actual-deaths')[0].innerText = playerData.solo.matchesplayed - playerData.solo.placetop1;
    soloTable.getElementsByClassName('actual-kd')[0].innerText = (playerData.solo.kills / (playerData.solo.matchesplayed - playerData.solo.placetop1)).toFixed(2);
    soloTable.getElementsByClassName('actual-games')[0].innerText = playerData.solo.matchesplayed;
    soloTable.getElementsByClassName('actual-wins')[0].innerText = playerData.solo.placetop1;
    soloTable.getElementsByClassName('actual-top10')[0].innerText = playerData.solo.placetop10;
    soloTable.getElementsByClassName('actual-top25')[0].innerText = playerData.solo.placetop25;

    douTable.getElementsByClassName('actual-kills')[0].innerText = playerData.duo.kills;
    douTable.getElementsByClassName('actual-deaths')[0].innerText = playerData.duo.matchesplayed - playerData.duo.placetop1;
    douTable.getElementsByClassName('actual-kd')[0].innerText = (playerData.duo.kills / (playerData.duo.matchesplayed - playerData.duo.placetop1)).toFixed(2);
    douTable.getElementsByClassName('actual-games')[0].innerText = playerData.duo.matchesplayed;
    douTable.getElementsByClassName('actual-wins')[0].innerText = playerData.duo.placetop1;
    douTable.getElementsByClassName('actual-top5')[0].innerText = playerData.duo.placetop5;
    douTable.getElementsByClassName('actual-top12')[0].innerText = playerData.duo.placetop12;

    squadTable.getElementsByClassName('actual-kills')[0].innerText = playerData.squad.kills;
    squadTable.getElementsByClassName('actual-deaths')[0].innerText = playerData.squad.matchesplayed - playerData.squad.placetop1;
    squadTable.getElementsByClassName('actual-kd')[0].innerText = (playerData.squad.kills / (playerData.squad.matchesplayed - playerData.squad.placetop1)).toFixed(2);
    squadTable.getElementsByClassName('actual-games')[0].innerText = playerData.squad.matchesplayed;
    squadTable.getElementsByClassName('actual-wins')[0].innerText = playerData.squad.placetop1;
    squadTable.getElementsByClassName('actual-top3')[0].innerText = playerData.squad.placetop3;
    squadTable.getElementsByClassName('actual-top6')[0].innerText = playerData.squad.placetop6;
}