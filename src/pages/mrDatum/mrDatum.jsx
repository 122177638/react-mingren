import React, {Component} from 'react';
import API from '../../api/api'
import { wxShare } from '../../utils/lib'
import Acalendar from '../../assets/js/YD_calendar.js'
import Toast from '../../components/toast'
import './mrDatum.less'

export default class MrDatum extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      gender: 1,
      birthday: '',
    }

    this.getUserName = this.getUserName.bind(this);
    this.getGender = this.getGender.bind(this);
    this.formSumit = this.formSumit.bind(this);
  }

  componentDidMount(){
    this.pluginInit(); // 初始化插件
    this.wxShareEvent();
    console.log('componentDidMount');
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
  pluginInit(){
    new Acalendar(this.dateNode,($1,$2)=>{this.setState({birthday: $2})})
  }
  getUserName(event){
    this.setState({userName: event.target.value})
  }
  WeixinBug(){
    window.scrollTo({top:0,left:0,behavior:"smooth"})
  }
  getGender(event){
    this.setState({gender: Number(event.target.value)})
  }
  formSumit(){
    if(!/^[\u4e00-\u9fa5]+$/.test(this.state.userName)){
      Toast.info('请输入中文姓名')
      return false;
    }
    if(!this.state.birthday){
      Toast.info('请选择出生日期')
      return false;
    }
    let param = {
      username: this.state.userName,
      birthday: this.state.birthday,
      gender: this.state.gender
    }
    if(sessionStorage){
      sessionStorage.setItem('userInfo',JSON.stringify(param))
    }else{
      alert('浏览器不支持sessionStorage')
    }
    this.props.history.push({pathname:'/mrResult'})
  }
  
  render(){
    return(
      <div className="datum-container">
        <div className="datum-wrapper">
          <div className="datum-top">
            <p className="datum-top-text">人的生辰八字蕴含了很多的秘密，而八字相同的人，命中的福禄丰厚多寡、大概运气顺逆，都是有相同发展规律的。知命八字大数据库收录<span>518400</span>条精准的八字批注，将近<span>十万条</span>八字命主的人生轨迹，气运福泽，包括古今中外的名人伟人。写下你的姓名生辰，在知命八字数据库中<span>为你匹配八字相同相似的名人</span>，看他们对你有多少的帮助？</p>
          </div>
          <div className="datum-form">
            <ul className="form-list">
              <li className="form-item">
                <div className="form-nickName">您的姓名</div>
                <div className="form-input">
                  <input type="text" value={this.state.userName} onChange={this.getUserName} onBlur={this.WeixinBug} placeholder="请输入姓名"/>
                </div>
              </li>
              <li className="form-item">
                <div className="form-nickName">您的姓别</div>
                <div className="form-radio">
                  <label htmlFor="man" className="radio-item">
                    <span className={`sel-icon ${this.state.gender === 1?'on':''}`}></span>
                    <span className="gender-name">男</span>
                    <input type="radio"  id="man" name="gender" onChange={this.getGender} value="1"/>  
                  </label>
                  <label htmlFor="woman" className="radio-item">
                    <span className={`sel-icon ${this.state.gender === 0?'on':''}`}></span>
                    <span className="gender-name">女</span>
                    <input type="radio" id="woman" name="gender" onChange={this.getGender} value="0"/>
                  </label>
                </div>
              </li>
              <li className="form-item">
                <div className="form-nickName">出生日期</div>
                <div className="form-plugin">
                  <div className="pluginDom" ref={dateNode => this.dateNode = dateNode}>请选择出生日期</div>
                </div>
              </li>
            </ul>
            <div className="form-submit-box"><div className="form-submit" onClick={this.formSumit}></div></div>
            <p className="form-footnote">目前已有<span>{sessionStorage.getItem('csNumber')}</span>人查询</p>
          </div>
        </div>
      </div>
    )
  }
}