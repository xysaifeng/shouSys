<template>
  <div>
    <a-table
      ref="table"
      :rowKey="(key) => key.id"
      :columns="columns"
      :data-source="loadData"
      :pagination="false"
      :scroll="{ x: '100%' }"
      class="apply-count"
    >
      <div class="size-box" slot="size" slot-scope="text, record">
        <a-input style="width: 25%" placeholder="请输入" v-model="record.minSize" />
        <span class="divider"> ~ </span>
        <a-input class="m-r" style="width: 25%" placeholder="请输入" v-model="record.maxSize" />
        <span>㎡</span>
      </div>
      <div class="size-box" slot="type" slot-scope="text, record">
        <a-select v-model="record.type" style="width: 40%" placeholder="请选择" @change="handleSelet.call(null, text)">
          <a-select-option v-for="t in typeList" :key="t.id" :value="t.id">{{ t.name }}</a-select-option>
        </a-select>
      </div>
      <div class="size-box" slot="count" slot-scope="text, record">
        <a-input
          class="m-r"
          style="width: 25%"
          placeholder="请输入"
          v-model="record.count"
          @change="handleNumberChange"
        />
        <span>个</span>
      </div>
      <span slot="action" slot-scope="text, record">
        <template>
          <a href="javascript:;" @click="delItem(record)">删除</a>
          <!-- <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="delItem(record)">
            <a href="javascript:;" @click="delItem(record)">删除</a>
          </a-popconfirm> -->
        </template>
      </span>
    </a-table>
    <a-button type="dashed" icon="plus" block @click="handleAdd"> 新增 </a-button>
  </div>
</template>

<script>
const columns = [
  {
    title: '展位尺寸面积',
    dataIndex: 'minSize',
    // width: '7%',
    scopedSlots: { customRender: 'size' }
  },
  {
    title: '展位类型',
    dataIndex: 'type',
    // width: '38%',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '可领取参展证数量',
    // width: '20%',
    dataIndex: 'count',
    scopedSlots: { customRender: 'count' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
];
const typeList = [
  { id: 1, name: '标准' },
  { id: 2, name: '缩小' },
  { id: 3, name: '超大' }
];
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.typeList = typeList;
    return {
      columns,
      loadData: [
        // { minSize: 1, maxSize: 4, type: 1, count: 2 }
      ]
    };
  },
  watch: {
    value: {
      deep: true,
      handler: function (val) {
        console.log('val: -------', val);
        this.loadData = val;
      }
    }
  },
  methods: {
    handleAdd() {
      this.$emit('addItem');
    },
    handleSelet(item) {
      console.log('item: ', arguments);
    },
    delItem(item) {
      console.log(item);
      this.value.splice(this.value.indexOf(item), 1);
    },
    handleNumberChange(e) {
      const number = parseInt(e.target.value || 0, 10);
      console.log('number: ', number);
      if (isNaN(number)) {
        return;
      }
      console.log(number, '-----------number');
      this.triggerChange({ number });
    },
    triggerChange(changedValue) {
      console.log('changedValue: ', changedValue);
      // Should provide an event to pass value to Form.
      // this.$emit('change', this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.apply-count {
  .size-box {
    display: flex;
    align-items: center;
    .divider {
      display: inline-block;
      margin: 4px;
    }
    .m-r {
      margin-right: 6px;
    }
  }
}
</style>
