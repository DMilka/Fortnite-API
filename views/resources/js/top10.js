var soloTable = document.getElementById('top10-solo');
var duoTable = document.getElementById('top10-duo');
var squadTable = document.getElementById('top10-squad');

async function getUserInfo(userNickname) {
    return await fetch('http://localhost:3000/statistics_by_nickname/'+JSON.stringify(userNickname), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        var playerData = data.stats;
        if(!playerData)
            return null;

        console.log(playerData);
        return playerData;
    });
}

async function displayUserInfo(type, playerData) {
    switch(type) {
        case 'solo':
            row = '<tr>'+
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
                '<th scope="row" class="nick">'+playerData.nickname+'</th>'+
                    '<td class="kills">'+playerData.duo.kills+'</td>'+
                    '<td class="deaths">'+(playerData.duo.matchesplayed - playerData.duo.placetop1)+'</td>'+
                    '<td class="kd">'+(playerData.duo.kills / (playerData.duo.matchesplayed - playerData.duo.placetop1)).toFixed(2)+'</td>'+
                    '<td class="games">'+playerData.duo.matchesplayed+'</td>'+
                    '<td class="wins">'+playerData.duo.placetop1+'</td>'+
                    '<td class="top6">'+playerData.duo.placetop6+'</td>'+
                    '<td class="top12">'+playerData.duo.placetop12+'</td>'+
                '</tr>';

            duoTable.innerHTML += row;
            break;
        case 'squad':
            row = '<tr>'+
                '<th scope="row" class="nick">'+playerData.nickname+'</th>'+
                    '<td class="kills">'+playerData.squad.kills+'</td>'+
                    '<td class="deaths">'+(playerData.squad.matchesplayed - playerData.squad.placetop1)+'</td>'+
                    '<td class="kd">'+(playerData.squad.kills / (playerData.squad.matchesplayed - playerData.squad.placetop1)).toFixed(2)+'</td>'+
                    '<td class="games">'+playerData.squad.matchesplayed+'</td>'+
                    '<td class="wins">'+playerData.squad.placetop1+'</td>'+
                    '<td class="top3">'+playerData.squad.placetop3+'</td>'+
                    '<td class="top6">'+playerData.squad.placetop6+'</td>'+
                '</tr>';

            squadTable.innerHTML += row;
            break;
    }
}

async function getTop10(type) {
    fetch('http://localhost:3000/top_10_players/'+JSON.stringify(type), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(async (data) => {
        console.log(data);
        
        for(let player of data.rank) {
            var playerData = await getUserInfo(player);
            await displayUserInfo(data.type, playerData);
        };
    });
}

function getTop10from(country) {
    if(!country)
        return new Error('Country is required parameter!');

    fetch('http://localhost:3000/top_10_players_by_country/'+country, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}