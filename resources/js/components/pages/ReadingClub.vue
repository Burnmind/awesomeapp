<template>
    <div class="container">
        <div v-if="appData && !appData.isAuth" class="auth-container">
            <button class="btn-lg" v-on:click="auth">Войти</button>
        </div>
        <div v-else class="participants-container">
            <div class="participants-list">
                <div class="participant-column">
                    <div class="personal-info">
                        <div class="photo">
                            <img src="https://memepedia.ru/wp-content/uploads/2018/06/unnamed-768x768.jpg" alt="Жмышенко Валерий Альбертович">
                        </div>
                        <div class="name">
                            Жмышенко Валерий Альбертович
                        </div>
                    </div>
                    <div class="book-list">
                        <div class="book-item">
                            <div class="book">
                                Божественная комедия. Данте
                            </div>
                            <div class="remove">x</div>
                        </div>
                        <div class="book-item">
                            <div class="book">
                                Божественная комедия. Данте
                            </div>
                            <div class="remove">x</div>
                        </div>
                        <div class="book-item">
                            <div class="book">
                                Божественная комедия. Данте
                            </div>
                            <div class="remove">x</div>
                        </div>
                        <div class="book-item">
                            <div class="book">
                                Божественная комедия. Данте
                            </div>
                            <div class="remove">x</div>
                        </div>
                        <div class="book-item add">
                            <div class="icon icon-plus">+</div>
                        </div>
                    </div>
                </div>
                <div class="participant-column add" title="Присоединиться">
                    <div class="icon icon-plus">+</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue } from 'vue-class-component';
    import {useStore} from "vuex";
    import {AppData} from "@/types";

    export default class ReadingClub extends Vue {
        private appData = {} as AppData;

        mounted(): void
        {
            const store = useStore();
            this.appData = store.state;
        }

        auth(): void
        {
            window.open('/vk/auth');
        }
    }
</script>
