<template>
    <div class="fireflies"/>
</template>

<script lang="ts">
    import {Vue} from "vue-class-component";
    import * as PIXI from "pixi.js";
    import FireflyGlade from "../../partials/FireflyGlade";

    export default class Fireflies extends Vue {
        protected pixi = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundAlpha: 0
        });
        protected quantity = 50;

        async mounted() {
            this.$el.appendChild(this.pixi.view);

            const fireflyGlade = new FireflyGlade(this.quantity);
            this.pixi.stage.addChild(fireflyGlade.getContainer());

            window.addEventListener('resize', this.onResize.bind(this));

            this.pixi.ticker.add(() => {
                fireflyGlade.playFrame();
            });
        }

        onResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.pixi.renderer.resize(width, height);
        }
    }
</script>

<style scoped lang="scss">
    .fireflies {
        position: relative;
        display: flex;
        overflow: hidden;

        canvas {
            position: absolute;
            pointer-events: none;
            left: 0;
            top: 0;
        }
    }
</style>
