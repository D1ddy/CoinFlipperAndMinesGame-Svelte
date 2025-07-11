import { writable, type Writable } from "svelte/store";
export const wallet:Writable<number> = writable(1000,(set,update)=>{
    set(1000);
    //console.log("Got a subcriber");
    return () => console.log('No more subscribers');
});