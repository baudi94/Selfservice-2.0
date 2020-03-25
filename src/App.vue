<template>
  <v-app>
    <TopBar/>
    <v-content>
      <div class="row justify-content-md-center">
      <div class="col-3">
                 
          <CheckIn/>
      
      </div>
      <div class="col-3">
                         
          <Register/>
      </div>
      </div>
      

    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import TopBar from './components/TopBar';
import Register from './components/Register';
import CheckIn from './components/CheckIn';

export default {
  name: 'App',

  components: {
    
    TopBar,
    Register,
    CheckIn
  },

  data: () => ({
    //
  }),
};
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
</style>
