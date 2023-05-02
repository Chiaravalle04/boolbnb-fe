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
        <div class="container d-flex align-items-center h-100">
            <div class="row w-100">
                <div class="col-10">
                    <ul class="d-flex p-0 m-0">
                        <li>
                            &copy; 2023 Boolbnb, inc.
                        </li>
                        <li>
                            <i class="fa-solid fa-angle-right px-3"></i> 
                            <a href="https://www.linkedin.com/in/federicofois/" target="_blank">Federico Fois</a>
                            <span class="px-3">•</span>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/francescobenvenutii/" target="_blank">Francesco Benvenuti</a>
                            <span class="px-3">•</span>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/nicolaschiaravalle/" target="_blank">Nicolas Chiaravalle</a>
                            <span class="px-3">•</span>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/stefania-aveta/" target="_blank">Stefania Aveta</a>
                            <span class="px-3">•</span>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/ludovico-longhini/" target="_blank">Ludovico Longhini</a>
                            <i class="fa-solid fa-angle-left px-3"></i>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul class="d-flex p-0 m-0 justify-content-end">
                        <li>
                            <i class="fa-solid fa-globe px-1"></i> 
                            Italiano (IT)
                        </li>
                        <li class="px-1">
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
    color: var(--link-color);
    height: 70px;

    li {
        list-style: none;

        a {
            text-decoration: none;
            color: var(--link-color);

            &:hover {
                transform: scale(1.1);
                display: inline-block;
                transition: 0.1s;
            }
        }
    }
}
</style>
