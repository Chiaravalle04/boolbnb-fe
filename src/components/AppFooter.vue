<script>
export default {
  name: "AppFooter",

  components: {

  },

  data() {

    return {

    }

  },
};
</script>

<template>
  <footer>
    <div class="container d-flex justify-content-between border py-2">
      <div class="content-dx row">
        <div class="col">
          <ul class="d-flex p-0 m-0">
            <li>
              &copy; 2023 Boolbnb, inc.
            </li>
            <li>
              <a href="">
                Federico Fois
              </a>
            </li>
            <li>
              <a href="">
                Francesco Benvenuti
              </a>
            </li>
            <li>
              <a href="">
                Nicholahs Chiaravalle
              </a>
            </li>
            <li>
              <a href="">
                Fabiana Aveta
              </a>
            </li>
            <li>
              <a href="">
                Felo
              </a>
            </li>
            <li>
              <a href="">
                Ludovico Longhini
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="content-sx">
        <ul class="d-flex p-0 m-0">
          <li>
            <i class="fa-solid fa-globe"></i> Italiano (IT)
          </li>
          <li>
            <a href="">
              &euro; EUR
            </a>
          </li>
          <li>
            <a href="">
              Supporto e risorse <i class="fa-solid fa-angle-up"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
li {
  list-style: none;
  margin-right: 10px;

  a {
    color: rgb(26, 26, 26);
    text-decoration: none;
  }
}
</style>
