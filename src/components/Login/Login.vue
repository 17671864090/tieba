<template lang="html">
  <div class="login">
    <div class="login-header">
      <i @click="showLogin" class="icon-back"></i>登录
    </div>
    <van-cell-group>
      <van-field
        v-model="accesstoken.tbk_user_Username"
        required
        label="用户名"
        placeholder="没有注册的自动注册"
      />
      <van-field
        v-model="accesstoken.tbk_user_Password"
        required
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-button plain type="primary" @click="check">登录/注册</van-button>
  </div>
</template>
<script>
  import { Notify } from 'vant';
  import { login } from '../../api/apilist'
export default {
  name: 'login',
  data() {
    return {
      accesstoken:{
        tbk_user_Username: '',
        tbk_user_Password: '',
      }
    }
  },
  methods: {
    showLogin() {
      this.$store.commit('showLogin', false);
      this.$store.commit('showMsg', false);
    },
    async check() {

      await login(this.accesstoken).then(result => {
          if (result.status === 1) {
            Notify({ type: 'success', message: '登录成功' });

            this.$store.commit('updateUserInfo', result.token);
            localStorage.setItem('UserInfoTokenn',result.token)

            // this.$router.push({path:'/'})
            return result.token;
          }else {
            console.log('密码错误')
            Notify({ type: 'danger', message: '密码错误' });
          }
        })
        .catch(function (error) {
          console.log('验证失败',error);
        })
    }
  },

  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  mounted() {
    this.inputVal = this.ak;
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;

    .login-header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 60px;
      background-color: #2196f3;
      color: white;
      font-size: 1.4rem;

      i.icon-back {
        position: absolute;
        left: 10px;
        display: inline-block;
        width: 38px;
        height: 38px;
        background: url('../../common/icons/icon-back.svg') no-repeat;
        background-size: contain;
      }
    }

    .input {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      flex: 1;
      width: 100%;
      // background-color: rgba(0, 0, 0, .1);

      input {
        outline: none;
        border: none;
        height: 40px;
        width: 320px;
        // border-radius: 5px;
        border-bottom: 1px solid gray;
        font-size: 1.3rem;
        padding: 0;
      }
      input:focus {
        border-bottom: 1px solid #2962FF;
      }

      button {
        margin-top: 50px;
        font-size: 1.3rem;
        background-color: #2196f3;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        letter-spacing: 3px;
        outline: none;
      }
    }
    .tips {
      flex: 2;
      color: gray;
      // box-shadow: 0 0 10px gray;
      // border: 1px solid gray;
      li {
        // list-style: none;
      }
    }
  }
</style>
