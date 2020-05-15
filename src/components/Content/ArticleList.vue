<template lang="html">
  <div class="article-list">
    <div class="d-flex d-flex-center" style="display: flex;height: 70px;padding: 10px 15px;background-color: #ffffff">
      <div class="left" style="border:unset!important;width: 50px;height: 50px;">
        <img style="height: 100%;line-height: 50px;" src="http://i2.vzan.cc/image/png/2020/3/27/2147505683f03e4e144c50b05a5becb90b3166.png">
      </div>
      <div class="center" style="color: #666;margin-left: 20px;flex: 1;font-size: 14px;line-height: 25px">
        <p style="font-size:18px;font-weight: 700">防疫医疗物资论坛</p>
        <p>话题 98万 · 访问 652.9万</p>
      </div>
      <div class="right" style="cursor:pointer;line-height: 40px" onclick="location='/u/cl-983978'">
        <i class="manage"></i>管理员
      </div>
    </div>
    <!--广告轮播图-->
    <el-carousel :interval="2000" arrow="always" height="130px">
      <el-carousel-item v-for="item in 2" :key="item.index">
        <img style="width: 100%;height: 130px" src="http://i2cut.vzan.cc/image/png/2020/3/27/2331549d37f92d1c8145cface784e451be86b4.png!640x210">
      </el-carousel-item>
    </el-carousel>
    <!--公告-->
    <van-notice-bar text="新注册用户免费发帖，赠送12个月白金会员" color="red" left-icon="volume-o" />
    <van-notice-bar text="平台用户破2万人次，日浏览量超10万+！" left-icon="volume-o" />

    <van-notice-bar text="邀请好友注册,永久可享受充值百分之10返利" left-icon="volume-o" />

    <van-dropdown-menu style="margin: 10px;" >
      <van-dropdown-item v-model="PostBarName" :options="option1" @change="onConfirm"/>
    </van-dropdown-menu>
    <!--广告位-->
    <!--首页大图-->
    <div>
      <img style="width: 100%" src="http://i2cut.vzan.cc/image/jpg/2020/5/5/1056126dd0183851fc4711929518be88338606.jpg!600x150">
    </div>
    <div  style="height: 23px;font-size: 12px;line-height: 23px;cursor:pointer;font-weight: bold;background: linear-gradient(to right,#3D8FFF,#7CC3FF);
    text-align: center;
    color: #fff;">白色口罩/蓝色口罩三层，熔喷布，n95 厂家直销 ，联系a888lsw</div>
    <div  style="height: 23px;font-size: 12px;line-height: 23px;cursor:pointer;font-weight: bold;background: linear-gradient(to right,#3D8FFF,#7CC3FF);
    text-align: center;
    color: #fff;">3m 1860 期货  厂家直签 ，联系a888lsw</div>
    <div  style="height: 23px;font-size: 12px;line-height: 23px;cursor:pointer;font-weight: bold;background: linear-gradient(to right,#3D8FFF,#7CC3FF);
    text-align: center;
    color: #fff;">文字广告位招商，点击自助上传广告(20元/天)</div>
    <div  style="height: 23px;font-size: 12px;line-height: 23px;cursor:pointer;font-weight: bold;background: linear-gradient(to right,#3D8FFF,#7CC3FF);
    text-align: center;
    color: #fff;">广告位客服微信KKNZD520</div>
    <div name="slide-top" style="background-color: #f0f0f0">
        <div v-for="(item, index) of articleList" :key="index"  class="item" @click="article(item)"
             style="padding: 18px 10px 4.5px 10px;background-color: white;margin-bottom: 5px;position: relative">
          <div class="avatar">
            <img :src="'http://q9ysqdee8.bkt.clouddn.com/' + item.headportrait" alt="" style="display: inline-block;border-radius: 50%;float:left;" >
            <div style="padding-left: 12px;float: left;">
              <div class="post-head">
                <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 150px;float: left" class="name name">{{item.name}}</p>
                <i class="iconfont icon-top01" v-if="item.Topplacement != 0 ? true : false" style="color: red"></i>
                <i class="iconfont icon-tequan" v-if="item.Topplacement == 2 ? true : false" style="color: red;font-size: 16px"><em style="font-size: 12px">全站置顶</em></i>
              </div>
              <div class="right" style="position: absolute;top: 30px;line-height: 50px">
                <div class="c888 f12 little-infor" style="font-size: 12px; color: rgb(153, 153, 153);">
                  <span class="listType" style="color: #159bff;padding-right: 10px">{{item.platename}}</span>
                  <span class="date" style="padding-right: 10px">{{changeTime(item.createtime)}}</span>
                  <span>{{item.visit_count}}</span>
                </div>
              </div>
            </div>
            <span id = "sourceId::340" class = "cy_cmt_count" ></span>

            <a style="position: absolute;right: 20px;text-decoration:none; " :href="`tel:${item.phone}`"><i class="iconfont icon-dianhua4"></i></a>
          </div>
          <div class="title">
            <router-link style="color: black" :to="{name: 'article', params: {id: item.id}}">{{item.content}}</router-link>
          </div>
          <div style="padding: 10px 0;white-space: nowrap;
overflow-x: scroll;">
            <van-image v-for="item in JSON.parse(item.imgname)" :key="index" width="120px" height="120" style="margin-right: 10px;" :src="`http://q9ysqdee8.bkt.clouddn.com/` + item"/>
          </div>
          <div class="bbs-video" style="position: relative;
    width: 100%;
    height:200px;
    background: #000;margin-top: 0px"  v-for="itemmp4 in JSON.parse(item.mp4)" :key="index" >
            <video style="width: 100%;
    height: 100%;" :src="`http://q9ysqdee8.bkt.clouddn.com/` + itemmp4" poster="http://i3-1251575313.cos.ap-guangzhou.myqcloud.com/m3u8/20200506/627fae4f7bde45bcabfd4bd73b8eb969/1588764253_3677888752.100_0.jpg" webkit-playsinline="" playsinline="" preload="none" controls="controls"></video>
          </div>



          <span id="sourceId::332" class="cy_cmt_count"></span>

        </div>
    </div>
    <div class="more">
      <i v-show="isMore" class="icon-more"></i>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { Topics } from '../../api/apilist'
export default {
  name: 'articleList',
  data() {
    return {
      types: {
        ask: '问答',
        job: '招聘',
        share: '分享',
      },
      value1:0,
      option1: [
        { text: '全部', value: 1 },
        { text: '求购信息', value: 2 },
      ],
      list: 0,
      op:[1,1,1,1,1,1,1,1],
      loading: false,
      finished: false,
      PostBarName:this.$route.query.id ? Number(this.$route.query.id) : 0
    }
  },
  computed: {
    tab() {
      return this.$store.state.tab;
    },
    articleList() {
      return this.$store.state.articleList;
    },
    isMore() {
      return this.$store.state.isMore;
    }
  },
  methods: {
    onConfirm(){
      this.$router.push({path: '/', query: {id: this.PostBarName}})
      this.$router.go(0)
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      Topics({id:this.$route.query.id})
        .then(result => result.data)
        .then(articleList => this.$store.commit('changeTab', {articleList, isLoading: false}))
        // 加载状态结束
        this.loading = false;

    },
    article(item){
      this.$router.push(`/article/${item.id}?id=0`)
    }
  },
  created() {
    if(this.PostBarName){
      Topics(null,`?page=0&tab=${this.$route.query.id}`).then(result => result.data)
        .then(articleList => this.$store.commit('changeTab', {articleList, isLoading: false}))
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url("//at.alicdn.com/t/font_1808774_gg7gvmd31v4.css");
  .article-list {
    position: relative;
    z-index: 1;
    .item {
      width: 100%;
      // padding-top: 5px;
      // padding-left: 5px;
      padding-right: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .avatar {

        overflow: hidden;
        img {
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
      }

      .title {
        background-color: white;
        padding-top: 15px;
        padding-left: 5px;
        font-size: 13px;
        p {
          width: 98%;

        }
        .flag {
          background-color: #e5e5e5;
          padding: 2px 5px;
          font-size: 80%;
          color: #9c9c9c;
          border-radius: 5px;
          margin-right: 3px;
        }
        .special {
          background-color: #80bd01;
          color: white;
        }
        .view {
          position: relative;

          font-size: 70%;
          color: gray;
          padding-top: 10px;
          padding-left: 45px;
          span.viewed {
            color: #9e83cc;
          }
          span.date {
            position: absolute;
            right: 10px;
          }
        }

      }

      .title:hover {
        background-color: #F5F5F5;
      }

      @media screen and (min-width: 760px) {
        .title {
          padding-left: 3%;
          .flag {
            margin-right: 15px;
          }
          .view {
            padding-left: 55px;
          }
        }
      }
    }

    @media screen and (min-width: 760px) {
      .item {
        margin: auto;
        width: 70%;
      }
    }
    .more {
      text-align: center;
      .icon-more {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../common/icons/icon-loading.svg') no-repeat;
        background-size: contain;
        animation: loading .4s linear infinite;
      }
    }
  }

</style>
