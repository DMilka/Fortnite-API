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
    var response = JSON.parse(sessionStorage.playerData);
    var playerData = response.stats;

    if(!playerData) {
        document.getElementById('error-message').classList.remove('d-none');
        return false;
    }

    fetch('https://api.twitch.tv/kraken/users?login='+playerName, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.stats.link)
        statsNickname.innerText += ' <a href="'+data.stats.link+'">Twitch</a>';
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