<script>
import axios from 'axios';
import LoaderVue from '../components/Loader.vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper';

export default {
    name: "AppHome",
  
    components: {
        Swiper,
        SwiperSlide,
        LoaderVue
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
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
            loading: true,
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
                console.log(this.apartments);
                this.loading = false;
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

    },
};
</script>
  
<template>
    <LoaderVue v-if="loading"/>
        
    <main v-else class="overflow-x-hidden">
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row h-50">
                    <div class="col-4 d-flex align-items-end">
                        <h1 class="mainTitle">
                            Sblocca nuove avventure
                        </h1>
                    </div>
                </div>
                <div class="row h-50 test pb-5">
                    <div class="col-6">
                        <div class="searchBox position-relative rounded-5">
                            <input v-model="searchApartment" type="search" class="searchBar w-100 py-2 px-3 rounded-5" placeholder="Cerca destinazioni...">
                            <a href="#" class="iconSearch px-4 position-absolute end-0 top-0 bottom-0 text-white d-flex align-items-center rounded-5">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                        </div>
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
                                        <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search" class="searchBar my-3" id="address" placeholder="Inserisci indirizzo..." name="address">
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

        <div v-else class="sponsored">
            <div class="container-fluid text-center ms-3 me-3">
                <div class="row">
                    <div class="col">
                        <h1 class="main-title-1 mt-3" id="primoPiano">
                            Appartamenti in evidenza
                        </h1>
                    </div>
                </div>

                <swiper
                :slidesPerView="4"
                :spaceBetween="20"
                :centeredSlides="false"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                }"
                :navigation="true"
                :modules="modules"
                class="mySwiper p-4"
            >
                    <swiper-slide v-for="index in filtredApartment">
                        <router-link :to="{ name: 'app-show-apartments', params: {slug: index.slug} }" class="text-decoration-none h-100">
                                <div class="myCard">
                                    <div class="cardCover">
                                        <img src="../../public/paesaggio-2.jpeg" class="w-100 h-100" alt="">
                                    </div>
                                    <div class="cardInfo">
                                        <h5>{{ index.title }}</h5>
                                    </div>
                                </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="container-fluid">
            <h1 class="main-title-2 mt-5" id="tutteStrutture">
                Tutte le altre strutture
            </h1>
            <div class="row row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                <div class="col mt-5" v-for="index in filtredApartment">
                    <router-link :to="{ name: 'app-show-apartments', params: {slug: index.slug} }" class="text-decoration-none">
                        <div class="myCard h-100">
                            <div class="cardCover">
                                <img src="../../public/paesaggio-2.jpeg" class="w-100 h-100" alt="">
                            </div>
                            <div class="cardInfo">
                                <h5>{{ index.title }}</h5>
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
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        background-image: url(https://a0.muscache.com/pictures/4bfe5a0a-375d-4a63-8c0b-5de59949e7d1.jpg);
        height: 450px;

        .mainTitle {
            font-size: 3.5rem;
            font-weight: bold;
            color: var(--bg-color);
        }

        .test {
            display: flex;
            align-items: end;
        }
        .searchBar {
            background-color: var(--bg-color);
            line-height: 35px;
            border-style: none;
            color: #fff;
            outline: none;
            }

            .iconSearch{
                background-color: var(--link-color);
                text-decoration: none;

                &:hover {
                    background-color: #fff;

                    i {
                    background-color: #fff;
                    color: var(--link-color);
                    }
                }
            }

            .advancedSearch {

                button {
                    background-color: white;
                }

                .btn {
                    font-weight: bold;
                    border-radius: 5px;

                    &:hover {
                        color: white;
                        background-color: #ff385c;
                    }
                }
            }
        }
    
    .sponsored {
        background-color: var(--bg-color);
    }

    .main-title-1 {
        color: #fff;
        text-align: center;
        font-weight: bold;
    }
    .main-title-2 {
        color: var(--bg-color);
        text-align: center;
        font-weight: bold;
    }

    .mySwiper{
        background-color: var(--bg-color);
    }
    .myCard{
        box-shadow: 1px 3px 15px -4px rgba(0,0,0,0.15);
        color: black !important;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        height: 280px;

        .cardCover{
            height: 200px;
            overflow: hidden;
            
            img{
                object-fit: cover;
            }
        }
        .cardInfo{
            padding: 10px;
        }

        &:hover{
        transform: scale(1.035);

        img{
            transform: scale(1.1);
        }
    }
}


</style>