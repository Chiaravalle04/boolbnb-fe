<script>
import axios from 'axios';

export default {
    name: "AppHome",
  
    components: {
  
    },

    created() {
        axios 
            .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
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
  
        <div class="container">
            <div class="row mt-5">
                <div class="col">
                    JUMBOTRON
                </div>
            </div>
        </div>
    
  </template>
  
  <style lang="scss" scoped>
  
  </style>