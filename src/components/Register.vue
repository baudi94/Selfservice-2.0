<template>
    <div class="card" style="width: 25rem;">
  <a v-b-modal.modal-2><img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlGgXt0vzBAMcUcIG7HfBG7XDmZr3ASyxFHMFQpY16fhvvVADV" alt="Card image cap"></a>
  <div class="card-body">
    <h5 class="card-title">Registrieren</h5>
    <p class="card-text">Falls Sie noch bei keiner Veranstaltung hinterlegt sind, registrieren Sie sich bitte.</p>
  <b-button v-b-modal.modal-2>Registrieren</b-button>
 </div>
    </div>
</template>
<script>
//import { required, email } from "vuelidate/lib/validators";
//import axios from 'axios';
//import swal from 'vue-sweetalert2';
export default {
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