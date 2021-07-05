<template>
  <div class="cus-pagination" v-if="total">
    <pagination
      :total="total"
      :pageSize.sync="pageInfo.pageSize"
      :current="pageInfo.pageNum"
      :show-size-changer="showSizeChanger"
      :show-quick-jumper="showQuickJumper"
      :hideOnSinglePage="hideOnSinglePage"
      :pageSizeOptions="pageSizeOptions"
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
import { Pagination } from 'ant-design-vue'

export default {
  props: {
    showSizeChanger: {
      type: Boolean,
      default: false
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      type: Boolean,
      default: false
    },
    total: {
      type: [Number],
      default: 0
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30', '50']
    },
    pageInfo: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    Pagination
  },

  methods: {
    onChange (pageNumber) {
      this.$emit('pageChange', { pageSize: this.pageInfo.pageSize, pageNum: pageNumber })
    },
    onShowSizeChange (current, pageSize) {
      this.$emit('pageChange', { pageSize: pageSize, pageNum: current })
    }
  }
}
</script>

<style lang='less'>
.cus-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
