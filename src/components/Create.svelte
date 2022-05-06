<script>
import {Slider,TextField,Button}from "smelte";
import {userId}from "../store";
import {onDestroy}from "svelte";
import {postDiary}from "../helpers/api";
let rate=5;
let body='';
let uid=null;
let image,preview="";

const unsubscribe=userId.subscribe(id=>uid=id);

const submit=async()=>{
  if (body.length<10){
    alert("10文字以上書いてください");
    return false;
  }
  console.log(uid,rate,body);
  const result=await postDiary(uid,body,rate,image);
  if(!result){
    alert("日記が記録失敗");
  }else{
    alert("日記の記録成功");
    document.location.href="/";
  }
}
onDestroy(()=>{unsubscribe});

const onFileSelect=(e)=>{
  let target=e.target.files[0];
  image=target;
  let render=new FileReader();
  render.readAsDataURL(target);
  render.onload=e=>{
    preview=e.target.result;
  }
}
</script>

<h3>日記を書こう</h3>
<form class="p-5" on:submit|preventDefault={submit}>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate}/>
  <TextField label="日記の本文" class="bg-white-900 dark:bg-accent-200" bind:value={body} textarea rows="5" outlined />
  {#if preview}
    <img src={preview} alt="preview" class="mb-6"/>
  {/if}
  <label for="file-input" class="bg-primary-900 px-4 py-3 rounded w-4/12 block mb-6 m-auto dark:bg-accent-500 dark-hover:bg-dark-700">
    画像を選択
  </label>
  <input type="file" accept="image/*" id="file-input" class="hidden" baind:this={image} on:change={(e)=>{onFileSelect(e)}}/>
  <Button type="submit" class="text-white-900 dark:bg-accent-500 dark-hover:bg-dark-700">日記を保存</Button>
</form>
