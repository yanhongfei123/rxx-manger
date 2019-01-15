<template>
    <view class="content">
        <view class="hello">      
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
            </view>
        </view>

        <view @click="loginOut">退出登录</view>
        
    </view>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
      ...mapState(["token"])
  },
  methods:{
    loginOut(){
      this.$store.dispatch('LoginOut').then(() => {
            uni.redirectTo({
              url: '../login/login',
          });
      })
    }
  },
  onLoad() {
		console.log('token===' + this.token)
    if (!this.token) {
      this.Util.Toast.showModal("未登录", "登录后才能继续", res => {
        if (res.confirm) {
          uni.redirectTo({
            url: "../login/login" 
          });
        }
      });
    }
  }
};
</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 50px;
}

.ul {
  font-size: 30px;
  color: #8f8f94;
  margin-top: 50px;
}

.ul > view {
  line-height: 50px;
}
</style>
