<template>
    <Header/>
    <router-view/>
</template>
<script>
import { Options, Vue } from 'vue-class-component';
import Header from '@/layoutComponents/Header.vue';

@Options({
    components: {
        Header
    }
})
export default class DefaultLayout extends Vue {}
</script>
