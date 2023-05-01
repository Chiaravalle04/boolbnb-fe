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
        <div class="col-3 logo">
          <a href="http://localhost:5174" class="d-flex align-items-center">
            BoolBnB
          </a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-center mt-2 links">
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
              <a href="https://www.airbnb.it/help/?audience=guest">contatti</a>
            </li>
          </ul>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-end login">
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
  background-color: var(--bg-color);
  color: #fff;

  a {
    text-decoration: none;
    color: var(--link-color);
  }

  .myLogo {
    height: 60px;
    width: 130px;
  }

  ul {
    list-style: none;
    // font-weight: bold;

    li {
      text-decoration: none;
      margin-right: 25px;
      border-right: 1px solid var(--title-color);
      padding-right: 25px;

      a {
        text-decoration: none;
        color: #fff;
        display: inline-block;
        transition: 0.25s all;

        &:hover {
          transform: scale(1.1);
          color: var(--link-color);
        }
      }
    }
  }
  .link {
    color: #fff;
    // font-weight: bold;
    padding: 5px 10px;

    &:hover {
      box-shadow: inset 0px 0px 0px 2px var(--link-color);
      color: var(--link-color);
    }
  }

  .link-two {
    background-color: #fff;
    color: #000;
    // font-weight: bold;
    padding: 5px 10px;

    &:hover {
      color: #fff;
      background-color: var(--link-color);
    }
  }
}
</style>
