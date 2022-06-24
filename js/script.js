getAllLeagues();

function getAllLeagues(){
    const url = "https://api-football-standings.azharimm.site/leagues";
    const ajax = new XMLHttpRequest();
    ajax.open("GET", url);
    ajax.addEventListener("load", function () {
        const json = JSON.parse(ajax.responseText);
        displayLeagues(json.data);
    });
    ajax.send();
}

function getLeagueByKey(keyword){
    const d = new Date();
    const url = "https://api-football-standings.azharimm.site/leagues/"+keyword.id+"/standings?season=2021&sort=asc";
    const ajax = new XMLHttpRequest();
    ajax.open("GET",url);
    ajax.addEventListener("load",function(){
        if(this.readyState == 4 && this.status == 200){
            const json = JSON.parse(ajax.responseText);
            displayLeagueDetail(json.data);
        }else if(this.status == 500){
            const json = JSON.parse(ajax.responseText);
        }else{
            console.log("Data not found!");
        }
    });
    ajax.send();
}

function clearContent(){
    const content = document.getElementById("leagues-content");
    content.textContent = "";
}

function displayLeagueDetail(data){
    const content = document.getElementById("leagues-content");
    clearContent();
    var parent = '';
    parent = `
    <div class="container">
    <div class="d-flex justify-content-center">
    <button class="btn btn-cream btn-primary mt-3">${data.name}</button>
    </div>
    <div class="content-stats">
    <h5 class="text-medium p-3">Statistik</h5>
    <table class="table table-hover">
    <thead>
        <tr>
            <th>Klub</th>
            <th>Poin</th>
        </tr>
    </thead>
    <tbody>
    `;
    data.standings.forEach((data) => {
        parent += `<tr><td>${data.team.name}</td>
                    <td>${data.stats[6].value}</td></tr>`;
    });
    parent += `</tbody>
            </table>
        </div>
    </div>`;
    content.innerHTML = parent;
}

function displayLeagues(data) {
    const content = document.getElementById("leagues-content");
    var parent = '';
    data.forEach((data) => {
       parent += `
    <div class="border-bottom pb-4 col-12 col-md-6 league d-flex align-items-center mt-4">
        <img src="${data.logos.light}" alt="" class="mr-3">
            <div class="info">
            <p class="title mb-2">${data.name}</p>
            </div>
            <button class="p-2 btn btn-primary btn-sm no-border" onclick="getLeagueByKey(this)" id="${data.id}"> Lihat Detail</button>
   </div>`;
    });
    content.innerHTML = parent;
}

