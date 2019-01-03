import React,{ Component } from 'react';
import { openScroll, parseQueryString } from '../../utils/mixin'
import API from '../../api/api'
import { wxShare } from '../../utils/lib'
import './mrResultEnd.less'

export default class MrResultEnd extends Component{
  constructor(props){
    super(props)
    this.state = {
      resultData : {
        wuge: {
          bihua: [],
          trdwz: [],
          hudongGX: [],
        },
        wuxing: {
          canggan: [],
          bzdishi: [],
          sizhu: [],
          sizhuny: [],
          sizhuny: [],
          zhishen: [],
          nianzhuss: [],
          dayun: [],
          dayungz:[],
          wxsqs:'',
          xiys: ''
        },
        xingge: {},
        yc2019: {
          yunshi: '',
          monthArr: {}
        }
      }
    }
  }
  componentDidMount(){
    openScroll(this.viewNode)
    this.wxShareEvent();
    let params = parseQueryString(window.location.href);
    if(params && params.orderid){
      API.testResult({orderid:params.orderid}).then((data)=>{
        this.setState({
          resultData: data
        })
      })
    }else{
      alert('没有该订单')
      this.props.history.push('/');
    }
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
    const resultData = this.state.resultData;
    const Amouth = ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    console.log(resultData)
    return(
      <div className="MrResultEnd-container">
        <div className="MrResultEnd-wrapper" ref={viewNode => this.viewNode = viewNode}>
          <div className="mrResult-self">
            <div className="mrResult-seft-box">
              <p><span>{resultData.wuxing.nickname}</span></p>
              <p>性格优点： <span>{resultData.xingge.youdian}</span></p>
              <p>性格缺点： <span>{resultData.xingge.quedian}</span></p>
            </div>
          </div>
          <div className="MrResultEnd-content">
            <h2 className="item-title">{resultData.xingge.minggong}</h2>
            <div className="MrResultEnd-wrap">
              <p>{resultData.xingge.text}</p>
              {/* <div className="MrResultEnd-opacity"><span className="lock"></span></div> */}
            </div>
            {/* <p className="MrResultEnd-point">解锁查看余下重要批示</p> */}
          </div>
          <div className="MrResultEnd-content">
            <h2 className="item-title">您的八字五行分析</h2>
            <div className="MrResultEnd-wrap wuxing">
              <div className="base_info">
                <p><span>命主姓名：</span>{resultData.wuxing.nickname}</p>
                <p><span>命主性别：</span>{resultData.wuxing.sex == '1'? '男':'女'}</p>
                <p><span>出生公历：</span>{resultData.wuxing.yangli}}</p>
                <p><span>出生农历：</span>{resultData.wuxing.yinli}</p>
                <p><span>命主生肖：</span>属{resultData.wuxing.shengxiao}<span style={{"color":"#eaeaea"}}>&nbsp;&nbsp;[生肖以农历立春节气为准]</span></p>
              </div>
              <ul className="detail_info">
                <li>
                    <span className="info_head info_heads info_ts">&nbsp;</span>
                    <span className="info_head info_heads">年柱</span>
                    <span className="info_head info_heads">月柱</span>
                    <span className="info_head info_heads">日柱</span>
                    <span className="info_head info_heads">时柱</span>
                </li>
                <li>
                    <span className="info_head">十神</span>
                    {
                      resultData.wuxing.nianzhuss.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
                <li>
                    <span className="info_head">八字</span>
                    {
                      resultData.wuxing.sizhu.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
                <li>
                    <span className="info_head">藏干</span>
                    {
                      resultData.wuxing.canggan.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
                <li>
                    <span className="info_head ts-list m_ts_list">支神</span>
                    {
                      resultData.wuxing.zhishen.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
                <li>
                    <span className="info_head">纳音</span>
                    {
                      resultData.wuxing.sizhuny.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
                <li>
                    <span className="info_head">地势</span>
                    {
                      resultData.wuxing.bzdishi.map((item,index)=>{
                        return (<span key={index}>{item}</span>)
                      })
                    }
                </li>
              </ul>
              <div className="main_info">
                <ul>
                  <li>
                      <div className="m_w_bai"><span>旺相休囚死: </span>{resultData.wuxing.wxsqs}</div>
                  </li>
                  <li>
                      <div className="ts m_w_80"><span>喜用神：</span>{resultData.wuxing.xiys}</div>
                  </li>
                  <li>
                      <div className="clear"><span>胎元：</span>{resultData.wuxing.taiyuan}</div>
                      <div className="tss"><span>日空：</span>{resultData.wuxing.rikong}</div>
                  </li>
                  {/* <li>
                      <div className="ts_a"><span>起大运：</span>出生后我年我月起大运</div>
                  </li> */}
                </ul>
                <dl>
                  <dt>大运</dt>
                  <dd>
                      <div className="num">
                        {resultData.wuxing.dayun.map((item,index)=>{
                          return(<span key={index}>{item}</span>)
                        })}
                      </div>
                      <div className="word">
                        {resultData.wuxing.dayungz.map((item,index)=>{
                          return(<span key={index}>{item.slice(0,1)}<br/>{item.slice(1)}</span>)
                        })}
                      </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="MrResultEnd-content">
            <h2 className="item-title">您的姓名五格命盘及互动关系</h2>
            <div className="MrResultEnd-wrap wuge">
              <p>姓名：<span className="sizeColor">{resultData.wuge.nickname}</span></p>
              <p>繁体：<span className="sizeColor">{resultData.wuge.fnickname}</span></p>
              <p>笔画：<span className="sizeColor">{resultData.wuge.bihua.reduce((total,curr)=>{return Number(total) + Number(curr);},0)}</span></p>
              {
                resultData.wuge.trdwz.map((item,index)=>{
                  return(
                    <p key={index}>
                    {item.titme} => <span className="sizeColor">{item.number}({item.wx})</span> => <span className="sizeColor">{item.xj}</span>
                    </p>
                  )
                })
              }
              {
                resultData.wuge.hudongGX.map((item,index)=>{
                  return(
                    <div key={index} className="hudong">
                      <p>{item.title}: [<span className="sizeColor">{item.number}分</span>]</p>
                      <p>{item.text}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="MrResultEnd-content">
            <h2 className="item-title">2019年重要运势看榜</h2>
            <div className="MrResultEnd-wrap">
              <p>{resultData.yc2019.yunshi}</p>
            </div>
          </div>
          <div className="MrResultEnd-content">
            <h2 className="item-title">2019年月份运势</h2>
            <div className="MrResultEnd-wrap yunshi">
              {
                Object.keys(resultData.yc2019.monthArr).map((item)=>{
                  return(
                    <div key={item}>
                      <h4 className="mouth-title">{Amouth[item-1]}</h4>
                      <p className="mouth-txt">{resultData.yc2019.monthArr[item]}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}