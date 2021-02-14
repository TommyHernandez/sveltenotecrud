<script>
	import {db} from './firebase';
	let tasks = [];
	let taskState = {
		name: '',
		description: ''
	};
	let editStatus = false;
	let currentID = '';
	db.collection('task').onSnapshot(querySnapshot => {
		let docs = [];
		querySnapshot.forEach(doc => {
			docs.push({...doc.data(), id: doc.id});
		});
		tasks = [...docs];
	});
	const addTask = async () => {
		await db.collection('task').doc().set({...taskState, createdAt: Date.now()});
		console.log('New Task created',taskState);
	};
	const handleSubmit = () => {
		if(!editStatus){
			addTask();
		}else {
			updateTask();
		}
		taskState =  {
			name: '',
			description: ''
		};
	};
	const deleteTask = async (id) => {
		await db.collection('task').doc(id).delete();
	}
	const editTask = (currentTask) => {
		editStatus= true;
		taskState = currentTask;
		currentID = currentTask.id;
	}
	const onCancel = () =>{
		editStatus= false;
		taskState =  {
			name: '',
			description: ''
		};
	}
	const updateTask = async () => {
		await db.collection('task').doc(currentID).update(taskState);
	}
</script>

<main>
	<h1>
		Crea tus Notas
	</h1>
	<form on:submit|preventDefault={handleSubmit} class="card card-body">
		<div class="form-group">
			<input class="form-control" type="text" placeholder="Write a new Note Title" bind:value={taskState.name}/>
		</div>
		<div class="form-group">
			<textarea class="form-control" row="3" placeholder="Write a task description" bind:value={taskState.description}></textarea>
		</div>
		{#if editStatus }
		<button on:click={onCancel} class="btn btn-danger">
			Cancel
		</button>
		{/if}
		<button class="btn btn-primary"> 
			{#if editStatus }Update{:else}<i class="material-icons">add</i>{/if}
		</button>
	</form>
	<hr>
	{#each tasks as task}
		<div class="card card-body mt-2">
			<div class="d-flex justify-content-between">
				<h5>
					{task.name}
				</h5>
			</div>
			<p>
				{task.description}
			</p>
			<div>
				<button class="btn btn-danger" on:click={deleteTask(task.id)}>
					<i class="material-icons">delete_forever</i>
				</button>
				<button class="btn btn-info" on:click={editTask(task)}>
					<i class="material-icons">edit</i>
				</button>
			</div>
		</div>
	{/each}
</main>

<style>

</style>