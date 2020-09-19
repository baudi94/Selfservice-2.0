<template>
   
    <div class="card" style="width: 25rem;">
  <a v-b-modal.modal-1 ><img class="card-img-top" src="@/assets/checkin.png" alt="Card image cap"></a>
  <div class="card-body">
    <h5 class="card-title">Check In</h5>
    <p class="card-text">Falls Sie bereits zu einer Veranstaltung oder Termin angemeldet sind, drücken Sie bitte "Check In" um Ihren Besucherausweis zu drucken.</p>
    
  <div>
  <b-button v-b-modal.modal-1 class="btn btn-success" style="margin: 0 auto; display: block;">Check In</b-button>
</div>



  <b-modal id="modal-1" title="CheckIn" ref="modal1" centered class="modal-dialog modal-dialog-centered" :hide-footer="true">
    <form id="form1" ref="form1">
      <div class="form-group">
        <label for="userData.firstname">Vorname*</label>
        <input v-bind:class="{ error: $v.userData.firstname.$error }" class="form-control" type="text" id="userData.firstname" 
        v-model.trim="userData.firstname" placeholder="Vorname" @input="$v.userData.firstname.$touch()">
        <div v-if="$v.userData.firstname.$dirty">
          <p class="error-message" v-if="!$v.userData.firstname.required">  Dieses Feld bitte ausfüllen  </p>
        </div>
      </div>
      <div class="form-group">
        <label for="userData.lastname">Nachname*</label>
        <input v-bind:class="{ error: $v.userData.lastname.$error }" class="form-control" type="text" id="userData.lastname" 
        v-model.trim="userData.lastname" placeholder="Nachname" @input="$v.userData.lastname.$touch()">
        <div v-if="$v.userData.lastname.$dirty">
          <p class="error-message" v-if="!$v.userData.lastname.required">  Dieses Feld bitte ausfüllen  </p>
        </div>
      </div>

      <div class="form-group">
        <label for="userData.organisation">Firma*</label>
        <input v-bind:class="{ error: $v.userData.organisation.$error }" type="text" class="form-control" id="userData.organisation" 
        v-model.trim="userData.organisation" placeholder="Firma" @input="$v.userData.organisation.$touch()">
        <div v-if="$v.userData.organisation.$dirty">
          <p class="error-message" v-if="!$v.userData.organisation.required">    Dieses Feld bitte ausfüllen  </p>
        </div>
      </div>
      
      <button type="submit" class="btn btn-success"  @click.prevent="submitted(userData)">Weiter</button>
    </form>
  </b-modal>
</div>
</div>


</template>
<script>
import axios from 'axios';
import { required } from "vuelidate/lib/validators";



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
           //alert("bitte alle Felder ausfüllen");
                swal({
                  title: "Hinweis!",
                  text: "Bitte alle erforderlichen Felder ausfüllen um fortzufahren.",
                  icon: "info",
                  timer: 5000
                });
         }
         else {
          axios.get("http://localhost:1080/belos.vrm/rest/selfservice/getstatus?firstname=" + userData.firstname + "&lastname=" + userData.lastname + "&organisation=" + userData.organisation,)
            .catch(function (error) {
              if (error.response) {
                
              } else if (error.request) {
               
              } 
              
              swal({
                  title: "Hinweis!",
                  text: "Keine Veranstaltung gefunden, melden Sie sich bitte an.",
                  icon: "info",
                  timer: 5000
                });
              location.reload()
            });
         
         this.answer = axios.get("http://localhost:1080/belos.vrm/rest/selfservice/getstatus?firstname=" + userData.firstname + "&lastname=" + userData.lastname + "&organisation=" + userData.organisation, )
            .then((res) => {
          console.log("hier: " + res.data)
          this.answer = res.data
           if(this.answer != "registrated" || this.answer === null || this.answer === ""){
             swal({
                  title: "Sie sind bereits eingecheckt!",
                  text: 'Scannen Sie den QR-Code um sich den Raumplan anzusehen und begeben Sie sich zu dem auf Ihrem Besucherausweis ausgewiesenem Raum.',
                  icon: "https://i.ibb.co/7vHKn5M/qrcode.png",
                  timer: 25000
                }).then(function(){ 
                   location.reload();
                });
                
             //
             
             
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
                swal({
                  title: "Sie sind eingecheckt!",
                  text: 'Scannen Sie den QR-Code um sich den Raumplan anzusehen und begeben Sie sich zu dem auf Ihrem Besucherausweis ausgewiesenem Raum.',
                  icon: "https://i.ibb.co/7vHKn5M/qrcode.png",
                  timer: 25000
                }).then(function(){ 
                   location.reload();
                });
               
                
                        
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
    width: 80%;
    height: 16.7vw;
    object-fit: contain;
    padding-top:50px;
}  


 .error-message {
   color: red;
 }

.error {
    border: 1px solid red;
  }

 </style>