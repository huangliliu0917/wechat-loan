import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

const _import = require('./_import')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    alias: '/loan',
    name: 'Loan',
    component: _import('loan/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/publish',
    name: 'Publish',
    component: _import('loan/LoanPublish'),
    meta: {
      title: '我要借款'
    }
  },
  {
    path: '/publishList',
    name: 'PublishList',
    component: _import('loan/LoanPublishList'),
    meta: {
      title: '发布'
    }
  },
  {
    path: '/todo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Todo',
        component: _import('todo/index'),
        meta: {
          title: '待办事项'
        }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Personal',
        component: _import('personal/index'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: _import('register/index'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: _import('forget/index'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/receive',
    name: 'Receive',
    component: _import('receive/index'),
    meta: {
      title: '领取'
    }
  },
  {
    path: '/orderList',
    component: _import('order/index'),
    children: [
      {
        path: '',
        name: 'All',
        component: _import('order/OrderAll'),
        meta: {
          title: '我的借款'
        }
      },
      {
        path: 'pending',
        name: 'Pending',
        component: _import('order/OrderPending'),
        meta: {
          title: '待审核'
        }
      },
      {
        path: 'repayment',
        name: 'Repayment',
        component: _import('order/OrderRepayment'),
        meta: {
          title: '待还款'
        }
      },
      {
        path: 'overdue',
        name: 'Overdue',
        component: _import('order/OrderOverdue'),
        meta: {
          title: '已逾期'
        }
      },
      {
        path: 'complete',
        name: 'Complete',
        component: _import('order/OrderComplete'),
        meta: {
          title: '已完成'
        }
      }
    ]
  },
  {
    path: '/orderInfo/:orderId',
    name: 'OrderInfo',
    component: _import('order/OrderInfo'),
    meta: {
      title: '借款信息'
    }
  },
  {
    path: '/installment/:orderId',
    name: 'Installment',
    component: _import('installment/index'),
    meta: {
      title: '每月还款金额'
    }
  },
  {
    path: '/payment/:tradeType',
    name: 'Payment',
    component: _import('payment/index'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/payment/:tradeType/:orderId',
    name: 'PaymentWithId',
    component: _import('payment/index'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: _import('setting/index'),
    meta: {
      title: '系统设置'
    }
  },
  {
    path: '/download',
    name: 'Download',
    component: _import('download/index'),
    meta: {
      title: '软件下载'
    }
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: _import('authentication/index'),
    meta: {
      title: '信用报告'
    }
  },
  {
    path: '/treaty/:orderId',
    name: 'Treaty',
    component: _import('treaty/index'),
    meta: {
      title: '借款条约'
    }
  },
  {
    path: '/basicInfo',
    name: 'BasicInfo',
    component: _import('basicInfo/index'),
    meta: {
      title: '基本信息认证'
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: _import('contacts/index'),
    meta: {
      title: '联系人信息'
    }
  },
  {
    path: '/identity',
    name: 'Identity',
    component: _import('identity/index'),
    meta: {
      title: '身份证识别'
    }
  },
  {
    path: '/credit',
    component: _import('credit/index'),
    children: [
      {
        path: '',
        name: 'CreditInfo',
        component: _import('credit/info'),
        meta: {
          title: '认证信息'
        }
      },
      {
        path: 'report',
        name: 'CreditReport',
        component: _import('credit/report'),
        meta: {
          title: '信用信息'
        }
      }
    ]
  },
  {
    path: '/riskCall',
    name: 'RiskCall',
    component:  _import('record/RiskCall'),
    eta: {
      title: '风险通话记录'
    }
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component:  _import('record/EmergencyContact'),
    eta: {
      title: '紧急联系人通话'
    }
  },
  {
    path: '/consume',
    name: 'ConsumeBill',
    component:  _import('record/ConsumeBill'),
    eta: {
      title: '缴费记录'
    }
  },
  {
    path: '*',
    name: '404',
    component: _import('404'),
    meta: {
      title: '404'
    }
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
