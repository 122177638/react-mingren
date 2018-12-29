import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { openScroll, parseQueryString } from '../../utils/mixin'
import API from '../../api/api'
import { wxShare } from '../../utils/lib'
import './mrHome.less'

export default class MrHome extends Component {
  // componentDidCatch(){ console.log('componentDidCatch')}
  // componentDidUpdate(){ console.log('componentDidUpdate')}
  // componentWillMount(){console.log('componentWillMount');}
  // componentWillReceiveProps(){console.log('componentWillReceiveProps')}
  // componentWillUnmount(){console.log('componentWillUnmount')}
  // componentWillUpdate(){console.log('componentWillUpdate')}
  componentWillMount(){
    let prames = parseQueryString(window.location.href);
    if(prames && prames.uid){
      if(sessionStorage) {
        sessionStorage.setItem('uid',prames.uid)
      }else{
        alert('浏览器不支持localStorage')
      }
    }
    if(prames &&　prames.csNumber){
      sessionStorage.setItem('csNumber',prames.csNumber)
    }
  }
  componentDidMount(){
    openScroll(this.viewNode)
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
  
      })
    })
  }
  render(){
    return (
      <div className="container" ref={viewNode => this.viewNode = viewNode}>
        <div className="wrapper">
          <h2 className="title"><span className="title_bg"></span></h2>
          <div className="content">
            <div className="rotate-box">
              <div className="mrBg"></div>
              <div className="bgBg"></div>
            </div>
          </div>
          <div className="footer"><Link to="/mrDatum" className="startBtn"></Link></div>
        </div>
      </div>
    )
  }
  
}
