<script>
import axios from 'axios';
export default {
    name: "AppShowApartment",
  
    components: {
  
    },
  
    data() {
  
      return {
  
      }
  
    },

    methods: {
        getApartment() {
            axios.get(http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}
            )
                .then(response => {
                    if (response.data.success) {
                        this.apartment = response.data.apartments;

                        console.log(this.apartment);
                    } else {
                        this.$router.push({ name: 'error' });
                    }
                })
        },
    },
  }
  </script>
  
  <template>
  
    <h1 class="text-danger">ciao AppShow</h1>
    
  </template>
  
  <style lang="scss" scoped>
  
  </style>