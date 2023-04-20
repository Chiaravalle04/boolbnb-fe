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
                // this.store.results = response.data.data.slice(0, 100);
                console.log(response)
                // this.store.loading = false;
            }
        )
    },
        
    data() {
  
            return {
    
            }
  
        },
};
</script>
  
<template>
        
    <main>
        
        <div class="jumbotron">
            <div class="container h-100">
                <div class="row align-items-end h-100 pb-5">
                    <div class="col-4 text-end">
                        <input type="search" name="" id="">
                    </div>
                    <div class="col-4 text-center">
                        <a href="http://">
                            <button>
                                vai
                            </button>
                        </a>
                    </div>
                    <div class="col-4 text-start">
                        <div class="modal-dialog modal-dialog-scrollable">
                            <button>
                                Jenson Button
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="container">
            <div class="row mt-5">
                <div class="col">
                    MAIN
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