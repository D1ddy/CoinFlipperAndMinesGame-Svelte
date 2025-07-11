<script lang="ts">
    import {createTimeline} from 'animejs';
    import {onMount} from "svelte";
    import { fade } from 'svelte/transition';
    import { wallet } from '../svelteStore'

    let money:number = $state(0);

    wallet.subscribe((value) => {
        money = value;
        console.log(money);
    })
    let tableAnimation:any;
    let timeline = createTimeline({ defaults: { duration: 5000 } });
    onMount(()=>{
        timeline
        .label("start")
        .add(tableAnimation,{
            opacity:{from:0},
            y:[{from:'2rem'}], // table animation
            duration:2000,
            easing:'easeInOutSine',
            autoplay:true,
        },"start")
    })

    class Polje{
                bomb: boolean;
                id:number;
                constructor(bomb:boolean,id:number){
                    this.bomb = bomb,
                    this.id = id
                }
    }

    let bombButtons:Array<string>= ['1','2','3','4','5'];
    let numberOfBombs:number = $state(0);
    let inputMoney:any = $state(0);
    let table:any = [];

    let arrayDiv:Array<any> = $state([]);

    let finish:boolean = $state(false);
    let lost:boolean = $state(false);
    let gameInProgress:boolean = $state(false);
    function makeTable(){
    let tmp = 0;
    for(let i = 0; i < 5; i++){
        table[i] = [];
        for(let j = 0; j < 5; j++){
           let polje = new Polje(false, tmp); //Horrid class 
           table[i][j] = polje;
           tmp++
        }
    }    
};
makeTable();
function putBombsIntoTable(numberOfBombs:number, inputMoney:number){
    if (numberOfBombs == 0 || inputMoney == 0){
        return;
    }
    let positionOfBombs:Array<number> = [];
    gameInProgress = true;
    for(let i:number = 0; i < numberOfBombs ; i++){
        let position:number = Math.round(Math.random() * 25);
        if(positionOfBombs.length == 0){
            positionOfBombs.push(position);
            continue;
        }
        if(positionOfBombs.includes(position)){
            i--;
            continue;
        }
        positionOfBombs.push(position);
    }
    for(let i:number = 0; i < 5; i++){
        for(let j:number = 0; j < 5; j++){
            if(positionOfBombs.includes(table[i][j].id)){
                table[i][j].bomb = true;
                
            }
        }
    }
}   
function clearTable(){
    for(let i:number = 0; i < 5; i++){
        for(let j:number = 0; j < 5; j++){
            table[i][j].bomb = false;
        }
    }
    for(let i :number = 0; i < arrayDiv.length; i++){
        arrayDiv[i].style.backgroundColor = '#1964d4'; 
    }
}
function showBombs(){
    for(let i:number = 0 ; i < 5 ; i++){
        for(let j:number = 0 ; j < 5 ; j++){
            if(table[i][j].bomb){
                arrayDiv[table[i][j].id].style.backgroundColor = 'red';
            }
        }
    }
}

let tilesRevield:number = $state(0);
let multiplier:number = $state(0);

function calculateMultiplier(mines:number) {
  const baseMultiplier = 0.33; 
  const scalingFactor = 0.16; 
  if (mines === 24) return 50.0; 
  if(mines == 1) return 0.33;
  return baseMultiplier + (mines - 1) * scalingFactor;
}

function calculateTileReward(mines:number) {
  const baseReward = 0.3; 
  const rewardScaling = 0.2; 
  const highRiskScaling = 0.5;

  if (mines <= 10) {
    return baseReward + (mines - 3) * rewardScaling;
  } else {
    return baseReward + (10 - 3) * rewardScaling + (mines - 10) * highRiskScaling;
  }
}
</script>
<style>
    main{
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        min-height: calc(105vh - 5vh);
        margin: 0;
        color: #E0E0E0;
        font-family: "Orbitron", sans-serif;
        font-size: 5vh;
    }
    #table{
        display: grid;
        grid-template-columns: 40vh 1fr;
        grid-template-rows: 5vh 1fr;
        width: 100vh;
        height: 70vh;
        background-color: #0b3779;
        border-radius: 2%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    #tableHeader{
        justify-self: left;
        font-size: 4vh !important;
        grid-column: 1 /span 2;
        width: 100%;
        padding-right: 0%;
        margin-right:0% ;
        border:2px #11223a;
        border-radius:2%;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        border-bottom-style: solid;

    }
    #bettingSection{
        grid-column: 1;
        grid-row: 2;
        border: 1px #0f2747;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        border-right-style: solid;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    }
    #numberOfBombs{
        justify-self: center;
        align-self: end;
        justify-content: center;
       
    }
    .numberOfBombs{
       height: 6vh;
       width: 6vh;
       border: none;
       margin:3px;
       box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
       background-color: #1964d4;
       font-family: "Orbitron", sans-serif;
       font-size: 3vh;
       color: #E0E0E0;
    
    }
    .numberOfBombs:hover{
        cursor: pointer;
        background-color: #2668ca;
    }
    .numberOfBombs:focus{
        background-color: #377ee7;
    }
    input{
        justify-self: center;
        align-self:center;
        justify-content: top;
        height: 5vh;
        width: 30vh;
        border: 1px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        border-radius: 3%;
        -webkit-appearance: none;
        background-color: #2668ca;
        color: #E0E0E0;
        font-size: 3vh;
        font-family: "Orbitron", sans-serif;
    }
    input:focus{
        outline: none;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
    .startFinishButtons{
         justify-self: center;
        align-self:center;
        justify-content: top;
        height: 6vh;
        width: 13vh;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
       background-color: #1964d4;
       font-family: "Orbitron", sans-serif;
       font-size: 3vh;
       color: #E0E0E0;
    }
    .startFinishButtons:hover{
        cursor: pointer;
        background-color: #296bce;
    }
    #bombs{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    justify-content: center;
    align-items: center;
}
    .polje{
        width: 90%;
        height: 90%;
        border:1px solid transparent;
        background-color: #1964d4;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        border-radius: 5%;
        cursor: pointer;
    }
</style>
<title>Mines</title>
<main transition:fade={{duration:1000}}>
    <div id="table" bind:this={tableAnimation}>
        <div id="tableHeader">
                Mines Wallet: {money}$
        </div>
        <div id="bettingSection">
            <div id="numberOfBombs">
                {#each bombButtons as bomb}
                 <button id="{bomb}" class="numberOfBombs" onclick="{()=>{
                    numberOfBombs = parseInt(bomb);
                 }}">{bomb}</button>
                {/each}
            </div>
            <input type="number" min="0" max="{money}" bind:this={inputMoney}>
            <button onclick="{()=>{
                if(!gameInProgress && numberOfBombs != 0 && parseInt(inputMoney.value) > 0 && parseInt(inputMoney.value) <= money){
                    lost = false;
                    putBombsIntoTable(numberOfBombs, inputMoney);
                    multiplier = calculateMultiplier(numberOfBombs);
                    finish = true;
                }
            }}" class="startFinishButtons">Start</button>
            {#if finish}
                <button onclick="{() => {
                    finish = false;
                    gameInProgress = false;
                    clearTable();
                    if(!lost && tilesRevield != 0){
                        const wonAmount:number =parseInt((parseInt(inputMoney.value) * multiplier).toFixed(2));
                        wallet.update(money => money + wonAmount)
                    }
                    tilesRevield = 0;
                    }}" class="startFinishButtons">Finish</button>
            {/if}
        </div>
        <div id="bombs">
         {#each table as polje}
            {#each polje as item}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                
                <div class="polje" id="{item.id}" bind:this={arrayDiv[item.id]} onclick="{() => { 
                    if(!item.bomb && gameInProgress){
                        arrayDiv[item.id].style.backgroundColor = 'green'
                        tilesRevield++;
                        console.log(tilesRevield);
                        multiplier += calculateTileReward(numberOfBombs);
                    }
                    if(item.bomb){
                        arrayDiv[item.id].style.backgroundColor = 'red';
                        if(gameInProgress){
                            wallet.update(money => money - inputMoney.value);
                        }
                        gameInProgress = false;
                        lost = true;
                        tilesRevield = 0;
                        showBombs();
                    }
                }}"></div>
            {/each}
        {/each}
</div>
    </div>
</main>