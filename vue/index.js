Vue.config.devtools = true;

var bookStore = new Vue({
    el: '#book-store',
    data: {
        allBooks: [],
        showBooks: [],
        url: "https://api.myjson.com/bins/1h3vb3",
        search: "",
        show: [],
        active: false
    },
    created() {
        this.getInfo()
    },
    methods: {
        getInfo: function () {
            let expiration = 1200; // sec

            let cached = JSON.parse(localStorage.getItem(this.url));


            if (cached !== null) {
                let now = Math.floor(new Date().getTime().toString() / 1000);
                let dateString = Math.floor(cached.timestamp / 1000);

                if (now - dateString < expiration) {

                    this.allBooks = cached.value.books;
                    this.showBooks = this.allBooks;
                    let response = new Response(new Blob([cached]))
                    return Promise.resolve(response)
                }
                localStorage.removeItem(this.url);
            }

            return fetch(this.url, {
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

                localStorage.setItem(bookStore.url, JSON.stringify(myData));

                let data = JSON.parse(localStorage.getItem(bookStore.url));
                bookStore.allBooks = data.value.books;
                bookStore.showBooks = bookStore.allBooks;

            }).catch(function (error) {
                console.log(error);
            });
        },

        showLightBox: function (title) {
            let result = this.showBooks.filter(book => book.titulo.includes(title));
            this.show = result[0];
            this.active = true;
        }


    },
    computed: {
        getSearch: function () {
            this.showBooks = this.allBooks.filter(book => {
                return book.titulo.toLowerCase().match(this.search) || book.descripcion.toLowerCase().match(this.search);
            });
            return this.showBooks;
        }

    }


})