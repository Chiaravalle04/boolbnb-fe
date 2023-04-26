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
            projectImg: 'https://www.leadershipmanagementmagazine.com/wp-content/uploads/Project-Management-per-la-gestione-dei-progetti.jpg',
            allServices: [],
        }
    },
    methods: {
        getApartment() {
            axios
                .get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then(response => {
                    if (response.data.success) {
                        this.apartment = response.data.apartments;
                    } else {
                        this.$router.push({ name: 'error' });
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
    created() {
        this.getApartment();
        this.getAllServices();
    }
}
</script>
<template>
    <div class="card-details">
        <h2>
            <i class="fa-solid fa-location-dot"></i> {{ apartment.title }}
        </h2>
        <p>
            <i class="fa-solid fa-chevron-right"></i> {{ apartment.address }}
        </p>
        <div class="img-details d-flex">
            <div class="img">
                <img :src="projectImg">
            </div>
            <div class="details">
                <i> {{ apartment.description }} </i>
            </div>
            <hr>
        </div>
    </div>
    <!--
                <div class="d-flex">
                    <div class="servizi-numero">
                        <div>
                            <i class="fa-solid fa-toilet-paper"></i> Numero di bagni: <strong>{{ apartment.bathroom
                            }}</strong>
                        </div>
                        <div>
                            <i class="fa-solid fa-people-roof"></i> Numero di stanze: <strong>{{ apartment.room }}</strong>
                        </div>
                        <div>
                            <i class="fa-solid fa-bed"></i> Numero di letti: <strong>{{ apartment.bed }}</strong>
                        </div>
                        <div>
                            <i class="fa-solid fa-building-user"></i> Pernottamento: <strong>{{ apartment.type }}</strong>
                        </div>
                    </div>
                    <div class="barra-separazione"></div>
                    <div class="servizi-wifi">
                        <h4>Cosa troverai</h4>
                        <span v-for="service in allServices" :key="service.id">
                            • {{ service.name }}  Esempio di stampa del nome del servizio
                        </span>
                    </div>
                </div>-->
</template>
<style lang="scss" scoped>
.card-details {
    width: 85%;
    margin: 0 auto;
    min-height: 700px;
    padding: 30px;
    background-color: rgb(244, 244, 244);
}
img {
    width: 500px;
    height: 600px;
}
.details {
    padding: 10px;
}
</style>