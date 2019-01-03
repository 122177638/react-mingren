import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
// import asyncComponent from '@/utils/asyncComponent';

// const mrResult = asyncComponent(() => import("@/pages/mrResult/mrResult"));
import mrHome from "@/pages/mrHome/mrHome";
import mrDatum from "@/pages/mrDatum/mrDatum";
import mrResult from "@/pages/mrResult/mrResult";
import mrResultPay from "@/pages/mrResultPay/mrResultPay";
import mrResultEnd from "@/pages/mrResultEnd/mrResultEnd";

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={mrHome} />
          <Route path="/mrDatum" component={mrDatum} />
          <Route path="/mrResult" component={mrResult} />
          <Route path="/mrResultPay" component={mrResultPay} />
          <Route path="/mrResultEnd" component={mrResultEnd} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
