<template>
    <div class='screen'>
        <section class="hero is-medium is-blue is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-size-1  has-text-white">
                        Nightlife Flex
                    </h1>
                    <h2 class="subtitle is-size-4 has-text-white">
                        Checkout the hottest spots in your city & RSVP on time
                    </h2>
                </div>
                <div class="container" id="searchSection">
                    <input type="text" class="input search" placeholder="Where you at?" v-model='location' @keyup.enter="searchLocation">
                    <a class="button" @click='searchLocation' :class="{'is-loading':isLoading}">Search</a>
                </div>
            </div>
        </section>

        <span v-if="auth==false && wantsToAttend == true">
            <LoginModal></LoginModal>
        </span>

        <div class="container" v-if="foundSearch!==null">
            <div class="card" v-for='item in foundSearch'>
                <div class="card-content" id="foundCards">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-96x96">
                                <img :src="item.image_url" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <a class="button is-pulled-right" @click="attend(item)">{{item.attendance}} Going</a>
                            <p class="title is-4">{{item.name}}</p>
                            <p class="subtitle is-6">{{item.display_address}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="is-blue" :class="{'addedCardsFooter':searched}">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        created by
                        <a href="https://twitter.com/txheo">txheo</a>
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import {
        EventBus
    } from '@/eventbus'
    import LoginModal from '@/components/LoginModal'
    export default {

        name: 'HomeSearch',
        data() {
            return {
                location: '',
                isLoading: false,
                foundSearch: null,
                searched: false,
                id: '',
                auth: null,
                wantsToAttend: false,
                attendance: null,
                results: null

            }

        },
        methods: {
            resultUpdate() {
                const transformArray = this.results.map(bus => {
                    if (this.attendance.attending[bus.id]) bus.attendance = this.attendance.attending[bus.id].length;
                    else bus.attendance = 0

                    bus.display_address = bus.location.display_address.reduce((acc, business) => {
                        return acc + ' ' + business
                    }, '');
                    return bus;
                })
                this.foundSearch = transformArray
            },
            searchLocation() {
                this.isLoading = true;
                this.$axios.post('/search', {
                    search: this.location
                }).then(resp => {
                    this.results = resp.data.businesses;
                    this.resultUpdate()
                    this.isLoading = false;
                    this.searched = true;
                    this.location =''
                }).catch(err => {
                   
                    this.$toasted.error(err.response.data.message).goAway(5000);
                    this.location =''
                })
            },
            initAttendance() {
                this.$axios.get('/attendance').then(resp => {
                    this.attendance = resp.data.data
                }).catch(err=>{
                    this.$toasted.error(err.response.data.message).goAway(5000);
                })
            },
            attendPost() {
                this.$axios.put('/attendance', this.attendance).then(resp => {
                    this.attendance = resp.data.data
                    this.$toasted.success(resp.data.message).goAway(5000);
                    this.resultUpdate();
                }).catch(err=>{
                    this.$toasted.error(err.response.data.message).goAway(5000);
                })
            },
            attend(item) {

                if (this.auth == false) {
                    this.wantsToAttend = true;
                } else {

                    const user = JSON.parse(localStorage.getItem('user'))
                    const attending = {}

                    if (this.attendance.attending[item.id]) {
                        const index = this.attendance.attending[item.id].indexOf(user.id)
                        if (index < 0) {
                            this.attendance.attending[item.id].push(user.id)
                        } else {
                            this.attendance.attending[item.id].splice(index, 1)
                        }
                        this.attendPost();

                    } else {
                        this.attendance.attending[item.id] = []
                        this.attendance.attending[item.id].push(user.id)
                        this.attendPost();
                    }

                }
            }
        },
        components: {
            LoginModal
        },
        computed: {
            attending() {
                return this.attendance;
            }
        },
        mounted() {
            EventBus.$on('remove-modal', modal => {
                this.wantsToAttend = false
            })

            this.initAttendance()
            EventBus.$on('remove-modal', modal => {
                this.wantsToAttend = false
            })

            EventBus.$on('logged-in', auth => {
                this.auth = true
            })

        }
    }
</script>

<style scoped>
    .is-blue {
        background-color: #212121;
    }

    .search {
        width: 50%;
    }

    #searchSection {
        margin-top: 50px;
    }

    h2.subtitle {
        margin: 30px !important;
    }

    #foundCards {
        padding: 25px;
        margin: 25px;
    }

    #foundCards:hover {
        border-left: 5px solid teal;
        cursor: pointer;
    }

    .media-left img {
        height: 100%;
    }

    .media-content {
        overflow-y: hidden
    }

    .media-content p.title {
        margin-bottom: 35px !important;
    }

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 5px;
        color: white;
    }

    .addedCardsFooter {
        position: relative !important;
    }

    #attending {
        display: inline-block
    }
</style>