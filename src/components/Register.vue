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
          <label for="userData.firstname">Vorname</label>
          <input v-bind:class="{ error: $v.userData.firstname.$error }" class="form-control" type="text" id="userData.firstname" v-model.trim="userData.firstname" placeholder="Vorname" @input="$v.userData.firstname.$touch()">
          <div v-if="$v.userData.firstname.$dirty">
            <p class="error-message" v-if="!$v.userData.firstname.required">  Dieses Feld bitte ausfüllen  </p>
          </div>
        </div>
      
      <div class="form-group">
        <label for="userData.lastname">Nachname</label>
        <input v-bind:class="{ error: $v.userData.lastname.$error }" class="form-control" type="text" id="userData.lastname" v-model.trim="userData.lastname" placeholder="Nachname" @input="$v.userData.lastname.$touch()">
        <div v-if="$v.userData.lastname.$dirty">
          <p class="error-message" v-if="!$v.userData.lastname.required">    Dieses Feld bitte ausfüllen  </p>
        </div>
      </div>

      <div class="form-group">
        <label for="userData.organisation">Organisation</label>
        <input v-bind:class="{ error: $v.userData.organisation.$error }" type="text" class="form-control" id="userData.organisation" v-model.trim="userData.organisation" placeholder="Organisation" @input="$v.userData.organisation.$touch()">
        <div v-if="$v.userData.organisation.$dirty">
          <p class="error-message" v-if="!$v.userData.organisation.required">    Dieses Feld bitte ausfüllen  </p>
        </div>
      </div>

      <div class="form-group">
    <label for="userData.email">E-Mail</label>
    <input v-bind:class="{ error: $v.userData.email.$error }" type="text" class="form-control" id="userData.email" v-model.trim="userData.email" placeholder="E-Mail" @input="$v.userData.email.$touch()">
    <div v-if="$v.userData.email.$dirty">
    <p class="error-message" v-if="!$v.userData.email.email">
      Bitte korrekte E-Mail eingeben
    </p>
    <p class="error-message" v-if="!$v.userData.email.required">
      Dieses Feld bitte ausfüllen
    </p>
  </div>
  </div>
     
      
      <button type="submit" class="btn btn-success"  @click.prevent="submitted(userData)">Weiter</button>
    </form>
  </b-modal>
  
<!-- 2. Modal -->
  <b-modal id="modal-3" title="Registrieren" ref="modal3" :hide-footer="true">
        <form>
        <div class="form-group">
        <label for="userData.reason">Grund des Besuchs</label>
        <input v-bind:class="{ error: $v.userData.reason.$error }" type="text" class="form-control" id="userData.reason" v-model.trim="userData.reason" placeholder="Grund des Besuchs" @input="$v.userData.reason.$touch()">
        <div v-if="$v.userData.reason.$dirty">
          <p class="error-message" v-if="!$v.userData.reason.required">    
            Dieses Feld bitte ausfüllen  
          </p>
        </div>
        </div>
        <div>
          <label for="users1">Ansprechpartner mit dem Sie in Kontakt treten möchten</label>
            <vue-bootstrap-typeahead
              class="mb-4"
              v-model="query"
              :data="users"
              :serializer="item => item.fullname"
              @hit="selectedUser = $event"
              placeholder="Ansprechpartner suchen"
              id="users1"
            />

           
            

          <p>Ausgewählter Ansprechpartner: </p>
          <p>{{selectedUser.fullname | stringify}}</p>
          
        </div>
        



        <button class="btn btn-secondary"  @click.prevent="back1()">zurück </button>
        <button type="submit" class="btn btn-success"  @click.prevent="submitted2(selectedUser, userData)">Weiter</button>
        </form>
  </b-modal>


  <b-modal id="modal-4" title="Registrieren" ref="modal4" :hide-footer="true">
   
    <div class="form-group">
   <h5><label for="contact">Sicherheitsunterweisung</label></h5>
    <p id="contact">
Der Arbeitgeber hat nach § 12 Arbeitsschutzgesetz die Beschäftigten über Sicherheit und Gesundheitsschutz bei der Arbeit während ihrer Arbeitszeit ausreichend und angemessen zu unterweisen. 
Die Unterweisung umfasst Anweisungen und Erläuterungen, die eigens auf den Arbeitsplatz oder den Aufgabenbereich der Beschäftigten ausgerichtet sind. 
Die Unterweisung muss bei der Einstellung, bei Veränderungen im Aufgabenbereich, der Einführung neuer Arbeitsmittel oder einer neuen Technologie vor Aufnahme der Tätigkeit der Beschäftigten erfolgen. 
Die Unterweisung muss an die Gefährdungsentwicklung angepasst sein und erforderlichenfalls regelmäßig (mindestens einmal im Jahr) wiederholt werden.
    </p>
    

    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      Ich akzeptiere die Sicherheitsunterweisung
    </b-form-checkbox>
   <!-- <p class="error" v-show="!$v.contact.$model">This field is required</p>-->
  </div>
  
  <button class="btn btn-secondary"  @click.prevent="back2()">zurück </button>
  <button type="submit" class="btn btn-success"  @click.prevent="submitted3()">Ansprechpartner anrufen</button>
  
  </b-modal>


  </div>
</template>
<script>
//import { required, email } from "vuelidate/lib/validators";
import axios from 'axios';
//import swal from 'vue-sweetalert2';
//import VAutosuggest from 'v-autosuggest'
import { required, email } from "vuelidate/lib/validators";
export default {
   
  data() {
      return {
         userData: {
          firstname: '',
          lastname: '',
          organisation: '',
          reason: '',
         
        },
        users: [],
        search: '',
        query: '',
        selectedUser: '',
        status: 'not accepted',
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 

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
        if(userData.firstname === '' || userData.lastname === '' || userData.organisation === '' || userData.email === ''){

           alert("Bitte alle Felder ausfüllen")
         }
        
        else if(this.reg.test(this.userData.email) === false){
          alert('Bitte eine korrekte E-mail Adresse eingeben')
        }
        else{
        this.$refs.modal3.show()
        this.$refs.modal2.hide()
        // console.log("users", users)
        return users
        }
      },

      submitted2(selectedUser, userData){
        if(selectedUser === null || selectedUser === '' || userData.reason === null){
          alert("Bitte alle Felder ausfüllen")

          //console.log("hier ist ein fehler")
        }
        else{
          this.$refs.modal3.hide()
          this.$refs.modal4.show()
          //console.log("hier ist kein fehler")
          return selectedUser
        }
        
      },

      submitted3(selectedUser, status){
        console.log('status', this.status)
      if(this.status != 'accepted'){
          
          alert('Bitte die Bedingungen akzeptieren')
        }

        else{
          this.$refs.modal4.hide()
          window.location.href = 'https://jabberguest.bechtle.com/call/'+ this.selectedUser.email
          
        }
      },
      back1(){
        this.$refs.modal3.hide()
        this.$refs.modal2.show()
      },

      back2(){      
        this.$refs.modal4.hide()
        this.$refs.modal3.show()
      },
      
    },
     validations: {
      userData: {
        firstname: {
          required,
          },
        lastname: {
          required,
        },
        organisation: {
          required,
        },
        email: {
          required,
          email,
        },
        reason: {
          required,
        }
      },
      
      
    },

}
</script>
<style scoped>
.card {
      display:inline-block;
}
.card-img-top {
    width: 100%;
    height: 16.7vw;
    object-fit: contain;
}  

.error-message {
   color: red;
 }

.error {
    border: 1px solid red;
  }

</style>