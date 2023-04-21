<script>
  export default {
    name: "AppHeader",

    components: {

    },

    data() {

        return {

        }

    },
  };
</script>

<template>
  <header class="sticky-top bg-light my-header">
      <div class="container">
          <div class="row">
              <div class="col-3 text-center">
                  <a href="#">
                      <img src="https://news.airbnb.com/wp-content/uploads/sites/4/2017/07/airbnb-newsroom-twitter-card-default.png?fit=2400%2C1260" class="my-img" alt="">
                  </a>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center">
                    <h1 class="my-title text-center">BoolBnb <i class="fa-solid fa-house"></i></h1>
              </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                    <a href="http://127.0.0.1:8000/login" class="text-decoration-none">
                      Login
                    </a>
                    <a href="http://127.0.0.1:8000/register" class="text-decoration-none ms-3">
                      Registrati
                    </a>
              </div>
          </div>
      </div>
  </header>
</template>

<style lang="scss" scoped>

.my-header {
  height: 70px;

  .my-img {
    height: 70px;
  }

  .my-title {
    color: #ff385c;
  }

  a {
    color: black;
    font-weight: bold;

      &:hover {
        color:#ff385c;
      }
  }
} 


</style>
