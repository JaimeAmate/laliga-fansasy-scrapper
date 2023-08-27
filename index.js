const fs = require('fs');

const getPlayers = async () => {
    const res = await fetch(`${process.env.FANTASY_BASE_URL}/api/v3/players?x-lang=es'`);

    if (res.ok) {
        const data = await res.json();

        return data
    }

    return null;
}

const getPlayerDetail = async (id) => {
    const res = await fetch(`${process.env.FANTASY_BASE_URL}/api/v3/player/${id}`);

    if (res.ok) {
        const data = await res.json();
        
        return data;
    }

    return null;
}

const writeFile = (fileName, jsonContent) => {
    fs.writeFile(fileName, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

async function main() {
    const players = await getPlayers();
    const playersDetail = [];


    for(const player of players) {
        console.log(`Parsing player with id ${player.id}`)
        const playerDetail = await getPlayerDetail(player.id);
        playersDetail.push(playerDetail);
    }

    writeFile('players.json', JSON.stringify(playersDetail));
}

main();