<script lang="ts">
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
    let money:number = $state(100);
    let inputMoney:any = $state(0);
    let table:any = [];
    let div:any = $state();
    let finish:boolean = $state(false);
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
function putBombsIntoTable(numberOfBombs:number){
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
            //TODO change te colour of the divs again 
        }
    }
}
</script>
<style>
    main{
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        min-height: calc(100vh - 5vh);
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
        border:1px solid gray;
        border-radius: 5%;
        cursor: pointer;
    }
</style>
<title>Mines</title>
<main>
    <div id="table">
        <div id="tableHeader">
                Mines
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
                if(!gameInProgress){
                    putBombsIntoTable(numberOfBombs);
                    finish = true;
                    console.table(table)
                }
            }}">Start</button>
            {#if finish}
                <button onclick="{() => {
                    finish = false;
                    clearTable();
                    console.table(table);
                    //TODO CHANGE MONEY\\
                    }}">Finish</button>
            {/if}
        </div>
        <div id="bombs">
         {#each table as polje}
            {#each polje as item}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="polje" id="{item.id}" bind:this={div} onclick="{() => { 
                    if(!item.bomb && gameInProgress){
                       console.log(div);
                       //TODO change the colour of the divs 
                    }
                    if(item.bomb){
                        gameInProgress = false;
                    }
                    console.log(item);
                }}"></div> 
            {/each}
        {/each}
</div>
    </div>
</main>