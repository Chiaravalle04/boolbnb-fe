<script>
export default {
    name: "AppSearchedApartments",

    data() {
        return {
            isClicked: false,
            isClicked2: false,
            isClicked3: false,
            isClicked4: false
        }
    },
};
</script>

<template>
    <main>
        <div class="input_ricerca_avanzata text-center">
            <div class="icona_input">
                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div>
                    <input type="text" placeholder="Ricerca avanzata">
                </div>
            </div>

        </div>

        <div class="ricerca-avanzata">
            <div class="type">
                <h3 class="">Tipo di alloggio</h3>
                <hr>
                <div class="struttura-alloggio">
                    <div>
                        <div class="icona-appartamento" :class="{ 'clicked': isClicked }" @click="isClicked = !isClicked">
                            <i class="fa-solid fa-hotel hotel"></i>
                            <span class="nome-appartamento">
                                Hotel
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked2': isClicked2 }"
                            @click="isClicked2 = !isClicked2">
                            <i class="fa-solid fa-warehouse villa "></i>
                            <span class="nome-appartamento">
                                Villa
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked3': isClicked3 }"
                            @click="isClicked3 = !isClicked3">
                            <i class="fa-solid fa-people-roof stanza"></i>
                            <span class="nome-appartamento">
                                Stanza
                            </span>
                        </div>

                        <div class="icona-appartamento" :class="{ 'clicked4': isClicked4 }"
                            @click="isClicked4 = !isClicked4">
                            <i class="fa-regular fa-building appartamento"></i>
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
            <div class="servizi-placeholder">
                <h3>Servizi</h3>
                <hr>
                <!-- <h6>Servizi essenziali</h6> -->
                <div class="servizi-essenziali">

                    <div>
                        <input type="checkbox" id="Wi-Fi" name="Wi-Fi" value="wifi">
                        <label for="Wi-Fi">Wifi</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Parcheggio" name="Parcheggio" value="Parcheggio">
                        <label for="Parcheggio">Parcheggio</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Piscina" name="Piscina" value="Piscina">
                        <label for="Piscina">Piscina</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Aria condizionata" name="Aria condizionata" value="Aria condizionata">
                        <label for="Aria condizionata">Aria condizionata</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Letto singolo" name="Letto singolo" value="Letto singolo">
                        <label for="Letto singolo">Letto singolo</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Letto matrimoniale" name="Letto matrimoniale" value="Letto matrimoniale">
                        <label for="Letto matrimoniale">Letto matrimoniale</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Cucina" name="Cucina" value="Cucina">
                        <label for="Cucina">Cucina</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Riscaldamento" name="Riscaldamento" value="Riscaldamento">
                        <label for="Riscaldamento">Riscaldamento</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Tv" name="Tv" value="Tv">
                        <label for="Tv">Tv</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Lavatrice" name="Lavatrice" value="Lavatrice">
                        <label for="Lavatrice">Lavatrice</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Balcone" name="Balcone" value="Balcone">
                        <label for="Balcone">Balcone</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Ascensore" class="ascensore" name="Ascensore" value="Ascensore">
                        <label for="Ascensore">Ascensore</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Vasca da bagno" name="Vasca da bagno" value="Vasca da bagno">
                        <label for="Vasca da bagno">Vasca da bagno</label>
                    </div>


                </div>


            </div>
            <div class="price-km">
                <h3>Prezzo e KM dal centro</h3>
                <hr>
                <div>
                    <label for="input-range">
                        <h4>KM dal centro</h4>
                    </label><br>
                    <input id="numero" min="50" max="300" step="" type="range">
                </div>
                <hr>
                <div>
                    <h5>Prezzo €</h5>
                    <input type="number" min="50" placeholder="50€" class="input_number">
                </div>
                <hr>
                <div>
                    <ul class="py-2">
                        <li>
                            Ogni prenotazione include una protezione gratuita in caso di cancellazione da parte dell'host,
                            di inesattezze dell'annuncio e di altri problemi come le difficoltà in fase di check-in.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="go">
            <button>
                vai
            </button>
        </div>

    </main>
</template>

<style lang="scss" scoped>
main {
    height: 84.5vh;
    margin-bottom: -10px;
    background-color: var(--bg-color);
}


.ricerca-avanzata {
    border: 1px solid rgb(172, 172, 172);
    width: 87%;
    margin: 0 auto;
    height: 470px;
    margin-top: 20px;
    margin-bottom: 20px;
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

.icona_input {
    display: flex;
    border: 1px solid rgb(143, 142, 142);
    width: 300px;
    margin: 0 auto;
    padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    border-radius: 20px;
    width: 500px;
    background-color: #F2F2F2;

    >div:last-child>input {
        padding-left: 20px;
        border: none;
        font-size: 20px;
        background-color: #F2F2F2;
    }

    >div:first-child {
        padding-top: 4px;
        color: rgb(59, 58, 58);
    }
}

.icona_input:focus-within input {
    outline: none;
}

hr {
    border: 2px solid rgb(170, 169, 169);
}

.icona-appartamento {
    padding: 12px;

    >.nome-appartamento {
        margin-left: 20px;
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

.clicked {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.clicked2,
.clicked3,
.clicked4 {
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
}

.hotel,
.villa,
.stanza {
    font-size: 22px;
}

.appartamento {
    margin-right: 8px;
    font-size: 24px;
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

.servizi-placeholder,
.price {
    border-right: 1px dashed rgb(170, 169, 169);
    padding: 10px;
}

.servizi-essenziali {
    // border: 1px solid black;
    width: 100%;
    height: 340px;

    >div {
        padding-left: 5px;
    }

    >div>label {
        margin-left: 10px;
        font-size: 16px;
        margin-bottom: 3px;
        padding-left: 10px;
    }
}

input[type=checkbox] {
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
}

.price-km {
    padding: 10px;

    h3 {
        font-size: 25px;
        padding-bottom: 4px;
    }
}


input[type=range] {
    // -webkit-appearance: none;
    width: 100%;
    height: 14px;
    border-radius: 10px;
    background-color: rgb(74, 72, 72);
    outline: none;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
}

.input_number {
    content: '€';
    background-color: lightgray;
    color: black;
    border-radius: 20px;
    border: none;
    width: 100px;
    padding: 4px;
    text-align: center;
}

.go {
    width: 200px;

    margin: 0 auto;
    text-align: center;

    button {
        width: 170px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
        border: 3px solid gray;
        text-transform: uppercase;

    }
}
</style>
