import Mock from 'mockjs'

let Random = Mock.Random
Random.extend({
  code: 0,
  constellations: [
    { id: 1, value: '未认证' },
    { id: 2, value: '认证失败' },
    { id: 3, value: '已认证' },
    { id: 4, value: '过期' },
    { id: 5, value: '认证中' }
  ],
  constellation: function() {
    for (let i = 0; i < this.constellations.length; i++) {
      if (this.constellations[i].id === this.code) {
        return this.constellations[i].value
      }
    }
    return ''
  },
  randomCode: function() {
    let Min = 1
    let Max = 5
    let Range = Max - Min
    let Rand = Math.random()
    let code = Min + Math.round(Rand * Range)
    this.code = code
    return code
  }
})

const certificationAllData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    userId: '@id',
    uinfoFlg: Random.randomCode(),
    uinfoFlgMsg: Random.constellation(),
    contactFlg: Random.randomCode(),
    contactFlgMsg: Random.constellation(),
    zhimaFlg: Random.randomCode(),
    zhimaFlgMsg: Random.constellation(),
    carrierFlg: Random.randomCode(),
    carrierFlgMsg: Random.constellation(),
    idCardFlg: Random.randomCode(),
    idCardFlgMsg: Random.constellation()
  }
})

const userinfoeditData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})
const editcontactsData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {}
})
const authoperatorData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data:
    'https://open.shujumohe.com/box/yys?box_token=02B2654432184CE69E088C0BED366737&real_name=张三&identity_code=340222199803052620&user_mobile=15655503490'
})
const getSesameUrlData = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data:
    'https://open.shujumohe.com/box/yys?box_token=02B2654432184CE69E088C0BED366737&real_name=张三&identity_code=340222199803052620&user_mobile=15655503490'
})

const isPay = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: false
})

const certificationInfo = Mock.mock({
  resultCode: 2000,
  resultMsg: 'OK',
  data: {
    name: '张三',
    idNumber: '330104200012121111',
    mobile: '18898889788',
    marry: '未婚',
    realState: '无',
    unitName: '杭州火图科技',
    workTime: '20个月',
    annualIncome: '5000-10000元',
    unitAddress: '杭州市滨江区智慧E谷B幢4楼',
    homeAddress: '杭州市滨江区明月江南1幢',
    sesameScore: '700',
    education: '小学',
    device: '诺基亚 100',
    wechatAccount: '哈哈'
  }
})
export default {
  certificationAll: config => certificationAllData,
  userinfoedit: config => userinfoeditData,
  editcontacts: config => editcontactsData,
  authoperator: config => authoperatorData,
  getSesameUrl: config => getSesameUrlData,
  isPay: config => isPay,
  certificationInfo: config => certificationInfo
}
