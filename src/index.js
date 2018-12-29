import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
// import FastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';
import './utils/setRem';
import './style/base.css';

// FastClick.attach(document.body);

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

const render = Component => {
  ReactDOM.render(
    //绑定redux、热加载
        <Component />,
    document.getElementById('root'),
  )
}

render(Route);

// Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./router/', () => {
//     render(Route);
//   })
// }

registerServiceWorker();
