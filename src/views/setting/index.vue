<template>
  <div class="loan-wrap">
    <div class="loan-body" style="margin-bottom: 60px;">
      <group class="loan-body_item">
        <cell title="关于我们" is-link link="/about"></cell>
        <cell title="常见问题" is-link link="/question"></cell>
        <cell title="平台协议" is-link link="/protocol"></cell>
        <cell title="头像" is-link>
          <label for="J_img" class="upload-label">
            <input id="J_img" type="file" name="img" accept="image/*" @change="upload">
          </label>
      </cell>
      </group>
    </div>
    <div class="loan-publish_btn" style="padding:20px;">
      <x-button @click.native="logout" class="btn-yellow">退出</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'
import { mapGetters } from 'vuex'
import lrz from 'lrz'
import uploader from '@/utils/uploader'
import { UPDATE_LOADING } from '@/store/mutation-type'

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      const vm = this
      this.$vux.confirm.show({
        title: '退出',
        content: '确定退出系统？',
        onConfirm() {
          vm.$store.dispatch('logout').then(() => {
            vm.$router.replace({ path: '/login' })
          })
        }
      })
    },
    upload(e) {
      if (!e.target.files[0]) return
      let vm = this
      vm.$store.commit(UPDATE_LOADING, { isLoading: true, text: '上传中' })
      lrz(e.target.files[0], { width: 1024 })
        .then(function(rst) {
          uploader(
            '/api/user/uploadImage',
            {
              imgStr: rst.base64,
              imgStrSize: rst.base64Len,
              type: 0,
              fileName: rst.origin.name
            },
            vm.success,
            vm.error
          )
        })
        .catch(function(err) {})
    },
    success(res) {
      this.$vux.toast.text('上传成功')
    },
    error(err) {
      this.$vux.toast.text('上传失败')
    }
  }
}
</script>
<style lang="less">
.upload-label {
  display: inline-block;
  text-align: left;
  input {
    visibility: hidden;
    height: 0;
    width: 0;
  }
}
</style>
