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
    <div class="container-fluid d-flex justify-content-between border py-2">
      <div class="content-dx">
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
              Nicolas Chiaravalle
            </a>
          </li>
          <li>
            <a href="">
              Fabiana Aveta
            </a>
          </li>
        </ul>
      </div>

      <div class="content-sx">
        <ul class="d-flex p-0 m-0">
          <li>
            &ClockwiseContourIntegral;Italiano (IT)
          </li>
          <li>
            <a href="">
              &euro; EUR
            </a>
          </li>
          <li>
            <a href="">
              Supporto e risorse &UpArrow;
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  
</template>

<style lang="scss" scoped>
li{
  list-style: none;
  margin-right: 10px;

  a{
    color: black;
    text-decoration: none;
  }
}
</style>
