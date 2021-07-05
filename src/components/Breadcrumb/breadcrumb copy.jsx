import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { Breadcrumb } from 'ant-design-vue'
import './index.less'

export const AvatarListItemProps = {
  breadcrumbList: PropTypes.array.def([])
}

const Item = {
  name: 'Breadcrumb',
  props: AvatarListItemProps,
  render () {
    return <div class='breadcrumb'>
        <Breadcrumb>
            {
                this.breadcrumbList.map(e => {
                  return <a-breadcrumb-item id={e.id}>{e.name}</a-breadcrumb-item>
                })
            }
        </Breadcrumb>
        <div class="ant-page-header-heading">
            <span class='nav-title'>
              <span class='ant-page-header-heading-title'>{this.breadcrumbList[this.breadcrumbList.length - 1].name}</span>
              <a-icon onClick="edit" type="form" />
              <span>{this.$slots.default}</span>
            </span>
            {/* {this.$slots.goBack && <a-button type='primary' onClick={this.goBack} >{this.$slots.goBack}</a-button>} */}
            {this.$slots.goBack}
        </div>
    </div>
  }
}

export default Item
