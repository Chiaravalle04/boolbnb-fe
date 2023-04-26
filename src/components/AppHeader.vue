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
      <div class="container h-100">
          <div class="row align-items-center h-100">
              <div class="col-3">
                  <a href="#" class="d-flex align-items-center">
                      <img src="../../public/logoBool.png" class="my-img" alt="">
                      <span class="fs-4"> <b>Boolbnb</b> </span>
                  </a>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center mt-2">
                    <ul class="d-flex">
                        <li>
                            <a href="#primoPiano">in evidenza</a>
                        </li>
                        <li>
                            <a href="#tutteStrutture">tutte le case</a>
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

  a{
    text-decoration: none;
    color: #ff385c;
  }

  .my-img {
    height: 50px;
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
          transform: scale(1.1);
          color: #ff385c;
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
    padding: 5px 10px;

      &:hover {
        box-shadow: inset 0px 0px 0px 2px #ff385c;
        color: #ff385c;
      }
  }

  .link-two {
    background-color: black;
    color: white;
    font-weight: bold;
    padding: 5px 10px;

    &:hover {
        color: white;
        background-color: #ff385c;
      }
  }
} 


</style>
