import { default } from '../../../../../day6/webpackStudy/src/login.vue';
<template>
  <div class="goods-list">
    
    <router-link :to="'/home/goodsInfo/' + item.id" class="goods-item" v-for="item in goodsList" :key="item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 1,
        goodsList: []
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      // 获取商品列表
      getGoodsList() {
        this.$http.get('api/getgoods?pageindex=' + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // 把获取到的对应页数的数据拷贝到列表 goodsList 中
            this.goodsList = this.goodsList.concat(result.body.message);
          }
        });
      },
      // 加载更多
      getMore() {
        // 页数加一
        this.pageIndex++;
        this.getGoodsList();
      }
    }
  }
</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }

    .info{
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px;
      }
      .price{
        .now{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
