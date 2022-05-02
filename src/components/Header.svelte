<script>
import {Router,Link}from'svelte-routing'
import { Hamburger } from 'svelte-hamburgers';
let open;
import Number_732 from "carbon-icons-svelte/lib/Number_732_svelte";
</script>

<header class="bg-primary-900">
  {#if open}
    <!-- show menu -->
  {/if}
  <Hamburger bind:open --color="white"/>
  <Router>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="create">create</Link>
  </Router>
  <Number_732/>
</header>
<style>
  header{
    height: 60px;
  }
</style>
