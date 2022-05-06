<script>
import{onMount}from "svelte"
import { deleteDiary, getDiary,updateDiary } from "../helpers/api"
import {Button,ProgressCircular,TextField,Slider} from "smelte";
import dayjs from "dayjs";
export let id;
let promise=getDiary();
let rate,body,image,preview;
onMount(async()=>{
  promise=await getDiary(id);
  console.log(promise);
  rate=promise.rate;
  body=promise.body;
})
const submit=async()=>{
  const returnValue=await updateDiary(id,body,rate,image);
  if(returnValue){
    alert("更新に成功しました")
  }else{
    alert("更新できませんでした。やり直してください");
    document.location.href="/";
  }
}
const onFileSelect=(e)=>{
  let target=e.target.files[0];
  image=target;
  let render=new FileReader();
  render.readAsDataURL(target);
  render.onload=e=>{
    preview=e.target.result;
  }
}
const deleteHandle=async()=>{
const result=await deleteDiary(id);
if(result){
  alert("削除が完了しました");
  location.href="/";
}else{
  alert("日記の削除が失敗しました")
  location.href="/";
}
}
</script>

<header><p>Diary</p></header>
{#await promise}
<p class="mt-10 flex justify-center"><ProgressCircular/></p>
<p>Loading ...</p>
{:then diary}
<h1 class="h4">{dayjs(diary.createdAt).format("YYYY年MM月DD日")}の日記</h1>
<form class="p-5 mb-10" on:submit|preventDefault={submit}>
  {#if !preview}
  <img class="mb-4" src={diary.image?diary.image:"/dummy.jpeg"} alt="diary" >
  {:else}
<img class="mb-4" src={preview} alt="diary" >
  {/if}
  <label for="file-input" class="bg-primary-900 px-4 py-3 rounded w-4/12 block mb-6 m-auto">
    画像を選択
  </label>
  <input type="file" accept="image/*" id="file-input" class="hidden" baind:this={image} on:change={(e)=>{onFileSelect(e)}}/>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate}/>
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button type="submit" class="text-white-900">日記を更新</Button>
</form>
<Button class="bg-alert-900 text-white-900 mb-10" on:click={deleteHandle}>日記を削除</Button>
{/await}

