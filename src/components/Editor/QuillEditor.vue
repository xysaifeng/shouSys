<template>
  <div :class="prefixCls">
    <!-- <div id="toolbar">
      Add font size dropdown
      <select class="ql-size">
        <option value="small">小</option>
        Note a missing, thus falsy value, is used to reset to default
        <option selected>普通</option>
        <option value="large">大</option>
        <option value="huge">巨大</option>
      </select>
      <select class="ql-header">
        <option value="1">小</option>
        Note a missing, thus falsy value, is used to reset to default
        <option value="2">普通</option>
        <option value="3">大</option>
        <option value="4">巨大</option>
      </select>
      Add a bold button
      <button class="ql-bold"></button>
      Add subscript and superscript buttons
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
      <button class="ql-link" value="link"></button>

       <div id="toolbar-container">
    <span class="ql-formats">
      <select class="ql-font"></select>
      <select class="ql-size"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-formula"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
  </div>
  <div id="editor-container"></div>
    </div> -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: null,
      // content: '<p>example content</p>',
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          //  toolbar: '#toolbar'
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            // ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['link'], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      }
    }
  },
  methods: {
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    onEditorChange({ quill, html, text }) {
      this.$emit('change', html)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        this.content = val
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');
/deep/ .ql-size {
  display: none;
}
/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  line-height: initial;
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    min-height: 140px;
    max-height: 200px;
    border-radius: 0 0 @border-radius-base @border-radius-base;
    overflow: scroll;
  }
  /deep/ .ql-tooltip.ql-editing {
    left: -1px !important;
  }
  /deep/ .ql-snow .ql-tooltip[data-mode='link']::before {
    content: '输入连接' !important;
  }
  /deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    content: '保存' !important;
  }
}
</style>
