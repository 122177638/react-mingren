import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './mrResultNo.less'

export default class MrResultNo extends Component{
  constructor(props){
    super(props)
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  goHome(){
    this.context.router.history.push('/')
  }
  render(){
    return(
      <div className="mrResultNo-wrapper">
        <div className="mrResultNo-top">
          <div className="mrResultNo-top-box">
            <h3>尊敬的<span>{this.props.userData.username}先生</span></h3>
            <p>非常抱歉，目前系统内无法匹配到和您的八字或者紫微命盘相似的历史名人，我们会继续录入更多名人伟人的八字精准批注，相信下次一定可以寻找到和您八字相匹配的名人伟人！</p>
            <p>您可以稍等几天后再来测试，或者输入亲朋好友的生辰八字，筛选八字相同的历史名人！</p>
            <p>感谢您对知命的支持！</p>
            <span className="box-sign"></span>
          </div>
        </div>
        <div className="mrResultNo-back" onClick={this.goHome.bind(this)}></div>
        <div className="mrResultNo-bottom">
          <img src={require('../../../../assets/img/tc_ewm.png')} alt=""/>
          <p>长按二维码添加客服微信</p>
          <p>在线服务时间：周一至周五 9: 00-18: 00</p>
        </div>
      </div>
    )
  }
}