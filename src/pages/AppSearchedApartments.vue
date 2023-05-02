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
            distanceNumber: 20,
            filterApartments: [],
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

                    console.log('coordinate:', response)
                    console.log('latitudine:', this.latitude)
                    console.log('longitudine:', this.longitude)
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
        <div class="input_ricerca_avanzata text-center pt-3">
            <div class="icona_input">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div>
                    <!-- <input type="search" v-model="address" @input="saveCoordinate" placeholder="Ricerca avanzata"> -->
                    <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search"
                        class="form-control input-ricerca-avanzata " placeholder="Inserisci una destinazione" id="address"
                        name="address">
                    <ul id="autocomplete-list" class="list-group"></ul>
                </div>
            </div>
        </div>

        <div class="ricerca-avanzata">
            <div class="type">
                <h3 class="">Tipo di alloggio</h3>
                <hr>
                <div class="struttura-alloggio">
                    <div>
                        <div class="icona-appartamento" :class="{ 'clicked': isClicked }" @click="isClicked = !isClicked">
                            <i class="fa-solid fa-hotel hotel"></i>
                            <span class="nome-appartamento">
                                Hotel
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked2': isClicked2 }"
                            @click="isClicked2 = !isClicked2">
                            <i class="fa-solid fa-warehouse villa "></i>
                            <span class="nome-appartamento">
                                Villa
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked3': isClicked3 }"
                            @click="isClicked3 = !isClicked3">
                            <i class="fa-solid fa-people-roof stanza"></i>
                            <span class="nome-appartamento">
                                Stanza
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked4': isClicked4 }"
                            @click="isClicked4 = !isClicked4">
                            <i class="fa-regular fa-building appartamento"></i>
                            <span class="nome-appartamento">
                                Appartamento
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="servizi">
                <h3>Stanze e letti</h3>
                <hr>
                <div class="struttura-alloggio-servizi">
                    <div class="letti">
                        <h5>Numero di letti:</h5>
                        <input type="number" min="1" v-model.number="bed" placeholder="Numero di letti" class="input-letti">
                    </div>
                    <hr>
                    <div class="stanze">
                        <h5>Numero di stanze:</h5>
                        <input type="number" min="1" v-model.number="room" placeholder="Numero di stanze"
                            class="input-stanze">
                    </div>
                    <hr>
                    <div class="bagni">
                        <h5>Numero di bagni:</h5>
                        <input type="number" min="1" v-model.number="bathroom" placeholder="Numero di bagni"
                            class="input-bagni">
                    </div>
                </div>
            </div>
            <div class="servizi-placeholder">
                <h3>Servizi</h3>
                <hr>
                <!-- <h6>Servizi essenziali</h6> -->
                <div class="servizi-essenziali">

                    <div v-for="item in allServices">
                        <input type="checkbox" v-model="services" :id="item.name" name="services" :value="item.name">
                        <label :for="item.name">{{ item.name }}</label>
                    </div>

                </div>

            </div>
            <div class="price-km">
                <h3>Prezzo e KM dal centro</h3>
                <hr>
                <div>
                    <label for="distance_to_center">
                        <h4>KM dal centro</h4>
                    </label><br>
                    <input id="range" v-model.number="distanceNumber" @input="distanceToCenter" min="1" max="40"
                        name="number-value" type="range">
                    <input type="number" v-model.number="distanceNumber" @input="distanceToCenter" min="1" max="40"
                        name="number-value" id="number" class="input-km">
                </div>
                <hr>
                <div>
                    <h5>Prezzo €</h5>
                    <input type="number" v-model.number="price" min="50" placeholder="50€" class="input_number">
                </div>
                <hr>
                <div>
                    <ul class="py-2">
                        <li>
                            Ogni prenotazione include una protezione gratuita in caso di cancellazione da parte dell'host,
                            di inesattezze dell'annuncio e di altri problemi come le difficoltà in fase di check-in.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="go">
            <button @click="advancedSearchApartments()">
                vai
            </button>
        </div>
        <h2 class="text-center pt-5 pb-4">Appartamenti ricerca avanzata</h2>
        <div class="appartamentiRicercaAvanzata">

            <div class="" v-for="index in filterApartments">
                <div v-if="index.distance <= distanceNumber">

                    <router-link :to="{ name: 'app-show-apartments', params: { slug: index.slug } }"
                        class="text-decoration-none">
                        <div class="myCard">
                            <div class="cardCover">
                                <img :src="'http://127.0.0.1:8000/storage/' + index.cover" class="w-100 h-100" alt="">
                            </div>
                            <div class="cardInfo">
                                <h5>{{ index.title }}</h5>
                                <div>{{ index.address }}</div>
                                <div>{{ index.price }} €/notte</div>
                                <div>{{ index.distance }} km dal centro</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 70px);
    margin-bottom: -10px;
    background-color: rgb(147, 147, 147);
}


.ricerca-avanzata {
    border: 1px solid rgb(172, 172, 172);
    width: 87%;
    margin: 0 auto;
    height: 470px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    background-color: #F2F2F2;

    >div {
        width: 25%;
        height: 100%;
    }

    .type {
        // background-color: rgb(226, 224, 224);
        padding: 10px;
        border-right: 1px dashed rgb(170, 169, 169);
    }

    .type>.struttura-alloggio {
        height: 200px;
    }
}

.icona_input {
    display: flex;
    border: 1px solid rgb(143, 142, 142);
    width: 300px;
    margin: 0 auto;
    padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 20px;
    width: 500px;
    background-color: #F2F2F2;

    >div:last-child>input {
        padding-left: 20px;
        border: none;
        font-size: 20px;
        background-color: #F2F2F2;
        width: 450px;
    }

    >div:first-child {
        padding-top: 4px;
        color: rgb(59, 58, 58);
    }
}


hr {
    border: 2px solid rgb(170, 169, 169);
}

.icona-appartamento {
    padding: 12px;

    >.nome-appartamento {
        margin-left: 20px;
    }

    &:hover {
        background-color: rgb(255, 255, 255);
        cursor: pointer;
        border-radius: 20px;
        transition: 1.5s;
    }

    span {
        font-size: 20px;
        cursor: pointer;
    }
}

.clicked {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.clicked2,
.clicked3,
.clicked4 {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.hotel,
.villa,
.stanza {
    font-size: 22px;
}

.appartamento {
    margin-right: 8px;
    font-size: 24px;
}

.servizi {
    padding: 10px;
    border-right: 1px dashed rgb(170, 169, 169);
}

.struttura-alloggio-servizi>.letti,
.stanze,
.bagni {
    padding-left: 10px;
}

.input-letti,
.input-stanze,
.input-bagni {
    border-radius: 10px;
    border: 1px solid gray;
    padding: 4px;
    background-color: #cbcbcb;
}

.servizi-placeholder,
.price {
    border-right: 1px dashed rgb(170, 169, 169);
    padding: 10px;
}

.servizi-essenziali {
    // border: 1px solid black;
    width: 100%;
    height: 340px;

    >div {
        padding-left: 5px;
    }

    >div>label {
        margin-left: 10px;
        font-size: 16px;
        margin-bottom: 3px;
        padding-left: 10px;
    }
}

input[type=checkbox] {
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
}

.price-km {
    padding: 10px;

    h3 {
        font-size: 25px;
        padding-bottom: 4px;
    }
}

/*
input[type=range] {
    // -webkit-appearance: none;
    width: 100%;
    height: 14px;
    border-radius: 10px;
    background-color: rgb(74, 72, 72);
    outline: none;
}*/

.input-ricerca-avanzata {
    height: 14px;
    border-radius: 10px;
    background-color: rgb(74, 72, 72);
    outline: none;
    padding-top: 14px;
    padding-bottom: 14px;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
}


.input_number {
    background-color: lightgray;
    color: black;
    border-radius: 20px;
    border: none;
    width: 100px;
    padding: 4px;
    text-align: center;
}

.go {
    width: 200px;
    margin: 0 auto;
    text-align: center;

    button {
        width: 170px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
        border: 3px solid gray;
        text-transform: uppercase;

    }
}

#autocomplete-list {
    position: absolute;
    width: 450px;
    z-index: 1;
}

.appartamentiRicercaAvanzata {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 87%;
    margin-top: 20px;
    border-radius: 20px;
    padding-bottom: 20px;

    >div {
        width: 23%;
        margin: 8px;
        color: black;
    }
}


.myCard {
    box-shadow: 1px 3px 15px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    height: 360px;
    color: black;


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

.input-km {
    border: none;
    margin-left: 10px;
    border-radius: 10px;
    color: rgb(151, 151, 151);
    padding-left: 20px;
}
</style>
