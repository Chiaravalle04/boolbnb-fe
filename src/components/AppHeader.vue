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
            <div class="row d-flex align-items-center h-100">
                <div class="col-3 logo">
                    <a href="http://localhost:5174" class="">
                        BoolBnB
                    </a>
                </div>
                <div class="col-6 d-flex justify-content-center">
                    <ul class="d-flex links align-items-center">
                        <li>
                            <a href="#primoPiano">in evidenza</a>
                        </li>
                        <li>
                            <a href="#tutteStrutture">tutte le case</a>
                        </li>
                        <li>
                            <router-link to="/who-we-are">chi siamo</router-link>
                        </li>
                        <li>
                            <a href="https://www.airbnb.it/help/?audience=guest">contatti</a>
                        </li>
                    </ul>
                </div>
                <div class="col-3 d-flex justify-content-end userLog">
                    <a href="http://127.0.0.1:8000/login" class="text-decoration-none register">
                        Login
                    </a>
                    <a href="http://127.0.0.1:8000/register" class="text-decoration-none register">
                        Registrati
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.my-header {
    background-color: var(--bg-color);
    height: 70px;

    .logo {
        font-family: 'Mr Dafoe', cursive;
        font-size: 3rem;

        a {
            text-decoration: none;
            color: var(--link-color);
        }
    }

    .links {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 1rem;
            text-transform: uppercase;

            a {
                text-decoration: none;
                color: var(--link-color);
                display: inline-block;

                &:hover {
                    transform: scale(1.1);
                    transition: 0.1s;
                }
            }
        }
    }

    .register {
        color: var(--bg-color);
        background-color: var(--link-color);
        padding: 5px;
        text-transform: uppercase;
        margin-left: .5rem;
        border-radius: 5px;

        &:hover {
            transform: scale(1.1);
            transition: 0.2s;
        }
    }
}
</style>
