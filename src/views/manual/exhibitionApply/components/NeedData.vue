<template>
  <div class="need-data">
    <a-row>
      <a-col :span="16">
        <div class="left">
          <a-row :gutter="32">
            <a-col :span="12" v-for="(item, index) in list" :key="item.id">
              <a-form-item>
                <div class="item-box">
                  <div class="item">
                    <a-checkbox
                      :checked="item.checked"
                      @change="handleCheck(item, $event)"
                    >
                      <span class="desc">{{ item.name }}</span>
                    </a-checkbox>
                    <a :disabled="!item.checked" href="javascript:;">编辑</a>
                  </div>
                  <div v-if="index < 2" :class="{tip: true, 'g-bg': index === 0, 'r-bg': index === 1,}">{{ item.tip }}</div>
                  <div v-else :class="{tags: true, light: item.checked}">
                    <a-tag v-for="(t, i) in item.tags" :key="i">{{ t }}</a-tag>
                  </div>
                </div>
              </a-form-item>
            </a-col>

            <!-- <a-col :span="12">
              <a-form-item>
                <div class="item-box">
                  <div class="item">
                    <a-checkbox
                      v-decorator="[
                        'realName',
                        {
                          valuePropName: 'checked',
                          initialValue: false
                        }
                      ]"
                    >
                      <span class="desc">实名认证</span>
                    </a-checkbox>
                    <a href="javascript:;" :disabled="!getFieldValue('realName')">编辑</a>
                  </div>
                  <div v-if="index < 3" class="tip r-bg">与公安进行联网，进行身份验证</div>
                  <div v-else class="tags">
                    <a-tag>必填</a-tag>
                    <a-tag>50字符</a-tag>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item>
                <div class="item-box">
                  <div class="item">
                    <a-checkbox
                      v-decorator="[
                        'name',
                        {
                          valuePropName: 'checked',
                          initialValue: false
                        }
                      ]"
                    >
                      <span class="desc">姓名</span>
                    </a-checkbox>
                    <a disabled href="javascript:;">编辑</a>
                  </div>
                  <div class="tags">
                    <a-tag>必填</a-tag>
                    <a-tag>50字符</a-tag>
                  </div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item>
                <div class="item-box">
                  <div class="item">
                    <a-checkbox
                      v-decorator="[
                        'phone',
                        {
                          valuePropName: 'checked',
                          initialValue: false
                        }
                      ]"
                    >
                      <span class="desc">手机号</span>
                    </a-checkbox>
                    <a :disabled="!getFieldValue('phone')" href="javascript:;">编辑</a>
                  </div>
                  <div class="tags">
                    <a-tag>必填</a-tag>
                    <a-tag>50字符</a-tag>
                    <a-tag>中国大陆</a-tag>
                  </div>
                </div>
              </a-form-item>
            </a-col> -->
          </a-row>
          <a-button type="dashed" icon="plus" block @click="addItem"> 新增 </a-button>
        </div>
      </a-col>
      <a-col :span="7">
        <div class="right">
          <div style="border: 1px solid red; height: 200px"></div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'NeedData',
  props: {
    getFieldValue: {
      type: Function,
      default: () => {}
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: this.value
    }
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(this.list)), '-------needData');
  },
  methods: {
    handleCheck(item, e) {
      item.checked = e.target.checked
    },
    addItem() {
      const o = { id: this.list[this.list.length - 1].id + 1, prop: 'job', name: '工作', tags: ['必填', '10字符'], checked: false }
      this.list.push(o)
    }
  }

};
</script>

<style lang="less" scoped>
.need-data {
  .left {
    margin-right: 24px;
  }
  /deep/ .ant-row.ant-form-item {
    width: 100%;
    .ant-form-item-control-wrapper {
      width: 100%;
      .item-box {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px 20px 16px;
        margin-bottom: 24px;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tip {
          color: #fff;
          border-radius: 2px;
          height: 30px;
          line-height: 30px;
          text-indent: 10px;
          &.g-bg {
            background: #2EC25A;
          }
          &.r-bg {
            background: #ED7F8C;
          }
        }
        .tags {
          height: 30px;
          line-height: 30px;
          .ant-tag {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: rgba(0, 0, 0, .25);
          }
          &.light {
            .ant-tag {
              color: rgba(0, 0, 0, .65);
            }
          }
        }
      }
    }
  }
}
</style>
