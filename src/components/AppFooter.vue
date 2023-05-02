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
        <div class="container-fluid h-100">
            <div class="d-flex justify-content-between text-center">
                <div class="copy">
                    &copy; 2023 Boolbnb, inc.
                </div>
                
                <div class="names">
                    <ul class="d-flex align-items-center justify-content-center p-0 m-0">
                        <i class="fa-solid fa-angle-right px-3"></i> 
                        
                        <li class="text-center">
                            <a href="https://www.linkedin.com/in/federicofois/" target="_blank">Federico Fois</a>
                            
                        </li><span class="px-3">•</span>
                        <li class="text-center">
                            <a href="https://www.linkedin.com/in/francescobenvenutii/" target="_blank">Francesco Benvenuti</a>
                            
                        </li><span class="px-3">•</span>
                        <li class="text-center">
                            <a href="https://www.linkedin.com/in/nicolaschiaravalle/" target="_blank">Nicolas Chiaravalle</a>
                            
                        </li><span class="px-3">•</span>
                        <li class="text-center">
                            <a href="https://www.linkedin.com/in/stefania-aveta/" target="_blank">Stefania Aveta</a>
                            
                        </li><span class="px-3">•</span>
                        <li class="text-center">
                            <a href="https://www.linkedin.com/in/ludovico-longhini/" target="_blank">Ludovico Longhini</a>
                        </li>

                        <i class="fa-solid fa-angle-left px-3"></i>
                    </ul>
                </div>
                
                <div class="len">
                    <ul class="m-0 p-0">
                        <li class="d-inline-block">
                            <i class="fa-solid fa-globe px-1"></i> 
                            Italiano (IT)
                        </li>
                        <li class="d-inline-block px-1">
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
    padding: 30px 0;

    li {
        list-style: none;

        a {
            text-decoration: none;
            color: white;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
