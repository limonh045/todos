<template>
  <div>
    <input
      class="input-text"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      type="text"
      ref="textinput"
    />
  </div>
</template>
<script>
export default {
  props: ["value", "placeholder"],
  mounted() {
    this.$refs.textinput.focus();
  }
};
</script>
<style>
.input-text {
  width: 279px;
  height: 43px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  outline: none;
  margin: 27px 3px 0 18px;
  padding: 0 10px;
}
</style>
