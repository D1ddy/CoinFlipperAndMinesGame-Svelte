<script lang="ts">
    import {fade} from 'svelte/transition'

    let minimum:number = $state(1);
    let max:number = $state(100);
    // svelte-ignore state_referenced_locally
        let value:number = $state(max/2);
    let moneyWon:any = $state(null);
    let heads:boolean = $state(false);
	

    function flipCoin(){
        return Math.round(Math.random());
    }
</script>
<style>
    #mainContainer{
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
    #coin{
        width: 20vh;
        height: 20vh;
        background-color: #BB7333;
        border-radius: 50%;
    }
    #slider{
        display: flex;
        gap: 15px;
    }
    p{
        width: 4vh;
        font-size: 3vh;
    }
    button{
        appearance: none;
        width: 15vh;
        height: 6vh;
        border:1px solid transparent;
        border-radius: 5%;
        background-color: #282057;
        color: #E0E0E0;
        font-family: "Orbitron", sans-serif;  
        font-size: 4vh;
        cursor: pointer; 
        margin-top: 10px;
    }
    button:hover{
        background-color: #483e83;
    }

</style>
<main>   
    <div id = "mainContainer" transition:fade={{duration:1000}}>
        <div id="coin">

        </div>
        <div id="moneyWon">{moneyWon}</div>
        <div id="slider">
            <p>{value}</p>
            <input type="range" min="{minimum}" max="{max}" bind:value="{value}" id="sliderRange">
        </div>
        <div id="headsTails">
            {#if heads}
                <button class="headsTailsButton" style="background-color: #483e83;" onclick = "{()=>{
                    heads = true;
                }}">Heads</button>
                <button class="headsTailsButton" onclick = "{()=>{
                    heads = false;
                }}">Tails</button>
            {:else}
                <button class="headsTailsButton" onclick = "{()=>{
                    heads = true;
                }}">Heads</button>
                <button class="headsTailsButton" style="background-color: #483e83;" onclick = "{()=>{
                    heads = false;
                }}">Tails</button>                
            
            {/if}
        </div>
        <button id="flipButton" onclick="{()=>{
            if((flipCoin() == 1 && heads) || (flipCoin() == 0 && !heads)){
                moneyWon = "You won " + value;
            }
            else{
                moneyWon = "You lost " + value;
            }
        }}"> Flip </button>
    </div>
</main>