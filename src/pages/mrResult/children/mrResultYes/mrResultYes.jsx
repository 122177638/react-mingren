import React, { Component } from 'react';
import { openScroll } from '../../../../utils/mixin'
import './mrResultYes.less'

export default class MrResultYes extends Component { 
  constructor(props){
    super(props)
    this.state = {
      popupShow: false
    }
  }
  componentDidMount(){
    // console.log(this.props.zwData,this.props.bzData,this.props.userData)
    openScroll(this.viewNode)
  }
  render(){
    return(
      <div className="mrResult-wrapper" ref={viewNode => this.viewNode = viewNode}>
        <div className="mrResult-self">
          <div className="mrResult-seft-box">
            <p>用户姓名： <span>{this.props.userData.username}</span></p>
            <p>你的生辰八字为： <span>{this.props.userData.bazi.join(' ')}</span></p>
            <p>你的紫微命宫为： <span>{Object.keys(this.props.userData.ziwei).map((item)=>{ return this.props.userData.ziwei[item] + ' ';})}</span></p>
          </div>
        </div>
        <div className="mrResult-match">
          <ul className="match-list">
            {
              this.props.bzData && (
                <li className="match-item">
                  <div className="match-item-box">
                    <h2 className="item-title">与你八字匹配度最高的名人</h2>
                    <div className="item-info">
                      <div className="item-info-aviat"><img src={this.props.bzData.imgUrl} alt=""/></div>
                      <div className="item-info-list">
                        <p><span>{this.props.bzData.name}</span></p>
                        {/* <p>生日：<span>{}</span></p> */}
                        <p>八字：<span>{this.props.bzData.bazi}</span></p>
                      </div>
                    </div>
                    <p className="match-info-txt">{this.props.bzData.text}</p>
                  </div>
                </li>
              )
            }
            {
              this.props.zwData && (
                <li className="match-item">
                  <div className="match-item-box">
                    <h2 className="item-title">与你紫微命宫匹配度最高的名人</h2>
                    <div className="item-info">
                      <div className="item-info-aviat"><img src={this.props.zwData.imgUrl} alt=""/></div>
                      <div className="item-info-list">
                        <p><span>{this.props.zwData.name}</span></p>
                        {/* <p>生日：<span>{}</span></p> */}
                        <p>紫微命宫：<span>{this.props.zwData.ziwei}</span></p>
                      </div>
                    </div>
                    <p className="match-info-txt">{this.props.zwData.text}</p>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
        <div className="share-match-info" onClick={this.props.openPopup}></div>
      </div>
    )
  }
}