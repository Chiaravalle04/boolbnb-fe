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

  <footer class="border">
    <div class="container d-flex justify-content-between py-2">
      <div class="content-dx row">
        <div class="col">
          <ul class="d-flex p-0 m-0">
            <li>
              &copy; 2023 Boolbnb, inc.
            </li>
            <li>
                Federico fùa
            </li>
            <li>
                Francesco Benbevuti
            </li>
            <li>
                Nicholahs Chiavalevalle
            </li>
            <li>
                stephanya Avena
            </li>
            <li>
                Ludovico peliunpoLonghini
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
              &euro; EUR
          </li>
          <li>
              Supporto e risorse <i class="fa-solid fa-angle-up"></i>
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
