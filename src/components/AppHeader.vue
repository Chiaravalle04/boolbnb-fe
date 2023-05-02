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
    <div class="container position-relative h-100">
      <div class="row align-items-center h-100">
        <div class="col-3 logo">
          <a href="http://localhost:5174" class="d-flex align-items-center logo-boolbnb">
            BoolBnB
          </a>
        </div>
        
        <div class="col-6 d-flex align-items-center justify-content-center links">
          <ul class="d-flex m-0 text-center">
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

      <div class="hamburger-menu d-none position-absolute end-0 top-50 translate-middle">
        <div class="dropdown">
        <button class="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-bars"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.my-header {
  // height: 70px;
  background-color: var(--bg-color);
  color: #fff;

  a {
    text-decoration: none;
    color: var(--link-color);
  }

  .logo-boolbnb {
    font-size: 50px;
  }

  ul {
    list-style: none;
    // font-weight: bold;

    li {
      text-decoration: none;
      margin-right: 25px;
      //border-right: 1px solid var(--title-color);
      padding-right: 25px;
      text-transform: uppercase;

      a {
        text-decoration: none;
        color: #fff;
        display: inline-block;
        transition: 0.25s all;

        &:hover {
          transform: scale(1.1);
          color: var(--link-color);
          font-weight: bold;
        }
      }
    }
  }

  .link {
    color: #fff;
    // font-weight: bold;
    padding: 3px 20px;
    border-radius: 10px;
    border: 1px solid #fff;

    &:hover {
      //box-shadow: inset 0px 0px 0px 2px var(--link-color);
      // color: var(--link-color);
      background-color: lightgray;
      color: black;
      transition: 1s;
    }
  }

  .link-two {
    background-color: var(--link-color);
    color: #fff;
    // font-weight: bold;
    padding: 5px 20px;
    border-radius: 10px;

    &:hover {
      color: #fff;
      background-color: rgba(253, 29, 29, 1);
      transition: 1s;
    }
  }
}
</style>
