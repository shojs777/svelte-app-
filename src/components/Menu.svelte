<script>
    import {onDestroy} from 'svelte';
    import {Router,Link}from'svelte-routing';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { signInWithGoogle ,googleSignout} from '../helpers/firebase';
    import { userId } from '../store';
    export let open;
    let uid;

   const unsubscribe= userId.subscribe(id=>{
      uid=id;
    })
    onDestroy(()=>unsubscribe)
  </script>

{#if open}
<nav class="bg-primary-900" on:click={()=> open = false}>
  <Router>
    <Link class="block mb-3" to="/">ホーム</Link>
    <Link class="block mb-3" to="about">日記の効果とは？</Link>
    {#if !uid}
    <Link class="block mb-3" to="#" on:click={signInWithGoogle}>ログイン</Link>
    {:else}
    <Link class="block mb-3" to="create">日記を書く</Link>
    <Link class="block mb-3" to="#" on:click={googleSignout}>ログアウト</Link>
    {/if}
  </Router>
  <div class="bar" transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
</nav>    
{/if}

<style>
    nav {
        text-align: center;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top: 0;
        color: #eef;
    }
    a {
        cursor: pointer;
        width: max-content;
        margin: 1rem auto;
    }
    a:hover {
        text-decoration: underline;
    }
    .bar {
        border-style: solid;
        border-color: white;
        border-width: 1px;
        height: 0;
    }
</style>
