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
      <text-input v-model="taskName" placeholder="Add To Task"></text-input>
      <my-button @click="addTask" class="mt-4" text="Add"></my-button>
    </modal>
    <!-- edit task modal -->
    <modal
      modaltitle="edit this task"
      :modaltoggle="editTaskModal"
      @modalclose="editTaskModal = !editTaskModal"
    >
      <text-input
        v-model="editTaskName"
        placeholder="Edit this task"
      ></text-input>
      <my-button @click="editTask" class="mt-4" text="Edit"></my-button>
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
        @click="(deleteTaskModal = !deleteTaskModal), (deleteItemId = '')"
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
      :class="{ linethough: item.done == true }"
    >
      <div class="index">{{ i + 1 }}</div>
      <div class="name pr-3">
        {{ item.name }}
      </div>
      <div class="added-at">{{ item.date }}</div>

      <div class="action d-flex justify-content-between">
        <div class="complete-icon d-inline position-relative">
          <img
            src="/noncomplete.png"
            @click="doneHandelar(item.id, true)"
            class="pointer"
            alt=""
          />
          <img
            @click="doneHandelar(item.id, false)"
            v-if="item.done"
            src="/iscomplete.png"
            class="position-absolute iscomplete-icon pointer"
            alt=""
          />
        </div>
        <img
          @click="editBtnHandelar(item)"
          src="/edit.png"
          class="p-1 pointer edit-icon"
          alt=""
        />
        <img
          @click="deleteBtnHandle(item)"
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
import firebase from "~/plugins/fire";
export default {
  data: () => ({
    addTaskModal: false,
    editTaskModal: false,
    deleteTaskModal: false,
    perPage: 10,
    currentPage: 1,
    data: [
      // Accept a Array
    ],
    deleteItemId: "",
    editItemId: "",
    taskName: "",
    editTaskName: ""
  }),
  methods: {
    deleteBtnHandle(item) {
      if (item.done) return;
      this.deleteTaskModal = !this.deleteTaskModal;
      this.deleteItemId = item.id;
    },
    editBtnHandelar(item) {
      if (item.done) return;
      this.editTaskModal = !this.editTaskModal;
      this.editItemId = item.id;
      this.editTaskName = item.name;
    },
    getValue() {
      firebase
        .database()
        .ref("todos")
        .once("value", todosValue => {
          todosValue.forEach(element => {
            let todosGetValue = {
              name: element.val().name,
              done: element.val().done,
              date: element.val().date,
              id: element.key
            };
            this.data.unshift(todosGetValue);
            console.log(element.val().date);
          });
        });
    },
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
        name: this.taskName,
        done: false,
        date: today
      };

      await firebase
        .database()
        .ref("todos")
        .push(taskValue)
        .then(res => {
          let todoTaskAdd = {
            name: taskValue.name,
            done: taskValue.done,
            date: taskValue.date,
            id: res.key
          };
          this.data.unshift(todoTaskAdd);
        })
        .catch(err => {
          console.log(err);
        });
      this.taskName = "";
      this.addTaskModal = false;
    },
    async deleteConfirm() {
      await firebase
        .database()
        .ref("todos")
        .child(this.deleteItemId)
        .remove()
        .then(() => {
          this.data.splice(
            this.data.findIndex(e => e.id == this.deleteItemId),
            1
          );
        });

      this.deleteTaskModal = !this.deleteTaskModal;
      this.deleteItemId = "";
    },
    async editTask() {
      if (this.editTaskName == "") {
        return;
      }
      await firebase
        .database()
        .ref("todos")
        .child(this.editItemId)
        .update({
          name: this.editTaskName
        })
        .then(res => {
          this.data[
            this.data.findIndex(e => e.id == this.editItemId)
          ].name = this.editTaskName;
        });
      this.editTaskModal = false;
    },
    async doneHandelar(id, p) {
      await firebase
        .database()
        .ref("todos")
        .child(id)
        .update({
          done: p
        })
        .then(res => {
          this.data[this.data.findIndex(e => e.id == id)].done = p;
        });
    }
  },
  created() {
    this.getValue();
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
.linethough {
  text-decoration: line-through;
}
</style>
