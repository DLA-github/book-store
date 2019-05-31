//////////////////VARIABLES/////////////////////

var allBooks = [];
var showBooks = [];
var url = "https://api.myjson.com/bins/1h3vb3";

var search = "";
var selected;

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var img = document.getElementById('imgPop');

/////////////////CALLS//////////////////////////
getInfo();


/////////////////FUNCTION////////////////////////
function getInfo() {

    let expiration = 1200; // sec

    let cached = JSON.parse(localStorage.getItem(url));


    if (cached !== null) {
        let now = Math.floor(new Date().getTime().toString() / 1000);
        let dateString = Math.floor(cached.timestamp / 1000);

        if (now - dateString < expiration) {

            allBooks = cached.value.books;
            showBooks = allBooks;
            showResults(showBooks);
            let response = new Response(new Blob([cached]))
            return Promise.resolve(response)
        }
        localStorage.removeItem(url);
    }

    return fetch(url, {
        method: "GET"
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (json) { ///////////////////////MANAGEMENT OF DATA//////////
        let myData = {
            value: json,
            timestamp: new Date().getTime()
        }

        localStorage.setItem(url, JSON.stringify(myData));

        let data = JSON.parse(localStorage.getItem(url));
        allBooks = data.value.books;
        showBooks = allBooks;


        /////////CALLS///////////////////////////////////
        showResults(showBooks);


    }).catch(function (error) {
        console.log(error);
    });
};


document.getElementById("inputSearch").addEventListener('keyup', getSearch);


//////////////////////FUNCTIONS////////////////////////////////
function getSearch(e) {
    let str = e.target.value;
    showBooks = allBooks.filter(book => {
        return book.titulo.toLowerCase().match(str) || book.descripcion.toLowerCase().match(str);
    });
    showResults(showBooks);
}


function showResults(array) {

    document.getElementById("portadas").innerHTML = "";
    array.forEach(element => {

        let gDiv = document.createElement('div');
        gDiv.setAttribute('class', 'sample');
        let cont = document.createElement('div');
        cont.setAttribute('class', 'portada');
        let imgDiv = document.createElement('div');
        imgDiv.setAttribute('class', 'preview');
        let img = document.createElement('img');
        img.setAttribute('src', element.portada);
        img.setAttribute('class', 'img');
        let infoDiv = document.createElement('div');
        infoDiv.setAttribute('class', 'info');
        let title = document.createElement('p');
        title.append(element.titulo);
        let dscpt = document.createElement('p');
        dscpt.append(element.descripcion);
        let btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.setAttribute('value', element.titulo);
        btn.innerHTML = "Show More";
        infoDiv.append(title, dscpt, btn);
        imgDiv.append(img);
        cont.append(imgDiv, infoDiv);
        gDiv.append(cont);
        document.getElementById("portadas").append(gDiv);
    });
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            let sel = showBooks.filter(book => book.titulo == this.value);
            selected = sel[0];
            showPopup();
        })
    });

}
span.onclick = function () {
    modal.style.display = "none";
}

function showPopup() {
    img.setAttribute('src', selected.detalle)
    modal.style.display = 'block';
}