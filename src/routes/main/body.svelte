<script lang="ts">
    import {fly} from 'svelte/transition'
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Iceland&family=Orbitron:wght@700&family=VT323&display=swap');
    #games{
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        min-height: calc(90vh - 5vh);
        margin: 0;
        color: #E0E0E0;
        font-family: "Orbitron", sans-serif;
        font-size: 5vh;
    }
    .gamesDiv{
        width: 30vw;
        height: 30vh;
        background-color: #172A45;
        border:1px solid transparent;
        box-shadow: 2px 2px #182a44c7;
        border-radius: 3%;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        text-align: center; 
    }
    .gamesDiv:hover{
        cursor: pointer;
        background-color: #1f3452;
    }
    #grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10%;
        justify-items: center; 
    }
    #mines{
        justify-self: center;
        align-self: center;
    }
    a{
        text-decoration: none;
        color: #E0E0E0;
    }
</style>
<title>Main</title>
<main>
    <div id="games" transition:fly={{y:100, duration:1000}}>
        <div id="grid">    
            <a id="mines" class="gamesDiv" href="/mines">
                Play Mines
            </a>
            <a id="coinFlip" class="gamesDiv" href="/coinFlip">
                Flip a Coin
            </a>
        </div>
    </div>
</main>