import React, {Component} from 'react';
import './loading.less'

export default class Loading extends Component{
  render(){
    const loadShow = this.props.loadShow;
    return(
      <div className={`loadding ${loadShow?'Show':'Hide'}`}>
        <div className="spinner">
          <div className="spinner-container container1">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
          <div className="spinner-container container2">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
          <div className="spinner-container container3">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
          <div className="Tip">加载中...</div>
        </div>
      </div>
    )
  }
}