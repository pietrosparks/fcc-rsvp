export default {
    computed: {
        isAuth() {

            console.log(localStorage.user,"hay")
            if (localStorage.user) {
                return true
            } else {return false}
        }
    },
    mounted() {   
        if (this.isAuth == true) {
            this.id = JSON.parse(localStorage.user)
            this.auth = true
        }
        else {this.auth = false}
    }
}