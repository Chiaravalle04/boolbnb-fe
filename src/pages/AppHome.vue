<script>
import axios from 'axios';

export default {
    name: "AppHome",
  
    components: {
  
    },

    created() {
        axios 
            .get('http://127.0.0.1:8000/api/apartments')
            .then((response) => {
                this.apartments = response.data.apartments;
                console.log(this.apartments)
                // this.store.loading = false;
            }
        )
    },
        
    data() {
  
            return {
                apartments: [],
                searchApartment: '',
            }
  
        },
    
    computed: {
        filtredApartment(){
            return this.apartments.filter(address => address.address.toLowerCase().includes(this.searchApartment.toLowerCase()));
        }
    }
};
</script>
  
<template>
        
    <main>
        
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row align-items-end h-100 pb-5">
                    <div class="col-4 text-end">
                        <input v-model="searchApartment" type="search" name="" id="">
                    </div>
                    
                    <div class="col-4 text-start">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            filtri
                        </button>

                        <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label class="d-block" for="price">prezzo:</label>
                                            <input type="range" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="services">servizi:</label>
                                            <input type="checkbox" name="services" id="services">ciao
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="type">tipo di struttura:</label>
                                            <select name="type" id="type">
                                                <option value="appartamento">Appartamento</option>
                                                <option value="villa">Villa</option>
                                                <option value="hotel">Hotel</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="bed">numero di letti:</label>
                                            <input type="checkbox" name="bed" id="bed">1
                                            <input type="checkbox" name="bed" id="bed">2
                                            <input type="checkbox" name="bed" id="bed">3
                                            <input type="checkbox" name="bed" id="bed">4
                                            <input type="checkbox" name="bed" id="bed">5
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="bathroom">numero di bagni:</label>
                                            <input type="checkbox" name="bathroom" id="bathroom">1
                                            <input type="checkbox" name="bathroom" id="bathroom">2
                                            <input type="checkbox" name="bathroom" id="bathroom">3
                                            <input type="checkbox" name="bathroom" id="bathroom">4
                                            <input type="checkbox" name="bathroom" id="bathroom">5
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="room">numero di stanze:</label>
                                            <input type="checkbox" name="room" id="room">1
                                            <input type="checkbox" name="room" id="room">2
                                            <input type="checkbox" name="room" id="room">3
                                            <input type="checkbox" name="room" id="room">4
                                            <input type="checkbox" name="room" id="room">5
                                        </div>

                                        <div class="mb-3">
                                            <label class="d-block" for="square_meters">metri quadri:</label>
                                            <input type="range" name="square_meters" id="square_meters">
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                        <button type="button" class="btn btn-primary">Salva le modifiche</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        

        <div class="container text-center">
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <div class="col" v-for="index in filtredApartment">
                <div class="p-3 border">
                    <h3>{{ index.title }}</h3>
                    <p>{{ index.address }}</p>
                </div>
            </div>
        </div>
</div>
    </main>
        
</template>
  
<style lang="scss" scoped>

    .jumbotron {
        height: 400px;
        background-image: url(https://www.villeecasali.com/wp-content/uploads/2017/01/Una-villa-da-250-milioni-1-1024x576.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }    

</style>