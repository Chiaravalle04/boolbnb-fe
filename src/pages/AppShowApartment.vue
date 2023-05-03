<script>
import axios from 'axios';
import LoaderVue from '../components/Loader.vue';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';


export default {
    name: "AppShowApartment",
    components: {
        LoaderVue
    },
    data() {
        return {
            loading: false,
            apiUrlAllApartments: '',
            apartment: null,
            allServices: [],
            singleServicesApartment: [],
            nameValue: '',
            emailValue: '',
            messageValue: '',
            textVisible: false,
            isDark: false,
            isDisabled: false
        }
    },
    methods: {
        getApartment() {
            axios
                .get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then(response => {
                    if (response.data.success) {
                        this.apartment = response.data.apartments;
                        this.loading = true;
                        console.log('loader', this.loading);
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
            if (this.isValid) {
                this.textVisible = false;
                setTimeout(() => {
                    this.textVisible = false;
                    this.isDark = false;
                }, 2000)
                /*this.isDark = !this.isDark;*/
                this.nameValue = '';
                this.emailValue = '';
                this.messageValue = '';
                this.textVisible = true;
                this.isDark = false;
                this.isDark = true;
            }
        },

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
    },
    computed: {
        isValid() {
            return this.nameValue && this.emailValue && this.messageValue.length > 0;
        }
    }
}
</script>
<template>
    <main>
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
                    <img :src="'http://127.0.0.1:8000/storage/' + apartment.cover">
                </div>
                <div class="img-piccole">
                    <div>
                        <img src="../../public/loft-1.jpg">
                    </div>
                    <div>
                        <img src="../../public/loft-2.jpg" class="seaImg">
                    </div>
                    <div>
                        <img src="../../public/loft-3.jpg" class="cityImg">
                    </div>
                    <div>
                        <img src="../../public/loft-4.jpg" class="sardegnaImg">
                    </div>
                </div>
            </div>

            <!-- servizi e invio messaggi -->
            <div class="services-messages">
                <div class="services">
                    <div class="places">
                        <h3>Intero alloggio: <span class="type">{{ apartment.type }}</span> <i
                                class="fa-regular fa-star"></i>
                        </h3>
                        <span>{{ apartment.room }} stanze</span> •
                        <span>{{ apartment.bed }} letti</span> •
                        <span>{{ apartment.bathroom }} bagni</span>
                        <span class="price-moon text-end">{{ apartment.price }}€ a notte <i
                                class="fa-regular fa-moon"></i></span>
                    </div>
                    <hr>
                    <div class="description">
                        <h4 class="info"><i class="fa-solid fa-circle-info"></i> Informazioni:</h4>
                        {{ apartment.description }}
                    </div>
                    <hr>
                    <h4>Cosa troverai • servizi extra</h4>
                    <div class="icons-services">

                        <div v-for="service in singleServicesApartment" class="icons">

                            <i v-if="service.name === 'Wi-Fi'" class="fa-solid fa-wifi fs-5"><span>{{ service.name
                            }}</span></i>
                            <i v-else-if="service.name === 'Parcheggio'" class="fa-solid fa-square-parking fs-5"><span>{{
                                service.name }}</span></i>
                            <i v-else-if="service.name === 'Piscina'" class="fa-solid fa-person-swimming fs-5"><span>{{
                                service.name }}</span></i>
                            <i v-else-if="service.name === 'Cucina'" class=" fa-solid fa-fire-burner fs-5"><span>{{
                                service.name
                            }}</span></i>
                            <i v-else-if="service.name === 'Aria condizionata'"
                                class="fa-solid fa-temperature-arrow-down fs-5"><span>{{ service.name }}</span></i>
                            <i v-else-if="service.name === 'Vasca da bagno'" class="fa-solid fa-bath fs-5"><span>{{
                                service.name
                            }}</span></i>
                            <i v-else-if="service.name === 'Riscaldamento'" class="fa-solid fa-dumpster-fire fs-5"><span>{{
                                service.name }}</span></i>
                            <i v-else-if="service.name === 'Letto matrimoniale'" class="fa-solid fa-bed fs-5"><span>{{
                                service.name }}</span></i>
                            <i v-else-if="service.name === 'Letto singolo'" class="fa-solid fa-bed fs-5"><span
                                    class="letto-singolo">{{
                                        service.name
                                    }}</span></i>
                            <i v-else-if="service.name === 'Lavatrice'" class="fa-solid fa-soap fs-5"><span>{{
                                service.name
                            }}</span></i>
                            <i v-else-if="service.name === 'Ascensore'" class="fa-solid fa-elevator fs-5"><span>{{
                                service.name
                            }}</span></i>
                            <i v-else-if="service.name === 'Tv'" class="fa-solid fa-tv fs-5"><span>{{ service.name
                            }}</span></i>

                        </div>
                    </div>
                </div>
                <div class="messages" :class="{ 'dark': isDark }">

                    <div class="input-invio-mex">
                        <h4 class="mb-4 mt-2 fs-3">Invia un messaggio all'host</h4>
                        <label for="name" class="fs-5"><strong class="nm">Nome*</strong></label><br>
                        <input type="text" v-model="nameValue" id="name" name="name" placeholder="Inserisci il tuo nome.."
                            required :disabled="isDisabled"><br>

                        <label for="email" class="fs-5"><strong class="em">Email*</strong></label><br>
                        <input type="email" v-model="emailValue" id="email" name="email"
                            placeholder="Inserisci la tua email.." required :disabled="isDisabled"><br>

                        <label for="message" class="fs-5"><strong class="mx">Messaggio*</strong></label><br>

                        <textarea class="form-control mb-2" id="message" rows="3" name="message" v-model="messageValue"
                            placeholder="Insert your message here..." :disabled="isDisabled"></textarea>

                        <div v-if="textVisible" class="textInviato">
                            <span></span>
                            <div class="mex">
                                Messaggio inviato con successo!<br> <i class="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <button @click="sendMessage(apartment.id)" :disabled="!isValid" type="submit" value="Invia"
                            class="text-center mt-3">INVIA</button>
                    </div>
                </div>

            </div>
            <hr class="hr-divisorio">
            <div class="mt-4 mb-4">
                <h4 class="text-center mb-4 fs-3">Dove ti troverai</h4>
                <div class="mapview" id="map"></div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
// colori 
/*
titoli: #4F5559;
link: #A62626;
descrizioni: #81878C;
sfondo pages: #F2F2F2;
$title-color: #4F5559;
$link-color: #A62626;
$description-color: #81878C;
$bg-color: #F2F2F2;
*/

main {
    background-color: #e7f3f8;
}

// titolo + indirizzo 
.title {
    width: 97%;
    height: 90px;
    margin: 0 auto;
    padding-top: 10px;
    color: #020758;

    h2 {
        font-size: 25px;
        color: #020758;

    }

    i {
        color: #274c77;
    }

    p {
        font-size: 20px;
        margin-left: 5px;
    }

}

// immagini

.nm,
.mx,
.em {
    color: #020758;
}

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
    width: 82%;
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
                color: #274c77;

                .type {
                    text-decoration: underline;
                    font-size: 25px;

                }
            }

            span {
                font-size: 19px;
                color: #020758;
                font-weight: bold;
            }

            .price-moon {
                //margin-left: 43%;
                margin-left: 47%;

                i {
                    color: #4F5559;
                }
            }
        }
    }
}

.info {
    color: #020758;
}

.description {
    width: 690px;
    margin-top: 20px;
    line-height: 30px;
    color: #020758;

}

// messaggi
.messages {
    // border: 4px solid rgb(171, 169, 169);
    width: 50%;
    height: 550px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    //background-color: #e4e3e3;


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
    width: 53%;
    margin-top: 20px;
    margin-left: 20px;
}

.input-invio-mex {
    padding: 22px;
    position: relative;
    // background-color: #274c77;

    i:first-child {
        color: #A62626;
    }

    h4 {
        color: #274c77;
    }

    .textInviato {
        width: 80%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        border-radius: 20px;
        background-color: lightgray;
        border: 4px solid green;

        span {
            margin-left: 90%;
            //color: red;

        }

        .mex {
            padding-bottom: 27px;
            padding-top: 10px;
            text-align: center;

            i {
                color: green;
                font-size: 33px;
            }
        }
    }

    input {
        padding: 5px;
        border-radius: 10px;
        width: 290px;
        border: 3px solid #020758;
        margin-bottom: 20px;
        font-weight: bold;
    }

    textarea {
        border-radius: 10px;
        border: 3px solid #020758;
        padding: 8px;
        height: 150px;
    }

    button {
        padding: 5px;
        border-radius: 6px;
        width: 100px;
        margin-left: 37%;
        border: 3px solid #020758;
        background-color: #e7ecef;
        color: #274c77;
    }
}

.dark {
    background-color: #02053b;

    input,
    textarea {
        background-color: #020433;
    }
}


.pallino {
    margin-left: 6px;
    margin-right: 8px;
}

h4 {
    color: #020758;
}

.icons-services>.icons>i {
    margin-top: 12px;
    color: #020758;

    span {
        margin-left: 20px;
        color: #274c77;
    }
}

i span {
    font-family: arial;
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

.icons-services {
    width: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: calc(100% / 4);
    gap: 10px;

    i>span {
        font-weight: normal;
        padding-left: 4px;
    }
}

.mapview {
    width: 70%;
    height: 400px;
    margin: 0 auto;
    border-radius: 20px;
}
</style>
