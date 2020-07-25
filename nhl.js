nhlTeam = [];
nhlPoints = [];
goalsPer = [];
ppGoal = [];
ppPer = [];
async function nhlData(){
    let response = await fetch('https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats');
    let data = await response.json();
    for(i = 0;i<data.teams.length;i++){
        nhlTeam.push(data.teams[i].name);
        nhlPoints.push(data.teams[i].teamStats[0].splits[0].stat.pts);
        goalsPer.push(data.teams[i].teamStats[0].splits[0].stat.goalsPerGame);
        ppPer.push(data.teams[i].teamStats[0].splits[0].stat.powerPlayPercentage)
        ppGoal.push(data.teams[i].teamStats[0].splits[0].stat.powerPlayGoals)

        
        }
    }


chartNHL();    
async function chartNHL(){
    await nhlData();
const ctx =  document.getElementById('NHLStats').getContext('2d');
const nbaChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: nhlTeam,
        datasets: [{
            label: "Average Goals Per Game",
            data: goalsPer,
            yAxisID: 'B',
            borderColor: 'blue'
        },{
            label: `Total Points`,
            data: nhlPoints,
            yAxisID: 'A',
            borderColor: 'red'
        }] 
    },
    options: {
      
        responsive: true,
        scales: {
            yAxes: [{id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
                ticks: {
                }
            }]
        }
    }
});

}

let ppGData = {
    label: `Powerplay Goals`,
    data: ppGoal,
    lineTension: 0,
    fill: true,
    borderColor: 'red'
};
let ppPerdata = {
    label: "Powerplay Percentage",
    data: ppPer,
    lineTension: 0,
    fill: true,
    borderColor: 'blue'
};



nhlChart2();
async function nhlChart2(){
    await nhlData();
const ctx =  document.getElementById('NHL2').getContext('2d');
const nbaChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: nhlTeam,
        datasets: [ppGData, ppPerdata] 
    },
    options: {
        responsive: true,
        
        scales: {
                
            }
        }
    }
);

}
  


