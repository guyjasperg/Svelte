<script>
    import PollStore from "../stores/PollStore";
    import Button from "../shared/Button.svelte";
    import Card from "../shared/Card.svelte";
    import { createEventDispatcher } from "svelte";
    import { tweened } from "svelte/motion";

    const dispatch = createEventDispatcher();

    export let poll;

    //reactive values
    $: totalVotes = poll.votesA + poll.votesB;
    $: percentA = Math.floor((100 / totalVotes) * poll.votesA) || 0;
    $: percentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;

    //tweened percentages
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);

    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);

    const handleVote = (option, id) => {
        PollStore.update((currentPolls) => {
            let copiedPolls = [...currentPolls];
            let votedPoll = copiedPolls.find((poll) => poll.id === id);

            if (option === "a") {
                votedPoll.votesA++;
            } else if (option === "b") {
                votedPoll.votesB++;
            }

            return copiedPolls;
        });
    };

    const handleDelete = (id) => {
        PollStore.update((currentPolls) => {
            return currentPolls.filter((poll) => poll.id !== id);
        });
    };

    const handleEdit = (poll) => {
        console.log("handleEdit", poll);
        // let editPoll = PollStore.find((poll) => poll.id === id);
        dispatch("edit", poll);
    };
</script>

<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p>Total Votes: {totalVotes}</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote("a", poll.id)}>
            <div class="percent percent-a" style="width:{$tweenedA}%" />
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click={() => handleVote("b", poll.id)}>
            <div class="percent percent-b" style="width:{$tweenedB}%" />
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
        <div class="delete">
            <Button
                type="secondary"
                flat={true}
                on:click={() => handleEdit(poll)}>Update</Button
            >
            <Button flat={true} on:click={() => handleDelete(poll.id)}
                >Delete</Button
            >
        </div>
    </div>
</Card>

<style>
    .poll {
        min-width: 300px;
    }
    h3 {
        margin: 0 auto;
        color: #555;
    }
    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }
    .answer {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
        text-align: left;
    }
    .answer:hover {
        opacity: 0.6;
    }
    span {
        display: inline-block;
        padding: 10px 20px;
    }

    .percent {
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }

    .percent-a {
        border-left: 4px solid rgb(175, 21, 21);
        background: rgba(185, 9, 44, 0.2);
    }
    .percent-b {
        border-left: 4px solid rgb(2, 156, 27);
        background: rgba(69, 196, 150, 0.2);
    }
    .delete {
        margin-top: 30px;
    }
</style>
