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
            distanceNumber: 20,
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
        <div class="container">

            <div class="input_ricerca_avanzata text-center pt-3">
                <div class="icona_input">
                    <div>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div>
                        <!-- <input type="search" v-model="address" @input="saveCoordinate" placeholder="Ricerca avanzata"> -->
                        <input v-model="address" @input="saveCoordinate" @keyup="searchAutocomplete" type="search"
                            class="form-control input-ricerca-avanzata " placeholder="Inserisci una destinazione"
                            id="address" name="address">
                        <ul id="autocomplete-list" class="list-group"></ul>
                    </div>
                </div>
                <div class="range_price">
                    <div class="range">
                        <label for="distance_to_center">
                            <h5 class="mb-3">KM dal centro
                                <input type="number" v-model.number="distanceNumber" @input="distanceToCenter" min="1"
                                    max="40" name="number-value" id="number" class="input-km">
                            </h5>
                        </label><br>
                        <input id="range" v-model.number="distanceNumber" @input="distanceToCenter" min="1" max="40"
                            name="number-value" type="range">
                        <!--<input type="number" v-model.number="distanceNumber" @input="distanceToCenter" min="1" max="40"
                            name="number-value" id="number" class="input-km">-->
                    </div>
                    <div class="price-input">
                        <h5>Prezzo €</h5>
                        <input type="number" v-model.number="price" min="0" placeholder="€" class="input_number">
                    </div>
                </div>
            </div>

            <div class="ricerca-avanzata">
                <div class="type">
                    <h3 class="text-center">Tipo di alloggio</h3>
                    <hr>
                    <div class="choose_type">
                        <input type="checkbox" v-model="types" value="Appartamento" name="type" id="appartamento">
                        <label for="appartamento" name="type">Appartamento</label>
                    </div>
                    <div class="choose_type">
                        <input type="checkbox" v-model="types" value="Stanza" name="type" id="stanza">
                        <label for="stanza" name="type">Stanza</label>
                    </div>
                    <div class="choose_type">
                        <input type="checkbox" v-model="types" value="Villa" name="type" id="villa">
                        <label for="villa" name="type">Villa</label>
                    </div>
                    <div class="choose_type">
                        <input type="checkbox" v-model="types" value="Chalet" name="type" id="chalet">
                        <label for="chalet" name="type">Chalet</label>
                    </div>
                    <div class="choose_type">
                        <input type="checkbox" v-model="types" value="Hotel" name="type" id="hotel">
                        <label for="hotel" name="type">Hotel</label>
                    </div>
                </div>
                <div class="servizi">
                    <h3 class="text-center">Stanze e letti</h3>
                    <hr>
                    <div class="struttura-alloggio-servizi">
                        <div class="letti">
                            <span class="n_letti">Numero di letti:</span>
                            <input type="number" min="1" v-model.number="bed" placeholder="1" class="input-letti">
                        </div>
                        <hr>
                        <div class="stanze">
                            <span class="n_stanze">Numero di stanze:</span>
                            <input type="number" min="1" v-model.number="room" placeholder="1" class="input-stanze">
                        </div>
                        <hr>
                        <div class="bagni">
                            <span class="n_bagni">Numero di bagni:</span>
                            <input type="number" min="1" v-model.number="bathroom" placeholder="1" class="input-bagni">
                        </div>
                    </div>
                </div>
                <div class="servizi-placeholder">
                    <h3 class="text-center">Servizi</h3>
                    <hr>
                    <div class="servizi-essenziali">

                        <div v-for="item in allServices">
                            <input type="checkbox" v-model="services" :id="item.name" name="services" :value="item.name">
                            <label :for="item.name">{{ item.name }}</label>
                        </div>

                    </div>

                </div>
            </div>


            <div class="go">
                <button @click="advancedSearchApartments()">
                    vai
                </button>
            </div>

            <div class="appartamentiRicercaAvanzata">

                <div v-for="index in apartmentsDistance">
                    <div v-if="index.distance <= distanceNumber" class="container-card">
                        <router-link :to="{ name: 'app-show-apartments', params: { slug: index.slug } }"
                            class="text-decoration-none link">
                            <div class="myCardd">

                                <div class="cardCover">
                                    <img :src="'http://127.0.0.1:8000/storage/' + index.cover" alt="">
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
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 70px);
    margin-bottom: -10px;
    background-color: rgb(232, 232, 232);
}

.ricerca-avanzata {
    border: 3px solid rgb(172, 172, 172);
    width: 100%;
    margin: 0 auto;
    height: 320px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    background-color: #dedede;

    >.type,
    .servizi,
    .servizi-placeholder {
        width: 60%;
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

.choose_type {
    padding: 7px;
    padding-left: 20px;

    >label {
        margin-left: 20px;
    }
}

.km-centro {
    text-align: center;
    width: 50%;
    margin: 0 auto;
}

.n_letti {
    margin-right: 50px;
}

.n_bagni {
    margin-right: 38px;
}

.n_stanze {
    margin-right: 31px;
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
    width: 80px;
    background-color: #c4c4c4;
    padding-left: 32px;
    margin-left: 100px;
}

.servizi-placeholder,
.price {
    //border-right: 1px dashed rgb(170, 169, 169);
    padding: 10px;
}


.range_price {
    height: 50px;
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    // background-color: #c4c4c4;
    border-radius: 10px;

    div {
        width: 50%;
    }
}

.servizi-essenziali {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;

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


.input-ricerca-avanzata {
    height: 14px;
    border-radius: 10px;
    background-color: rgb(74, 72, 72);
    outline: none;
    padding-top: 14px;
    padding-bottom: 14px;

}




.input_number {
    background-color: rgb(208, 208, 208);
    color: rgb(198, 198, 198);
    color: black;
    border-radius: 20px;
    border: none;
    width: 150px;
    padding: 0;
    text-align: center;
    border: 1px solid black;
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

        &:hover {
            transition: 1s;
            background-color: var(--bg-color);
            color: white;
        }
    }
}

#autocomplete-list {
    position: absolute;
    width: 450px;
    z-index: 1;
}

/* ---------------------------------------------------- */
.appartamentiRicercaAvanzata {
    //border: 1px solid black;
    margin-top: 50px;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-left: 8px;
}


.myCardd {
    width: 310px;
    height: 360px;
    box-shadow: 1px 3px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;


    &:hover {
        transform: scale(1.035);
    }

}

.link {
    color: black;
}

.cardInfo {
    padding: 10px;
}

.cardCover {
    height: 200px;

}

img {
    width: 100%;
    height: 100%;
}



/* -------------------------------------------------------------*/


#range {
    width: 70%;
}

input[type=range]::-webkit-slider-runnable-track {
    background-color: var(--bg-color);
    border-radius: 10px;
}

input[type=range]::-moz-range-track {
    background-color: var(--bg-color);
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
}

input[type=range]:focus {
    outline: none;
    background-color: red;
}


.input-km {
    border: none;
    margin-left: 10px;
    margin-bottom: 3px;
    border-radius: 10px;
    color: rgb(151, 151, 151);
    background-color: #F2F2F2;
    font-size: 15px;
    padding-left: 18px;
}
</style>
