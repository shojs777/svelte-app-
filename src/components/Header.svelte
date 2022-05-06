<script>
  import{onMount}from"svelte"
import {Router,Link}from'svelte-routing'
import { Hamburger } from 'svelte-hamburgers';
import Menu from './Menu.svelte';
let open;
const toggleDark=()=>{
  if(localStorage.isDrak==="true"){
     document.getElementById("body").classList.remove("mode-dark");
    localStorage.isDrak="false";
  }else{
    document.getElementById("body").classList.add("mode-dark");
    localStorage.isDrak="true";
  }
}
onMount(()=>{
  if(localStorage.isDrak==="true"){
     document.getElementById("body").classList.remove("mode-dark");
    localStorage.isDrak="false";
  }else{
    document.getElementById("body").classList.add("mode-dark");
    localStorage.isDrak="true";
  }
})
// import Number_732 from "carbon-icons-svelte/lib/Number_732_svelte";
</script>

<header class="bg-primary-900 dark:bg-dark-900 flex justify-between items-center">
  <Hamburger bind:open --color="white"/>
  <img src="/logo.png" alt="logo" on:click={()=>location.href="/"}>
  <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <!-- <Number_732 class="mr-6 text-white-900"/> -->
  <button>
  <span class="material-symbols-outlined mr-6 text-white-900" on:click={toggleDark}>
  light_mode
  </span>
</button>
</header>
<Menu bind:open />

<style>
  header{
    height: 60px;
  }
  img{
    max-height: 100%;
  }

</style>
