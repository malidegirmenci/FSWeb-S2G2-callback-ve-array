const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
let matchesIn2014 = fifaData.filter((item) =>{ //2014 yılındaki tüm maçları diziye döndürür
	return item.Year === 2014;
})

let finalMatchIn2014 = matchesIn2014.filter((item) => { //final maçını olarak diziye döndürür
	return item["Stage"] === "Final"});


//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
let  homeTeamIn2014 = finalMatchIn2014.filter((item) => {
	return item["Home Team Name"];
	  }).map((item) => {
		return item["Home Team Name"]; 
})
console.log(homeTeamIn2014[0])

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
let  awayTeamIn2014 = finalMatchIn2014.filter((item) => {
	return item["Away Team Name"];
	  }).map((item) => {
		return item["Away Team Name"]; 
})
console.log(awayTeamIn2014[0])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
let  homeTeamGoalsIn2014 = finalMatchIn2014.filter((item) => {
	return item["Home Team Goals"];
	  }).map((item) => {
		return item["Home Team Goals"]; 
})
console.log(homeTeamGoalsIn2014[0])

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
let  awayTeamGoalsIn2014 = finalMatchIn2014[0]["Away Team Goals"];
console.log(awayTeamGoalsIn2014)

//(e) 2014 Dünya kupası finali kazananı*/

function whoIsWinner(arr){ // Kazanan takımı bulur
	if(arr[0]['Home Team Goals'] > arr[0]['Away Team Goals']){
	  return arr[0]['Home Team Name']
	}else{
	  return arr[0]['Away Team Name']
	}
  }
  console.log("Winner : ", whoIsWinner(finalMatchIn2014))

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
    let finalMatches = arr.filter((item) =>{
		return item.Stage === "Final";
	})
	return finalMatches
}

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr,cbfFinaller) {
	let yearsOfFinalMatches = cbfFinaller(arr);
	return yearsOfFinalMatches.map((item) => {return item.Year})
}

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	function Kazananlar(arr, cbfFinaller) {
		let matches = cbfFinaller(arr)
		let winners = []
		for(let match of matches){
			if(match['Home Team Goals'] > match['Away Team Goals']){
				winners.push(match['Home Team Name'])
			}else{
				winners.push(match['Away Team Name'])
			}
		}
		return winners
	}
	
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(arr,cbfFinaller, cbfYillar, cbfKazananlar) {
	let finalMatches = cbfFinaller(arr)
	let finalYears = cbfYillar(finalMatches,cbfFinaller)
	let finalWinners = cbfKazananlar(finalMatches,cbfFinaller)
  	let strArr = []
  
  for(let i = 0; i < finalMatches.length; i++){
    strArr.push(`${finalYears[i]} yılında, ${finalWinners[i]} dünya kupasını kazandı!`)
  }
  return strArr;
}


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finalMatches) {
  
  function averageGoals(team){
    let TeamGoals = []
    for(let match of finalMatches){
      TeamGoals.push(match[team])
    }
    let sumTeamGoals = TeamGoals.reduce((acc,item) => {
    return acc + item
    });
    let averageTeamGoals = (sumTeamGoals / finalMatches.length)
    return averageTeamGoals
  }

  let averageHomeTeamGoals = averageGoals("Home Team Goals");
  let averageAwayTeamGoals = averageGoals("Away Team Goals");
  
  return (averageAwayTeamGoals + averageHomeTeamGoals).toFixed(2)

}

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(finalMatches) {
	let winnerTeamInitial= []
	for(let match of finalMatches){
		if(match['Home Team Goals'] > match['Away Team Goals']){
			winnerTeamInitial.push(match["Home Team Initials"])
		}else{
			winnerTeamInitial.push(match["Away Team Initials"])
		}
	}
	let winnerTeams = winnerTeamInitial.reduce((acc,currentValue) =>{
		if(acc[currentValue] === undefined){
			acc[currentValue] = 1;
		}else{
			acc[currentValue]++;
		}
		return acc;
	},{});
	
	/* En çok kazanan takımı bulur
	let maxKey = null;
	let maxValue = 0;
	let winner = []
	for(let key in winnerTeams){
		if(winnerTeams[key]>maxValue){
			maxValue = winnerTeams[key]
			maxKey = key;
		}
	}
	console.log("Winner : ", maxKey, " Trophy : ", maxValue)
	*/
	return winnerTeams
	
}
console.log(UlkelerinKazanmaSayilari(Finaller(fifaData)))


/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(finalMatches) {
	let teamsAndGoals = []
	
	for(let match of finalMatches){
		//Ev sahiplerinin attıkları goller
		let homeTeamGoals = {}
		let keyNameHome = match["Home Team Name"]
		let valueHome = match["Home Team Goals"]
		homeTeamGoals[keyNameHome] = valueHome;
		teamsAndGoals.push(homeTeamGoals)

		//Konuk takımların attıkları goller
		let awayTeamGoals = {}
		let keyNameAway = match["Away Team Name"]
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
	let maxKey = null;
	let maxValue = -Infinity; //sayısal değerler de en küçük değer ya da 0 da konulabilir

	for(let key in result){
		if(result[key] > maxValue){
			maxValue = result[key];
			maxKey = key;
		}
	}
	return maxKey;
}
console.log("En çok gol atan",EnCokGolAtan(Finaller(fifaData)), "takımıdır.")

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(finalMatches) {
	let teamsAndGoals = []

	for(let match of finalMatches){
		//Misafir Takımların attıkları goller
		let homeTeamGoals = {}
		let keyNameHome = match["Home Team Name"]
		let valueHome = match["Away Team Goals"]
		homeTeamGoals[keyNameHome] = valueHome;
		teamsAndGoals.push(homeTeamGoals)

		//Ev Sahibi Takımların attıkları goller
		let awayTeamGoals = {}
		let keyNameAway = match["Away Team Name"]
		let valueAway = match["Home Team Goals"]
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
	let maxKey = null;
	let maxValue = -Infinity; //sayısal değerler de en küçük değer ya da 0 da konulabilir

	for(let key in result){
		if(result[key] > maxValue){
			maxValue = result[key];
			maxKey = key;
		}
	}
	
	return maxKey
}
console.log("En çok gol yiyen",EnKotuDefans(Finaller(fifaData)),"takımıdır") 

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
