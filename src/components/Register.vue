<template>
  <div>
    <div class="card" style="width: 25rem;">
        <a v-b-modal.modal-2><img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlGgXt0vzBAMcUcIG7HfBG7XDmZr3ASyxFHMFQpY16fhvvVADV" alt="Card image cap"></a>
        <div class="card-body">
          <h5 class="card-title">Registrieren</h5>
          <p class="card-text">Falls Sie noch bei keiner Veranstaltung hinterlegt sind, registrieren Sie sich bitte.</p>
        <b-button v-b-modal.modal-2>Registrieren</b-button>
      </div>
    </div>


    <b-modal id="modal-2" title="Registrieren" ref="modal2" :hide-footer="true">
        <form>
      <div class="form-group">
        <label for="firstname">Vorname</label>
        <input type="text" class="form-control" id="firstname" placeholder="Vorname"  v-model="userData.firstname" >
        
      </div>
      <div class="form-group">
        <label for="lastname">Nachname</label>
        <input type="text" class="form-control" id="lastname" placeholder="Nachname" v-model="userData.lastname">
      
      </div>
      <div class="form-group">
        <label for="company">Firma</label>
        <input type="text" class="form-control" id="company" placeholder="Firma"  v-model="userData.company">
       
      </div>
      <div  class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="E-Mail"  v-model="userData.email">
      
      </div>
      
      <button type="submit" class="btn btn-outline-info"  @click.prevent="submitted(userData)">Weiter</button>
    </form>
  </b-modal>
  
<!-- 2. Modal -->
  <b-modal id="modal-3" title="Registrieren" ref="modal3" :hide-footer="true">
    <form>
  <div class="form-group">
    <label for="reason">Grund des Besuchs</label>
    <input type="text" class="form-control" id="reason" placeholder="Grund des Besuchs">

       
  </div>

<div>
  <label for="users1">Ansprechpartner</label>
  <vue-bootstrap-typeahead
    class="mb-4"
    v-model="query"
    :data="users"
    :serializer="item => item.fullname"
    @hit="selectedUser = $event"
    placeholder="Ansprechpartner suchen"
    id="users1"
  />

 <h3>Selected User JSON</h3>
 <pre>{{ selectedUser | stringify }}</pre>
</div>



  <button class="btn btn-outline-secondary"  @click.prevent="back1()">zurück</button>
  <button type="submit" class="btn btn-outline-info"  @click.prevent="submitted2()">Weiter</button>
    </form>
  </b-modal>
  </div>
</template>
<script>
//import { required, email } from "vuelidate/lib/validators";
//import axios from 'axios';
//import swal from 'vue-sweetalert2';
//import VAutosuggest from 'v-autosuggest'
export default {
   
  data() {
      return {
         userData: {
          firstname: '',
          lastname: '',
          organisation: '',
         
        },
        users: [],
        search: '',
        query: '',
        selectedUser: null,
        

      }
    },
    watch: {
    // When the query value changes, fetch new results from
     query(newQuery) {
      axios.get(`http://localhost:1080/belos.vrm/rest/selfservice/usersquery?name=${newQuery}`)
        .then((res) => {
          console.log(res.data)
          this.users = res.data
        })
    }
  },
  filters: {
    stringify(value) {
      return JSON.stringify(value, null, 2)
    }
  },
    methods: {
      submitted(userData, users){
        var data1 = []
        console.log("hier")
        this.$refs.modal3.show()
        this.$refs.modal2.hide()
                // console.log("users", users)
        return users
      },

      submitted2(){
         
      },

      back1(){
        this.$refs.modal3.hide()
        this.$refs.modal2.show()
      },

      
    }

}
</script>
<style scoped>
.card {
      display:inline-block;
}
.card-img-top {
    width: 80%;
    height: 80%;
    object-fit: cover;
   
}  

.error{
  color: red;
}

</style>