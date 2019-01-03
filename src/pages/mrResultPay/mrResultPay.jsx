import React, {Component} from 'react';
import { openScroll } from '../../utils/mixin'
import API from '../../api/api'
import { wxShare } from '../../utils/lib'
import './mrResultPay.less'

export default class MrResultPay extends Component{
  constructor(props){
    super(props)
    this.state = {
      characterData: {}
    }
  }
  componentDidMount(){
    openScroll(this.viewNode)
    this.query = JSON.parse(sessionStorage.getItem('userInfo'));
    API.character(this.query).then((data)=>{
      this.setState({characterData:data})
    })
  }
  wxpayEvent(){
    let uid = sessionStorage.getItem('uid')
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    let params = [];
    params.push('uid='+ uid)
    Object.keys(userInfo).map((item)=>{
      params.push(item + '=' + userInfo[item])
    })
    window.location.href = `https://www.yixueqm.com/zhiming/index.php/Home-InterfaceMr-placeOrder?${params.join('&')}`
  }
  wxShareEvent(){
    API.wxShare({shareUrl:window.location.href.split('#/')[0]}).then((data)=>{
      wxShare(data,{
        share_title: '名人八字大数据库',
        share_description: '了解你八字背后的秘密，发现你不知道的自己，快来参与吧',
        thumb: 'https://hy.yixueqm.com/zhiming/Public/images/public/19.png'
      },'https://hy.yixueqm.com/zhiming/index.php/Home-InterfaceMr-indexMr',()=>{
        // 分享统计
        API.countShare({csName:'MR37',channel:sessionStorage.getItem('channel')}).then(()=>{})
      })
    })
  }
  render(){
    return(
      <div className="mrResultPay-container">
        <div className="mrResultPay-wrapper" ref={viewNode=>{this.viewNode = viewNode}}>
          <div className="mrResult-self">
            <div className="mrResult-seft-box">
              <p><span>{this.state.characterData.username}</span></p>
              <p>性格优点： <span>{this.state.characterData.youdian}</span></p>
              <p>性格缺点： <span>{this.state.characterData.quedian}</span></p>
            </div>
          </div>
          <div className="mrResultPay-content">
            <h2 className="item-title">{this.state.characterData.minggong}</h2>
            <div className="mrResultPay-wrap">
              <p>{this.state.characterData.text}</p>
              <div className="mrResultPay-opacity"><span className="lock" onClick={this.wxpayEvent}></span></div>
            </div>
            <p className="mrResultPay-point">解锁查看余下重要批示</p>
          </div>
        </div>
      </div>
    )
  }
}