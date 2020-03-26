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
    <label for="firstname">Vorname</label>
    <input type="text" class="form-control" id="firstname" v-model="userData.firstname" placeholder="Vorname"  >
     
  </div>
  <div class="form-group">
    <label for="lastname">Nachname</label>
    <input type="text" class="form-control" id="lastname" v-model="userData.lastname" placeholder="Nachname">
    
  </div>
  <div class="form-group">
    <label for="organisation">Organisation</label>
    <input type="text" class="form-control" id="organisation" v-model="userData.organisation" placeholder="organisation">
    
  </div>
  
  
  <button type="submit" class="btn btn-outline-secondary"  @click.prevent="submitted(userData)">Weiter</button>
</form>
  </b-modal>
</div>
</div>


</template>
<script>
//import { required } from "vuelidate/lib/validators";
import axios from 'axios';
import FileSaver from 'file-saver';
import jspdf from 'jspdf';

export default {
  
    data() {
      return {
         userData: {
          firstname: '',
          lastname: '',
          organisation: '',
         
        },
        
        

      }
    },
    methods: {
        submitted(userData){
          
          axios.post("http://localhost:1080/belos.vrm/rest/selfservice/print?firstname=" + userData.firstname + "&lastname=" + userData.lastname, {
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

               
                        
                })        
                
              },

        
        
    },
    
    
    computed: {
    console: () => console,
    window: () => window,
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

.error{
  color: red;
}
</style>