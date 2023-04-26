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
  <header class="sticky-top my-header">
      <div class="container">
          <div class="row">
              <div class="col-3">
                  <a href="#">
                      <img src="https://media.designrush.com/inspiration_images/135187/conversions/_1511452487_364_Airbnb-mobile.jpg" class="my-img" alt="">
                  </a>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center mt-2">
                    <ul class="d-flex">
                        <li>
                            <a href="http://">in evidenza</a>
                        </li>
                        <li>
                            <a href="http://">tutte le case</a>
                        </li>
                        <li>
                            <a href="http://">chi siamo</a>
                        </li>
                        <li>
                            <a href="http://">contatti</a>
                        </li>
                    </ul>
                </div>
              <div class="col-3 d-flex align-items-center justify-content-end">
                    <a href="http://127.0.0.1:8000/login" class="text-decoration-none link">
                      Login
                    </a>
                    <a href="http://127.0.0.1:8000/register" class="text-decoration-none ms-2 link-two">
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
  background-color: #fff;

  .my-img {
    height: 70px;
  }

  ul {
    list-style: none;
    font-weight: bold;

    li {
      text-decoration: none;
      margin-right: 25px;
      border-right: 2px solid black;
      padding-right: 25px;

      a {
        text-decoration: none;
        color: black;
        display: inline-block;
        transition: 0.25s all;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .my-title {
    color: #ff385c;
  }

  .link {
    color: black;
    font-weight: bold;
    // border: 2px solid black;
    padding: 5px 10px;

      &:hover {
        background-color: black;
        color: white;
      }
  }

  .link-two {
    background-color: black;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    // border: 2px solid black;

    &:hover {
        color: white;
        background-color: #ff385c;
        // border: 2px solid white;
      }
  }
} 


</style>
