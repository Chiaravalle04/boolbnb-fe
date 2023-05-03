<script>
import axios from 'axios';

export default {
    name: "AppSearchedApartments",

    data() {
        return {
            isClicked: false,
            isClicked2: false,
            isClicked3: false,
            isClicked4: false,
            address: '',
            bed: null,
            room: null,
            bathroom: null,
            price: null,
            latitude: null,
            longitude: null,
            services: [],
            types: [],
            distanceNumber: 10,
            filterApartments: [],
            apartmentsDistance: [],
            allServices: [],
        }
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
                        type: this.types,
                    }
                })
                .then((response) => {
                    this.filterApartments = response.data.results.apartments;
                    console.log('Appartamenti filtrati', this.filterApartments)

                    if (this.latitude !== null || this.longitude !== null) {
                        const closestApartments = [];
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

                            // console.log('distanza', apartment.distance);

                            if (apartment.distance <= this.distanceNumber) {

                                closestApartments.push(apartment);

                                console.log('APPARTAMENTO DISTANZA', this.apartmentsDistance)

                            }

                        });

                        this.apartmentsDistance = closestApartments;
                    }
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

    },

    computed: {

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

        saveCoordinate() {

            axios
                .get('https://api.tomtom.com/search/2/geocode/' + this.address + '.json?key=YqMdhFbqAodquBGAGfGAfSFvrkVm0sD5')
                .then((response) => {
                    this.latitude = response.data.results[0].position.lat
                    this.longitude = response.data.results[0].position.lon

                    // console.log('coordinate:', response)
                    // console.log('latitudine:', this.latitude)
                    // console.log('longitudine:', this.longitude)
                })

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

        },

    },

    created() {
        this.getAllServices();
    }
};
</script>

<template>
    <main>
        <div class="container d-flex">

            <aside>

                <div class="container_search_bar">

                    <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search"
                            class="" placeholder="Inserisci una destinazione"
                            id="address" name="address">
                    <ul id="autocomplete-list" class="list-group"></ul>

                </div>

                <div class="distance_to_center">

                    <div class="km_center">

                        <label for="number">KM dal centro</label><br>
                                
                        <input id="range" v-model.number="distanceNumber" @input="distanceToCenter" min="1" max="20"
                            name="number-value" type="range">
        
                        <input type="number" v-model.number="distanceNumber" @input="distanceToCenter" min="1"
                            max="20" name="number-value" id="number" class="input-km">

                    </div>

                    <div class="price">

                        <label for="price">Prezzo</label>
                        <input type="number" id="price" v-model.number="price" min="0" placeholder="€" class="input_number">

                    </div>

                </div>

                <div class="structure_type">

                    <div class="choose_type">
                        <!-- <input type="checkbox" v-model="types" value="Appartamento" name="type" id="appartamento">
                        <label for="appartamento" name="type"><i class="fa-solid fa-house"></i></label> -->
                        <input type="checkbox" v-model="types" value="Appartamento" class="btn-check" id="Appartamento" autocomplete="off">
                        <label class="btn btn-outline-primary" for="Appartamento"><i class="fa-solid fa-house"></i>Casa</label>
                    </div>
                    <div class="choose_type">
                        <!-- <input type="checkbox" v-model="types" value="Stanza" name="type" id="stanza">
                        <label for="stanza" name="type">Stanza</label> -->
                        <input type="checkbox" v-model="types" value="Stanza" class="btn-check" id="Stanza" autocomplete="off">
                        <label class="btn btn-outline-primary" for="Stanza"><i class="fa-solid fa-bed"></i>Stanza</label>
                    </div>
                    <div class="choose_type">
                        <!-- <input type="checkbox" v-model="types" value="Villa" name="type" id="villa">
                        <label for="villa" name="type">Villa</label> -->
                        <input type="checkbox" v-model="types" value="Villa" class="btn-check" id="Villa" autocomplete="off">
                        <label class="btn btn-outline-primary" for="Villa"><i class="fa-solid fa-landmark"></i> Villa</label>
                    </div>
                    <div class="choose_type">
                        <!-- <input type="checkbox" v-model="types" value="Chalet" name="type" id="chalet">
                        <label for="chalet" name="type">Chalet</label> -->
                        <input type="checkbox" v-model="types" value="Chalet" class="btn-check" id="Chalet" autocomplete="off">
                        <label class="btn btn-outline-primary" for="Chalet"><i class="fa-solid fa-tree"></i>Chalet</label>
                    </div>
                    <div class="choose_type">
                        <!-- <input type="checkbox" v-model="types" value="Hotel" name="type" id="hotel">
                        <label for="hotel" name="type">Hotel</label> -->
                        <input type="checkbox" v-model="types" value="Hotel" class="btn-check" id="Hotel" autocomplete="off">
                        <label class="btn btn-outline-primary" for="Hotel"><i class="fa-solid fa-hotel"></i>Hotel</label>
                    </div>

                </div>

                <div class="bed_room_bath">

                    <div class="container_brb">
                        <label for="number_bed" class="n_bed"><i class="fa-solid fa-bed"></i> Letti</label>
                        <input id="number_bed" type="number" min="1" v-model.number="bed" placeholder="1" class="input-letti">
                    </div>
                    <div class="container_brb">
                        <label for="number_room" class="n_room"><i class="fa-solid fa-person-shelter"></i> Stanze</label>
                        <input id="number_room" type="number" min="1" v-model.number="room" placeholder="1" class="input-stanze">
                    </div>
                    <div class="container_brb">
                        <label for="number_bath" class="n_bath"><i class="fa-solid fa-bath"></i> Bagni</label>
                        <input id="number_bath" type="number" min="1" v-model.number="bathroom" placeholder="1" class="input-bagni">
                    </div>

                </div>

                <div class="services_container">

                    <div class="container_input" v-for="item in allServices">
                        <input type="checkbox" v-model="services" :id="item.name" name="services" :value="item.name" class="btn-check" autocomplete="off">
                        <label class="btn btn-outline-primary" :for="item.name">{{ item.name }}</label><br>
                        <!-- <input type="checkbox" v-model="services" :id="item.name" name="services" :value="item.name">
                        <label :for="item.name">{{ item.name }}</label> -->
                    </div>

                </div>

                <div class="filter_apartment_btn">
                    <button @click="advancedSearchApartments()">
                        Filtra
                    </button>
                </div>

            </aside>

            <div class="container_card">

                <div v-for="index in apartmentsDistance"  class="container_details_card">
                    <div v-if="index.distance <= distanceNumber">
                        <router-link :to="{ name: 'app-show-apartments', params: { slug: index.slug } }">
                            <div class="my_card">
                                <div class="card_cover">
                                    <img :src="'http://127.0.0.1:8000/storage/' + index.cover" alt="">
                                </div>
                                <div class="card_info">
                                    <h5><b>{{ index.title }}</b></h5>
                                    <h6>{{ index.address }}</h6>
                                    <h6><b>{{ index.price }}</b> €/notte</h6>
                                    <h6><b>{{ index.distance }}</b> km dal centro</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

            </div>

        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 70px);
    // background-color: rgb(232, 232, 232);
}

aside {
    width: 35%;
    padding: 20px;
    height: calc(100vh - 70px);
    // height: 100vh;
    position: sticky;
    top: 70px;
    box-shadow: 17px 0px 17px -5px rgba(0,0,0,0.42);
    .container_search_bar {
        input {
            width: 100%;
            height: 40px;
            border-radius: 10px;
            border: 1px solid var(--link-color);
            padding: 0 15px;
            &:focus {
                outline: none;
            }
        }
    }
    .distance_to_center {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .km_center{
            width: 50%;
            text-align: center;
            label {
                font-size: 15px;
                color: var(--link-color);
            }
            #range {
                -webkit-appearance: none;
                width: 90%;
                height: 8px;
                margin-top: 15px;
                border-radius: 25px;
                background: var(--description-color);
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
                &:hover {
                    opacity: 1;
                }
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%; 
                    background: var(--description-color);
                    cursor: pointer;
                }
                &::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--title-color);
                    cursor: pointer;
                }
            }
            #number {
                display: block;
                margin: 0 auto;
                width: 30%;
                margin-top: 10px;
                border-radius: 15px;
                border: none;
                text-align: center;
                background-color: var(--description-color);
                color: var(--bg-color);
                &:focus {
                    outline: none;
                }
            }
        }
        .price {
            width: 50%;
            text-align: center;
            label {
                font-size: 15px;
                color: var(--link-color);
            }
            #price {
                display: block;
                margin: 0 auto;
                width: 40%;
                margin-top: 10px;
                border-radius: 15px;
                border: none;
                padding-left: 15px;
                background-color: var(--description-color);
                color: var(--bg-color);
                &:focus {
                    outline: none;
                }
                &::placeholder {
                    color: #fff;
                }
            }
        }
    }
    .structure_type {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .choose_type {
            display: flex;
            width: calc(100% / 5 - 5px);
            label {
                display: inline-block;
                width: 100%;
                height: 60px;
                text-align: center;
                // padding-left: 0 !important;
                // padding-right: 0 !important;
            }
            
        }
    }
    .bed_room_bath {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .container_brb {
            width: calc(100% / 3);
            text-align: center;
            label {
                font-size: 15px;
                color: var(--link-color);
            }
            input {
                display: block;
                margin: 0 auto;
                width: 50%;
                margin-top: 10px;
                border-radius: 15px;
                border: none;
                padding-left: 15px;
                background-color: var(--description-color);
                color: var(--bg-color);
                &:focus {
                    outline: none;
                }
                &::placeholder {
                    color: #fff;
                }
            }
        }
    }
    .services_container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
        label {
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }

    .filter_apartment_btn {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        button {
            display: inline-block;
            width: 40%;
            height: 40px;
            border: none;
            border-radius: 10px;
            background-color: var(--description-color);
            color: var(--bg-color);
        }
    }
    
}

.container_card {
    width: 65%;
    min-height: calc(100vh - 70px);
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .container_details_card {
        width: calc(100% / 3 - 10px);
        height: 360px;
        margin: 5px;
        box-shadow: 0px 7px 15px -1px rgba(0,0,0,0.4);
        border-radius: 10px;
        overflow: hidden;
        background-color: var(--bg-color);
        transition: all 0.3s ease-in;
        &:hover {
            scale: 1.035;
        }
        div {
            width: 100%;
            height: 100%;
        }
        a {
            width: 100%;
            height: 100%;
            text-decoration: none;
        }
        .my_card {
            width: 100%;
            height: 100%;
            // box-shadow: 1px 3px 15px -4px rgba(0, 0, 0, 0.15);
            color: var(--title-color) !important;
            border-radius: 10px;
            overflow: hidden;
            .card_cover {
                height: 55%;
                overflow: hidden;

                img {
                    object-fit: cover;
                    height: 100%;
                }
            }
            .card_info {
                height: 45%;
                padding: 10px;
            }
        }
    }
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-check:checked + .btn-outline-primary,
.btn-outline-primary.active,
.btn-outline-primary:active,
.btn-outline-primary:focus,
.btn-outline-primary:hover {
    color: var(--bg-color) !important;
    background-color: var(--description-color) !important;
    border-color: var(--description-color) !important;
}

.btn-outline-primary {
    color: var(--description-color) !important;
    border-color: var(--description-color) !important;
    background-color: #fff !important;
}
</style>
