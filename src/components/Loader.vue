<script>
export default {
    name: "Loader",

    components: {

    },

    data() {

        return {

        }

    },
};
</script>

<template>

    <div class="container-loader">

        <video class="myVideo" autoplay loop muted plays-inline>
            <source src="../../public/loader.mp4" type="video/mp4">
        </video>

    </div>

</template>

<style lang="scss" scoped>
.container-loader {
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
