
// Functions for transferring data into regular gambling format
function Unix_timestamp(t)
{
var dt = new Date(t*1000);
var mo = dt.getMonth()+1;
var day = dt.getDate();
var hr = dt.getHours();
var AmOrPm = hr >= 12 ? 'pm' : 'am';
hr = (hr % 12) || 12;
var m = "0" + dt.getMinutes();
return mo+ '/'+ day+ ' '+ hr+ ':' + m.substr(-2)+ AmOrPm;
}

function oddsChanger(x){
    if(x<2){
        return  Math.round(((100)/(1-x)));
    }else{
        return "+"+ Math.round(-1*(1-x)*100);
    }
}
//Global Variables for MLB
mlbTime = [];
mlbTeam = [];
mlbMline = [];

//Calling and Pushing MLB Data
getLinesMLB();
async function getLinesMLB(){
    let response = await fetch('https://elated-colden-e88ba7.netlify.app/.netlify/functions/token-hider/token-hider.js');
    let mlbLines = await response.json();
    for(i = 0; i<mlbLines.data.length; i++){
        mlbTime.push(Unix_timestamp(mlbLines.data[i].commence_time));
        mlbTime.push("");
        mlbTeam.push(mlbLines.data[i].teams[1]);
        mlbTeam.push(mlbLines.data[i].teams[0]);
        mlbMline.push(oddsChanger(mlbLines.data[i].sites[0].odds.h2h[1]));
        mlbMline.push(oddsChanger(mlbLines.data[i].sites[0].odds.h2h[0]));
    }
    
    let cells1 = document.querySelectorAll('#mlb tr td:nth-child(1)');
    let cells2 = document.querySelectorAll('#mlb tr td:nth-child(2)');
    let cells3 = document.querySelectorAll('#mlb tr td:nth-child(3)');
    for(let i = 0; i < cells1.length; ++i) {
        cells1[i].innerHTML = mlbTime[i];
        cells2[i].innerHTML = mlbTeam[i]
        cells3[i].innerHTML = mlbMline[i]
        
    }

} 
//NBA Variables
nbaTime = [];
nbaTeam = [];
nbaMline = [];

//Calling and Pushing NBA Data

getLinesNBA();
async function getLinesNBA(){
    let response = await fetch(`https://elated-colden-e88ba7.netlify.app/.netlify/functions/token-hider/token-hider.js`);
    let nbaLines = await response.json();
    for(i = 0; i<nbaLines.data.length; i++){
        nbaTime.push(Unix_timestamp(nbaLines.data[i].commence_time));
        nbaTime.push("");
        nbaTeam.push(nbaLines.data[i].teams[1]);
        nbaTeam.push(nbaLines.data[i].teams[0]);
        nbaMline.push(oddsChanger(nbaLines.data[i].sites[0].odds.h2h[1]));
        nbaMline.push(oddsChanger(nbaLines.data[i].sites[0].odds.h2h[0]));
    }
    
    let cells1 = document.querySelectorAll('#nba tr td:nth-child(1)');
    let cells2 = document.querySelectorAll('#nba tr td:nth-child(2)');
    let cells3 = document.querySelectorAll('#nba tr td:nth-child(3)');
    for(let i = 0; i < cells1.length; ++i) {
        cells1[i].innerHTML = nbaTime[i];
        cells2[i].innerHTML = nbaTeam[i]
        cells3[i].innerHTML = nbaMline[i]
        
    }

} 