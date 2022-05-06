<script>
import{onMount}from "svelte"
import { getDiary,updateDiary } from "../helpers/api"
import {Button,ProgressCircular,TextField,Slider} from "smelte";
import dayjs from "dayjs";
export let id;
let promise=getDiary();
let rate,body;
onMount(async()=>{
  promise=await getDiary(id);
  console.log(promise);
  rate=promise.rate;
  body=promise.body;
})
const submit=async()=>{
  const returnValue=await updateDiary(id,body,rate);
  if(returnValue){
    alert("更新に成功しました")
  }else{
    alert("更新できませんでした。やり直してください");
    document.location.href("/");
  }
}
</script>

<header><p>Diary</p></header>
{#await promise}
<p class="mt-10 flex justify-center"><ProgressCircular/></p>
<p>Loading ...</p>
{:then}
<h1 class="h4">{dayjs(promise.createdAt).format("YYYY年MM月DD日")}の日記</h1>
<form class="p-5" on:submit|preventDefault={submit}>
  <img src={promise.image?promise.image:"/dummy.jpeg"} alt="diary" >
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate}/>
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button type="submit" class="text-white-900">日記を更新</Button>
  <p>気分</p>
</form>
{/await}
