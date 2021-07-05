<template>
  <div class="breadcrumb">
    <breadcrumb>
      <a-breadcrumb-item v-for="e in breadcrumbList" :key="e.id">{{ e.name }}</a-breadcrumb-item>
    </breadcrumb>
    <div class="ant-page-header-heading">
      <span class="nav-title">
        <span class="ant-page-header-heading-title">{{ this.breadcrumbList[this.breadcrumbList.length - 1].name }}</span>
        <a-icon class="edit" onClick="edit" type="form" />
        <span>
          <slot></slot>
        </span>
      </span>
      <slot name="goBack"></slot>
    </div>
  </div>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'
import './index.less'
export default {
    props: {
    breadcrumbList: {
        type: Array,
        default: () => []
    }
    },
    components: {
        Breadcrumb
    }
}
</script>

<style lang="less" scoped>

</style>
