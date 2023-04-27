<script>
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {
    name: "AppShowApartment",
    components: {
    },
    data() {
        return {
            apiUrlAllApartments: '',
            apartment: null,
            projectImg: 'https://images.pexels.com/photos/16424411/pexels-photo-16424411.jpeg?auto=compress&cs=tinysrgb&w=600',
            mountainImg: 'https://www.sportoutdoor24.it/app/uploads/2015/06/pexels-jaime-reimer-2662116-670x470.jpg',
            seaImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi63TMxYuHEpg_ONjWzkw6AZi0fnjNcPT0qg&usqp=CAU',
            cityImg: 'data:image/jpeg;base64,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',
            sardegnaImg: 'data:image/jpeg;base64,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'
            , allServices: [],
            singleServicesApartment: [],
            nameValue: '',
            emailValue: '',
            messageValue: '',
        }
    },
    methods: {
        getApartment() {
            axios
                .get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then(response => {
                    if (response.data.success) {
                        this.apartment = response.data.apartments;
                        this.singleServicesApartment = response.data.apartments.services;
                        console.log('servizi determinato appartamento', this.singleServicesApartment);
                    } else {
                        this.$router.push({ name: 'error' });
                    }
                })
        },

        sendMessage(idApartment) {

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/messages',
                data: {
                    apartment_id: idApartment,
                    name: this.nameValue,
                    email: this.emailValue,
                    message: this.messageValue,
                }
            });

        }
    },
    mounted() {
        let center = [this.apartment.longitude, this.apartment.latitude]
        const map = tt.map({
            key: "QHRRpmA2IkGIXyVVm2RGpJDOHxmvTAx2",
            container: "map",
            center: center,
            zoom: 13,
        });
        map.on('load', () => {
            new tt.Marker().setLngLat(center).addTo(map);
        })
    },
    created() {
        this.getApartment();
    }
}
</script>
<template>
    <div class="card-details">
        <!-- titolo + indirizzo -->

        <div class="title">
            <h2 class="">
                <i class="fa-solid fa-location-dot"></i> <span>{{ apartment.title }}</span>
            </h2>
            <p>
                <i class="fa-solid fa-map-pin"></i> <span>{{ apartment.address }}</span>
            </p>
        </div>

        <!-- immagini -->

        <div class="images">
            <div class="img-grande">
                <img :src="projectImg">
            </div>
            <div class="img-piccole">
                <div>
                    <img :src="mountainImg">
                </div>
                <div>
                    <img :src="seaImg" class="seaImg">
                </div>
                <div>
                    <img :src="cityImg" class="cityImg">
                </div>
                <div>
                    <img :src="sardegnaImg" class="sardegnaImg">
                </div>
            </div>
        </div>

        <!-- servizi e invio messaggi -->
        <div class="services-messages">
            <div class="services">
                <div class="places">
                    <h3>Intero alloggio: <span class="type">{{ apartment.type }}</span> <i class="fa-regular fa-star"></i>
                    </h3>
                    <span>{{ apartment.room }} stanze</span> •
                    <span>{{ apartment.bed }} letti</span> •
                    <span>{{ apartment.bathroom }} bagni</span>
                </div>
                <hr>
                <div class="description">
                    <h4><i class="fa-solid fa-circle-info"></i> Informazioni:</h4>
                    {{ apartment.description }}
                </div>
                <hr>
                <div class="icons-services">
                    <h4>Cosa troverai</h4>
                    <div v-for="service in singleServicesApartment" class="icons">

                        <i v-if="service.name === 'Wi-Fi'" class="fa-solid fa-wifi fs-5"><span>{{ service.name }}</span></i>
                        <i v-else-if="service.name === 'Parcheggio'" class="fa-solid fa-square-parking fs-5"><span>{{
                            service.name }}</span></i>
                        <i v-else-if="service.name === 'Piscina'" class="fa-solid fa-person-swimming fs-5"><span>{{
                            service.name }}</span></i>
                        <i v-else-if="service.name === 'Cucina'" class=" fa-solid fa-fire-burner fs-5"><span>{{ service.name
                        }}</span></i>
                        <i v-else-if="service.name === 'Aria condizionata'"
                            class="fa-solid fa-temperature-arrow-down fs-5"><span>{{ service.name }}</span></i>
                        <i v-else-if="service.name === 'Vasca da bagno'" class="fa-solid fa-bath fs-5"><span>{{ service.name
                        }}</span></i>
                        <i v-else-if="service.name === 'Riscaldamento'" class="fa-solid fa-dumpster-fire fs-5"><span>{{
                            service.name }}</span></i>
                        <i v-else-if="service.name === 'Letto matrimoniale'" class="fa-solid fa-bed fs-5"><span>{{
                            service.name }}</span></i>
                        <i v-else-if="service.name === 'Letto singolo'" class="fa-solid fa-bed fs-5"><span>{{ service.name
                        }}</span></i>
                        <i v-else-if="service.name === 'Lavatrice'" class="fa-solid fa-soap fs-5"><span>{{ service.name
                        }}</span></i>
                        <i v-else-if="service.name === 'Ascensore'" class="fa-solid fa-elevator fs-5"><span>{{ service.name
                        }}</span></i>
                        <i v-else-if="service.name === 'Tv'" class="fa-solid fa-tv fs-5"><span>{{ service.name }}</span></i>

                    </div>
                </div>
            </div>
            <div class="messages">
                <div class="price">
                    <span>{{ apartment.price }}€</span> notte <i class="fa-regular fa-moon"></i>
                </div>
                <hr class="hr-price">

                <div class="input-invio-mex">
                    <label for="name">Nome:</label><br>
                    <input type="text" v-model="nameValue" id="name" name="name" placeholder="Inserisci il tuo nome.."
                        required><br>

                    <label for="email">Email:</label><br>
                    <input type="email" v-model="emailValue" id="email" name="email" placeholder="Inserisci la tua email.."
                        required><br>

                    <label for="message">Messaggio:</label><br>

                    <textarea class="form-control mb-2" id="message" rows="3" name="message" v-model="messageValue"
                        placeholder="Insert your message here..."></textarea>

                    <button @click="sendMessage(apartment.id)" type="submit" value="Invia"
                        class="text-center">INVIA</button>
                </div>
            </div>

        </div>
        <hr class="hr-divisorio">
        <div class="mt-4">
            <h2 class="text-center mb-4">Dove ti troverai</h2>
            <div class="mapview" id="map"></div>
        </div>


        <!--
        <h2 class="text-center">
            <i class="fa-solid fa-location-dot"></i> {{ apartment.title }}
        </h2>
        <p class="text-center">
            <i class="fa-solid fa-chevron-right"></i> {{ apartment.address }}
        </p>
        <hr>
        <div class="img-details d-flex">
            <div class="img">
                <img :src="projectImg">
                <img :src="mountainImg" class="mt-3">
            </div>
            <div class="details">
                <i class="description"> {{ apartment.description }} </i>
                <hr>
                <div class="services">
                    <h3 class="text-center mb-4 fs-3">Cosa troverai</h3>
                    <div class="d-flex justify-content-evenly ">
                        <div v-for="service in singleServicesApartment" class="icons-services">
                            <div>
                                <div class="text-center">
                                    <i v-if="service.name === 'Wi-Fi'" class="fa-solid fa-wifi fs-5"></i>
                                    <i v-else-if="service.name === 'Parcheggio'"
                                        class="fa-solid fa-square-parking fs-5"></i>
                                    <i v-else-if="service.name === 'Piscina'" class="fa-solid fa-person-swimming fs-5"></i>
                                    <i v-else-if="service.name === 'Cucina'" class=" fa-solid fa-fire-burner fs-5"></i>
                                    <i v-else-if="service.name === 'Aria condizionata'"
                                        class="fa-solid fa-temperature-arrow-down fs-5"></i>
                                    <i v-else-if="service.name === 'Vasca da bagno'" class="fa-solid fa-bath fs-5"></i>
                                    <i v-else-if="service.name === 'Riscaldamento'"
                                        class="fa-solid fa-dumpster-fire fs-5"></i>
                                    <i v-else-if="service.name === 'Letto matrimoniale'" class="fa-solid fa-bed fs-5"><i
                                            class="fa-solid fa-heart fs-5"></i></i>
                                    <i v-else-if="service.name === 'Letto singolo'" class="fa-solid fa-bed fs-5"></i>
                                    <i v-else-if="service.name === 'Lavatrice'" class="fa-solid fa-soap fs-5"></i>
                                    <i v-else-if="service.name === 'Ascensore'" class="fa-solid fa-elevator fs-5"></i>
                                    <i v-else-if="service.name === 'Tv'" class="fa-solid fa-tv fs-5"></i>
                                </div>
                                <div class="fs-5">{{ service.name }}</div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-4 mb-4">

                    <div class="number-services mt-4">
                        <h2 class="text-center mb-4 fs-3">Servizi</h2>
                        <div class="d-flex justify-content-around">
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-people-roof text-success-emphasis"></i></div>
                                <div>Numero di stanze: {{ apartment.room }}
                                </div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-toilet-paper text-success-emphasis"></i></div>
                                <div>Numero di bagni: {{ apartment.bathroom }}</div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-bed text-success-emphasis"></i></div>
                                <div>Numero di letti: {{ apartment.bed }}</div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-hotel text-success-emphasis"></i></div>
                                <div>Pernottamento: {{ apartment.type }}</div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-4 mb-4">

                    <div class="list-form d-flex">
                        <ul class="mt-4 list-unstyled">
                            <li class="fs-5 mx-2">
                                <i class="fa-solid fa-sack-dollar fs-3 text-warning"></i>
                                <span class="fs-4 mx-1">{{
                                    apartment.price
                                }}€</span> a notte!
                            </li>
                            <li class="fs-5 mx-2 mt-4">
                                <i class="fa-solid fa-phone text-danger"></i>
                                Soddisfatti o rimborsati!
                            </li>

                            <li class="fs-5 mx-2 mt-4">
                                <p v-if="apartment.availability"><i class="fa-solid fa-check text-success"></i>
                                    L'appartamento è
                                    disponibile
                                </p>
                                <p v-else><i class="fa-solid fa-xmark"></i> L'appartamento non è disponibile</p>
                            </li>
                        </ul>
                         INVIO MESSAGGIO 
                        <div>
                            <label for="name">Nome:</label><br>
                            <input type="text" v-model="nameValue" id="name" name="name"
                                placeholder="Inserisci il tuo nome.." required><br>

                            <label for="email">Email:</label><br>
                            <input type="email" v-model="emailValue" id="email" name="email"
                                placeholder="Inserisci la tua email.." required><br>

                            <label for="message">Messaggio:</label><br>

                            <textarea class="form-control mb-2" id="message" rows="3" name="message" v-model="messageValue"
                                placeholder="Insert your message here..."></textarea>

                            <button @click="sendMessage(apartment.id)" type="submit" value="Invia"
                                class="text-center">INVIA</button>
                        </div>
                         FINE INVIO MESSAGGIO 
                    </div>

                </div>
            </div>
        </div>
        <hr class="mt-4 mb-4">
        <div class="mt-4">
            <h2 class="text-center mb-4">Dove ti troverai</h2>
            <div class="mapview" id="map"></div>
        </div>-->
    </div>
</template>

<style lang="scss" scoped>
// titolo + indirizzo 
.title {
    width: 97%;
    height: 90px;
    margin: 0 auto;
    padding-top: 10px;

    h2 {
        font-size: 25px;
        font-family: 'Nunito Sans', sans-serif;
    }

    i {
        color: rgb(56, 53, 53);
    }

    p {
        font-size: 20px;
        margin-left: 5px;
    }

}

// immagini

.images {
    width: 97%;
    height: 400px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    gap: 5px;

    .img-grande {
        width: 50%;
        height: 100%;

        img:first-child {
            border-top-left-radius: 17px;
            border-bottom-left-radius: 17px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .img-piccole {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% / 2);

        div {
            width: 50%;
            height: 50%;

            img {
                width: 100%;
                height: 100%;
            }

            .seaImg {
                border-top-right-radius: 17px;
                padding-left: 5px;
            }

            .cityImg {
                padding-top: 5px;
            }

            .sardegnaImg {
                border-bottom-right-radius: 17px;
                padding-top: 5px;
                padding-left: 5px;
            }

        }
    }
}

hr {
    width: 80%;
    margin-top: 20px;
}

// servizi e immagini

.services-messages {
    width: 97%;
    margin: 0 auto;
    min-height: 400px;
    margin-top: 50px;
    display: flex;

    .services {
        .places {
            h3 {
                font-size: 27px;

                .type {
                    text-decoration: underline;
                    font-size: 25px;
                }
            }

            span {
                font-size: 19px;
            }

            i {
                color: red;
            }
        }
    }
}

.description {
    width: 690px;
    margin-top: 20px;
    line-height: 30px;

}

// messaggi
.messages {
    border: 1px solid rgb(171, 169, 169);
    width: 50%;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: rgb(243, 234, 234);

    .price {
        font-size: 20px;
        padding: 16px;
    }

    span {
        font-size: 25px;
    }
}

.hr-price {
    width: 100%;
    margin-top: 0;
}

.hr-divisorio {
    width: 97%;
    margin: 20px auto;
}

.input-invio-mex {
    padding: 16px;

    input {
        padding: 5px;
        border-radius: 10px;
        border: none;
        width: 290px;
        border: 1px solid lightgray;
        margin-bottom: 20px;
    }

    textarea {
        border-radius: 10px;
        border: 1px solid lightgray;
        padding: 5px;
        height: 150px;
    }

    button {
        border: 1px solid gray;
        padding: 5px;
        border-radius: 6px;
        width: 100px;
        margin-left: 37%;
    }
}

.pallino {
    margin-left: 6px;
    margin-right: 8px;
}


.icons-services>.icons>i {
    margin-top: 12px;

    span {
        margin-left: 20px;
    }
}


.card-details {
    width: 90%;
    margin: 0 auto;
    min-height: 700px;
    padding: 20px;
    border-radius: 20px;
}


.details {
    width: 50%;
    line-height: 30px;
    padding-left: 10px;
}

.description {
    font-size: 15px;
}

/* servizi */
.services {
    // height: 300px;
    width: 100%;
}



.mapview {
    width: 70%;
    height: 400px;
    margin: 0 auto;
    border-radius: 20px;
}
</style>
