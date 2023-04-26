<script>
import axios from 'axios';

export default {
    name: "AppHome",
  
    components: {
  
    },
        
    data() {
  
        return {
            apartments: [],
            filterApartments: [],
            searchApartment: '',
            bed: null,
            room: null,
            bathroom: null,
            price: null,
            services: [],
            allServices: [],
            address: '',
            latitude: null,
            longitude: null,
            distanceNumber: 20,
        }
  
    },

    created() {
        this.getAllApartments();

        this.getAllServices();
    },
    
    computed: {
        filtredApartment(){
            return this.apartments.filter(address => address.address.toLowerCase().includes(this.searchApartment.toLowerCase()));
        },

        saveCoordinate() {

            axios 
                .get('https://api.tomtom.com/search/2/geocode/' + this.address + '.json?key=YqMdhFbqAodquBGAGfGAfSFvrkVm0sD5')
                .then((response) => {
                    this.latitude = response.data.results[0].position.lat
                    this.longitude = response.data.results[0].position.lon

                    console.log('coordinate:', response)
                    console.log('latitudine:', this.latitude)
                    console.log('longitudine:', this.longitude)
                })

        },

        distanceToCenter() {
            const inputRange = document.getElementById('range');

            const inputNumber = document.getElementById('number');

            inputNumber.innerHTML = inputRange.value;

            inputNumber.oninput = () => {

                inputRange.value = inputNumber.value;

            }

            inputRange.oninput = () => {

                inputNumber.value = inputRange.value;

            }
        },

        searchAutocomplete() {

            let autocompleteList = document.getElementById('autocomplete-list');

            const input = document.getElementById('address');

            input.addEventListener("keyup", function () {

                let userInput = document.getElementById('address').value;

                if (userInput.trim().length < 3) {
                    return;
                }

                const apiUrl = 'https://api.tomtom.com/search/2/geocode/';

                delete axios.defaults.headers.common['X-Requested-With'];

                axios.get(apiUrl + userInput + '.json', {
                    params: {
                        key: 'c4P3eR2jCkOGFFaGzYk7vwGVrmG9wsHs',
                        typeahead: true,
                        countrySet: 'IT'
                    }
                }).then(function (response) {

                    console.log(response.data.results);
                    const results = response.data.results;

                    // Svuota il container della lista
                    autocompleteList.innerHTML = '';

                    // Creo i nuovi elementi della lista
                    for (let i = 0; i < results.length; i++) {
                        const resultList = results[i].address.freeformAddress;
                        const liElement = document.createElement('li');
                        liElement.innerHTML = resultList;
                        liElement.classList.add('list-group-item');
                        liElement.classList.add('list-group-item-action');
                        liElement.style = 'cursor: pointer';
                        liElement.addEventListener('click', function () {
                            input.value = resultList;
                            autocompleteList.innerHTML = '';
                        });
                        autocompleteList.appendChild(liElement);
                    }

                }).catch(function (error) {
                    console.log(error);
                });

            });

        }

    },

    methods: {

        getAllApartments() {
            axios 
            .get('http://127.0.0.1:8000/api/apartments')
            .then((response) => {
                this.apartments = response.data.results.apartments;
                console.log(this.apartments)
            })
            
        },

        getAllServices() {
            axios 
            .get('http://127.0.0.1:8000/api/services')
            .then((response) => {
                this.allServices = response.data.services;
                console.log('servizi', this.allServices)
            })
            
        },

        advancedSearchApartments() {

            axios 
                .get('http://127.0.0.1:8000/api/apartments', {
                    params: {
                        bed: this.bed,
                        room: this.room,
                        bathroom: this.bathroom,
                        price: this.price,
                        services: this.services,
                    }
                })
                .then((response) => {
                    this.filterApartments = response.data.results.apartments;
                    console.log('Appartamenti filtrati', this.filterApartments)

                    if (this.latitude !== null || this.longitude !== null) {
                        this.filterApartments.forEach((apartment) => {
                            const R = 6371; // raggio della Terra in km
                            const lat1 = this.latitude; //latitudine ricerca
                            const lon1 = this.longitude; //longitudine ricerca
                            const lat2 = apartment.latitude; //latitudine appartamento
                            const lon2 = apartment.longitude; // longitudine appartamento

                            const dLat = ((lat2 - lat1) * Math.PI) / 180;
                            const dLon = ((lon2 - lon1) * Math.PI) / 180;
                            const a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos((lat1 * Math.PI) / 180) *
                                Math.cos((lat2 * Math.PI) / 180) *
                                Math.sin(dLon / 2) *
                                Math.sin(dLon / 2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            const distance = R * c; // distanza in km
                            apartment.distance = distance.toFixed(1);

                            console.log('distanza', apartment.distance);

                            // if (apartment.distance <= 20) {
                                
                            //     this.filterApartments = response.data.results.apartments;

                            //     console.log('filtraggio', this.filterApartments);

                            // }

                            // console.log("haversine lat: ", lat1)
                            // console.log("haversine long: ", lon1)
                            // console.log("haversine lon: ", lon1) // aggiungi la distanza all'oggetto appartamento
                        });
                    }
                })
            
        },

    }
};
</script>
  
<template>
        
    <main>
        
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-6 d-flex justify-content-center align-items-center">
                        <div class="ms-4 myTitle">
                            <div class="myTextBox">
                                PRENOTA SUBITO LA TUA <span>VACANZA</span> DEI SOGNI!
                            </div>
                            <div class="myParagraph">
                                <p>
                                    Con <span>BoolBnb</span> puoi andare dove vuoi, quando vuoi. Puoi trovare stanze, appartamenti, alberghi in cui trascorrere il tuo soggiorno in pieno relax.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 h-100 d-flex align-items-center justify-content-center">
                        <div class="mySearchBox">
                            <div class="mySecondParagraph">
                                Affrettati! Cerca adesso una località e scopri tutte le case che ti stanno aspettando
                                <br>
                                <div class="text-center">
                                    <input v-model="searchApartment" type="search" class="searchBar px-3 my-3" placeholder="Cerca destinazioni">
                                </div>
                            </div>
                            <div class="mySecondParagraph">
                                Hai richieste particolari? Inseriscile qui e vedi le case su misura per te
                            </div>
                            <div class="advancedSearch">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Ricerca avanzata
                                </button>
                            </div>

                            <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content bg-dark">
                                        <div class="modal-header">
                                            <h5 class="modal-title w-100 text-center" id="exampleModalLabel">Ricerca Avanzata</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        
                                        
                                        <div class="modal-body">
                                            
                                            <!-- SALVATAGGIO COORDINATE -->

                                            <div class="mb-3">
                                                <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search" class="searchBar px-3 m-3" id="address" placeholder="Inserisci indirizzo..." name="address">
                                                <ul id="autocomplete-list" class="list-group"></ul>
                                                <input type="number" v-model.number="distanceNumber"  @input="distanceToCenter" id="number" name="number-value" min="1" max="40">
                                                <input type="range" v-model.number="distanceNumber" @input="distanceToCenter" id="range" name="number-value" min="1" max="40">
                                            </div>

                                        <!-- FINE SALVATAGGIO COORDINATE -->
                                            
                                            <div class="mb-3">
                                                <label class="d-block" for="price">Prezzo massimo:</label>
                                                <input type="number" v-model.number="price" placeholder="" aria-label="Username" aria-describedby="basic-addon1">€
                                            </div> 

                                            <div class="mb-3">
                                                <label class="d-block" for="services">Servizi:</label>
                                                <div v-for="item in allServices">
                                                    <input type="checkbox" v-model="services" name="services" :value="item.name" id="services"> {{ item.name }}
                                                </div>
                                            </div> 

                                            <div class="mb-3">
                                                <label class="d-block" for="type">Tipologia:</label>
                                                <select name="type" id="type">
                                                    <option value="Villa">Villa</option>
                                                    <option value="Hotel">Hotel</option>
                                                    <option value="Appartamento">Appartamento</option>
                                                    <option value="Chalet">Chalet</option>
                                                    <option value="Stanza">Stanza</option>
                                                </select>
                                            </div>

                                            <div class="mb-3">
                                                <label class="d-block" for="bed">Numero di letti:</label>
                                                <input type="number" v-model.number="bed" name="bed" id="bed" min="1">
                                            </div>

                                            <div class="mb-3">
                                                <label class="d-block" for="bathroom">Numero di bagni:</label>
                                                <input type="number" v-model.number="bathroom" name="bathroom" id="bathroom" min="1">
                                            </div>

                                            <div class="mb-3">
                                                <label class="d-block" for="room">Numero di stanze:</label>
                                                <input type="number" v-model.number="room" name="room" id="room" min="1">
                                            </div>

                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                            <button type="button" @click="advancedSearchApartments" class="btn btn-primary" data-bs-dismiss="modal">Salva le modifiche</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container text-center my-5" v-if="filterApartments.length > 0">

            <div class="row">
                <h1 class="main-title">
                    Filtraggio avanzato
                </h1>
                <div class="col-3 mt-5" v-for="index in filterApartments">
                    <div v-if="index.distance <= distanceNumber">
                        <router-link :to="{ name: 'app-show-apartments', params: {slug: index.slug} }" class="text-decoration-none">
                            <div class="card h-100" style="width: 18rem;">
                                <img :src="index.image" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">{{ index.title }}</h5>
                                    <p class="card-text">{{ index.address }}</p>
                                    <div>{{ index.price }} $/notte</div>
                                </div>
                            </div>  
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="container text-center my-5" v-else>

            <h1 class="main-title">
                Sezione in primo piano
            </h1>
            <div class="row row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                <div class="col mt-5" v-for="index in filtredApartment">
                    <router-link :to="{ name: 'app-show-apartments', params: {slug: index.slug} }" class="text-decoration-none">
                        <div class="card h-100" style="width: 18rem;">
                            <img :src="index.cover" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ index.title }}</h5>
                                <!-- <p class="card-text">{{ index.address }}</p>
                                <div>{{ index.price }} $/notte</div> -->
                            </div>
                        </div>  
                    </router-link>
                </div>
            </div>
            
            <h1 class="main-title mt-5">
                Tutte le altre case
            </h1>
            <div class="row row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                <div class="col mt-5" v-for="index in filtredApartment">
                    <router-link :to="{ name: 'app-show-apartments', params: {slug: index.slug} }" class="text-decoration-none">
                        <div class="card h-100" style="width: 18rem;">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ index.title }}</h5>
                                <!-- <p class="card-text">{{ index.address }}</p>
                                <div>{{ index.price }} $/notte</div> -->
                            </div>
                        </div>  
                    </router-link>
                </div>
            </div>
        </div>
    </main>
        
</template>
  
<style lang="scss" scoped>

    .jumbotron {
        height: 500px;
        background-color: rgb(240, 237, 237);
        // background-image: url(../../public/paesaggio-1.jpeg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        animation: change 50s infinite;

        .myTitle{
            background-color: rgba(255, 255, 255, 0.5);
            padding: 10px;
        }

        .mySearchBox {
            background-color: #000;
            color: white;
            height: 70%;
            border-radius: 10px;
            width: 60%;
            // box-shadow: 10px 10px 20px 5px #000000;
            box-shadow: 1px 3px 15px -4px rgb(0,0,0);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .mySecondParagraph {
                padding: 20px;
                // font-weight: bold;
                font-size: 1.1rem;
            }

            .searchBar {
                background-color: white;
                width: 70%;
                text-align: center;
            }

            .advancedSearch {
                background-color: white;
                border: 2px solid black;
                font-weight: bold;
                margin-bottom: 10px;
                width: 70%;

                button {
                    width: 100%
                }

                .btn {
                    font-weight: bold;
                    border-radius: 0px;

                    &:hover {
                        color: white;
                        background-color: #ff385c;
                    }
                }
            }
        }

        .myTextBox {
            height: 70%;
            width: 60%;
            font-size: 3rem;
            font-weight: bold;

            span {
                color: #ff385c;
            }
        }

        .myParagraph {
            font-weight: bold;
            margin-top: 20px;
            font-size: 1.2rem;

            span {
                color: #ff385c;
            }
        }

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

    .card{
        box-shadow: 1px 3px 15px -4px rgba(0,0,0,0.15);

        &:hover{
        transform: scale(1.035);
    }
    }

    // KEYFRAMES
    // @keyframes change {
    //     0%{
    //         background-image: url(../../public/paesaggio-1.jpg);
    //     }
    //     20%{
    //         background-image: url(../../public/paesaggio-2.jpeg);
    //     }
    //     40%{
    //         background-image: url(../../public/paesaggio-3.jpg);
    //     }
    //     60%{
    //         background-image: url(../../public/paesaggio-4.jpg);
    //     }
    //     80%{
    //         background-image: url(../../public/paesaggio-5.jpg);
    //     }
    //     100%{
    //         background-image: url(../../public/paesaggio-6.jpg);
    //     }
    // }


</style>