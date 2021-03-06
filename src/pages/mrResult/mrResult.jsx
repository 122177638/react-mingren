import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import html2canvas from 'html2canvas'
import MrResultNo from './children/mrResultNo/mrResultNo'
import MrResultYes from './children/mrResultYes/mrResultYes'
import API from '../../api/api'
import Loading from '../../components/loading/loading'
import SharePonit from '../../components/sharePonit/sharePonit'
import { wxShare, isWeixin } from '../../utils/lib'
import { uuid } from '../../utils/mixin'
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
    this.sid = sessionStorage.getItem('sid')?sessionStorage.getItem('sid') : sessionStorage.setItem('sid',uuid(16,16,'IMG'))
  }
  canvasHtml(){
    html2canvas(this.canvasNode,{
      useCORS: true,
      logging: false
    }).then((canvas)=>{
      let imageBase64 = canvas.toDataURL("image/png");
      document.querySelector('#resultImg').src= imageBase64;
      this.canvasNode.style.display = 'none';
      // 上传分享图片
      let filePrames = {
        imgBase64: imageBase64,
        sid: this.query.birthday
      }
      API.fileImg(filePrames).then((data)=>{
        if(data){
          this.shareImg = data;
          this.wxShareEvent(data)
        }else{
          alert('上传分享图失败')
        }
        this.setState({loadShow:false})
      })
    })
  }
  wxShareEvent(img){
    API.wxShare({shareUrl:window.location.href.split('#/')[0]}).then((data)=>{
      wxShare(data,{
        share_title: '名人八字大数据库',
        share_description: '了解你八字背后的秘密，发现你不知道的自己，快来参与吧',
        thumb: img
      },'https://hy.yixueqm.com/zhiming/index.php/Home-InterfaceMr-indexMr',()=>{
        this.shareSucceed();
      })
    })
  }
  openPopup(){
    this.setState({popupShow: !this.state.popupShow})
  }
  shareShow(shareType){
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let shareParams = {
      title: '名人八字大数据库',
      content: '了解你八字背后的秘密，发现你不知道的自己，快来参与吧',
      imgurl: this.shareImg,
      sharetype: shareType,
      shareMode: 9,
      qid: this.sid
    }
    if(isWeixin()){
      this.setState({isShare: !this.state.isShare})
    }else if(isAndroid){
      android.share(JSON.stringify(shareParams)) // eslint-disable-line
      setTimeout(()=>{
        this.shareSucceed();
      },1000)
    }else if(isiOS){
      window.webkit.messageHandlers.share.postMessage(JSON.stringify(shareParams));// eslint-disable-line
      setTimeout(()=>{
        this.shareSucceed();
      },1000)
    }
  }
  pollingShare(){
    this.timer = setInterval(()=>{
      API.nativeIsshare({sid: this.sid}).then((data)=>{
        if(data.code == 1){
          clearInterval(this.timer);
          this.timer = null;
          this.shareSucceed();
        }
      })
    },500)
  }
  shareSucceed(){
    // 分享统计
    API.countShare({csName:'MR37',channel:sessionStorage.getItem('channel')}).then(()=>{})
    this.props.history.push({pathname:'/mrResultPay'})
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
                  <span className="share-item share-wx" onClick={this.shareShow.bind(this,'1')}></span>
                  <span className="share-item share-wxpyq" onClick={this.shareShow.bind(this,'2')}></span>
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
