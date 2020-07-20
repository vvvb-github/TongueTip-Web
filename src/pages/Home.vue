<template>
    <div class="container">
        <background :show-head="true">
            <div slot="head" class="tabs">
                <el-tag style="background: rgba(255,255,255,0.3);color: orangered" type="warning" class="tag" :effect="page==1? 'dark':'light'" @click="tagClicked(1)">全部商家</el-tag>
                <el-tag style="background: rgba(255,255,255,0.3);color: orangered" type="warning" class="tag" :effect="page==2? 'dark':'light'" @click="tagClicked(2)">私家推荐</el-tag>
                <el-tag style="background: rgba(255,255,255,0.3);color: orangered" type="warning" class="tag" :effect="page==3? 'dark':'light'" @click="tagClicked(3)">今日热榜</el-tag>
            </div>
            <div id="container-page">
                <el-card :body-style="{display:'flex',flexDirection:'column',alignItems:'center'}" class="el-card-list" v-if="page==1">
                    <div slot="header" class="card-head">
                        <span>全部商家</span>
                        <div style="display: flex;align-items: center;justify-content: center;width: 25%;margin-left:65%">
                            <el-input clearable placeholder="请输入你要搜索的商家" v-model="searchText"></el-input>
                            <el-button @click="search()" icon="el-icon-search" type="primary">搜索</el-button>
                        </div>
                    </div>
                    <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 100%;height: 500px;display: flex;flex-wrap: wrap">
                        <el-card :body-style="{display:'flex',alignItems:'center',padding:'10px'}" shadow="hover"
                                 style="width: 45%;height: 120px;margin: 10px" v-for="item in hostsList" :key="item.m_hostID">
                            <host_item :info="item" style="width: 100%;height: 100%"/>
                        </el-card>
                    </ul>
                </el-card>
                <el-card :body-style="{display:'flex',flexDirection:'column',alignItems:'center'}" class="el-card-list" v-if="page==2">
                    <div slot="header" class="card-head">
                        <span>私家推荐</span>
                        <div style="display: flex;align-items: center;justify-content: center;width: 25%;margin-left:65%">
                            <el-input clearable placeholder="请输入你要搜索的商家" v-model="searchText"></el-input>
                            <el-button @click="search()" icon="el-icon-search" type="primary">搜索</el-button>
                        </div>
                    </div>
                    <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 100%;height: 500px;display: flex;flex-wrap: wrap">
                        <el-card :body-style="{display:'flex',alignItems:'center',padding:'10px'}" shadow="hover"
                                 style="width: 45%;height: 120px;margin: 10px" v-for="item in recommendList" :key="item.m_hostID">
                            <host_item :info="item" style="width: 100%;height: 100%"/>
                        </el-card>
                    </ul>
                </el-card>
                <el-card :body-style="{display:'flex',flexDirection:'column',alignItems:'center'}" class="el-card-list" v-if="page==3">
                    <div slot="header" class="card-head">
                        <span>今日榜单</span>
                        <div style="display: flex;align-items: center;justify-content: center;width: 25%;margin-left:65%">
                            <el-input clearable placeholder="请输入你要搜索的商家" v-model="searchText"></el-input>
                            <el-button @click="search()" icon="el-icon-search" type="primary">搜索</el-button>
                        </div>
                    </div>
                    <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 100%;height: 500px;display: flex;flex-wrap: wrap">
                        <el-card :body-style="{display:'flex',alignItems:'center',padding:'10px'}" shadow="hover"
                                 style="width: 45%;height: 120px;margin: 10px" v-for="item in rankList" :key="item.m_hostID">
                            <host_item :info="item" style="width: 100%;height: 100%"/>
                        </el-card>
                    </ul>
                </el-card>
                <el-card class="el-card-side">
                    <div slot="header">热门菜品</div>
                    <el-carousel :interval="5000" class="el-car-ad" indicator-position="outside">
                        <el-carousel-item v-for="dish in hotList" :key="dish.m_dishID">
                            <div class="ad" style="width: 100%;height: 100%">
                                <hot_item :info="dish" style="width: 100%;height: 100%"/>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </div>
        </background>
    </div>
</template>

<script>
    import JS from "@/JS";
    import Background from "@/components/background";
    import host_item from "@/components/host_item";
    import hot_item from "@/components/hot_item";

    export default {
        name: "Home",
        components: {hot_item, host_item, Background},
        data() {
            return {
                searchText: '',
                page: 1,
                hostsList: [],
                recommendList :[],
                rankList: [],
                hotList: [],
            }
        },
        methods: {
            getRequest(requestID) {
                if(requestID==0){
                    // this.$store.state.loading.close()
                    console.log(requestID)
                }else{
                    console.log(requestID)
                }
            },
            tagClicked(pg) {
                this.page = pg
            },
            search() {
                JS.home.search(this,this.searchText)
            },
        },
        created() {
            // this.$store.state.loading = this.$loading({
            //     lock: true,
            //     text: '拼命加载中...',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            JS.home.mounted(this)
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
    }
    .tabs{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
    .tag{
        width: 15%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: large;
    }
    #container-page{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .el-card-list{
        width: 70%;
        height: 630px;
        margin-right: 3%;
        background: rgba(255,255,255,0.7);
    }
    .el-card-side{
        width: 20%;
        background: rgba(255,255,255,0.7);
    }
    .el-car-ad{
        width: 100%;
        height: 100%;
        margin-top: 20%;
    }
    .card-head{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>