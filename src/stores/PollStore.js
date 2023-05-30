import { writable } from 'svelte/store'

const PollStore = writable([

    {
        id: 1,
        question: "Python or JavaScript?",
        answerA: "Python",
        answerB: "JavaScript",
        votesA: 9,
        votesB: 15,
    },
    {
        id: 2,
        question: "Fave NBA Team?",
        answerA: "LA Lakers",
        answerB: "Golden State Warriors",
        votesA: 25,
        votesB: 30,
    },
])

export default PollStore