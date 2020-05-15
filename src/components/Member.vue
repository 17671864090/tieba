<template>
  <div>
    <div style="padding: 20px;overflow: hidden;background-color: #fff;margin-bottom: 10px">
      <div style="float:left;">
        <p style="line-height: 40px;font-size: 14px;font-weight: 700">全球防疫物资论坛</p>
        <p style="color: #9c9c9c">创建于2020-2-1</p>
      </div>
      <img style="float: right" src="./mmexport1588912806444.png" height="60" width="60"/>
    </div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <p style="color: #159bff;font-size: 13px;font-weight: bold">9999+</p>
        <p style="padding-top: 5px;font-size: 14px">帖子数</p>
      </van-grid-item>
      <van-grid-item>
        <p style="color: #159bff;font-size: 13px;font-weight: bold">9999+</p>
        <p style="padding-top: 5px;font-size: 14px">论坛会员</p>
      </van-grid-item>
      <van-grid-item>
        <p style="color: #159bff;font-size: 13px;font-weight: bold">9999+</p>
        <p style="padding-top: 5px;font-size: 14px">访问量</p>
      </van-grid-item>
    </van-grid>
    <!--付费须知-->
    <div style="margin-top: 10px">
      <van-panel title="说明">
        <div style="padding: 20px 20px">
          <div v-html="value[0] ? value[0] : explain" style="line-height: 30px;color: mediumaquamarine"></div>
        </div>
      </van-panel>
      <div style="margin-top: 20px;position: fixed;bottom:20px;left: 15px;right: 10px">
        <el-cascader :options="options" v-model="value" size="small " style="float: left" placeholder="开通套餐" :show-all-levels="false"></el-cascader>
        <el-button type="primary" size="small " style="float: right" @click="pay">开通会员</el-button>
      </div>
    </div>
  </div>
</template>
<script>
    import { MemberBuy} from '../api/apilist'
    import { Notify } from 'vant';
    import { Dialog } from 'vant';
    export default {
        name: "Member",
      data() {
        return {
          value:{},
          explain:'请选择下方会员套餐',
          switch1: false,
          switch2: false,
          options:[
            {value: '<p>1.每天可免费发布10次帖子</p>\n'+'<p>2.板块置顶(每开通一月赠送一次板块置顶，每次为24小时)</p>', label: '黄金会员',
              children: [
                {value: 1, label: '9.9/一个月'},
                {value:2, label: '15.9/3月',},
                {value: 3, label: '25.9/半年',}]
            },
            {value: '<p>1.每天无限发帖</p>\n'+'<p>2.板块置顶(每开通一月赠送一次板块置顶，每次为24小时)</p>', label: '白金会员',
              children: [{value:4, label: '19.9一个月'},{value: 5, label: '38.8一个月'},{value:6, label: '49.9半年'}]},
            {value: '<p>1.每天无限发帖,直接赠送10次全站置顶</p>\n'+'<p>2.获得一次首页广告位24小时展示</p>', label: '钻石会员',
              children: [{value: 7, label: '99.9永久使用',}]},
          ],
          data:[]
        };
      },
      components: {
        [Dialog.Component.name]: Dialog.Component,
      },
      methods:{
        pay(){
          if(this.value[1]){
            MemberBuy(this.value).then((res=>{
              Dialog.confirm({
                title: '付费须知',
                message: `付款后请不要关闭页面，等待系统自动跳转`,
              })
                .then(() => {
                  window.location.href=res.payurl;
                })
                .catch(() => {

                });
            }))
          }else{
            Notify({ type: 'danger', message: '请选择套餐' });
          }
        }
      }
    }
</script>
<style scoped>

</style>
