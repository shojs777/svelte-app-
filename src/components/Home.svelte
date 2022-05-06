<script>
import {Router,Link}from "svelte-routing"
import {signInWithGoogle}from "../helpers/firebase"
import {Button,ProgressCircular,TextField} from "smelte";
import {userId}from "../store";
import {fetch}from "../helpers/api";
import { onMount,onDestroy } from "svelte";
import StarRating from 'svelte-star-rating';
import dayjs from "dayjs";
let uid,filterMonth;
const unsubscribe=userId.subscribe(id=>uid=id);
let promise=fetch();
onMount(async()=>{
  promise=await fetch(uid);
  // console.log(promise);
})
onDestroy(()=>{
  unsubscribe;
})
const filterHandle=async()=>{
  // console.log(filterMonth);
  promise=await fetch(uid,filterMonth);
  }
</script>
<p>Home</p>
{#if !uid}
<Button class="text-white-900 mt-10 dark:bg-accent-500" on:click={signInWithGoogle}>ログインする</Button>
{:else}
<section class="m-auto mb-10 w-6/12">
  <h5>日記を書いた月で検索</h5>
  <TextField label="月で絞り込み"type="month" bind:value={filterMonth} on:change={filterHandle}/>
</section>
{#await promise}
<p class="mt-10 flex justify-center"><ProgressCircular/></p>
<p>Loading ...</p>
{:then diaries}
{#if diaries.length>0}
<Router>
  {#each diaries as d}
    <Link to={"/diary/"+d.id} class="flex items-center mb-6 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 border-b-2">
      <aside class="diary-aside">
      <p class="text-left">{dayjs(d.createdAt).format("YYYY年MM月DD日")}</p>
        <img src={d.image?d.image:"/dummy.jpeg"} class="diary-img" alt="diary" >
      <p class="mb-6"><StarRating rating={d.rate/2} /></p>
      </aside>
      <p>{d.body}</p>
    </Link>
  {/each}
</Router>
{:else}
<p>日記が見つかりませんでした...</p>
{/if}
{/await}
{/if}

<style>
  .diary-aside{
    width: 40%;
    margin-right: 1rem;
  }
</style>
