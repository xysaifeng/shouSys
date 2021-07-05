<template>
  <div class="manaul-box">
    <h3 class="title">{{ title }}</h3>
    <div class="manaul-content">
      <slot name="content" v-bind="$attrs" v-on="$listeners"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.manaul-box {
  .title {
    padding: 20px 30px;
    margin: 0;
    border-bottom: 1px solid #eee;
  }
  .manaul-content {
    padding: 20px 30px;
  }
}
</style>
