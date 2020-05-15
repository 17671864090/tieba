<template lang="html">
  <div class="article-detail">
    <div v-show="!isLoading" class="body">
      <div class="article-title">
        <i class="iconfont icon-top01" v-if="infos.Topplacement != 0 ? true : false" style="color: red"></i>
        <i class="iconfont icon-tequan" v-if="infos.Topplacement == 2 ? true : false" style="color: red;font-size: 16px"><em style="font-size: 12px">全站置顶</em></i>
        <div class="desc">
           <p> 发布于<span style="margin-right: 20px"> {{changeTime(infos.createtime)}}</span> 作者:{{infos.name}}<span style="color: #9c9c9c;margin-left: 20px">{{infos.visit_count}} </span>次浏览</p>
        </div>
      </div>
      <div class="md" style="padding: 20px;font-size: 16px">{{infos.content}}</div>
      <van-image style="width: 100%" v-for="item in JSON.parse(infos.imgname)" :key="item" :src="`http://q9ysqdee8.bkt.clouddn.com/` + item"/>
      <comment :postId="infos.id"></comment>
    </div>
    <div class="back">
      <i @click.stop.prevent="$router.go(-1)" class="icon-back"></i>
    </div>
  </div>
</template>
<script>
  import { TopicsItem } from '../../api/apilist'
  import comment  from '../public/comment'
  export default {
  name: 'articleDetail',
  data() {
    return {
      id: this.$route.params.id,
      infos: {},
      types: { share: '分享', ask: '问答', job: '招聘'},
      oImgs: [],
      isCollected: false,
      replyContent: '',
      replyOneContent: '',
      isReplyOne: false,
      isUps: false,
      flag: true,
      up: 0,
      currentIndex: null, // 回复某个人的 index
      currentUps: null,
      replies: []
    }
  },
  components:{
    comment
  },
  created() {
    // if(this.$route.query.id ==0){
    //   console.log(this.$route.query.id)
    //   const url = window.location.protocol+"//"+window.location.host;
    //   window.location.href=`${url}/article/${this.$route.params.id}`
    // }

    this.$store.commit('viewArcticle', true);
    this.$store.commit('showInfo', false);
    this.$store.commit('showAsideMenu', false);
    TopicsItem(undefined,`/${this.id}`).then((res=>{
        this.infos = res.data[0]
      }))
      // .then(data => this.infos = data)
      // .then(infos => this.replies = infos.replies.reverse())
      .then(() => this.$store.commit('viewArcticle', false))
      // .then(() => {
      //   this.oImgs = document.querySelector('.md').querySelectorAll('img');
      //   for (let img of this.oImgs) {
      //     img.onclick = () => location.href = img.src;
      //   }
      // })
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    ak() {
      return this.$store.state.ak;
    },
    collectTopics() {
      return this.$store.state.collectTopics;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    if (!this.ak) {
      return;
    }
  },
  methods: {
    // toScroll(event) {
    //   this.oArticleDetail = event.target;
    // },
    collect() {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (!this.isCollected) {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          console.log('result', result);
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      }
    },
    reply(id, name) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      else if (!id) {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: this.replyContent
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.replyContent ='';
          })
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: '@' + name + ' ' + this.replyOneContent,
          reply_id: id
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.currentIndex = null;
              this.replyOneContent = ''
            })
        })
      }
    },

    //点赞
    ups(index, upsId, item) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (item.author.loginname === this.userInfo.loginname) {
        alert('不能自己为自己点赞哦😯')
        return;
      }
      this.axios.post(`https://cnodejs.org/api/v1/reply/${upsId}/ups`, {accesstoken: this.ak})
        .then(result => {
          if (result.data.success) {
            this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
              .then(result => result.data.data)
              .then(data => this.infos = data)
              .then(infos => this.replies = infos.replies.reverse())
          }
        })

    }
  }
}
</script>

<style lang="scss" scoped>

  .article-detail {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 8px 5px 0 5px;
    background-color: rgba(0, 0, 0, .07);
    overflow-x: hidden;
    overflow-y: auto;
    .body {
        background-color: white;
        height: 100%;
        border-radius: 4px;
        .article-title {
          width: 100%;
          padding-left: 15px;
          padding-top: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          h1 {
            font-size: 1.2rem;
            .flag {
              background-color: #80bd01;
              padding: 2px 5px;
              font-size: 80%;
              color: white;
              border-radius: 5px;
              margin-right: 5px;
            }
          }
          .desc {
            padding-top: 3px;
            font-size: 18px;
            p {
              font-size: 80%;
              color: gray;
            }
          }
        }
        .md {
          width: 100%;
          overflow: hidden;
        }

        .reply {

          .other {
            margin-top: 20px;
            margin-bottom: 10px;
            // border-bottom: 1px solid rgba(0, 0, 0, .05);
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            i {
              display: inline-block;
              width: 18px;
              height: 18px;
              margin-right: 3px;
            }
            .collected {
              background: url('../../common/icons/icon-collect-yes.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
            .collected-no {
              background: url('../../common/icons/icon-collect-no.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
          }

          .reply-input {
            width: 100%;
            height: 50px;
            background-color: white;
            margin-bottom: 10px;
            padding-left: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              width: 80%;
              height: 40px;
              font-size: 1.3rem;
              border-bottom: 1px solid rgba(0, 0, 0, .2);
              margin-right: 10px;
              padding-left: 5px;
              padding-right: 5px;
            }
            input:focus {
              border-bottom: 1px solid #2196f3;
            }
            button {
              font-size: 1.3rem;
              padding: 3px 5px;
              background-color: #2196f3;
              color: white;
              border-radius: 3px;
            }
          }

          .total-reply {
            text-align: center;
            width: 100px;
            background-color: #B2DFDB;
            border-radius: 3px;
            // padding-left: 10px;
            margin-bottom: 6px;
          }

          .reply-item {
            .reply-author {
              background-color: white;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
              border-radius: 5px;
              padding-left: 10px;
              .reply-avatar {
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 3px;
                }
                .reply-desc {
                  position: relative;
                  flex: 1;
                  padding-left: 10px;
                  .reply-at {
                    position: absolute;
                    right: 60px;
                  }
                  .icon-reply-at {
                    position: absolute;
                    right: 35px;
                    top: -2px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;

                  }
                  .ups-yes {
                    background: url('../../common/icons/icon-ups-yes.svg') no-repeat;
                    background-size: contain;
                  }
                  .ups-no {
                    background: url('../../common/icons/icon-ups-no.svg') no-repeat;
                    background-size: contain;
                  }
                  span.ups-count {
                    position: absolute;
                    right: 20px;
                  }
                }
              }
            }

            .reply-one {
              width: 100%;
              height: 30px;
              // background-color: red;
              margin-bottom: 20px;
              padding-top: 2px;

              input {
                width: 65%;
                height: 100%;
                background: none;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
                font-size: 1.3rem;
                color: gray;
              }
              input:focus {
                border-bottom: 1px solid #00bcd4;
                color: black;
              }
              button {
                font-size: 1.2rem;
                vertical-align: bottom;
                padding: 2px 5px;
                border-radius: 2px;
              }
              button:nth-of-type(1) {
                background-color: #2196f3;
                color: white;
              }
              button:nth-of-type(2) {
                background-color: white;
                color: gray;
              }
            }
          }
        }

    }

    .back {
      position: fixed;
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
  @media screen and (min-width: 760px) {
    .article-detail {
      padding-left: 3%;
      padding-right: 3%;
      .article-title {
        text-align: center;
      }
    }
  }
</style>
