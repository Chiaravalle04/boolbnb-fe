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

        }

    },

    methods: {

        getApartment() {
            axios
                .get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
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

    created() {

        this.getApartment();

    }
}
</script>
  
<template>
    <div class="card">

        <h1>ciao</h1>

    </div>
</template>
  
<style lang="scss" scoped></style>