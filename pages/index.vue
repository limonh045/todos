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
      <text-input placeholder="Add To Task"></text-input>
      <my-button class="mt-4" text="Add"></my-button>
    </modal>
    <!-- edit task modal -->
    <modal
      modaltitle="edit this task"
      :modaltoggle="editTaskModal"
      @modalclose="editTaskModal = !editTaskModal"
    >
      <text-input placeholder="Edit this task"></text-input>
      <my-button class="mt-4" text="Edit"></my-button>
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
      <button class="py-1 px-4 text-white bg-info mx-3">Yes</button>
      <button class="py-1 px-4 text-white bg-danger mx-2">No</button>
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
    >
      <div class="index">{{ i }}</div>
      <div class="name pr-3">
        {{ item.header }}
      </div>
      <div class="added-at">2020,12-22 6-10 pm</div>

      <div class="action d-flex justify-content-between">
        <div class="complete-icon d-inline position-relative">
          <img src="/noncomplete.png" class="pointer" alt="" />
          <img
            src="/iscomplete.png"
            class="position-absolute iscomplete-icon pointer"
            alt=""
          />
        </div>
        <img
          @click="editTaskModal = !editTaskModal"
          src="/edit.png"
          class="p-1 pointer"
          alt=""
        />
        <img
          @click="deleteTaskModal = !deleteTaskModal"
          src="/delete.png"
          class="pointer"
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
    perPage: 3,
    currentPage: 1,
    data: [
      // Accept a Array
    ]
  }),
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
  color: #E0E0E0;
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
</style>
