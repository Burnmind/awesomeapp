<template>
  <div class="home">
    <Fireflies/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Fireflies from "@/components/partials/Fireflies.vue";

@Options({
    components: {
        Fireflies
    }
})
export default class Main extends Vue {}
</script>
