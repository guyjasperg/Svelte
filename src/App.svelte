<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import PollList from "./components/PollList.svelte";
	import CreatePollForm from "./components/CreatePollForm.svelte";
	import EditPollForm from "./components/EditPoll.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import EditPoll from "./components/EditPoll.svelte";

	//tabs
	let items = ["Current Polls", "Add New Poll"];
	let activeItem = "Current Polls";
	let editPoll;
	let pollID = 0;

	// polls
	// let polls = [
	// 	{
	// 		id: 1,
	// 		question: "Python or JavaScript?",
	// 		answerA: "Python",
	// 		answerB: "JavaScript",
	// 		votesA: 9,
	// 		votesB: 15,
	// 	},
	// 	{
	// 		id: 2,
	// 		question: "Fave NBA Team?",
	// 		answerA: "LA Lakers",
	// 		answerB: "Golden State Warriors",
	// 		votesA: 25,
	// 		votesB: 30,
	// 	},
	// ];

	const tabChange = (e) => {
		console.log(e.detail);
		activeItem = e.detail;

		//reset variables
		if (activeItem === "Current Polls") {
			editPoll = null;
			pollID = 0;
		}
	};

	const handleAddPoll = (e) => {
		// const poll = e.detail;
		// polls = [poll, ...polls];
		activeItem = "Current Polls";
		// console.log(polls);
	};

	const handleEditCancel = () => {
		activeItem = "Current Polls";
		pollID = 0;
	};
	const handleEditPoll = (e) => {
		console.log("handleEditPoll", e.detail);
		editPoll = e.detail;
		pollID = editPoll.id;
		activeItem = "Add New Poll";
	};
</script>

<Header />

<main>
	<!-- <Tabs on:tabChange={tabChange} {activeItem} {items} /> -->
	{#if activeItem === "Current Polls"}
		<Tabs on:tabChange={tabChange} {activeItem} {items} />
		<!-- <PollList {polls} on:vote={handleVote} /> -->
		<PollList on:edit={(id) => handleEditPoll(id)} />
	{:else if activeItem === "Add New Poll"}
		{#if pollID === 0}
			<Tabs on:tabChange={tabChange} {activeItem} {items} />
			<!-- //normal add new Poll -->
			<CreatePollForm on:add={handleAddPoll} />
		{:else}
			<EditPoll
				editPoll={true}
				poll={editPoll}
				editMode={true}
				on:add={handleAddPoll}
				on:cancel={handleEditCancel}
			/>
		{/if}
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
		text-align: center;
	}
</style>
