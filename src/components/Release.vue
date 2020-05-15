<template>
    <div style="height: 100vh;">
      <van-nav-bar
        title="发帖"
        left-text=""
        right-text="发表"
        left-arrow
        @click-right="Release"
      />
      <van-field style="margin-top: 10px"
        v-model="data.content"
        rows="2"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="请输入你的广告关键词"
        show-word-limit
      />
      <div style="padding: 10px">
        <el-upload style="padding-bottom: 10px"
          action="https://upload-z2.qiniup.com"
          list-type="picture"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :data="qiniuForm"
          :on-success="OnSuccess"
        >
          <van-grid :column-num="4">
            <van-grid-item  icon="photo-o" text="图片" />
          </van-grid>
        </el-upload>
        <el-upload style="padding-bottom: 10px"
          action="https://upload-z2.qiniup.com"
          list-type="picture"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :data="qiniuForm"
          :on-success="OnSuccessmp4"
        >
          <van-grid :column-num="4">
            <van-grid-item  icon="photo-o" text="视频" />
          </van-grid>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <van-field style="float:left;"
          v-model="data.phone"
          center
          clearable
          label="电话+86"
          placeholder="咨询电话"
        >
        </van-field>
        <!--      置顶范围-->
        <div style="margin-top: 60px;">
          <van-dropdown-menu active-color="#ee0a24" style="margin-top: 10px" direction="up">
            <van-dropdown-item v-model="data.checked" :options="option1" />
            <van-dropdown-item v-model="data.checked2" :options="option2" />
          </van-dropdown-menu>
        </div>
      </div>
      <div style="text-align: center;margin:10px 0" v-if="data.checked2 == 0">
          <el-button @click="aa">点击开通会员送指定次数</el-button>
      </div>
      <van-radio-group v-model="data.paytype" style="margin-top:20px" v-show="data.checked2 !== 0">
        <van-cell-group>
          <van-cell title="使用一次置顶资格" clickable @click="data.vippaytype = 'vippaytype'">
            <template #right-icon>
              <van-radio name="vippaytype" />
            </template>
          </van-cell>
          <van-cell title="微信暂时关闭" clickable @click="data.paytype = 'wxpay'" style="color: #8c939d">
            <template #right-icon>
              <van-radio name="wxpay" disabled/>
            </template>
          </van-cell>
          <van-cell title="支付宝" clickable @click="data.paytype = 'alipay'" >
            <template #right-icon>
              <van-radio name="alipay" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div style="text-align: center;margin-top: 10px" v-if="data.paytype == `vippaytype` ? false : (data.checked2 == 1  )">
        <el-radio-group v-model="data.radio3" size="small">
          <el-radio-button label="1">20元/天</el-radio-button>
          <el-radio-button label="2" >40元/3天</el-radio-button>
          <el-radio-button label="3">90元/7天</el-radio-button>
          <el-radio-button label="4">280元/31天</el-radio-button>
        </el-radio-group>
      </div>
      <div style="text-align: center;margin-top: 10px" v-if="data.paytype == `vippaytype` ? false : (data.checked2 == 2  )">
        <el-radio-group v-model="data.radio3" size="small">
          <el-radio-button label="1">40元/天</el-radio-button>
          <el-radio-button label="2" >100元/3天</el-radio-button>
          <el-radio-button label="3">18元/7天</el-radio-button>
          <el-radio-button label="4">480元/31天</el-radio-button>
        </el-radio-group>
      </div>
        <van-notice-bar wrapable :scrollable="false">
          <p>1.本论坛发帖,置顶提供服务为虚拟服务</p>
          <p>2.如帖子内容发布涉违法犯罪，管理员有权对该帖子做删除处理</p>
          <p>3.商务合作联系微信:xzq13797180201</p>
        </van-notice-bar>
      <van-popup v-model="show" round position="bottom" :style="{ height: '45%' }">
        <div style="text-align: center">
          <p style="font-size: 14px;padding-top:20px">支付明细</p>
          <p style="font-size: 18px;color: red;padding: 10px 0">{{Paymentdetails.money}}元</p>
          <p style="font-size: 12px;">{{Paymentdetails.msg}}</p>
        </div>
        <van-grid :border="false" :column-num="1">
          <van-grid-item>
            <van-button style="margin-top: 10px" type="primary" size="small" @click="pay('wxpay')">立即支付</van-button>
          </van-grid-item>
        </van-grid>
      </van-popup>
    </div>
</template>
<script>
  import uuid from 'uuid'
  import { Notify } from 'vant';

  import { Release , Topics } from '../api/apilist'
  export default {
    name: "Release",
    data() {
        return {
          data:{
            content: '',   //发布内容
            imgname:[],  //发布图片
            mp4:[],
            phone:JSON.parse( localStorage.getItem("userinfo")).phone,
            checked:1,  //发布范围
            checked2 :0,
            radio3:'',
            paytype:'',
            headportrait:JSON.parse(localStorage.getItem("userinfo"))[0].headportrait,
            name:JSON.parse( localStorage.getItem("userinfo")).name,
            platename:'',
          },
          Paymentdetails:'',
          result: [],
          show: false,
          option1: [
            { text: '全部', value: 1 },
            { text: '求购信息', value: 2 },
          ],
          option2: [
            { text: '普通发布', value: 0 },
            { text: '板块置顶', value: 1 },
            { text: '全站置顶', value: 2 },
          ],
          qiniuForm:{
            key:"",
            token:""
          },
          payurl:'',
          dialogImageUrl: '',
          dialogVisible: false,
          message:'',
          radio: '1',
          radio1: '上海',
          fileList: [
            {
              url: 'https://img.yzcdn.cn/vant/leaf.jpg',
              status: 'uploading',
              message: '上传中...',
            },
            {
              url: 'https://img.yzcdn.cn/vant/tree.jpg',
              status: 'failed',
              message: '上传失败',
            },
          ],
        };
      },
    methods: {
      async Release(){
          if(this.data.content && this.data.phone){
            switch (this.data.checked2) {
              case 0 :
                this.data.platename = '全部'
                    break
              case 1 :
                this.data.platename = '求购信息'
            }
            Release(this.data).then((res=>{
              if(res.e.status == 0){
                Notify({ type: 'success', message: '下单成功,请付费' });
                this.show = true;
                this.Paymentdetails = res.e
                this.payurl = res.result
              } if(res.e.status == 2){
                Notify({ type: 'success', message: '发布成功' });
                this.$router.push('/?id=1')

              }
              if(res.e.status == 1){
                Notify({ type: 'danger', message: res.e.mas });
              }
            }))
          }else{
            Notify({ type: 'danger', message: '请输入内容/电话' });
          }
        },
      aa(){
          this.$router.push('/member')
        },
      showPopup() {
          this.show = true;
        },
      handleRemove(file, fileList) {
          console.log(file, fileList);
        },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
      A(e){
          console.log(e)
        },
      async beforeUpload(file) {
          let res = await this.axios.get('http://60.205.178.222:7001/api/admin/v1/img')
          let filename=file;
          console.log(filename.name)
          let index1=file.name.lastIndexOf(".");
          let index2=filename.name.length;
          let fileType=filename.name.substring(index1 +1,index2);
          console.log(fileType)
          this.qiniuForm = {
            key: `${file.uid}.${fileType}`, //文件名称
            token: res.data.data.token  // 根据自己接口打印的值来赋值
          }
          return true;
        },
      async OnSuccess(response){
          this.data.imgname.push(response.key)
        },
      async OnSuccessmp4(response){
          this.data.mp4.push(response.key)
        },
      async pay(pay){
          window.location.href=this.Paymentdetails.result;
        }
      },
    }
</script>
<style scoped>
  @import url("//at.alicdn.com/t/font_1808774_ck60kky6jod.css");
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
