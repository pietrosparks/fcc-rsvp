<template>
    <div>

        <div class="columns">
            <div class="column is-one-third">
                <div class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Login/Signup</p>
                            <button class="delete" aria-label="close"></button>
                        </header>
                        <section class="modal-card-body">
                            <input type="text" class="input" placeholder="Username" v-model="user.username">
                            <input type="password" class="input" placeholder='Password' v-model='user.password'>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" @click="login">Login/Signup</button>
                            <button class="button" @click="cancel()">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        EventBus
    } from '@/eventbus'
    export default {
        name: 'Login',
        data() {
            return {
                user: {},
                id:'',
                auth:null

            }
        },
        methods: {
            login() {
                this.$axios.post('/login', this.user).then(resp => {
                    localStorage.setItem('user', JSON.stringify(resp.data.data))
                    this.auth = true;
                    EventBus.$emit('logged-in', this.auth);
                    this.$toasted.success(resp.data.message).goAway(5000);
                  
                })
            },
            cancel() {
                EventBus.$emit('remove-modal', 'remove-modal');

            }
        },
        
    }
</script>

<style scoped>
    .modal-card-body input {
        width: 70%;
        margin: 5px;
    }
</style>