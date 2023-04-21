<script>
import axios from 'axios';

export default {
    name: "AppHome",
  
    components: {
  
    },

    created() {
        axios 
            .get('http://127.0.0.1:8000/api/apartments')
            .then((response) => {
                this.apartments = response.data.apartments;
                console.log(this.apartments)
                // this.store.loading = false;
            }
        )
    },
        
    data() {
  
            return {
                apartments: [],
                searchApartment: '',
            }
  
        },
    
    computed: {
        filtredApartment(){
            return this.apartments.filter(address => address.address.toLowerCase().includes(this.searchApartment.toLowerCase()));
        }
    }
};
</script>
  
<template>
        
    <main>
        
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row align-items-end h-100 pb-5 d-flex justify-content-center">
                    <div class="col d-flex justify-content-center">
                        <input v-model="searchApartment" type="search" name="" id="" class="searchBar px-3 me-3" placeholder="Cerca destinazioni">
                    <!-- </div> -->
                    
                    <!-- <div class="col-4 text-start"> -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Ricerca avanzata
                        </button>

                        <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label class="d-block" for="price">prezzo:</label>
                                            <input type="range" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="services">servizi:</label>
                                            <input type="checkbox" name="services" id="services">ciao
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="type">tipo di struttura:</label>
                                            <select name="type" id="type">
                                                <option value="appartamento">Appartamento</option>
                                                <option value="villa">Villa</option>
                                                <option value="hotel">Hotel</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="bed">numero di letti:</label>
                                            <input type="checkbox" name="bed" id="bed">1
                                            <input type="checkbox" name="bed" id="bed">2
                                            <input type="checkbox" name="bed" id="bed">3
                                            <input type="checkbox" name="bed" id="bed">4
                                            <input type="checkbox" name="bed" id="bed">5
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="bathroom">numero di bagni:</label>
                                            <input type="checkbox" name="bathroom" id="bathroom">1
                                            <input type="checkbox" name="bathroom" id="bathroom">2
                                            <input type="checkbox" name="bathroom" id="bathroom">3
                                            <input type="checkbox" name="bathroom" id="bathroom">4
                                            <input type="checkbox" name="bathroom" id="bathroom">5
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="room">numero di stanze:</label>
                                            <input type="checkbox" name="room" id="room">1
                                            <input type="checkbox" name="room" id="room">2
                                            <input type="checkbox" name="room" id="room">3
                                            <input type="checkbox" name="room" id="room">4
                                            <input type="checkbox" name="room" id="room">5
                                        </div>

                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                        <button type="button" class="btn btn-primary">Salva le modifiche</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        

        <div class="container text-center mt-5">

            <div class="row">
                <h1 class="main-title">
                    Sezione in primo piano
                </h1>
                <div class="col-3 mt-5" v-for="index in filtredApartment">
                    <a href="http://" class="text-decoration-none">
                        <div class="card h-100" style="width: 18rem;">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ index.title }}</h5>
                                <p class="card-text">{{ index.address }}</p>
                            </div>
                        </div>  
                    </a>
                </div>
            </div>
            <div class="row">
                <h1 class="main-title mt-5">
                    Tutte le altre case
                </h1>
                <div class="col-3 mt-5" v-for="index in filtredApartment">
                    <a href="http://" class="text-decoration-none">
                        <div class="card h-100" style="width: 18rem;">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ index.title }}</h5>
                                <p class="card-text">{{ index.address }}</p>
                            </div>
                        </div>  
                    </a>
                </div>
            </div>
        </div>
    </main>
        
</template>
  
<style lang="scss" scoped>

    .jumbotron {
        height: 400px;
        background-image: url(https://thumbs.dreamstime.com/b/paesaggio-scenico-della-natura-del-percorso-vicino-al-lago-114029813.jpg);
        background-repeat: no-repeat;
        background-size: cover;

        .searchBar {
            border-radius: 10px;
            border-style: none;
            line-height: 35px;
            background-color: black;
        }
    }
    
    .main-title {
        color: #ff385c;
    }

</style>