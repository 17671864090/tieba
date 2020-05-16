<template lang="html">
  <div>
    <van-cell is-link @click="showPopup">{{logintext}}</van-cell>
    <van-cell is-link @click="showdd" v-show="userinfo.tbk_user_Username">生成邀请二维码</van-cell>
    <van-popup v-model="invitationid">
      <div class="card_img">
        <img :src="qrContentImage">
        <p style="
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
" class="scan">长按识别二维码</p>
      </div>
    </van-popup>
    <div ref="QrcodePage"  style="position: absolute;z-index: -100">
      <qrcode class="qr_code" :value='`http://tieba.yrun.top/register?id=${userinfo.tbk_user_Username}`'  :options="{ size: 200 }"></qrcode>
    </div>
    <!--    登录-->
    <van-popup v-model="show">
      <div style="width: 98vw;padding-top: 10px">
        <van-field v-model="accesstoken.tbk_user_Username" required label="用户名" placeholder="没有注册的自动注册"/>
        <van-field v-model="accesstoken.tbk_user_Password" required type="password" label="密码" placeholder="请输入密码"/>
        <van-button plain type="primary" @click="check" style="display: block;margin: 10px auto">登录</van-button>
        <van-button plain type="primary" @click="checkres" style="display: block;margin: 10px auto">注册</van-button>
      </div>
    </van-popup>
    <!--    头部-->
    <div class="user" style="padding: 25px 10px 10px 20px;background-color: #3D8FFF;height: 100px">
      <img :src="`http://q9ysqdee8.bkt.clouddn.com/` + userinfo.headportrait" style="float: left;width:50px;height: 50px;border-radius: 50px">
      <div style="float: left;line-height: 50px;margin-left: 20px;color: white;font-size: 16px">
        <p>{{userinfo.tbk_user_Username}}</p>
      </div>
    </div>
    <!--    我的帖子-->
    <div style="height: 100px;background-color: #f0f7ff">
      <van-tabs >
        <van-tab title="帖子">
          <div >
            <div class="avatar" style="background-color: white;margin: 10px 0;padding: 5px 10px" v-for="item in info" :key="item.index" v-if="item.status != 1">
                <div class="right" style="padding-top: 8px">
                  <div class="listType" style="color: #159bff;padding-right: 10px;font-size: 14px;line-height: 30px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.content}}</div>
                  <div class="c888 f12 little-infor" style="font-size: 0.32rem; color: rgb(153, 153, 153);line-height: 40px">
                    <van-button v-if="item.checked2 != 0" style="margin-right: 10px" size="mini" type="danger" >{{item.checked2 == 0 ? '普通发布' : (item.checked2 == 1 ? '置顶' : '全站置顶') }}</van-button>

                    <span>浏览量{{item.visit_count}}</span>
                    <span style="color: red;margin-left: 20px;float: right" v-if="item.checked2 != 0 && item.status !=1">到期时间{{item.Toptime}}</span>
                    <span style="color: red;margin-left: 20px;float: right" v-if="item.status == 1">未支付</span>

                    <div style="float:right;">
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <van-empty description="请登录" v-if=a></van-empty>
        </van-tab>
        <van-tab title="信息"><div style="margin-top: 20px">
          <van-panel title="剩余发帖次数" :desc="userinfo.PostingNumber + `条`" ></van-panel>
          <van-panel title="会员到期时间" :desc="userinfo.privilegename" :status="userinfo.Daymember" ></van-panel>
          <van-panel title="板块置顶次数" :desc="userinfo.Topping + `条`"   style="color: red"></van-panel>
          <van-panel title="全站置顶次数" :desc="userinfo.AllTopping + `条`"   style="color: red"></van-panel>
          <van-form>
            <van-field
              v-model="userinfo.name"
              name="用户名字"
              label="用户名字"
              placeholder="用户名字"
            />
            <van-field
              v-model="userinfo.tbk_user_Password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="userinfo.phone"
              name="密码"
              label="发帖电话"
              placeholder="电话"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="background-color: #ffffff;padding: 10px 0">
              <p style="float: left;line-height: 88px;padding-left: 16px;padding-right: 40px">用户图像</p>
              <el-upload style="padding-bottom: 10px"
                         action="https://upload-z2.qiniup.com"
                         list-type="picture"
                         :before-upload="beforeUpload"
                         :on-success="OnSuccess"
                         :data="qiniuForm"
              >
                <van-grid :column-num="4">
                  <van-grid-item  icon="photo-o" text="图片" />
                </van-grid>
              </el-upload>
            </div>
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit" @click="Userinformation">
                修改
              </van-button>
            </div>
          </van-form>
        </div></van-tab>
        <van-tab title="下级">
          <div>
            <div class="avatar" style="background-color: white;margin: 10px 0;padding: 0 10px" v-for="item in subordinate" :key="item.index" v-if="item.status != 1">
              <div class="right" style="padding-top: 8px">
                <div class="listType" style="color: #159bff;padding-right: 10px;font-size: 14px;line-height: 30px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.tbk_user_Username}}</div>
                <div class="c888 f12 little-infor" style="font-size: 12px; color: rgb(153, 153, 153);line-height: 40px">

                  <span>邀请时间{{item.Registrationdate}}</span>

                  <span style="color: red;margin-left: 20px;float: right" v-if="item.checked2 != 0 && item.status !=1">充值金额{{item.Rechargequota}}</span>
                  <div style="float:right;">
                  </div>
                </div>
            </div>
          </div>
          </div>
        </van-tab>
        <van-tab title="钱包">
          <div>
            <van-notice-bar text="邀请好友,成为下级,可以获取充值金额的百分之20" left-icon="volume-o" />
            <van-field v-model="Withdrawal.name" type="text" label="支付宝账号" />
            <van-field v-model="Withdrawal.account" type="text" label="姓名" />
            <van-field
              v-model="userinfo.money + '元'"
              center
              clearable
              label="钱包余额">
              <template #button>
                <van-button size="small" type="primary" @click="withdrawalmoney">申请提现</van-button>
              </template>
            </van-field>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas';
  import QRcode from '@xkeshi/vue-qrcode'
  import LoginView from '../Login/Login'
  import { login , userinfo , Userinformation , Withdrawalmoney} from '../../api/apilist'
  import { Notify } from 'vant';
  import { Toast } from 'vant';
  export default {
  name: 'user',
  components:{
    LoginView,
    qrcode : QRcode
  },
  data() {
    return {
      collectTopics: [],
      user: {},
      isShowContent: false,
      invitationid:false,
      username: '',
      password: '',
      logintext:localStorage.getItem("UserInfoTokenn") ? "退出登录" : "登录",
      accesstoken:{
        tbk_user_Username: '',
        tbk_user_Password: '',
      },
      userinfo:{
        DayShare:0,
        PostingNumber:0,
        Daymember:'',
        Topping:0,
        tbk_user_Username:'',
        AllTopping:0,
        privilegename:'',
        name:'',
        tbk_user_Password:'',
        headportrait:''
      },
      info:'',
      subordinate:'',
      a:localStorage.getItem("UserInfoTokenn") ? false : true,
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
      ],
      qiniuForm:{
        key:"",
        token:""
      },
      list: [
        {
          id: '1',
          name: '张三',
          tel: '17671864090',
          address: 'kd53746237@aliyun.com',
          isDefault: true,
        },
      ],
      chosenAddressId: '1',
      Withdrawal:{
        name:'阚东',
        account:'53746237@aliyun.com'
      },
      qrContentImage:'',
      Qrcodeinvitationidshow:false,
      show:false
    }
  },
  created() {
    this.$store.commit('showAsideMenu', false);
    if(localStorage.getItem("UserInfoTokenn")){
      userinfo().then((res=>{
        this.userinfo = res.data[0]
        this.info = res.info
        this.subordinate = res.subordinate
        localStorage.setItem("userinfo",JSON.stringify(res.data));
      }))
    }

  },
    methods: {
    showdd(){
      this.invitationid = true;
      this.Qrcodeinvitationidshow = true;
      this.invitationidshowPopup()
    },
    invitationidshowPopup() {

      const that = this
      const shareContent = this.$refs.QrcodePage //需要截图的包裹的（原生的）DOM 对象
      const width = shareContent.clientWidth //shareContent.offsetWidth; //获取dom 宽度
      const height = shareContent.clientHeight //shareContent.offsetHeight; //获取dom 高度
      const canvas = document.createElement("canvas") //创建一个canvas节点
      const scale = 1; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.style.width = (shareContent.clientWidth * scale) / 100 + "rem";
      canvas.style.height = (shareContent.clientHeight * scale) / 100 + "rem";
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true
      };


      /**
       * 解决html2Canvas在IOS13.4中失效问题
       */
      (window.html2canvas || html2canvas)(shareContent, opts)
        .then(canvas => {
          that.qrContentImage = canvas.toDataURL("image/jpeg", 1.0);
        })
        .catch(err => {
          alert(err)
        });

      // html2canvas(shareContent, opts).then(function(canvas) {
      //   that.qrContentImage = canvas.toDataURL("image/jpeg", 1.0);
      // }).catch(function (reason) {
      //
      // });




    },
    createImg() {
      const that = this
      const shareContent = this.$refs.QrcodePage //需要截图的包裹的（原生的）DOM 对象
      const width = shareContent.clientWidth //shareContent.offsetWidth; //获取dom 宽度
      const height = shareContent.clientHeight //shareContent.offsetHeight; //获取dom 高度
      const canvas = document.createElement("canvas") //创建一个canvas节点
      const scale = 1; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.style.width = (shareContent.clientWidth * scale) / 100 + "rem";
      canvas.style.height = (shareContent.clientHeight * scale) / 100 + "rem";
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      let opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true
      };
      html2canvas(shareContent, opts).then(function(canvas) {
        that.qrContentImage = canvas.toDataURL("image/jpeg", 1.0);
      }).catch(function (reason) {
        alert(reason)
      });
    },

    checkres(){
      this.$router.push({path:"/register"})
    },

    showInfo() {
      this.$store.commit('showInfo', false);
    },
    view() {
      this.$store.commit('showInfo', false);
      this.$store.commit('showAsideMenu', false);
    },
    showPopup() {
      if(localStorage.getItem("UserInfoTokenn")){
        localStorage.removeItem("UserInfoTokenn")
        localStorage.removeItem("userinfo")
        this.$router.go(0)
      }else{
        this.show = true;
      }
    },
    invitation(){
      console.log('http://localhost:8089/register?id=17671864090')
    },
    async check() {
      await login(this.accesstoken).then(result => {
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
    async Userinformation(){
      Userinformation(this.userinfo).then((res=>{
        alert("修改成功")
        this.$router.go(0)

      }))
    },
    async beforeUpload(file) {
      let res = await this.axios.get('http://127.0.0.1:7001/api/admin/v1/img')
      let filename=file;
      let index1=file.name.lastIndexOf(".");
      let index2=filename.name.length;
      let fileType=filename.name.substring(index1 +1,index2);
      this.qiniuForm = {
        key: `${file.uid}.${fileType}`, //文件名称
        token: res.data.data.token  // 根据自己接口打印的值来赋值
      }
      return true;
    },
    async OnSuccess(response){
      this.userinfo.headportrait = response.key
    },
    async withdrawalmoney(){
      if(!this.Withdrawal.name || !this.Withdrawal.account){
        Toast('请输入提现账户');
      }
      if(this.userinfo.money < 5){
        Toast('提现金额不得少于5元');
      }else{
        Withdrawalmoney(this.Withdrawal).then((res=>{
          Toast('提现成功');
        }))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .user {
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(160px);
      opacity: 0;
    }
      .info {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        .info-header {
          width: 100%;
          height: 50px;
          background-color: #2196f3;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
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

        .info-content {
          width: 100%;
          height: 100%;
          flex: 1;
          overflow: auto;
          text-align: center;
          padding-top: 10px;
          padding-bottom: 30px;
          .info-register {
            margin-bottom: 20px;

            .info-img {
              img {
                width: 90px;
                height: 90px;
                border-radius: 45px;
              }

            }

            .info-name {
              font-size: 1.5rem;
              font-weight: bold;
            }
          }

          .info-collect {
            width: 93%;
            margin: auto;
            padding-top: 10px;
            padding-bottom: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 4px;
            .collect-title {
              width: 100%;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
            }
            .collect-item {
              display: flex;
              padding: 5px 5px 0 5px;
              align-items: center;

              img {
                width: 37px;
                height: 37px;
                margin-right: 5px;
                border-radius: 4px;
                vertical-align: text-bottom;
              }
            }
            .collect-item + .collect-item {
              border-top: 1px solid rgba(0, 0, 0, .07);
            }
          }

          @media screen and (min-width: 760px) {
            .info-collect {
              width: 60%;

              .collect-item {
                padding: 10px 25px;
                img {
                  margin-right: 15px;
                }
              }
            }
          }

          .info-collect + .info-collect {
            margin-top: 20px;
          }
        }
      }
      .back {
        position: fixed;
        z-index: 1;
        top: 60%;
        left: -8px;
        width: 50px;
        height: 50px;

        i.icon-back {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: url('../../common/icons/icon-back-blue.svg') no-repeat;
          background-size: contain;
          opacity: .5;
          cursor: pointer;
        }
      }
  }
</style>
