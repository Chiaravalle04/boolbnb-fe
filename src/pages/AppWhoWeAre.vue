<script>
    export default {
        name: "AppWhoWeAre",

        data() {
            return {

            }
        },
    };
</script>

<template>
    <main>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-3">
                    <div class="card h-100">
                        <div class="img1"><img src="https://picsum.photos/170" alt=""></div>
                        <div class="img2"><img src="team_img_bg/Nic.jpg" alt=""></div>
                        <div class="card-body">
                            <h4 class="card-title text-center">Nicolas Chiaravalle</h4>
                            <p class="card-text text-center">Fumatore incallito, milanista sfegatato, mago di Formula 1 e cuoco eccellente. <br> Ha la pazienza di un monaco finché le sue API funzionano </p>
                        </div>
                        <div class="card-footer">
                            <div class="socials">
                                <a href="https://www.linkedin.com/in/nicolaschiaravalle/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/Chiaravalle04" target="_blank"><i class="fa-brands fa-github"></i></a>
                                <a href="https://www.instagram.com/nicolaschiaravalle/" target="_blank"><i class="fa-brands fa-instagram fw-bold"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card h-100">
                        <div class="img1"><img src="https://picsum.photos/175" alt=""></div>
                        <div class="img2"><img src="team_img_bg/Ste.jpg" alt=""></div>
                        <div class="card-body">
                            <h4 class="card-title text-center">Stefania Aveta</h4>
                            <p class="card-text text-center">Svapatrice seriale e super simpatica, questa persona è una vera maga del Ctrl+C e Ctrl+V.<br>Non si arrende mai finché non trova la soluzione...sul web ovviamente!</p>
                        </div>
                        <div class="card-footer">
                            <div class="socials">
                                <a href="https://www.linkedin.com/in/stefania-aveta/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/Step1017" target="_blank"><i class="fa-brands fa-github"></i></a>
                                <a href="https://www.instagram.com/step1017/" target="_blank"><i class="fa-brands fa-instagram fw-bold"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card h-100">
                        <div class="img1"><img src="team_img_bg/romeo.jpg" alt=""></div>
                        <div class="img2"><img src="team_img_bg/Ludo.jpg" alt=""></div>
                        <div class="card-body">
                            <h4 class="card-title text-center">Ludovico Longhini</h4>
                            <p class="card-text text-center">Fan dei framework, tanto da obbligare Nicolas ad usare Bootstrap. Pro Player nei più importanti FPS online e anche lui fenomeno sulla SF-23, o almeno è quello che crede. Molto dolce e carino...ah no, quello è il suo gatto. Chiaro no?</p>
                        </div>
                        <div class="card-footer">
                            <div class="socials">
                                <a href="https://www.linkedin.com/in/ludovico-longhini/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/Ludo4official" target="_blank"><i class="fa-brands fa-github"></i></a>
                                <a href="https://www.instagram.com/ludolonghini/" target="_blank"><i class="fa-brands fa-instagram fw-bold"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-md-center mt-4">
                <div class="col-md-3">
                    <div class="card h-100">
                        <div class="img1"><img src="https://picsum.photos/200" alt=""></div>
                        <div class="img2"><img src="team_img_bg/Fede.jpg" alt=""></div>
                        <div class="card-body">
                            <h4 class="card-title text-center">Federico Fois</h4>
                            <p class="card-text text-center">Da vero nuotatore, sfreccia tra le righe di codice in perfetto stile libero, almeno fino a quando non arriva un granchio a mordergli i piedi...le Media Query.</p>
                        </div>
                        <div class="card-footer">
                            <div class="socials">
                                <a href="https://www.linkedin.com/in/federicofois/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/Fedois" target="_blank"><i class="fa-brands fa-github"></i></a>
                                <a href="https://instagram.com/fedois_/" target="_blank"><i class="fa-brands fa-instagram fw-bold"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card h-100">
                        <div class="img1"><img src="https://picsum.photos/202" alt=""></div>
                        <div class="img2"><img src="team_img_bg/Frank.png" alt=""></div>
                        <div class="card-body">
                            <h4 class="card-title text-center">Francesco Benvenuti</h4>
                            <p class="card-text text-center">Amante del mare e della programmazione perché entrambe le cose possono essere prevedibili e non. A volte però quando incontra un bug si sente un pesce fuor d'acqua</p>
                        </div>
                        <div class="card-footer">
                            <div class="socials">
                                <a href="https://www.linkedin.com/in/francescobenvenutii/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://github.com/Francesco98Welcome" target="_blank"><i class="fa-brands fa-github"></i></a>
                                <a href="https://www.instagram.com/francebenvenutii/" target="_blank"><i class="fa-brands fa-instagram fw-bold"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    main {
        min-height: calc(100vh - 140px);
    }
    
    .container {
        padding: 1.7rem 0;
    }

    .card {
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
        overflow: hidden;
        border-radius: 15px;
        &:hover {
            transform: scale(1.05);
            transition: .5s;
        }

        .img1 img {
            height: 110px;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
            width: 100%;
            object-fit: cover;
        }
        

        .img2 img {
            position: relative;
            display: block;
            margin-left: auto;
            margin-right: auto;
            z-index: 1;
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border: 7px solid #fff;
            margin-top: -65px;
            &:hover {
                border-color: var(--title-color);
                transition: .7s;
            }
        }

        .card-body {

            .card-title {
                text-transform: uppercase;
                font-weight: 700;
                font-size: 17px;
                // margin: 0 0 12px;
            }

            .card-text {
                font-size: 13px;
            }
        }

        .card-footer {
            background-color: var(--bg-color);
            border: none;
        }
        .socials {
            text-align: center;

            i {
                font-size: 15px;
                color: var(--title-color);
                padding: 0 10px;
                &:hover {
                    transform: scale(1.07);
                }
            }
        }
    }
</style>