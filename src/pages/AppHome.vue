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
  
    <h1 class="text-danger">ciao AppHome</h1>
    
  </template>
  
  <style lang="scss" scoped>
  
  </style>