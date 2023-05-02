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
        <div class="container-fluid d-flex align-items-center h-100">
            <div class="row w-100">
                <div class="col-8">
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
                            Nicholas Chiaravalle •
                        </li>
                        <li>
                            Stefania Aveta •
                        </li>
                        <li>
                            Ludovico Longhini <i class="fa-solid fa-angle-left"></i>
                        </li>
                    </ul>
                </div>
                <div class="col-4">
                    <ul class="d-flex p-0 m-0 justify-content-end">
                        <li>
                            <i class="fa-solid fa-globe"></i> Italiano (IT)
                        </li>
                        <li>
                            &euro; EUR
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    font-size: 0.9rem;
    background-color: var(--bg-color);
    color: #fff;
    height: 70px;
}

li {
    list-style: none;
    margin-right: 10px;
}
</style>
