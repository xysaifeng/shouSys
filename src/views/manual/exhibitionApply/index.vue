<template>
  <div class="container">
    <div class="header-wrapper">
      <Breadcrumb :breadcrumbList="breadcrumbList"> </Breadcrumb>
    </div>
    <a-form :form="form" layout="inline" hideRequiredMark @submit="handleSubmit">
      <!-- <section class="content">
        <manual-box title="参展证规定">
          <template #content>
            <a-form-item label="DatePicker">
              <a-date-picker v-decorator="['shortTime', config]" />
            </a-form-item>
            <a-form-item>
              <Editor
                placeholder="请输入展会参展证件规定、领取时间等信息"
                v-decorator="[
                  'info',
                  editorConfig1
                ]"
              ></Editor>
            </a-form-item>
          </template>
        </manual-box>
      </section> -->
      <!-- <section class="content">
        <manual-box title="参展证申请数量">
          <template #content>
            <a-form-item label="">
              <apply-count
                v-decorator="[
                  'applyCount',
                  {
                    initialValue: tableList,
                    rules: [{ validator: checkCount }]
                  }
                ]"
                @addItem="addItem"
              />
            </a-form-item>
          </template>
        </manual-box>
      </section> -->
      <!-- <section class="content">
        <manual-box title="参展证增值服务">
          <template #content>
            <a-row>
              <a-col>
                <a-form-item>
                  <a-checkbox
                    v-decorator="[
                      'mail',
                      {
                        valuePropName: 'checked',
                        initialValue: false,
                      },
                    ]"
                  >
                    <span class="desc">支持邮寄服务</span>
                  </a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item>
              <a-checkbox
                @change="extraChane"
                v-decorator="[
                  'extra',
                  {
                    valuePropName: 'checked',
                    initialValue: false,
                  },
                ]"
              >
                <span class="desc">额外证件申请花费</span>
              </a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-input
                :disabled="!extraMoneyChecked"
                style="width: 50px;marginRight: 10px; text-align: center"
                v-decorator="['extraMoney', {
                  initialValue: 0
                }]"
              />
              <span :class="{noraml:true, light: extraMoneyChecked}">元 / 张</span>
            </a-form-item>
          </template>
        </manual-box>
      </section> -->

      <section class="content">
        <manual-box title="参展证所需资料">
          <template #content>
            <a-form-item>
              <need-data
                :getFieldValue="getFieldValue"
                v-decorator="[
                  'needData',
                  {
                    initialValue: needDataList
                  }]
                "
              />
            </a-form-item>
          </template>
        </manual-box>
      </section>
      <!-- <span class="ant-form-explain" style="color: #f5222d">请完善</span> -->
      <!-- <section class="content">
        <manual-box title="温馨提示">
          <template #content>
            <a-form-item label="">
              <Editor
                placeholder="请输入展会证件的温馨提醒"
                v-decorator="[
                  'tip',
                  editorConfig2
                ]"
              ></Editor>
            </a-form-item>
          </template>
        </manual-box>
      </section> -->
      <section class="content">
        <a-form-item>
          <a-button type="primary" html-type="submit"> Submit </a-button> &nbsp;&nbsp;
          <a-button type="plain" @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </section>
    </a-form>
  </div>
</template>

<script>
import ManualBox from '@/components/ManualBox';
import ApplyCount from './components/ApplyCount.vue';
import Breadcrumb from '@/components/Breadcrumb/breadcrumb';
import Editor from '@/components/Editor/QuillEditor.vue';
import NeedData from './components/NeedData.vue';
import '@/style/index.less';

export default {
  components: {
    ApplyCount,
    Breadcrumb,
    ManualBox,
    Editor,
    NeedData
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'info' });
  },
  data() {
    this.breadcrumbList = [
      { id: 3, name: '参展手册' },
      { id: 4, name: '参展证申请规定' }
    ];
    this.flag = 0;
    this.getFieldValue = this.form.getFieldValue;
    return {
      needDataList: [
      { id: 1, prop: 'fangyi', name: '防疫验证', tags: [], checked: false, tip: '根据防疫要求进行防疫验证' },
      { id: 2, prop: 'realName', name: '实名认证', tags: [], checked: true, tip: '与公安进行联网，进行身份验证' },
      { id: 3, prop: 'name', name: '姓名', tags: ['必填', '50字符'], checked: false },
      { id: 4, prop: 'phone', name: '手机号', tags: ['必填', '11字符', '中国大陆'], checked: false },
      { id: 5, prop: 'worker', name: '职位', tags: ['必填', '10字符'], checked: false }
    ],
      tableList: [],
      config: {
        // initialValue: '2020-01-09',
        rules: [{ type: 'object', required: true, message: '请选择时间!' }]
      },
      editorConfig1: {
        initialValue: '',
        rules: [{ validator: this.checkInfo }]
      },
      editorConfig2: {
        initialValue: '',
        rules: [{ validator: this.checkTip }]
      },
      extraMoneyChecked: false
    };
  },
  methods: {
    checkInfo(rule, value, callback) {
      if (this.infoFlag) {
        this.flag += 1;
        if (this.flag === 2) {
          this.infoFlag = false;
        }
        callback();
      } else if (value) {
        callback();
      } else {
        callback(new Error('展会信息不能为空!'));
      }
    },
    checkTip(rule, value, callback) {
      if (this.infoFlag) {
        this.flag += 1;
        if (this.flag === 2) {
          this.infoFlag = false;
        }
        callback();
      } else if (value) {
        callback();
      } else {
        callback(new Error('提示信息不能为空!'));
      }
    },
    checkCount(rule, value, callback) {
      const len = this.tableList.length;
      if (!len) {
        callback();
      } else if (value) {
        console.log(value, '========json');
        const map = {
          minSize: '展位最小尺寸',
          maxSize: '展位最大尺寸',
          type: '展位类型',
          count: '可领取参展证数量'
        };
        const res = this.tableList.find((item) => {
          const keys = Object.keys(item);
          for (const k of keys) {
            if (!item[k] && map[k]) {
              this.$message.error(`${map[k]}不能为空!`);
              return true;
            }
          }
        });
        console.log(res, '======rs666');
        callback();
        //  callback(new Error('提示信息不能为空22!'))
      } else {
        callback(new Error('提示信息不能为空!33'));
      }
    },
    extraChane(e) {
      this.extraMoneyChecked = e.target.checked;
      !e.target.checked && this.form.resetFields(['extraMoney']);
    },
    handleReset() {
      this.infoFlag = true;
      this.extraMoneyChecked = false;
      this.tableList = [];
      this.form.resetFields();
    },
    addItem() {
      const o = { minSize: '', maxSize: '', type: undefined, count: '', id: this.tableList.length + 1 };
      this.tableList.push(o);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.infoFlag = false;
      this.form.validateFields({ force: true }, (err, fieldsValue) => {
        console.log('fieldsValue:--- ', JSON.parse(JSON.stringify(fieldsValue)));
        console.log(this.ss, '-------');
        if (err) {
          console.log(err);
          return false;
        }
        let { shortTime } = fieldsValue;
        shortTime && (shortTime = shortTime.format('YYYY-MM-DD'));
        console.log(shortTime);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@normal-color: rgba(0, 0, 0, 0.3);
@light-color: rgba(0, 0, 0, 0.65);
/deep/ .ant-checkbox-wrapper {
  .desc {
    color: @normal-color;
  }
  &.ant-checkbox-wrapper-checked {
    .desc {
      color: @light-color;
    }
  }
}
.noraml {
  color: @normal-color;
  &.light {
    color: @light-color;
  }
}
.need-data {
  .left {
    margin-right: 24px;
  }
  .right {
  }
}
</style>
