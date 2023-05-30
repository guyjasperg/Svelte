<script>
    import PollStore from "../stores/PollStore";
    import Button from "../shared/Button.svelte";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let poll = null;
    export let editMode = false;
    export let fields = { question: "", answerA: "", answerB: "" };
    let errors = { question: "", answerA: "", answerB: "" };
    let valid = false;

    export let pollID = 0;

    const submitHandler = () => {
        console.log("submitHandler");

        valid = true;

        //validate fields
        if (fields.question.trim().length < 5) {
            valid = false;
            errors.question =
                "Question needs to be at least 5 characters long.";
        } else {
            errors.question = "";
        }

        if (fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = "AnswerA cannot be empty";
        } else {
            errors.answerA = "";
        }

        if (fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = "AnswerB cannot be empty";
        } else {
            errors.answerB = "";
        }

        if (valid) {
            if (editMode) {
                PollStore.update((currentPolls) => {
                    let copiedPolls = [...currentPolls];
                    let editPoll = copiedPolls.find(
                        (poll) => poll.id === pollID
                    );

                    editPoll.question = fields.question;
                    editPoll.answerA = fields.answerA;
                    editPoll.answerB = fields.answerB;

                    return copiedPolls;
                });
            } else {
                let poll = {
                    ...fields,
                    votesA: 0,
                    votesB: 0,
                    id: Math.random(),
                };
                //save the poll to store
                PollStore.update((currentPolls) => {
                    return [poll, ...currentPolls];
                });
            }
            dispatch("add", poll);
        }
    };

    const handlerCancel = () => {
        console.log("cancel clicked");
    };

    onMount(() => {
        //maybe get data from DB
        console.log("component mounted", editMode);
        if (editMode) {
            fields.question = poll.question;
            fields.answerA = poll.answerA;
            fields.answerB = poll.answerB;
            pollID = poll.id;
        }
    });
</script>

<div>
    <form on:submit={submitHandler}>
        <div class="form-field">
            <label for="question">Poll Question</label>
            <input
                type="text"
                id="question"
                bind:value={fields.question}
                autofocus
            />
            <div class="error">{errors.question}</div>
        </div>
        <div class="form-field">
            <label for="answer-a">Answer A</label>
            <input type="text" i d="answer-a" bind:value={fields.answerA} />
            <div class="error">{errors.answerA}</div>
        </div>
        <div class="form-field">
            <label for="answer-b">Answer B</label>
            <input type="text" id="answer-b" bind:value={fields.answerB} />
            <div class="error">{errors.answerB}</div>
        </div>
        <Button type="secondary" flat={true}>Add Poll</Button>
    </form>
</div>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
        /* border: 1px solid black; */
    }

    .form-field {
        margin: 18px auto;
    }
    input {
        width: 100%;
        border-radius: 6px;

        box-sizing: border-box;
        border: 2px solid #ccc;
        -webkit-transition: 0.5s;
        transition: 0.5s;
        outline: none;
    }
    input[type="text"]:focus {
        border: 2px solid #0c86b6;
    }

    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-size: 12px;
        color: #d91b42;
        font-weight: bold;
    }
</style>
