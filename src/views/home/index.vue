<template>
  <div class="container">
    <div class="header-wrapper">
      <Breadcrumb :breadcrumbList="breadcrumbList">
      </Breadcrumb>
    </div>
    <section class="content">
      <div class="table-box">
        <a-table
          ref="table"
          size="default"
          :rowKey="(key) => key.id"
          :columns="[]"
          :data-source="[]"
          :pagination="false"
        >
          <span slot="no" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="name" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a href="javascript:;" @click="addRoles(2, record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="delRole(record.id)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </template>
          </span>
        </a-table>
      </div>
    </section>
  </div>
</template>

<script>
import '@/style/index.less'
import Breadcrumb from '@/components/Breadcrumb/breadcrumb'
export default {
  name: 'Roles',
  components: {
    Breadcrumb
  },
  data () {
    this.breadcrumbList = [{ id: 1, name: '系统管理' }, { id: 2, name: '角色管理' }]
    return {}
  },

  created () {
  },
  methods: {
  }
}
</script>

<style lang='less'>
</style>
