<template>
    <div>
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import Header from '@/components/layoutComponents/Header.vue';
    import Footer from '@/components/layoutComponents/Footer.vue';
    import { useStore } from "vuex";

    @Options({
        components: {
            Header,
            Footer
        }
    })
    export default class DefaultLayout extends Vue {
        mounted(): void
        {
            const store = useStore();
            store.dispatch('setData');
        }
    }
</script>
