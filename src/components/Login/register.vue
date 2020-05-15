<template>
  <div>
    <div style="width: 98vw;padding-top: 10px">
      <van-field v-model="access.name" required  label="昵称" placeholder=""/>
      <van-field v-model="access.tbk_user_Username" required label="用户名" placeholder=""/>
      <van-field v-model="access.tbk_user_Password" required type="password" label="密码" placeholder=""/>
      <van-button plain type="primary" @click="check" style="display: block;margin: 10px auto">注册</van-button>

    </div>
  </div>
</template>

<script>
  import {login, userinfo} from "../../api/apilist";
  import {Notify} from "vant";

  export default {
    name: "register",
    data(){
      return{
        access:{
          name:'',
          tbk_user_Username: '',
          tbk_user_Password: '',
          invitation: this.$route.query.id ? this.$route.query.id : '',
        },
      }
    },
    methods:{
      async check() {
        await login(this.access).then(result => {
          if (result.status === 1) {
            userinfo().then((res=>{
              this.userinfo = res.data
              this.info = res.info
              localStorage.setItem("userinfo",JSON.stringify(res.data));
            }))

            Notify({ type: 'success', message: '登录成功' });
            this.$store.commit('updateUserInfo', result.token);
            localStorage.setItem('UserInfoTokenn',result.token)
            this.$router.push({path:'/?id=1'})
            return result.token;
          }else {
            console.log('密码错误')
            Notify({ type: 'danger', message: '密码错误' });
          }
        })
          .catch(function (error) {
            console.log('验证失败',error);
          })

      },
    }
  }
</script>

<style scoped>

</style>
