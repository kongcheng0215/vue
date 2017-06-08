// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resourse from 'vue-resource'
import store from 'store'
import 'assets/css/bootstrap.css'
import 'assets/js/bootstrap.min'

import "assets/fonts/iconfont.css"

Vue.config.productionTip = false;
Vue.use(resourse);



//图片上传
import VueImgInputer from 'vue-img-inputer'
Vue.component('VueImgInputer', VueImgInputer)


Vue.http.interceptors.push((request, next)  =>{
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN=sessionStorage.getItem("token");
  if(TOKEN){
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('token',TOKEN);
  }
  next((response) => {
    return response;
  });
});

//token过期判断

Vue.http.interceptors.push((request, next) => {
  //console.log(this)//此处this为请求所在页面的Vue实例

  //request.method = 'POST';//在请求之前可以进行一些预处理和配置

  // continue to next interceptor
  next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法

    if(response.body.code==201){
      // console.log(response.body.code);
      window.location.href=APIOUT;
      sessionStorage.clear();
    }
    return response;
  });
});

//表单检验
import VeeValidate, { Validator } from 'vee-validate';

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 200,
  messages: null,
  strict: true
};

Vue.use(VeeValidate,config);

Validator.extend('mobile', {
  messages: {
    cn:field => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('pwd', {
  messages: {
    cn:field => field + '密码必须大于等于6位',
  },
  validate: value => {
    return value.length >= 6;
  }
});

Validator.extend('deviceNo', {
  messages: {
    cn:field => field + '设备编号必须大于等于4位',
  },
  validate: value => {
    return value.length >= 4;
  }
});

import addressPicker from 'vue-address-picker'

Vue.use(addressPicker);

global.APIOUT = "http://localhost:8081";

//
global.API ="";


//未登录只能路由到登录页
/*router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('token')&& to.path !== '/') {
    next({
      path: '/',
    })
  } else {
    console.log(from.fullPath.split("/")[1]);
     console.log(to.fullPath.split("/")[1]);

    //登陆后限制路由不能导航到不同账户的页面
     if(to.fullPath.split("/")[1]!=from.fullPath.split("/")[1] && from.fullPath.split("/")[1] && to.path !== '/'){
      next({
        path:from.fullPath
      })
       console.log(111);
     }else{
       next();
     }
  }
});*/

var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    eventHub: new Vue()
  }
})
