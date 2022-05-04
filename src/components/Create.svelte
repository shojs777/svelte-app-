<script>
import {Slider,TextField,Button}from "smelte";
import {userId}from "../store";
import {onDestroy}from "svelte";
import {postDiary}from "../helpers/api";
let rate=5;
let body='';
let uid=null;

const unsubscribe=userId.subscribe(id=>uid=id);

const submit=async()=>{
  if (body.length<10){
    alert("10文字以上書いてください");
    return false;
  }
  console.log(uid,rate,body);
  const result=await postDiary(uid,body,rate);
  if(!result){
    alert("日記が記録失敗");
  }else{
    alert("日記の記録成功");
    document.location.href="/";
  }
}
onDestroy(()=>{unsubscribe});
</script>

<h3>日記を書こう</h3>
<form class="p-5" on:submit|preventDefault={submit}>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate}/>
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button type="submit" class="text-white-900">日記を保存</Button>
</form>
