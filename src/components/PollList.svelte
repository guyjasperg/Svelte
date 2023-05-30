<script>
    import PollDetails from "./PollDetails.svelte";
    import PollStore from "../stores/PollStore.js";
    import { fade, slide, scale } from "svelte/transition";
    import { flip } from "svelte/animate";

    // export let polls = [];

    // const unsub = PollStore.subscribe((data) => {
    //     polls = data;
    // });

    // onMount(() => {
    //     //maybe get data from DB
    //     // console.log("component mounted");
    // });

    // onDestroy(() => {
    //     // console.log("component destroyed");
    //     unsub();
    // });
    const handleEdit = (e) => {
        console.log("handleEdit", e.detail);
    };
</script>

<div class="poll-list">
    <!-- {#each polls as poll (poll.id)} -->
    {#each $PollStore as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
            <!-- <PollDetails {poll} on:edit={(id) => handleEdit(id)} /> -->
            <PollDetails {poll} on:edit />
        </div>
    {/each}
</div>

<style>
    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        grid-gap: 20px;
        align-items: center;
    }
</style>
