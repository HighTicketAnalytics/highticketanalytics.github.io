
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
mlbDraftKings= [];
mlbFanDuel= [];
mlbPointsBet= [];
mlbUniBet= [];
mlbBetfair= [];

//Calling and Pushing MLB Data
getLinesMLB();
async function getLinesMLB(){
    let response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=baseball_mlb&region=us&mkt=h2h&apiKey=${Odds_Key}`);
    let mlbLines = await response.json();
    document.getElementById('lastupdate').innerHTML = 'Lines Last Updated: ' + Unix_timestamp(mlbLines.data[0].sites[0].last_update);
    for(i = 0; i<mlbLines.data.length; i++){
        mlbTime.push(Unix_timestamp(mlbLines.data[i].commence_time));
        mlbTime.push("");
        mlbTeam.push(mlbLines.data[i].teams[1]);
        mlbTeam.push(mlbLines.data[i].teams[0]);
        for(j = 0; j<mlbLines.data[i].sites.length; j++){
            if(mlbLines.data[i].sites[j].site_key == 'draftkings'){
                mlbDraftKings.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[1]));
                mlbDraftKings.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[0]));
            }else if(mlbLines.data[i].sites[j].site_key == 'fanduel'){
                mlbFanDuel.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[1]));
                mlbFanDuel.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[0]));
            }else if(mlbLines.data[i].sites[j].site_key == 'pointsbetus'){
                mlbPointsBet.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[1]));
                mlbPointsBet.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[0]));
            }else if(mlbLines.data[i].sites[j].site_key == 'unibet'){
                mlbUniBet.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[1]));
                mlbUniBet.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[0]));
            }else if(mlbLines.data[i].sites[j].site_key == 'betfair'){
                mlbBetfair.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[1]));
                mlbBetfair.push(oddsChanger(mlbLines.data[i].sites[j].odds.h2h[0]));
            }else{

            }
        }
        if(mlbDraftKings.length < mlbTeam.length){
            mlbDraftKings.push("N/A");
            mlbDraftKings.push("N/A");
        }
        if(mlbFanDuel.length < mlbTeam.length){
            mlbFanDuel.push("N/A");
            mlbFanDuel.push("N/A");
        }
        if(mlbPointsBet.length < mlbTeam.length){
            mlbPointsBet.push("N/A");
            mlbPointsBet.push("N/A");
        }
        if(mlbUniBet.length < mlbTeam.length){
            mlbUniBet.push("N/A");
            mlbUniBet.push("N/A");
        }
        if(mlbBetfair.length < mlbTeam.length){
            mlbBetfair.push("N/A");
            mlbBetfair.push("N/A");
        }
        
    }
    var table = document.getElementById('mlb');
    for (var i = 0; i < mlbLines.data.length*2; i++){
        
        var tr = document.createElement('tr');   

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
       

        var text1 = document.createTextNode(mlbTime[i]);
        var text2 = document.createTextNode(mlbTeam[i]);
        var text3 = document.createTextNode(mlbDraftKings[i]);
        var text4 = document.createTextNode(mlbFanDuel[i]);
        var text5 = document.createTextNode(mlbPointsBet[i]);
        var text6 = document.createTextNode(mlbUniBet[i]);
        var text7 = document.createTextNode(mlbBetfair[i]);
       

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
        td6.appendChild(text6);
        td7.appendChild(text7);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
       
        

        table.appendChild(tr);
}
document.appendChild(table);
 

} 

//NBA Variables
nbaTime = [];
nbaTeam = [];
nbaDraftKings= [];
nbaFanDuel= [];
nbaPointsBet= [];
nbaUniBet= [];
nbaBetfair= [];

//Calling and Pushing NBA Data

getLinesNBA();
async function getLinesNBA(){
    let response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=basketball_nba&region=us&mkt=h2h&apiKey=${Odds_Key}`);
    let nbaLines = await response.json();
    for(i = 0; i<nbaLines.data.length; i++){
        nbaTime.push(Unix_timestamp(nbaLines.data[i].commence_time));
        nbaTime.push("");
        nbaTeam.push(nbaLines.data[i].teams[1]);
        nbaTeam.push(nbaLines.data[i].teams[0]);
        for(j = 0; j<nbaLines.data[i].sites.length; j++){
            if(nbaLines.data[i].sites[j].site_key == 'draftkings'){
                nbaDraftKings.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[1]));
                nbaDraftKings.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[0]));
            }else if(nbaLines.data[i].sites[j].site_key == 'fanduel'){
                nbaFanDuel.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[1]));
                nbaFanDuel.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[0]));
            }else if(nbaLines.data[i].sites[j].site_key == 'pointsbetus'){
                nbaPointsBet.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[1]));
                nbaPointsBet.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[0]));
            }else if(nbaLines.data[i].sites[j].site_key == 'unibet'){
                nbaUniBet.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[1]));
                nbaUniBet.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[0]));
            }else if(nbaLines.data[i].sites[j].site_key == 'betfair'){
                nbaBetfair.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[1]));
                nbaBetfair.push(oddsChanger(nbaLines.data[i].sites[j].odds.h2h[0]));
            }else{

            }
        }
        if(nbaDraftKings.length < nbaTeam.length){
            nbaDraftKings.push("N/A");
            nbaDraftKings.push("N/A");
        }
        if(nbaFanDuel.length < nbaTeam.length){
            nbaFanDuel.push("N/A");
            nbaFanDuel.push("N/A");
        }
        if(nbaPointsBet.length < nbaTeam.length){
            nbaPointsBet.push("N/A");
            nbaPointsBet.push("N/A");
        }
        if(nbaUniBet.length < nbaTeam.length){
            nbaUniBet.push("N/A");
            nbaUniBet.push("N/A");
        }
        if(nbaBetfair.length < nbaTeam.length){
            nbaBetfair.push("N/A");
            nbaBetfair.push("N/A");
        }
        
    }
    var table = document.getElementById('nba');
    for (var i = 0; i < nbaLines.data.length*2; i++){
        
        var tr = document.createElement('tr');   

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
       

        var text1 = document.createTextNode(nbaTime[i]);
        var text2 = document.createTextNode(nbaTeam[i]);
        var text3 = document.createTextNode(nbaDraftKings[i]);
        var text4 = document.createTextNode(nbaFanDuel[i]);
        var text5 = document.createTextNode(nbaPointsBet[i]);
        var text6 = document.createTextNode(nbaUniBet[i]);
        var text7 = document.createTextNode(nbaBetfair[i]);
       

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
        td6.appendChild(text6);
        td7.appendChild(text7);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
       
        

        table.appendChild(tr);
}
document.appendChild(table);
 

} 

//NHL Variables
nhlTime = [];
nhlTeam = [];
nhlDraftKings= [];
nhlFanDuel= [];
nhlPointsBet= [];
nhlUniBet= [];
nhlBetfair= [];

//Calling and Pushing NHL Data

getLinesNHL();
async function getLinesNHL(){
    let response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=icehockey_nhl&region=us&mkt=h2h&apiKey=${Odds_Key}`);
    let nhlLines = await response.json();
    for(i = 0; i<nhlLines.data.length; i++){
        nhlTime.push(Unix_timestamp(nhlLines.data[i].commence_time));
        nhlTime.push("");
        nhlTeam.push(nhlLines.data[i].teams[1]);
        nhlTeam.push(nhlLines.data[i].teams[0]);
        for(j = 0; j<nhlLines.data[i].sites.length; j++){
            if(nhlLines.data[i].sites[j].site_key == 'draftkings'){
                nhlDraftKings.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[1]));
                nhlDraftKings.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[0]));
            }else if(nhlLines.data[i].sites[j].site_key == 'fanduel'){
                nhlFanDuel.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[1]));
                nhlFanDuel.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[0]));
            }else if(nhlLines.data[i].sites[j].site_key == 'pointsbetus'){
                nhlPointsBet.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[1]));
                nhlPointsBet.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[0]));
            }else if(nhlLines.data[i].sites[j].site_key == 'unibet'){
                nhlUniBet.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[1]));
                nhlUniBet.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[0]));
            }else if(nhlLines.data[i].sites[j].site_key == 'betfair'){
                nhlBetfair.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[1]));
                nhlBetfair.push(oddsChanger(nhlLines.data[i].sites[j].odds.h2h[0]));
            }else{

            }
        }
        if(nhlDraftKings.length < nhlTeam.length){
            nhlDraftKings.push("N/A");
            nhlDraftKings.push("N/A");
        }
        if(nhlFanDuel.length < nhlTeam.length){
            nhlFanDuel.push("N/A");
            nhlFanDuel.push("N/A");
        }
        if(nhlPointsBet.length < nhlTeam.length){
            nhlPointsBet.push("N/A");
            nhlPointsBet.push("N/A");
        }
        if(nhlUniBet.length < nhlTeam.length){
            nhlUniBet.push("N/A");
            nhlUniBet.push("N/A");
        }
        if(nhlBetfair.length < nhlTeam.length){
            nhlBetfair.push("N/A");
            nhlBetfair.push("N/A");
        }
        
    }
    var table = document.getElementById('nhl');
    for (var i = 0; i < nhlLines.data.length*2; i++){
        
        var tr = document.createElement('tr');   

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
       

        var text1 = document.createTextNode(nhlTime[i]);
        var text2 = document.createTextNode(nhlTeam[i]);
        var text3 = document.createTextNode(nhlDraftKings[i]);
        var text4 = document.createTextNode(nhlFanDuel[i]);
        var text5 = document.createTextNode(nhlPointsBet[i]);
        var text6 = document.createTextNode(nhlUniBet[i]);
        var text7 = document.createTextNode(nhlBetfair[i]);
       

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);
        td6.appendChild(text6);
        td7.appendChild(text7);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
       
        

        table.appendChild(tr);
}
document.appendChild(table);
 

}