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
                <div class="row h-50 d-flex align-items-center">
                    <div class="col">
                        <h1 class="mainTitle d-flex justify-content-center">
                            Benvenuto a casa
                        </h1>
                        <p class="localHost d-flex justify-content-center">
                            Affitta allogi unici da host locali in 190 Paesi.
                        </p>
                    </div>
                </div>
                <div class="row h-50 d-flex align-items-center">
                    <div class="col h-25 d-flex justify-content-center">
                        <div class="searchBox">
                            <a href="searched-apartments">
                                Cerca la tua struttura ideale
                            </a>
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
                            In evidenza
                        </h1>
                    </div>
                </div>

                <swiper :slidesPerView="4" :spaceBetween="20" :centeredSlides="false" :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }" :modules="modules" class="mySwiper p-4"
                        :breakpoints="{
                            640: {
                                slidesPerView: 2
                            },
                            768: {
                                slidesPerView: 3
                            },
                            1024: {
                                slidesPerView: 4
                            }
                        }">
                    <swiper-slide v-for="item in sponsoredApartments">
                        <router-link :to="{ name: 'app-show-apartments', params: { slug: item.slug } }"
                            class="text-decoration-none h-100">
                            <div class="mySponsored">
                                <div class="cardCover">
                                    <img :src="'http://127.0.0.1:8000/storage/' + item.cover" class="w-100 h-100" alt="">
                                </div>
                                <div class="badge">Sponsorizzato &star;</div>
                                <div class="cardInfo">
                                    <h5>{{ item.title }}</h5>
                                    <div>{{ item.address }}</div>
                                    <div>{{ item.price }} €/notte <i class="fa-regular fa-moon"></i></div>
                                </div>
                            </div>
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="container altre-strutture">
            <h1 class="main-title-2 pt-3" id="tutteStrutture">
                Lasciati consigliare
            </h1>
            <div class="row row row-cols-2 row-cols-lg-4 g-2 g-lg-3 pt-5">
                <div class="col" v-for="index in filtredApartment">
                    <router-link :to="{ name: 'app-show-apartments', params: { slug: index.slug } }"
                        class="text-decoration-none h-100">
                        <div class="myCard">
                            <div class="cardCover">
                                <img :src="'http://127.0.0.1:8000/storage/' + index.cover" class="w-100 h-100" alt="">
                            </div>
                            <div class="cardInfo consigliati">
                                <h5>{{ index.title }}</h5>
                                <div>{{ index.address }}</div>
                                <div>{{ index.price }} €/notte <i class="fa-regular fa-moon"></i></div>
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
    background-image: url('./public/super-jumbo-2.jpg');
    background-position: center;
    height: 450px;

    .mainTitle {
        font-size: 3rem;
        font-weight: bold;
        color: var(--link-color);
        text-transform: uppercase;
    }

    .localHost {
        color: var(--link-color);
        font-weight: bold;
        font-size: 1.1rem;
    }

    .searchBox {
       background-color: var(--link-color);
       display: flex;
       align-items: center;
       justify-content: center;
       border-radius: 5px;
       width: 20%;
       height: 80%;

        a {
            text-decoration: none;
            color: var(--bg-color);
            font-weight: bold;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: var(--bg-color);
                border-radius: 5px;
                color: var(--link-color);
                transition: all 0.2s ease-in;
            }
        }
    }


    .iconSearch {
        background-color: var(--link-color);
        text-decoration: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        i {
            color: var(--bg-color);
        }

        &:hover {
            background-color: var(--bg-color);

            i {
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
}

.sponsored {
    background-color: var(--bg-color);

    #primoPiano {
        scroll-margin-block-start: 70px;
    }

}

.main-title-1,
.main-title-2 {
    color: var(--link-color);
    text-align: center;
    font-weight: bold;
}

#tutteStrutture {
    scroll-margin-block-start: 70px;
}

.mySwiper {
    background-color: var(--bg-color);
}

.mySponsored {
    box-shadow: 1px 3px 15px -4px rgba(0, 0, 0, 0.15);
    color: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--link-color);
    height: 360px;
    position: relative;

    .badge {
        position: absolute;
        color: #ffd700;
        background-color: var(--link-color);
        top: 3%;
        left: 2%;
        padding: 8px;
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
        transition: 1s;

        img {
            transform: scale(1.1);
        }
    }
}


.myCard {
    box-shadow: 1px 3px 15px -4px rgba(0, 0, 0, 0.15);
    color: var(--link-color);
    border-radius: 10px;
    overflow: hidden;
    height: 360px;
    background-color: var(--bg-color);

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
        transition: 1s;

        img {
            transform: scale(1.1);
        }
    }
}

.altre-strutture {
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>