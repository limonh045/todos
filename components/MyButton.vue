<template>
  <div>
    <button
      @click="$emit('click')"
      class="font-weight-bold text-white bg-info w-50 px-5 d-block m-auto  py-1"
    >
      {{ text }}
    </button>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style scoped></style>
