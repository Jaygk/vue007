<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']" href="#item1mobile"
                        data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id"
                        @tap="getPhotoList(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片区域列表 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoInfo/' + item.id" v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // 导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js';

    export default {
        data() {
            return {
                category: [],
                list: []
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoList(0);
        },
        mounted() {
            // 初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            });
        },
        methods: {
            getAllCategory() {
                this.$http.get('api/getimgcategory')
                    .then(result => {
                        if (result.body.status === 0) {
                            result.body.message.unshift({
                                title: '全部',
                                id: 0
                            });
                            this.category = result.body.message;
                        }
                    })
            },
            getPhotoList(id) {
                this.$http.get('api/getimages/' + id)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.list = result.body.message;
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                color: #fff;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>