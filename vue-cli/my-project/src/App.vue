<template>
  <div id="app">
    <headerStore></headerStore>
    <div id="book-store" class="container">
      <label for>Search</label>
      <input v-model="search" type="text">
      <ShowBooks>
        <div class="sample" v-for="book in getSearch">
          <div class="portada">
            <div class="preview">
              <img :src="book.portada" alt class="img">
            </div>
            <div class="info">
              <h3>Title:</h3>
              <p>"{{book.titulo}}"</p>

              <h3>Description:</h3>
              <p>"{{book.descripcion}}"</p>

              <button @click="showLightBox(book.titulo)">Show More</button>
            </div>
          </div>
        </div>
      </ShowBooks>
      <div id="myModal" class="modal" v-if="active==true">
        <div class="modal-content">
          <span class="close" @click="active=false">&times;</span>
          <img :src="show.detalle" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowBooks from "./components/ShowBooks";
import headerStore from "./components/headerStore";

export default {
  name: "App",
  components: {
    ShowBooks,
    headerStore
  },
  data() {
    return {
      allBooks: [],
      showBooks: [],
      url: "https://api.myjson.com/bins/1h3vb3",
      search: "",
      show: [],
      active: false
    };
  },
  created() {
    fetch(this.url, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        ///////////////////////MANAGEMENT OF DATA//////////
        let data = json;
        this.allBooks = data.books;
        this.showBooks = this.allBooks;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    showLightBox: function(title) {
      let result = this.showBooks.filter(book => book.titulo.includes(title));
      this.show = result[0];
      this.active = true;
    }
  },
  computed: {
    getSearch: function() {
      this.showBooks = this.allBooks.filter(book => {
        return (
          book.titulo.toLowerCase().match(this.search) ||
          book.descripcion.toLowerCase().match(this.search)
        );
      });
      return this.showBooks;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.modal {
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: black;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 700px;
  /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
