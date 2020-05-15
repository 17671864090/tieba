<template>
    <div>
      <div v-if="data.status">
        <div class="sweet-overlay" tabindex="-1" style="opacity: 1.16; display: block;"></div>
        <div class="sweet-alert showSweetAlert visible" data-custom-class="" data-has-cancel-button="false" data-has-confirm-button="true" data-allow-outside-click="false" data-has-done-function="true" data-animation="pop" data-timer="null" style="display: block; margin-top: -176px;"><div class="sa-icon sa-error" style="display: none;">
      <span class="sa-x-mark">
        <span class="sa-line sa-left"></span>
        <span class="sa-line sa-right"></span>
      </span>
        </div><div class="sa-icon sa-warning" style="display: none;">
          <span class="sa-body"></span>
          <span class="sa-dot"></span>
        </div><div class="sa-icon sa-info" style="display: none;"></div><div class="sa-icon sa-success animate" style="display: block;">
          <span class="sa-line sa-tip animateSuccessTip"></span>
          <span class="sa-line sa-long animateSuccessLong"></span>

          <div class="sa-placeholder"></div>
          <div class="sa-fix"></div>
        </div><div class="sa-icon sa-custom" style="display: none;"></div><h2>支付成功</h2>
          <p style="display: block;">您已支付成功，点击OK关闭窗口！</p>
          <fieldset>
            <input type="text" tabindex="3" placeholder="">
            <div class="sa-input-error"></div>
          </fieldset><div class="sa-error-container">
            <div class="icon">!</div>
            <p>Not valid!</p>
          </div><div class="sa-button-container">
            <button class="cancel" tabindex="2" style="display: none;">Cancel</button>
            <div class="sa-confirm-button-container">
              <button class="confirm" tabindex="1" style="display: inline-block; background-color: rgb(140, 212, 245); box-shadow: rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset;" @click="OK">OK</button><div class="la-ball-fall">
              <div></div>
              <div></div>
              <div></div>
            </div>
            </div>
          </div></div>
      </div>
    </div>
</template>
<script>
  import { BuyPost } from '../api/apilist'
  import Qs from 'qs'
  export default {
    name: "pay",
    data(){
      return{
        fullscreenLoading: false,
        data:{
          status:false
        }
      }
    },
    created(){
      const loading = this.$loading({
        lock: true,
        text: '正在支付结果',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      BuyPost(this.$route.query).then((res=>{
        if(res.status ==0){
          loading.close();
          this.data.status= true
        }else{
          alert("支付失败")
        }
      }))
    },
    methods:{
      OK(){
        this.$router.push({path:"/user"})
      }
    }
  }
</script>

<style scoped>
  @import url("https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css");
</style>
