<script>
import axios from 'axios';
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
        },
        getIconaServizio(services) {
            switch (services) {
                case 'Wi-Fi':
                    return 'fa-wifi';
                case 'Parcheggio':
                    return 'fa-car';
                case 'vasca_da_bagno':
                    return 'fa-bath';
                case 'iscina':
                    return 'fa-swimming-pool';
                // aggiungi altri servizi e icone
                default:
                    return 'fa-question'; // icona di default se il servizio non è associato a un'icona
            }
        }
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
                                <div><i class="fa-solid fa-people-roof"></i></div>
                                <div>Numero di stanze: {{ apartment.room }}</div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-toilet-paper"></i></div>
                                <div>Numero di bagni: {{ apartment.bathroom }}</div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-bed"></i></div>
                                <div>Numero di letti: {{ apartment.bed }}</div>
                            </div>
                            <div class="container-servizi">
                                <div><i class="fa-solid fa-hotel"></i></div>
                                <div>Pernottamento: {{ apartment.type }}</div>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-4 mb-4">

                    <ul class="mt-4 list-unstyled ">
                        <li class="fs-4 mx-2">
                            <i class="fa-solid fa-sack-dollar fs-3"></i>
                            <span class="fs-2 mx-1">{{
                                apartment.price
                            }}€</span> a notte!
                        </li>
                        <li class="fs-4 mx-2 mt-4">
                            <i class="fa-solid fa-phone"></i>
                            Soddisfatti o rimborsati!
                        </li>

                    </ul>
                </div>
            </div>
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
    height: 400px;
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
    border: 1px solid lightgray;
    border-radius: 6px;
    padding: 5px;
}

.icons-services {
    font-size: 18px;
    border-radius: 6px;
    padding: 5px;
    width: 200px;
    text-align: center;

    >:hover {
        cursor: pointer;
        transition: 2s;
    }
}

span {
    color: red;
}
</style>