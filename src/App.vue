<template>
  <v-app>
    <TopBar/>
    <v-content>
      <v-container fill-height>
        <v-row justify="center" align="center">
          
          
               
            <CheckIn/>
                  
          
                       
            <Register/>
           
        </v-row>
      </v-container>

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
    CheckIn,
  
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
