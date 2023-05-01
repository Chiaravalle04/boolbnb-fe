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
            sponsoredApartments: [],
            searchApartment: '',
            cover: null,
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
        filtredApartment() {
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

                input.addEventListener("input", function () {
                    if (input.value === '') {
                        autocompleteList.innerHTML = '';
                    }
                });

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
                    // Verifica se il numero di risultati supera 5
                    if (results.length > 5) {
                        // Aggiunge una classe CSS per attivare la scrollbar
                        autocompleteList.classList.add('scrollbar');
                    } else {
                        // Rimuove la classe CSS per disattivare la scrollbar
                        autocompleteList.classList.remove('scrollbar');
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

                    const sponsoredApartments = [];

                    for (let i = 0; i < response.data.results.apartments.length; i++) {
                        if (response.data.results.apartments[i].sponsorships.length > 0) {
                            sponsoredApartments.push(response.data.results.apartments[i]);
                        }
                    }

                    this.sponsoredApartments = sponsoredApartments;
                    console.log('appartamenti sponsorizzati', this.sponsoredApartments);

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

                        });
                    }
                })

        },

    },
};
</script>
  
<template>
    <LoaderVue v-if="loading" />

    <main v-else class="overflow-x-hidden">
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row h-50">
                    <div class="d-flex align-items-end text-center">
                        <h2 class="mainTitle">
                            Sblocca nuove avventure
                        </h2>
                    </div>
                </div>
                <div class="row h-50 test pb-5">
                    <div class="col-6">
                        <div class="searchBox position-relative">
                            <div class="input-group mt-5">
                                <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search"
                                    class="form-control searchBar" placeholder="Inserisci una destinazione" id="address"
                                    name="address">
                                <a href="" class="iconSearch">
                                    <button class="btn my-btn" type="button" id="button-addon2">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </a>
                                <a href="searched-apartments" class="iconSearch ricercavanzata">
                                    <button class="btn my-btn" type="button" id="button-addon2">
                                        <i class="fa-solid fa-bolt"></i>
                                    </button>
                                </a>
                            </div>
                            <ul id="autocomplete-list" class="list-group"></ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="sponsored">
            <div class="container-fluid text-center ms-3 me-3">
                <div class="row">
                    <div class="col">
                        <h1 class="main-title-1 mt-3" id="primoPiano">
                            Appartamenti in evidenza
                        </h1>
                    </div>
                </div>

                <swiper :slidesPerView="4" :spaceBetween="20" :centeredSlides="false" :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }" :navigation="true" :modules="modules" class="mySwiper p-4">
                    <swiper-slide v-for="item in sponsoredApartments">
                        <router-link :to="{ name: 'app-show-apartments', params: { slug: item.slug } }"
                            class="text-decoration-none h-100">
                            <div class="myCard">
                                <div class="cardCover">
                                    <img :src="'http://127.0.0.1:8000/storage/' + item.cover" class="w-100 h-100" alt="">
                                </div>
                                <div class="badge">Sponsorizzato</div>
                                <div class="cardInfo">
                                    <h5>{{ item.title }}</h5>
                                    <div>{{ item.address }}</div>
                                    <div>{{ item.price }} €/notte</div>
                                    <div>km dal centro</div>
                                </div>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="container">
            <h1 class="main-title-2 mt-3" id="tutteStrutture">
                Tutte le altre strutture
            </h1>
            <div class="row row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                <div class="col mt-5" v-for="index in filtredApartment">
                    <router-link :to="{ name: 'app-show-apartments', params: { slug: index.slug } }"
                        class="text-decoration-none">
                        <div class="myCard h-100">
                            <div class="cardCover">
                                <img :src="'http://127.0.0.1:8000/storage/' + index.cover" class="w-100 h-100" alt="">
                            </div>
                            <div class="cardInfo">
                                <h5>{{ index.title }}</h5>
                                <div>{{ index.address }}</div>
                                <div>{{ index.price }} €/notte</div>
                                <div>km dal centro</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>
  
<style lang="scss" scoped>
.searchBox {
    border-radius: 20px;
}

.ricercavanzata {
    border-left: 1px solid gray;
}

.jumbotron {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    background-image: url(https://a0.muscache.com/pictures/4bfe5a0a-375d-4a63-8c0b-5de59949e7d1.jpg);
    height: 450px;

    .mainTitle {
        //font-size: 3.5rem;
        font-size: 43px;
        width: 633px;
        font-weight: bold;
        color: var(--bg-color);
        border: none;
        border-radius: 10px;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .test {
        display: flex;
    }

    .searchBar {
        line-height: 35px;
        border-style: none;
        outline: none;
    }

    .scrollbar {
        max-height: 200px;
        overflow-y: auto;
    }

    .iconSearch {
        background-color: var(--link-color);
        text-decoration: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        &:hover {
            background-color: var(--bg-color);

            i {
                background-color: var(--bg-color);
                color: var(--link-color);
            }
        }

        .my-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
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

    #primoPiano {
        scroll-margin-block-start: 70px;
    }

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

#tutteStrutture {
    scroll-margin-block-start: 70px;
}

.mySwiper {
    background-color: var(--bg-color);
}

.myCard {
    box-shadow: 1px 3px 15px -4px rgba(0, 0, 0, 0.15);
    color: black !important;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    height: 360px;
    position: relative;

    .badge {
        position: absolute;
        color: #ffd700;
        background-color: var(--bg-color);
        top: 5%;
        left: 2%;
    }

    .cardCover {
        height: 200px;
        overflow: hidden;

        img {
            object-fit: cover;
        }
    }

    .cardInfo {
        padding: 10px;
    }

    &:hover {
        transform: scale(1.035);

        img {
            transform: scale(1.1);
        }
    }
}

.main-title {
    color: var(--link-color);
}

.mySwiper {
    //border: 1px solid lightgray;
    background-color: var(--bg-color);
}

.myCard {
    box-shadow: 1px 3px 15px -4px rgba(0, 0, 0, 0.15);
    color: black !important;
    border-radius: 10px;
    overflow: hidden;

    .cardCover {
        height: 200px;
        overflow: hidden;

        img {
            object-fit: cover;
        }
    }

    .cardInfo {
        padding: 10px;
    }

    &:hover {
        transform: scale(1.035);

        img {
            transform: scale(1.1);
        }
    }
}
</style>