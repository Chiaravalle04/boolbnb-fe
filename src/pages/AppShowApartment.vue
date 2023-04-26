<script>
import axios from 'axios';
import Maps from '@tomtom-international/web-sdk-maps';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-services/';

export default {
    name: "AppShowApartment",
    components: {
        Maps,
        tt
    },
    data() {
        return {
            apiUrlAllApartments: '',
            apartment: null,
            projectImg: 'https://images.pexels.com/photos/16424411/pexels-photo-16424411.jpeg?auto=compress&cs=tinysrgb&w=600',
            mountainImg: 'https://www.sportoutdoor24.it/app/uploads/2015/06/pexels-jaime-reimer-2662116-670x470.jpg',
            allServices: [],
            singleServicesApartment: [],
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
        }
    },
    mounted() {
        let center = [this.apartment.longitude, this.apartment.latitude]
        const map = tt.map({
            key: "QHRRpmA2IkGIXyVVm2RGpJDOHxmvTAx2",
            container: "map",
            center: center,
            zoom: 10,
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
                    <h3 class="text-center mb-4">Cosa troverai</h3>
                    <div class="d-flex justify-content-evenly ">
                        <div v-for="service in singleServicesApartment" class="icons-services">
                            <div>
                                <div class="text-center">
                                    <i v-if="service.name === 'Wi-Fi'" class="fa-solid fa-wifi fs-4"></i>
                                    <i v-else-if="service.name === 'Parcheggio'"
                                        class="fa-solid fa-square-parking fs-4"></i>
                                    <i v-else-if="service.name === 'Piscina'" class="fa-solid fa-person-swimming fs-4"></i>
                                    <i v-else-if="service.name === 'Cucina'" class=" fa-solid fa-fire-burner fs-4"></i>
                                    <i v-else-if="service.name === 'Aria condizionata'"
                                        class="fa-solid fa-temperature-arrow-down fs-4"></i>
                                    <i v-else-if="service.name === 'Vasca da bagno'" class="fa-solid fa-bath fs-4"></i>
                                    <i v-else-if="service.name === 'Riscaldamento'"
                                        class="fa-solid fa-dumpster-fire fs-4"></i>
                                    <i v-else-if="service.name === 'Letto matrimoniale'" class="fa-solid fa-bed fs-4"><i
                                            class="fa-solid fa-heart fs-4"></i></i>
                                    <i v-else-if="service.name === 'Letto singolo'" class="fa-solid fa-bed fs-4"></i>
                                    <i v-else-if="service.name === 'Lavatrice'" class="fa-solid fa-soap fs-4"></i>
                                    <i v-else-if="service.name === 'Ascensore'" class="fa-solid fa-elevator fs-4"></i>
                                    <i v-else-if="service.name === 'Tv'" class="fa-solid fa-tv fs-4"></i>
                                </div>
                                <div class="fs-5">{{ service.name }}</div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-4 mb-4">

                    <div class="number-services mt-4">
                        <h2 class="text-center mb-4">Servizi</h2>
                        <div class="d-flex justify-content-around fs-5">
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-people-roof text-success-emphasis"></i></div>
                                <div>Numero di stanze: {{ apartment.room }}</div>
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

                    <ul class="mt-4 list-unstyled">
                        <li class="fs-4 mx-2">
                            <i class="fa-solid fa-sack-dollar fs-3 text-warning"></i>
                            <span class="fs-2 mx-1">{{
                                apartment.price
                            }}€</span> a notte!
                        </li>
                        <li class="fs-4 mx-2 mt-4">
                            <i class="fa-solid fa-phone text-danger"></i>
                            Soddisfatti o rimborsati!
                        </li>

                        <li class="fs-4 mx-2 mt-4">
                            <p v-if="apartment.availability"><i class="fa-solid fa-check text-success"></i> L'appartamento è
                                disponibile
                            </p>
                            <p v-else><i class="fa-solid fa-xmark"></i> L'appartamento non è disponibile</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="mt-4 mb-4">
        <div class="mt-4">
            <h2 class="text-center mb-4">Dove ti troverai</h2>
            <div class="mapview" id="map"></div>
        </div> 
    </div>
</template>
<style lang="scss" scoped>
.card-details {
    width: 90%;
    margin: 0 auto;
    min-height: 700px;
    padding: 20px;
    background-color: rgb(244, 244, 244);
    border-radius: 20px;
}

img {
    width: 500px;
    height: 420px;
    border-radius: 10px;
}

.details {
    line-height: 30px;
    padding-left: 10px;
}

.description {
    font-size: 15px;
}

/* servizi */
.services {
    height: 300px;
    width: 100%;
}

.container-servizi {
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    background-color: rgb(239, 236, 236);
}

.icons-services {
    font-size: 18px;
    border-radius: 6px;
    padding: 5px;
    width: 200px;
    text-align: center;
    background-color: rgb(239, 236, 236);
    padding: 10px;

    >:hover {
        cursor: pointer;
        transition: 2s;
    }
}

.mapview {
    width: 70%;
    height: 550px;
    margin: 0 auto;
    border-radius: 20px;
}
</style>
