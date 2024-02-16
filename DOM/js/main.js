let form = document.querySelector('#get-data-form');
let getSeason = '';
let getRound = '';

form.addEventListener('submit', async (event) => { 
    event.preventDefault();
    getSeason = event.target[0].value;
    getRound = event.target[1].value;
    console.log(getSeason, getRound);

    
});

const getData = async () => {
    let response = await axios.get(`https://ergast.com/api/f1/${getSeason}/${getRound}/driverStandings.json`);
    console.log(response);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
    
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings; 
};

const DOMElements = {
    'racecars': '.race-list'
};

const createList = (position, name, nationality, constructorID, points) => { 
    const html = `<div id=${position} class='card mt-3 mb-3' style="width: 18rem;">
    <ul class='list-group list-group-flush' id=${name}>
        <li class='list-group-item'>${name}</li>
        <li class='list-group-item'>${nationality}</li>
        <li class='list-group-item'>${constructorID}</li>
        <li class='list-group-item'>${points}</li>
    </ul>
    </div>`;
    document.querySelector(DOMElements['racecars']).insertAdjacentHTML('beforeend', html);
};

const loadData = async () => {
    const standings = await getData(); 
    standings.forEach((car) => { 
        createList(car.position, car.Driver.givenName + ' ' + car.Driver.familyName, car.Driver.nationality, car.Constructors[0].name, car.points);
    });
};