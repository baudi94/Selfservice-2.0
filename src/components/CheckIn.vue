<template>
   
    <div class="card" style="width: 25rem;">
  <a v-b-modal.modal-1 ><img class="card-img-top" src="https://imageog.flaticon.com/icons/png/512/16/16036.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" alt="Card image cap"></a>
  <div class="card-body">
    <h5 class="card-title">Check In</h5>
    <p class="card-text">Falls Sie bereits zu einer Veranstaltung angemeldet sind, drücken Sie bitte hier.</p>
    
  <div>
  <b-button v-b-modal.modal-1>Anmelden</b-button>
</div>
  <b-modal id="modal-1" title="Anmelden" ref="modal1" :hide-footer="true">
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
  <div class="validators">
 
</div>
  
  <button type="submit" class="btn btn-success"  @click.prevent="submitted(userData)">Weiter</button>
</form>
  </b-modal>
</div>
</div>


</template>
<script>
//import { required } from "vuelidate/lib/validators";
import axios from 'axios';
import { required } from "vuelidate/lib/validators";
import swal from 'vue-sweetalert2';


export default {
  
  
    data() {
      return {
         userData: {
          firstname: '',
          lastname: '',
          organisation: '',
         
        },
        answer: '',
        set: false,
      }
    },
    
    methods: {
        submitted(userData, answer, set){
          if(userData.firstname === '' || userData.lastname === '' || userData.organisation === ''){
           console.log("Feld: " + userData.organisation)
           alert("bitte alle Felder ausfüllen");
                      
         }
         else {
          axios.get("http://localhost:1080/belos.vrm/rest/selfservice/getstatus?firstname=" + userData.firstname + "&lastname=" + userData.lastname + "&organisation=" + userData.organisation,)
            .catch(function (error) {
              if (error.response) {
                
              } else if (error.request) {
               
              } 
              
              alert("Keine Veranstaltung gefunden, bitte registrieren Sie sich.")
              window. location.reload()
            });
         
         this.answer = axios.get("http://localhost:1080/belos.vrm/rest/selfservice/getstatus?firstname=" + userData.firstname + "&lastname=" + userData.lastname + "&organisation=" + userData.organisation, )
            .then((res) => {
          console.log("hier: " + res.data)
          this.answer = res.data
           if(this.answer != "registrated" || this.answer === null || this.answer === ""){
             alert("Sie sind schon eingecheckt, bitte begeben Sie sich zu dem auf Ihrem Ausweis ausgewiesenen Raum")
             return;

           }
           
         else {
           axios.post("http://localhost:1080/belos.vrm/rest/selfservice/print?firstname=" + userData.firstname + "&lastname=" + userData.lastname + "&organisation=" + userData.organisation, {
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/pdf'
            }
            })
            .then(response => {
                                
              //Zusammenstellen PDF
                
                var obj = document.createElement('object');
                obj.style.width = '100%';
                obj.style.height = '842pt';
                obj.type = 'application/pdf';
                obj.data = 'data:application/pdf;base64,' + response.data;                
                
               //Zusammenstellen File

                var link = document.createElement('a');
                link.setAttribute('download', obj)
                link.innerHTML = 'Download PDF file';
                link.download = 'file.pdf';
                link.href = 'data:application/octet-stream;base64,' + response.data;
                document.body.appendChild(link);

                 
                link.click();
                document.body.removeChild(link)

               
                this.$refs.modal1.hide()
                this.set = true;
                alert("Vielen Dank, Bitte suchen Sie den Raum auf ihrem Besucherausweis auf.")
                window. location.reload()
                        
                }) 
         } 

        })}
           
         
         
          
                 
          
        },

        
        
    },
    
    
    computed: {
    console: () => console,
    window: () => window,
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
      
    },
    }
}

</script>
<style scoped>

.card {
    display:inline-block;
    display:flex;
    flex-direction:column;
}
.card-img-top {
    width: 100%;
    height: 16.7vw;
    object-fit: cover;
    
}

 .error-message {
   color: red;
 }

.error {
    border: 1px solid red;
  }
</style>