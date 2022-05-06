<script>
import{onMount}from "svelte"
import { getDiary } from "../helpers/api"
import {Button,ProgressCircular} from "smelte";
import dayjs from "dayjs";
export let id;
let diary,rate,body;
onMount(async()=>{
  diary=await getDiary(id);
  console.log(diary);
  rate=diary.rate;
  body=diary.body;
})
const submit=()=>{
  console.log(diary)
}
</script>

<header><p>Diary</p></header>
<h1>{dayjs(diary.createdAt).format("YYYY年MM月DD日")}の日記</h1>
<form class="p-5" on:submit|preventDefault={submit}>
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate}/>
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  <Button type="submit" class="text-white-900">日記を更新</Button>
  <p>気分</p>
</form>
