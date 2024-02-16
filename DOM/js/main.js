let form = document.querySelector('#get-data-form');
let getSeason = '';
let getRound = '';

form.addEventListener('submit', async (event) => { 
    event.preventDefault(); 
    getSeason = document.querySelector('#season').value;
    getRound = document.querySelector('#round').value;
    console.log(getSeason, getRound);

    await loadData(); 
});

const getData = async () => {
    try {
        if (!getSeason || !getRound) {
            throw new Error("Season or round not defined");
        }
        let response = await axios.get(`https://ergast.com/api/f1/${getSeason}/${getRound}/driverStandings.json`);
        console.log(response.data);
        return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return []; // Return an empty array or handle the error appropriately
    }
};


const DOMElements = {
    'racecars': '.race-list'
};

const createList = (position, name, nationality, sponsor, points) => { 
    const html = `<div id=${position} class='table'>
    <table class="table table-dark">
        <tbody>
            <tr>
            <th scope="row">${position}</th>
            <td>${name}</td>
            <td>${nationality}</td>
            <td>${sponsor}</td>
            <td>${points}</td>
            </tr>
        </tbody>
    </div>`;
    document.querySelector(DOMElements['racecars']).insertAdjacentHTML('beforeend', html);
};


const loadData = async () => {
    const standings = await getData(); 
    standings.forEach((car) => { 
        createList(car.position, car.Driver.givenName + ' ' + car.Driver.familyName, car.Driver.nationality, car.Constructors[0].name, car.points);
    });
};





// OLD CODE THAT GAVE RESULTS IN DIFFERENT TABLES:

// const createList = (position, name, nationality, sponsor, points) => { 
//     const html = `<div id=${position} class='table mt-3 mb-3' style="width: 18rem;">
//     <table class="table table-dark">
//         <thead>
//             <tr>
//             <th scope="col">Position</th>
//             <th scope="col">Name</th>
//             <th scope="col">Nationality</th>
//             <th scope="col">Sponsor</th>
//             <th scope="col">Points</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//             <th scope="row">${position}</th>
//             <td>${name}</td>
//             <td>${nationality}</td>
//             <td>${sponsor}</td>
//             <td>${points}</td>
//             </tr>
//         </tbody>
//     </div>`;
//     document.querySelector(DOMElements['racecars']).insertAdjacentHTML('beforeend', html);
// };