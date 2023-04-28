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
        <div class="container-fluid d-flex justify-content-between py-2">

            <div class="content-dx row">
                <div class="col">
                    <ul class="d-flex p-0 m-0">
                        <li>
                            &copy; 2023 Boolbnb, inc.
                        </li>
                        <li>
                            <i class="fa-solid fa-angle-right"></i> Federico Fois •
                        </li>
                        <li>
                            Francesco Benvenuti •
                        </li>
                        <li>
                            Nicolas Chiaravalle •
                        </li>
                        <li>
                            Stefania Aveta •
                        </li>
                        <li>
                            Ludovico Longhini <i class="fa-solid fa-angle-left"></i>
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
                    <!-- <li>
                        Supporto e risorse <i class="fa-solid fa-angle-up"></i>
                    </li> -->
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    padding: 13px;
    font-size: 15px;
}

li {
    list-style: none;
    margin-right: 10px;

    a {
        color: rgb(26, 26, 26);
        text-decoration: none;
    }
}
</style>
