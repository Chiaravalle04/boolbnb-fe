<script>
export default {
    name: "AppSearchedApartments",

    data() {
        return {

        }
    },
};
</script>

<template>
    <main>

        <div class="ricerca-avanzata">
            <div class="type">
                <h3 class="">Tipo di alloggio</h3>
                <hr>
                <div class="struttura-alloggio">
                    <div>
                        <div class="icona-appartamento">
                            <i class="fa-solid fa-hotel"></i>
                            <span class="nome-appartamento">
                                Hotel
                            </span>
                        </div>

                        <div class="icona-appartamento">
                            <i class="fa-solid fa-warehouse"></i>
                            <span class="nome-appartamento">
                                Villa
                            </span>
                        </div>

                        <div class="icona-appartamento">
                            <i class="fa-solid fa-people-roof"></i>
                            <span class="nome-appartamento">
                                Stanza
                            </span>
                        </div>

                        <div class="icona-appartamento">
                            <i class="fa-regular fa-building"></i>
                            <span class="nome-appartamento">
                                Appartamento
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="servizi">
                <h3>Stanze e letti</h3>
                <hr>
                <div class="struttura-alloggio-servizi">
                    <div class="letti">
                        <h5>Numero di letti:</h5>
                        <input type="number" min="1" placeholder="Numero di letti" value="1" class="input-letti">
                    </div>
                    <hr>
                    <div class="stanze">
                        <h5>Numero di stanze:</h5>
                        <input type="number" min="1" placeholder="Numero di stanze" value="1" class="input-stanze">
                    </div>
                    <hr>
                    <div class="bagni">
                        <h5>Numero di bagni:</h5>
                        <input type="number" min="1" placeholder="Numero di bagni" value="1" class="input-bagni">
                    </div>
                </div>
            </div>
            <div class="stanze-letti"></div>
            <div class="price"></div>
            <div></div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
.ricerca-avanzata {
    border: 1px solid rgb(172, 172, 172);
    width: 87%;
    margin: 0 auto;
    height: 470px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    background-color: #F2F2F2;

    >div {
        width: 25%;
        height: 100%;
    }

    .type {
        // background-color: rgb(226, 224, 224);
        padding: 10px;
        border-right: 1px dashed rgb(170, 169, 169);
    }

    .type>.struttura-alloggio {
        height: 200px;
    }
}

hr {
    border: 2px solid rgb(170, 169, 169);
}

.icona-appartamento {
    padding: 12px;

    i {
        font-size: 22px;
    }

    &:hover {
        background-color: rgb(255, 255, 255);
        cursor: pointer;
        border-radius: 20px;
        transition: 1.5s;
    }

    span {
        font-size: 20px;
        cursor: pointer;
    }
}

.servizi {
    padding: 10px;
    border-right: 1px dashed rgb(170, 169, 169);
}

.struttura-alloggio-servizi>.letti,
.stanze,
.bagni {
    padding-left: 10px;
}

.input-letti,
.input-stanze,
.input-bagni {
    border-radius: 10px;
    border: 1px solid gray;
    padding: 4px;
    background-color: #cbcbcb;
}
</style>