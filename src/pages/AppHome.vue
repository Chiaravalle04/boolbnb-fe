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
            address: '',
            latitude: null,
            longitude: null,
        }
  
    },

    created() {
        axios 
            .get('http://127.0.0.1:8000/api/apartments')
            .then((response) => {
                this.apartments = response.data.results.apartments;
                console.log(this.apartments)
            }
        )
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

    },

    methods: {

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
                        <div class="ms-4">
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

                                <input v-model="searchApartment" type="search" name="" id="" class="searchBar px-3 m-3" placeholder="Cerca destinazioni">
                            </div>
                            <div>
                                Hai richieste particolari? Inseriscile qui e vedi le case su misura per te
                            </div>
                            <div class="advancedSearch">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Ricerca avanzata
                                </button>
                            </div>

                            <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <!-- SALVATAGGIO COORDINATE -->

                                        <div class="mySecondParagraph">
                                            coordinate
                                            <input v-model="address" @input="saveCoordinate" type="search" name="" id="" class="searchBar px-3 m-3" placeholder="Cerca destinazioni">
                                        </div>

                                        <!-- FINE SALVATAGGIO COORDINATE -->
                                        
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label class="d-block" for="price">prezzo:</label>
                                                <!-- <input type="range" placeholder="" aria-label="Username" aria-describedby="basic-addon1"> -->
                                                <input type="number" v-model.number="price" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
                                            </div> 

                                            <div class="mb-3">
                                                <label class="d-block" for="services">servizi:</label>
                                                <input type="checkbox" v-model="services" name="services" value="Lavatrice" id="services">Lavatrice
                                                <input type="checkbox" v-model="services" name="services" value="Vasca da bagno" id="services">Vasca da bagno
                                            </div> 

                                            <!-- <div class="row ms-auto">
                                                <div class="form-check col-6" v-for="service in this.store.servicesList" :key="service.id">
                                                    <input class="form-check-input" type="checkbox" :value="service.slug"
                                                        v-model="store.filters.services" />
                                                    <label class="form-check-label text-capitalize">{{ service.name }}</label>
                                                </div>
                                            </div> -->

                                            <!-- <div class="mb-3">
                                                <label class="d-block" for="type">tipo di struttura:</label>
                                                <select name="type" id="type">
                                                    <option value="appartamento">Appartamento</option>
                                                    <option value="villa">Villa</option>
                                                    <option value="hotel">Hotel</option>
                                                </select>
                                            </div> -->

                                            <div class="mb-3">
                                                <label class="d-block" for="bed">numero di letti:</label>
                                                <!-- <input type="checkbox" v-model="bed" name="bed" id="bed">1
                                                <input type="checkbox" v-model="bed" name="bed" id="bed">2
                                                <input type="checkbox" v-model="bed" name="bed" id="bed">3
                                                <input type="checkbox" v-model="bed" name="bed" id="bed">4
                                                <input type="checkbox" v-model="bed" name="bed" id="bed">5 -->
                                                <input type="number" v-model.number="bed" name="bed" id="bed">5
                                            </div>

                                            <div class="mb-3">
                                                <label class="d-block" for="bathroom">numero di bagni:</label>
                                                <!-- <input type="checkbox" v-model="bathroom" name="bathroom" id="bathroom">1
                                                <input type="checkbox" v-model="bathroom" name="bathroom" id="bathroom">2
                                                <input type="checkbox" v-model="bathroom" name="bathroom" id="bathroom">3
                                                <input type="checkbox" v-model="bathroom" name="bathroom" id="bathroom">4
                                                <input type="checkbox" v-model="bathroom" name="bathroom" id="bathroom">5 -->
                                                <input type="number" v-model.number="bathroom" name="bathroom" id="bathroom">5
                                            </div>

                                            <div class="mb-3">
                                                <label class="d-block" for="room">numero di stanze:</label>
                                                <!-- <input type="checkbox" name="room" id="room">1
                                                <input type="checkbox" name="room" id="room">2
                                                <input type="checkbox" name="room" id="room">3
                                                <input type="checkbox" name="room" id="room">4
                                                <input type="checkbox" name="room" id="room">5 -->
                                                <input type="number" v-model.number="room" name="room" id="room">5
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

        <div class="container text-center mt-5" v-if="filterApartments.length > 0">

            <div class="row">
                <h1 class="main-title">
                    Filtraggio avanzato
                </h1>
                <div class="col-3 mt-5" v-for="index in filterApartments">
                    <div v-if="index.distance <= 20">
                        <a href="http://" class="text-decoration-none">
                            <div class="card h-100" style="width: 18rem;">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">{{ index.title }}</h5>
                                    <p class="card-text">{{ index.address }}</p>
                                    <div>{{ index.price }} $/notte</div>

                                </div>
                            </div>  
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container text-center mt-5" v-else>

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
                                <div>{{ index.price }} $/notte</div>
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
                                <div>{{ index.price }} $/notte</div>
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
        height: 500px;
        background-color: rgb(240, 237, 237);

        .mySearchBox {
            background-color: #000;
            color: white;
            height: 70%;
            border-radius: 10px;
            width: 60%;
            box-shadow: 10px 10px 20px 5px #000000;
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

</style>