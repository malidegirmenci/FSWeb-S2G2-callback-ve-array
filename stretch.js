const { fifaData } = require('./fifa.js')


//1- [X] Ülke kısaltmalarını parametre olarak alan ve dünya kupasında yer alma sayılarını dönünen bir fonksiyon yaratabilirsiniz.

function mostAttendedTeamFinder(finalMatches) {
	let teamInitial= []
	for(let match of finalMatches){
        teamInitial.push(match["Home Team Name"])
        teamInitial.push(match["Away Team Name"])
	}
	let mostAttendedTeam = teamInitial.reduce((acc,currentValue) =>{
		if(acc[currentValue] === undefined){
			acc[currentValue] = 1;
		}else{
			acc[currentValue]++;
		}
		return acc;
	},{});
    
    let maxKey = null;
	let maxValue = -Infinity; //sayısal değerler de en küçük değer ya da 0 da konulabilir

	for(let key in mostAttendedTeam){
		if(mostAttendedTeam[key] > maxValue){
			maxValue = mostAttendedTeam[key];
			maxKey = key;
		}
	}
	return maxKey
}
//2- [X] 'Finaller' veri setinde beraberlikleri de hesaba katabilirsiniz.

function winnerTeamsInFinals(finalMatches) {
	let winnerTeams= []
	for(let match of finalMatches){
		if(match["Win conditions"] === ""){
            if(match['Home Team Goals'] > match['Away Team Goals']){
                winnerTeams.push(match["Home Team Name"])
            }else{
                winnerTeams.push(match["Away Team Name"])
            }
        }else{
            let countryName = match["Win conditions"].split(" ")[0]
            winnerTeams.push(countryName)
        }
	}
	let resWinnerTeams = winnerTeams.reduce((acc,currentValue) =>{
		if(acc[currentValue] === undefined){
			acc[currentValue] = 1;
		}else{
			acc[currentValue]++;
		}
		return acc;
	},{});
	//hint dynamic object key
	
	return resWinnerTeams
}

//3- [X] Ülke kısaltmalarını parametre olarak alan ve dünya kupasında attıkları gol sayılarını(1930 sonrası) dönen bir fonksiyon yaratabilirsiniz.
function findGoalsOfTeam(finalMatches,initials){
    let teamsAndGoals = []
	
	for(let match of finalMatches){
		//Ev sahiplerinin attıkları goller
		let homeTeamGoals = {}
		let keyNameHome = match["Home Team Initials"]
		let valueHome = match["Home Team Goals"]
		homeTeamGoals[keyNameHome] = valueHome;
		teamsAndGoals.push(homeTeamGoals)

		//Konuk takımların attıkları goller
		let awayTeamGoals = {}
		let keyNameAway = match["Away Team Initials"]
		let valueAway = match["Away Team Goals"]
		awayTeamGoals[keyNameAway] = valueAway;
		teamsAndGoals.push(awayTeamGoals)
	}

	let result = {};
	for (let item of teamsAndGoals){
		let key = Object.keys(item)[0];
		let value = item[key];
		if(result[key] === undefined){
			result[key]=value;
		}else{
			result[key] += value;
		}
	}

    return result[initials] 
}

module.exports = {
    mostAttendedTeamFinder: mostAttendedTeamFinder,
    findGoalsOfTeam : findGoalsOfTeam,
    winnerTeamsInFinals : winnerTeamsInFinals
};