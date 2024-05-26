const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovie(APILINK);
function returnMovie(url) {
    fetch(url).then(res => res.json()).then(function (data) {
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement("div");
            div_card.setAttribute("class", "card");

            const div_row = document.createElement("div");
            div_row.setAttribute("class", "row");

            const div_column = document.createElement("div");
            div_column.setAttribute("class", "column");

            const img = document.createElement("img");
            img.setAttribute('class', 'thumbnail');
            img.setAttribute('id', 'image');

            const title = document.createElement("h3");
            title.setAttribute('class', 'title');

            const center = document.createElement("center");

            // if (element.title != element.original_title) {
            //     title.innerHTML = `${element.title}` + "<br>" + `${element.original_title}`;
            // } else {
            //     title.innerHTML = `${element.title}<br><a href="./movie.html?id=${element.id} &title=${element.title}">reviews</a>`;
            // }

            title.innerHTML = `${element.title}<br><a href="./movie.html?id=${element.id} &title=${element.title}">reviews</a>`;

            // console.log(element.title);
            img.src = IMG_PATH + element.poster_path;

            center.appendChild(img);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchValue = search.value;

    if (searchValue) {
        returnMovie(SEARCHAPI + searchValue);
        search.value = "";
    }
});