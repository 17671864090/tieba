<template>
  <div id="app">




    <VContent></VContent>

<!--    <transition name="show">-->
<!--      <Login v-if="isShowLogin"></Login>-->
<!--    </transition>-->

<!--    <transition name="show">-->
<!--      <Info v-if="isShowInfo"></Info>-->
<!--    </transition>-->



    <transition name="show">
      <Msg v-if="isShowMsg"></Msg>
    </transition>

    <transition name="show">
      <NewArticle v-if="isShowNewArticle"></NewArticle>
    </transition>

    <transition name="show">
      <About v-if="isShowAbout"></About>
    </transition>

    <!--导航栏-->
    <div v-if="!$route.meta.keepAlive">
        <div style="height: 50px">
          <van-tabbar route>
            <van-tabbar-item replace to="/?id=1" icon="home-o">
              首页
            </van-tabbar-item>
            <van-tabbar-item replace to="/release" icon="home-o" >
              发布
            </van-tabbar-item>
            <van-tabbar-item replace to="user" icon="search">
              我的
            </van-tabbar-item>
          </van-tabbar>
        </div>
      </div>
  </div>
</template>
<script>
import VHeader from './components/Header/Header.vue';
import VContent from './components/Content/Content.vue';
import AsideMenu from './components/AsideMenu/AsideMenu.vue';
import Info from './components/Info/Info.vue';
import Msg from './components/Msg/Msg.vue';
import NewArticle from './components/NewArticle/NewArticle.vue';
import About from './components/About/About.vue';
import { Toast } from 'vant';
export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    AsideMenu,
    Info,
    Msg,
    NewArticle,
    About
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    isShowLogin() {
      return this.$store.state.isShowLogin;
    },
    isShowInfo() {
      return this.$store.state.isShowInfo;
    },
    isShowMsg() {
      return this.$store.state.isShowMsg;
    },
    isShowNewArticle() {
      return this.$store.state.isShowNewArticle;
    },
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  },
  beforeCreate() {
    console.log("%c Powered by Zhaohui - microzz.com","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;");
  },
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

.show-enter-active {
  transition: all .3s ease;
}
.show-leave-active {
  transition: all .2s ease-in;
}
.show-enter, .show-leave-active {
  transform: translateX(200px);
  opacity: 0;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>
