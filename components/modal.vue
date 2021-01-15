<template>
  <div>
    <div v-if="modaltoggle" @click="$emit('modalclose')" class="backdrop"></div>

    <transition name="fade">
      <div class="box" v-if="modaltoggle">
        <div class="d-flex justify-content-between">
          <div class="modal-title text-uppercase font-weight-bold m-3 ">
            {{ modaltitle }}
          </div>
          <button class="close-modal-btn m-2">
            <img @click="$emit('modalclose')" src="/close.png" />
          </button>
        </div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import TextInput from "./TextInput.vue";
export default {
  props: ["modaltoggle", "modaltitle"],
  data: () => ({
    show: true
  })
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.box {
  width: 331px;
  height: 243px;
  background: #ffff;
  position: fixed;
  margin: auto;
  left: 37%;
  top: 22%;
  z-index: 999;
}
.modal-title {
  font-size: 14px;
  color: #bcbcbc;
}
.close-modal-btn {
  width: 38px;
  height: 38px;
  background: transparent;
}
.backdrop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(196, 196, 196, 0.7);
  z-index: 99;
}
</style>
