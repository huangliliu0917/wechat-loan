<template>
  <div class="loan-wrap">
    <scroll ref="scroll"
      :data="orders"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp"
    >
    <div class="loan-list">
      <div class="list-item">
        <template v-for="order in orders">
          <div class="loan-card" :key="order.id">
            <div class="loan-card_hd loan-publish_hd clearfix">
              <span class="loan-hd_title">我的发布</span>
              <span class="loan-hd_user" @click="del(order)" v-if="order.cancelable">取消</span>
              <span class="loan-hd_user" v-else>{{order.statusMsg}}</span>
            </div>
            <div class="loan-card_bd vux-1px-b">
              <div class="loan-bd_img">
                <img :src="order.headimg ? order.headimg : 'http://resali.huobanplus.com/cdn/avatar.png'"  alt="">
              </div>
              <div class="loan-bd_content">
                <p>借款金额：<span>{{order.money}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;借款时长：<span>{{order.interval}}天</span></p>
                <p>借款用途：<span>{{order.purpose}}</span></p>
              </div>
            </div>
            <div class="loan-card_ft loan-publish_ft">
              <div class="loan-ft_content">
                <span>发布时间：<span>{{order.createTime}}</span></span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
     <empty :empty="isEmpty"></empty>
  </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/scroll/scroll'
import Empty from '@/components/empty'
import { getToken, getUserId, getUserInfo } from '../../utils/auth'

export default {
  name: 'PublishList',
  components: {
    Scroll,
    Empty
  },
  created() {
    getToken()
    getUserId()
    getUserInfo()

    if (!getToken()) {
      // console.log(14)
      window.location.href = 'http://zhengxinapplogin'
      return
    }
  },
  data() {
    return {
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      orders: [],
      requestData: {
        pageIndex: 1,
        pageSize: 10,
        source: 2
      },
      isEmpty: true,
      more: true
    }
  },
  mounted() {
    this.getOrderList()
  },
  watch: {
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    }
  },
  computed: {
    pullUpLoadObj() {
      return {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
      }
    }
  },
  methods: {
    onPullingUp() {
      if (this.more) {
        this.getOrderList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    getOrderList() {
      this.$store.dispatch('getBorrowList', this.requestData).then(newOrder => {
        this.orders = this.orders.concat(newOrder)
        if (newOrder.length > 0) this.isEmpty = false
        if (this.requestData.pageIndex === 1) this.requestData.pageIndex++
        if (newOrder.length < this.requestData.pageSize) {
          this.more = false
        } else {
          this.requestData.pageIndex++
        }
      })
    },
    del(order) {
      const vm = this
      this.$vux.confirm.show({
        title: '取消借条',
        content: '你确定要取消该借条？',
        onConfirm() {
          vm.cancelOrder(order)
        }
      })
    },
    cancelOrder(order) {
      this.$store.commit('UPDATE_LOADING', { isLoading: true, text: '取消中' })
      this.$store.dispatch('cancelBorrow', order.id).then(() => {
        this.$store.commit('UPDATE_LOADING', { isLoading: false })
        this.$vux.toast.text('取消成功')
        this.changeOrder(order)
      })
    },
    changeOrder(order) {
      order.statusCode = 2
      order.statusMsg = '已取消'
      order.cancelable = false
      this.orders.splice(this.orders.indexOf(order), 1, order)
    }
  }
}
</script>
<style lang="less">
.loan-wrap {
  background: #fbf9fe;
  height: 100vh;
  .list-wrapper {
    background: #fbf9fe;
  }
}
.loan-list {
  padding: 10px 5px;
  background: #fbf9fe;
}
</style>
