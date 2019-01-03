import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import html2canvas from 'html2canvas'
import MrResultNo from './children/mrResultNo/mrResultNo'
import MrResultYes from './children/mrResultYes/mrResultYes'
import API from '../../api/api'
import Loading from '../../components/loading/loading'
import SharePonit from '../../components/sharePonit/sharePonit'
import { wxShare } from '../../utils/lib'
import './mrResult.less'

export default class MrHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      erweima: require('../../assets/img/tc_ewm.png'),
      loadEnd: false,
      isCanvasHtml: false,
      popupShow: false,
      userData: {
        bazi: [],
        ziwei: {}
      },
      zwData: null,
      bzData: null,
      loadShow: true,
      isShare: false,
    }
    this.openPopup = this.openPopup.bind(this);
  }

  componentWillMount(){
    this.query = JSON.parse(sessionStorage.getItem('userInfo'));
    API.matchMrData(this.query).then((data)=>{
      if(data.userData){
        this.setState({userData:data.userData})
      }
      if(data.bzData != null || data.zwData != null){
        this.setState({
          isCanvasHtml: true,
          zwData: data.zwData,
          bzData: data.bzData
        })
        if(this.state.isCanvasHtml){
          setTimeout(()=>{
            this.canvasHtml();
          },300)
        }
      }else{
        this.setState({loadShow:false})
      }
      console.log(data)
    })
  }
  componentDidMount(){
    console.log('componentDidMount');
    this.wxShareEvent()
  }
  canvasHtml(){
    html2canvas(this.canvasNode,{
      useCORS: true,
      logging: false
    }).then((canvas)=>{
      let imageBase64 = canvas.toDataURL("image/png");
      document.querySelector('#resultImg').src= imageBase64;
      this.canvasNode.style.display = 'none';
      this.setState({loadShow:false})
    })
  }
  wxShareEvent(){
    API.wxShare({shareUrl:window.location.href.split('#/')[0]}).then((data)=>{
      wxShare(data,{
        share_title: '名人八字大数据库',
        share_description: '了解你八字背后的秘密，发现你不知道的自己，快来参与吧',
        thumb: 'https://hy.yixueqm.com/zhiming/Public/images/public/19.png'
      },'https://hy.yixueqm.com/zhiming/index.php/Home-InterfaceMr-indexMr',()=>{
        this.props.history.push({pathname:'/mrResultPay'})
      })
    })
  }
  openPopup(){
    this.setState({popupShow: !this.state.popupShow})
  }
  shareShow(){
   this.setState({isShare: !this.state.isShare})
  }
  render(){
    return (
      <div className="mrResult-container">
        {
          this.state.isCanvasHtml
          ? <MrResultYes openPopup={this.openPopup} userData={this.state.userData} zwData={this.state.zwData} bzData={this.state.bzData}/>
          : <MrResultNo userData={this.state.userData}/>
        }
        {/* 分享结果 */}
        <div className="mrResult-wrapper-share" ref={canvasNode => this.canvasNode = canvasNode}>
          <div className="mrResult-self">
            <div className="mrResult-seft-box">
              <p>用户姓名： <span>{this.state.userData.username}</span></p>
              <p>你的生辰八字为： <span>{this.state.userData.bazi.join(' ')}</span></p>
              <p>你的紫微命宫为： <span>{Object.keys(this.state.userData.ziwei).map((item)=>{ return this.state.userData.ziwei[item]+ ' '})}</span></p>
            </div>
          </div>
          <div className="mrResult-match">
            <ul className="match-list">
              {
                this.state.bzData && (
                  <li className="match-item">
                    <div className="match-item-box">
                      <h2 className="item-title">与你八字匹配度最高的名人</h2>
                      <div className="item-info">
                        <div className="item-info-aviat"><img src={this.state.bzData.imgUrl} alt=""/></div>
                        <div className="item-info-list">
                          <p><span>{this.state.bzData.name}</span></p>
                          {/* <p>生日：<span>{}</span></p> */}
                          <p>八字：<span>{this.state.bzData.bazi}</span></p>
                        </div>
                      </div>
                      <p className="match-info-txt">{this.state.bzData.textStr}</p>
                    </div>
                  </li>
                )
              }
              {
                this.state.zwData && (
                  <li className="match-item">
                    <div className="match-item-box">
                      <h2 className="item-title">与你紫微命宫匹配度最高的名人</h2>
                      <div className="item-info">
                        <div className="item-info-aviat"><img src={this.state.zwData.imgUrl} alt=""/></div>
                        <div className="item-info-list">
                          <p><span>{this.state.zwData.name}</span></p>
                          {/* <p>生日：<span>{}</span></p> */}
                          <p>紫微命宫：<span>{this.state.zwData.ziwei}</span></p>
                        </div>
                      </div>
                      <p className="match-info-txt">{this.state.zwData.textStr}</p>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          <div className="share-info-wrap">
            <div className="share-info">  
              <div className="share-info-list">
                <p>扫描右侧二维码</p>
                <p>查看你和哪位历史名人的命运相似</p>
                <p>同时可下载知命App，了解更多国学相关</p>
              </div>
              <div className="share-info-erweima"><img src={this.state.erweima} alt=""/></div>
            </div>
            <p className="share-info-small">(数据来源于知命App)</p>
          </div>
        </div>
        {/* 分享弹窗 */}
        <CSSTransition
        classNames="opacityShow"
        in={this.state.popupShow}
        timeout={300}
        >
          <div className={`result-popup ${this.state.popupShow?'Show':'Hide'}`}>
            <div className="result-popup-wrap">
              <span className="result-popup-close" onClick={this.openPopup}></span>
              <img id="resultImg"/>
              <div className="result-popup-share-wrap">
                <div className="share-box">
                  <span className="share-txt">分享到：</span>
                  <span className="share-item share-wx" onClick={this.shareShow.bind(this)}></span>
                  <span className="share-item share-wxpyq" onClick={this.shareShow.bind(this)}></span>
                </div>
                <p className="share-small">(长按保存图片)</p>
              </div>
            </div>
          </div>
        </CSSTransition>
        <Loading loadShow={this.state.loadShow}/>
        <SharePonit isShare={this.state.isShare} tip="分享到微信好友或者朋友圈" shareShow={this.shareShow.bind(this)}/>
      </div>
    )
  }
}
