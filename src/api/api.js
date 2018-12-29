import Server from './server';

class API extends Server{
  /**
   * 用途：匹配名人数据
   * @method post  
   */
  async matchMrData(params = {}){
    try{
      let result = await this.axios('post', '/Home-InterfaceMr-matching', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '匹配名人数据失败',
          response: result,
          data: params,
          url: '/Home-InterfaceMr-matching',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 用途：微信分享
   * @method post  
   */
  async wxShare(params = {}){
    try{
      let result = await this.axios('post', '/Home-InterfaceMr-shareData', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取微信信息失败',
          response: result,
          data: params,
          url: '/Home-InterfaceMr-shareData',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 用途：性格缺点
   * @method post 
   */
  async character(params = {}){
    try{
      let result = await this.axios('post', '/Home-InterfaceMr-characterZW', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取性格数据失败',
          response: result,
          data: params,
          url: '/Home-InterfaceMr-characterZW',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 用途: 结果页数据
   * @method post 
   */
  async testResult(params = {}){
    try{
      let result = await this.axios('post', '/Home-InterfaceMr-jieguoye', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取性格数据失败',
          response: result,
          data: params,
          url: '/Home-InterfaceMr-jieguoye',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();