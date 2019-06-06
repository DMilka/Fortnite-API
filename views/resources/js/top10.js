var soloTable = document.getElementById('top10-solo');
var duoTable = document.getElementById('top10-duo');
var squadTable = document.getElementById('top10-squad');

var countrySearchBox = document.getElementById('search-country');
countrySearchBox.addEventListener('submit', () => {getTop10From(event, countrySearchBox.getElementsByClassName('form-control')[0].value)});

async function getUserInfo(userNickname) {
    return await fetch('http://localhost:3000/statistics_by_nickname/'+escape(userNickname), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        var playerData = data.stats;
        if(!playerData) {
            playerData = {
                nickname: 'Nickname',
                solo: {
                    kills: 0,
                    matchesplayed: 0,
                    placetop1: 0,
                    placetop10: 0,
                    placetop25: 0
                },
                duo: {
                    kills: 0,
                    matchesplayed: 0,
                    placetop1: 0,
                    placetop6: 0,
                    placetop12: 0
                },
                squad: {
                    kills: 0,
                    matchesplayed: 0,
                    placetop1: 0,
                    placetop3: 0,
                    placetop6: 0
                },
            }
        }

        console.log(playerData);
        return playerData;
    });
}

async function displayUserInfo(type, playerData, index) {
    switch(type) {
        case 'solo':
            row = '<tr>'+
                    '<td>'+index+'</td>'+
                    '<th scope="row" class="nick">'+playerData.nickname+'</th>'+
                    '<td class="kills">'+playerData.solo.kills+'</td>'+
                    '<td class="deaths">'+(playerData.solo.matchesplayed - playerData.solo.placetop1)+'</td>'+
                    '<td class="kd">'+(playerData.solo.kills / (playerData.solo.matchesplayed - playerData.solo.placetop1)).toFixed(2)+'</td>'+
                    '<td class="games">'+playerData.solo.matchesplayed+'</td>'+
                    '<td class="wins">'+playerData.solo.placetop1+'</td>'+
                    '<td class="top10">'+playerData.solo.placetop10+'</td>'+
                    '<td class="top25">'+playerData.solo.placetop25+'</td>'+
                '</tr>';

            soloTable.innerHTML += row;
            break;
        case 'duo':
            row = '<tr>'+
                    '<td>'+index+'</td>'+
                    '<th scope="row" class="nick">'+playerData.nickname+'</th>'+
                    '<td class="kills">'+playerData.duo.kills+'</td>'+
                    '<td class="deaths">'+(playerData.duo.matchesplayed - playerData.duo.placetop1)+'</td>'+
                    '<td class="kd">'+(playerData.duo.kills / (playerData.duo.matchesplayed - playerData.duo.placetop1)).toFixed(2)+'</td>'+
                    '<td class="games">'+playerData.duo.matchesplayed+'</td>'+
                    '<td class="wins">'+playerData.duo.placetop1+'</td>'+
                    '<td class="top5">'+playerData.duo.placetop5+'</td>'+
                    '<td class="top12">'+playerData.duo.placetop12+'</td>'+
                '</tr>';

            duoTable.innerHTML += row;
            break;
        case 'squad':
            deaths = (playerData.squad.matchesplayed - playerData.squad.placetop1);
            kd = 0;
            if(deaths != 0)
                kd = (playerData.squad.kills / deaths).toFixed(2);

            row = '<tr>'+
                    '<td>'+index+'</td>'+
                    '<th scope="row" class="nick">'+playerData.nickname+'</th>'+
                    '<td class="kills">'+playerData.squad.kills+'</td>'+
                    '<td class="deaths">'+deaths+'</td>'+
                    '<td class="kd">'+kd+'</td>'+
                    '<td class="games">'+playerData.squad.matchesplayed+'</td>'+
                    '<td class="wins">'+playerData.squad.placetop1+'</td>'+
                    '<td class="top3">'+playerData.squad.placetop3+'</td>'+
                    '<td class="top6">'+playerData.squad.placetop6+'</td>'+
                '</tr>';

            squadTable.innerHTML += row;
            break;
    }
}

async function getTop10(type, country = null) {
    var URL;

    if( country ) {
        URL = 'http://localhost:3000/top_10_players_by_country/'+escape(country)+'/'+escape(type);
    } else {
        URL = 'http://localhost:3000/top_10_players/'+escape(type);
    }
        

    return await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(async (data) => {
        console.log(data);
        
        for(let [index, player] of data.rank.entries()) {
            var playerData;
            playerData = await getUserInfo(player);

            await displayUserInfo(data.type, playerData, index+1);
        };
    });
}

function getTop10From(event, country) {
    event.preventDefault();

    soloTable.innerHTML = '';
    duoTable.innerHTML = '';
    squadTable.innerHTML = '';

    getTop10('solo', country);
    getTop10('duo', country);
    getTop10('squad', country);
}