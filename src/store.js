import { writable } from "svelte/store";
import Cookies from "js-cookie";

//もしCOOKIEにuidがあればcookeiのuidを使う
const cookie = Cookies.get("uid");
console.log(cookie);

export const userId = writable(cookie ? cookie : null);
