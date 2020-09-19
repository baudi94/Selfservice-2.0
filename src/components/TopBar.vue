<template>
  <div>
  <b-navbar toggleable="lg" variant="info" class="navbar navbar-dark bg-dark" >
    <b-navbar-brand href="#"><h2>Self-Service-Portal</h2></b-navbar-brand>
  
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
         <!--<b-navbar-brand href="#"><img src="https://i.ibb.co/wQCFhM7/kisspng-computer-icons-icon-design-encapsulated-postscript-more-info-icon-5b4fcee5221525-14058745153.png" width="50px"></b-navbar-brand> -->
        <b-navbar-brand href="#"><img src=@/assets/bechtle_logo_rgb.png height="150px"></b-navbar-brand>
        
      </b-navbar-nav>
    
  </b-navbar>
  
</div>
 
</template>
<script>
export default {
    
}    
</script>
<style scoped>
.navbar .navbar-nav {
  display: inline-block;
  float: none;
  vertical-align: top;
  height: 200px;
}
.navbar .navbar-collapse {
  text-align: center;
  
}
</style>