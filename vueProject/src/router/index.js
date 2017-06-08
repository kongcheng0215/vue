
import Vue from 'vue'
import Router from 'vue-router'
import checkPlate from 'checkInst/checkPlate';

//普通用户
import deviceOptionAll from 'checkInst/deviceMange/deviceOption/deviceOptionAll';
import deviceOption from 'checkInst/deviceMange/deviceOption/deviceOption';
import qcApplyAll from 'checkInst/qcMange/qcApplyAll/qcApplyAll';
import qcOption from 'checkInst/qcMange/qcOption';
import qcApplySure from 'checkInst/qcMange/qcApplyAll/qcApplySure';

import userOptionAll from 'checkInst/userMange/userOptionAll/userOptionAll';
import userOption from 'checkInst/userMange/userOptionAll/userOption';
import updatePwd from 'checkInst/setting/updatePwd';
import personInfo from 'checkInst/setting/personInfo';


/*****************后台********************/
import adminUpdatePassword from 'admin/setting/updatePwd';
import adminMange from "admin/userman";

/********************公司用户*****************/

import unitDeviceOptionAll from 'userFirms/deviceMange/deviceOption/deviceOptionAll';
import unitDeviceOption from 'userFirms/deviceMange/deviceOption/deviceOption';
import unitDeviceRegist from 'userFirms/deviceMange/deviceOption/deviceRegist';



import unitQcApplyAll from 'userFirms/qcMange/qcApplyAll/qcApplyAll';
import unitQcApplySure from 'userFirms/qcMange/qcApplyAll/qcApplySure';


import unitUpdatePwd from 'userFirms/setting/updatePwd';
import unitPersonInfo from 'userFirms/setting/personInfo';





Vue.use(Router)

export default new Router({
  routes: [
    /******************************普通户***************************/
    {
      path: '/',
      name: 'checkPlate',
      component: checkPlate
    },
    {
      path:'/check/option',
      component:deviceOptionAll,
      children:[
        {
          path:'/',
          name:'checkDeviceMange',
          component:deviceOption
        }
      ]
    },
    {
      path:'/check/qcApply',
      component:qcApplyAll,
      children:[
      
        {
          path:"/check/qcApply/sure",
          name:'checkQcApplySure',
          component:qcApplySure
        }
      ]
    },
    {
      path:'/check/qcOption',
      name:'checkQcOption',
      component:qcOption
    },
    {
      path:'/check/userOption',
      component:userOptionAll,
      children:[
        {
          path:'/',
          name:'checkUserOption',
          component:userOption
        }
      ]
    },
  
    {
      path:'/check/updatePwd',
      name:'checkUpdatePwd',
      component:updatePwd
    },
    {
      path:'/check/personInfo',
      name:'checkPersonInfo',
      component:personInfo
    },
    
    
    /*************************后台管理端***********************/
    
    {
      path:"/admin/modefinePwd",
      name:"adminUpdatePassword",
      component:adminUpdatePassword
    },
    {
      path:"/admin/mange",
      name:"adminMange",
      component:adminMange
    },
    /*************************公司用户***********************/
    {
      path:'/unit/option',
      component:unitDeviceOptionAll,
      children:[
        {
          path:'/',
          name:'unitDeviceInfo',
          component:unitDeviceOption
        },
        {
          path:'/unit/option/regist',
          name:'unitDeviceRegist',
          component:unitDeviceRegist
        }
      ]
    },
    {
      path:'/unit/qcApply',
      component:unitQcApplyAll,
      children:[
        {
          path:"/unit/qcApply/sure",
          name:'unitQcApplySure',
          component:unitQcApplySure
        }
      ]
    },
    //系统设置（修改密码）
    {
      path:"/unit/modefinePwd",
      name:"unitUpdatePwd",
      component:unitUpdatePwd
    },
    {
      path:'/unit/personInfo',
      name:'unitPersonInfo',
      component:unitPersonInfo
    }
  ]
})
