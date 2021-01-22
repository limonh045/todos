<template>
  <div class="content mx-auto">
    <div class="mw-100 d-flex justify-content-end mt-5">
      <button @click="addTaskModal = !addTaskModal" class="add-new-btn">
        Add New
      </button>
    </div>
    <!----- addd new task modal--- -->
    <modal
      modaltitle="add to task"
      :modaltoggle="addTaskModal"
      @modalclose="addTaskModal = !addTaskModal"
    >
      <text-input placeholder="Add To Task" v-model="taskVal"></text-input>
      <my-button class="mt-4" @click="addTask" text="Add"></my-button>
    </modal>
    <!-- edit task modal -->
    <modal
      modaltitle="edit this task"
      :modaltoggle="editTaskModal"
      @modalclose="editTaskModal = !editTaskModal"
    >
      <text-input placeholder="Edit this task" v-model="editTasks"></text-input>
      <my-button class="mt-4" text="Edit" @click="editConfirm"></my-button>
    </modal>
    <!-- ---delete task modal----- -->
    <modal
      modaltitle="edit this task"
      :modaltoggle="deleteTaskModal"
      @modalclose="deleteTaskModal = !deleteTaskModal"
    >
      <p class="delete-info px-4 mt-4">
        Do you really want to delete this task? this can not be undone.
      </p>
      <button class="py-1 px-4 text-white bg-info mx-3" @click="deleteConfirm">
        Yes
      </button>
      <button
        class="py-1 px-4 text-white bg-danger mx-2"
        @click="(deleteTaskModal = !deleteTaskModal), (deleteItemId = null)"
      >
        No
      </button>
    </modal>

    <div class="d-flex task-header p-3 my-3 font-weight-bold">
      <div class="index">Index</div>
      <div class="name">Task Name</div>
      <div class="added-at">Added At</div>
      <div class="action text-center">Action</div>
    </div>

    <div
      id="my-table"
      class="d-flex task-text p-3  text-capitalize"
      v-for="(item, i) in itemsForList"
      :key="i"
      :class="{ delete: item.done }"
    >
      <div class="index">{{ i + 1 }}</div>
      <div class="name pr-3">
        {{ item.name }}
      </div>
      <div class="added-at">2020,12-22 6-10 pm</div>

      <div class="action d-flex justify-content-between">
        <div class="complete-icon d-inline position-relative">
          <img
            src="/noncomplete.png"
            @click="isCompleteHandel(item.id, true)"
            class="pointer"
            alt=""
          />
          <img
            @click="isCompleteHandel(item.id, false)"
            v-if="item.done"
            src="/iscomplete.png"
            class="position-absolute iscomplete-icon pointer"
            alt=""
          />
        </div>
        <img
          @click="editTaskHandelar(item)"
          src="/edit.png"
          class="p-1 pointer edit-icon"
          alt=""
        />
        <img
          @click="
            (deleteTaskModal = !deleteTaskModal), (deleteItemId = item.id)
          "
          src="/delete.png"
          class="pointer delete-icon"
          alt=""
        />
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="itemList"
      align="center"
      class="mt-5"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    addTaskModal: false,
    editTaskModal: false,
    deleteTaskModal: false,
    perPage: 5,
    currentPage: 1,
    data: [
      // Accept a Array
    ],
    deleteItemId: "",
    taskVal: "",
    editTasks: "",
    editTaskId: ""
  }),
  created() {
    this.$axios
      .$get("https://todos-62bac-default-rtdb.firebaseio.com/todos.json")
      .then(response => {
        for (const key in response) {
          response[key].id = key;
          this.data.unshift(response[key]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    async addTask() {
      let date = new Date();
      let timeStamp;
      if (date.getMinutes() > 12) {
        timeStamp = "Pm";
      } else {
        timeStamp = "Am";
      }
      let today =
        date.getDay() +
        " " +
        (date.getMonth() + 1) +
        " " +
        date.getFullYear() +
        ", " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        " " +
        timeStamp;
      let taskValue = {
        name: this.taskVal,
        done: false,
        date: today
      };

      this.addTaskModal = !this.addTaskModal;
      await this.$axios
        .$post(
          "https://todos-62bac-default-rtdb.firebaseio.com/todos.json",
          taskValue
        )
        .then(res => {
          taskValue.id = res.name;
          this.data.unshift(taskValue);
        })
        .catch(err => {
          console.log(err);
        });

      this.taskVal = "";
    },
    editTaskHandelar(item) {
      if(item.done) return;
      this.editTasks = item.name;
      this.editTaskModal = !this.editTaskModal;
      console.log(item.name);
      this.editTaskId = item.id;
    },
    editConfirm() {
      this.editTaskModal = !this.editTaskModal;
      this.data.find(e => e.id == this.editTaskId).name = this.editTasks;

      this.$axios
        .$patch(
          `https://todos-62bac-default-rtdb.firebaseio.com/todos/${this.editTaskId}.json`,
          { name: this.editTasks }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCompleteHandel(id, isDone) {
      this.data.find(e => e.id == id).done = isDone;
      this.$axios
        .$patch(
          `https://todos-62bac-default-rtdb.firebaseio.com/todos/${id}.json`,
          { done: isDone }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteConfirm() {
      this.deleteTaskModal = !this.deleteTaskModal;
      console.log(this.deleteItemId);
      this.data.splice(
        this.data.findIndex(e => e.id == this.deleteItemId),
        1
      );
      this.$axios
        .$delete(
          `https://todos-62bac-default-rtdb.firebaseio.com/todos/${this.deleteItemId}.json`
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    rows() {
      return this.data.length;
    },
    itemsForList() {
      return this.data.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    }
  }
};
</script>

<style>
.content {
  max-width: 60rem;
}
.add-new-btn {
  background: #6ecb66;
  width: 136px;
  height: 34px;
  font-size: 12px;
  color: #ffffff;
}
.task-header {
  background: #939393;
  color: #e0e0e0;
}
.index {
  width: 90px;
}
.name {
  width: 25rem;
}
.added-at {
  width: 15rem;
}
.action {
  width: 7rem;
}
.task-text:nth-of-type(odd) {
  background: #e4e4e4;
}
.task-text:nth-of-type(even) {
  background: #edecec;
}
.iscomplete-icon {
  margin-left: -16px;
  margin-top: 2px;
}
.delete-info {
  color: #bcbcbc;
}
.edit-icon,
.delete-icon {
  height: 26px;
}
.delete {
  text-decoration: line-through;
}
</style>
