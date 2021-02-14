<script>
  import { db } from "./firebase";
  import toastr from "toastr";
  toastr.options.closeMethod = "fadeOut";
  toastr.options.closeDuration = 300;
  toastr.options.closeEasing = "swing";
  toastr.options.progressBar = true;
  let tasks = [];
  let taskState = {
    name: "",
    description: "",
  };
  let editStatus = false;
  let currentID = "";
  db.collection("task").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    tasks = [...docs];
  });
  const addTask = async () => {
    await db
      .collection("task")
      .doc()
      .set({ ...taskState, createdAt: Date.now() });
    toastr.success("Note added", "All Ok dude");
  };
  const handleSubmit = () => {
    if (!editStatus) {
      if (taskState.description.lenght > 2) {
        addTask();
      } else {
        toastr.error("Description should have more than 2 characters", "Error");
      }
    } else {
      updateTask();
    }
    taskState = {
      name: "",
      description: "",
    };
  };
  const deleteTask = async (id) => {
    await db.collection("task").doc(id).delete();
    toastr.success("Bye, Bye note", "Removed");
  };
  const editTask = (currentTask) => {
    editStatus = true;
    taskState = currentTask;
    currentID = currentTask.id;
  };
  const onCancel = () => {
    editStatus = false;
    taskState = {
      name: "",
      description: "",
    };
    toastr.info("Closed");
  };
  const updateTask = async () => {
    await db.collection("task").doc(currentID).update(taskState);
  };
</script>

<main>
  <section class="container p-4">
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-4 col-lg-6">
        <h1>Create your notes <i class="material-icons">note</i></h1>
        <form on:submit|preventDefault={handleSubmit} class="card card-body">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Write a new Note Title"
              bind:value={taskState.name}
            />
          </div>
          <div class="form-group">
            <textarea
              class="form-control"
              row="3"
              placeholder="Write a task description"
              bind:value={taskState.description}
            />
          </div>
          {#if editStatus}
            <button on:click={onCancel} class="btn btn-danger"> Cancel </button>
          {/if}
          <button class="btn btn-primary">
            {#if editStatus}Update{:else}<i class="material-icons">add</i>{/if}
          </button>
        </form>
        <hr />
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>
                {task.name}
              </h5>
              <i on:click={editTask(task)} class="material-icons cursor-pointer"
                >edit</i
              >
            </div>
            <p>
              {task.description}
            </p>
            <div>
              <button class="btn btn-danger" on:click={deleteTask(task.id)}>
                <i class="material-icons">delete_forever</i>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

<style>
  h1 {
    width: 100%;
    text-align: center;
  }
  button,
  i {
    vertical-align: middle;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
