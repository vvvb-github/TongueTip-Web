<template>
    <div>
        <background :show-head="true" style="width: 45%;height: 100%">
            <div style="width: 100%;height: 85%;display: flex;flex-direction: row;justify-content: center">
                <div style="display: flex;width: 35%;height: 100%;flex-direction: column">
                    <!--走马灯-->
                    <el-card style="width: 100%;height: 50%;background: rgba(255,255,255,0.7)"
                             :body-style="{height:'100%'}">
                            <el-carousel style="width: 100%;height: 100%" height="100%"
                                         :interval="4000"  indicator-position="none">
                                <el-carousel-item v-for="item in img_list" :key="item">
                                    <img :src="item" class="image">
                                </el-carousel-item>
                            </el-carousel>
                    </el-card>
                    <!--餐品信息-->
                    <el-card style="margin-top: 3%;width: 100%;height: 50%;background: rgba(255,255,255,0.7)"
                             :body-style="{height: '100%'}">
                        <div class="info">
                            <!--左边一栏的餐品信息-->
                            <div id="l">
                                <div class="lan">
                                    <div class="left">
                                        菜名：
                                    </div>
                                    <div id="name">
                                        {{Dish_name}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        价格：
                                    </div>
                                    <div id="price">
                                        ￥{{price}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        销量：
                                    </div>
                                    <div id="sales_num">
                                        {{sales}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        地点：
                                    </div>
                                    <div id="add">
                                        {{address}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        电话：
                                    </div>
                                    <div id="phone">
                                        {{phone}}
                                    </div>
                                </div>
                            </div>
                            <!--右边一栏的餐品信息-->
                            <div id="r">
                                <div class="right">
                                    <el-rate
                                            v-model="total_star"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="{value}">
                                    </el-rate>
                                </div>

                                <div class="right">
                                    <el-tag>辣</el-tag>
                                    <el-tag type="success">爽</el-tag>
                                    <el-tag type="info">过瘾</el-tag>
                                    <el-tag type="warning">好吃</el-tag>
                                    <el-tag type="danger">物美价廉</el-tag>
                                </div>
                                <div id="number">
                                    <el-input-number v-model="num"
                                                     :min="1" :max="1000" label="数量"></el-input-number>
                                </div>
                                <div class="buy">
                                    <el-button type="primary" @click="dialogVisible = true">加入购物车</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <!--评价-->
                <el-card style="width: 45%;height:100%;background: rgba(255,255,255,0.7);" :body-style="{height:'100%'}">
                        <span>用户评价</span>
                        <ul
                                class="list"
                                infinite-scroll-disabled="false"
                                style="overflow:auto;height:95%;">
                            <el-card  v-for="item in evaluation" :key="item.ID"
                                      style="width: 100%;height: 30%;background: rgba(255,255,255,0.7);"
                                      :body-style="{height:'100%'}">
                                <div class="renwu">
                                    <el-avatar :src="item.Url"></el-avatar>
                                    <div class="head">
                                        {{item.Name}}
                                    </div>
                                    <el-card style="width: 55%;height:100%;
                                    background: linear-gradient(to top left,rgba(161,242,236,0.7),rgba(237,214,234,0.7))"
                                             :body-style="{height:'100%'}">
                                        {{item.Rate}}
                                    </el-card>
                                    <div class="time">
                                        <el-rate
                                                v-model="item.Star"
                                                disabled
                                                show-score
                                                text-color="#ff9900"
                                                score-template="{value}"
                                                style="margin-bottom: 7px;margin-top:80px">
                                        </el-rate>
                                        {{item.Time}}
                                    </div>
                                </div>
                            </el-card>
                        </ul>

                </el-card>
            </div>
        </background>
        <!--弹窗-->
        <el-dialog
                title="确认订单"
                :visible.sync="dialogVisible"
                width="30%">
            <div style="display: flex;flex-direction: column;align-items: flex-start;margin-left: 100px">
                <div style="display: flex;flex-direction: row;margin-left: 6px" >
                    <div style="margin-top: 6px">
                        餐品：
                    </div>
                    <div style="font-size: large;margin-top: 1px;">
                        {{Dish_name}}
                    </div>
                </div>
                <div style="display: flex;flex-direction: row;margin-top: 7px;margin-left: 6px" >
                    <div style="margin-top: 6px">
                        价格：
                    </div>
                    <div style="margin-bottom: 5px;font-size: large;margin-top: 5px;margin-bottom: 5px;color:#e60000">
                        {{total_price}} 元
                    </div>
                </div>

                <el-form ref="numberValidateForm" label-width="60px" class="demo-ruleForm"
                style="display: flex;flex-direction: row;">
                    <el-form-item
                            prop="backup"
                            label="备注：">
                        <el-input type="backup" v-model="backup" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :plain="true" @click="orderEffect">下 单</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Background from "@/components/background";
    import JS from "@/JS";
    export default {
        name: "Detail",
        components: {
            Background
        },
        data(){

            return{
                // 餐品图片
                img_list:[],
                Dish_name:'',  //餐品名称
                price:0,              //单品价格
                sales:0,              //销量
                total_star:0,         //菜的总评分
                num: 1,                 //餐品数量，绑定
                // money:0,
                address:this.$store.state.hostInfo.m_location,      //商家地址
                phone:this.$store.state.hostInfo.m_phone,          //电话
                value_user:null,
                //评价：昵称、评价、时间、头像地址、星级
                backup:'',              //备注，绑定
                evaluation:[],      //所有人评价
                count: 1000,
                dialogVisible: false,
            }
        },
        methods: {
            open2() {
                this.$message({
                    message: '下单成功啦，美味准备中...',
                    type: 'success'
                });
            },
            orderEffect(){
                this.dialogVisible = false;
                this.open2();
            }
        },
        created() {
            JS.detail.mounted(this);
        },
        computed: {
            total_price(){
                    return this.price*this.num
            }
        }
    }
</script>

<style scoped>
    .info{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
        justify-content:center;
        margin-top: 1px;
    }
    #l{
        display: flex;
        flex-direction:column;
        margin-right: 30px;
        align-items: flex-start;
        justify-content:center;
        margin-bottom: 30px;
    }
    #r{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
        margin-bottom: 40px;
    }
    #name{
        font-size: x-large;
        display: flex;
        align-items: center;
    }
    #number{
        height:10%;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .lan{
        display: flex;
        flex-direction: row;
        align-items: center;
        height:17% ;
    }
    .left{
        display: flex;
        justify-content: flex-start;
    }
    .right{
        display: flex;
        height:15% ;
    }
    .buy{
        margin-top: 35px;
    }
    .image{
        /*设置图片宽度和浏览器宽度一致*/
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    #price{
        color: #e60000;
        font-size: large;

    }
    #sales_num{
        color: #ffa819;
    }
    .renwu{
        display: flex;
        flex-direction: row;
    }
    .head{
        width:10%;
        margin-top: 7px;
    }
    .time{
        margin-left: 7px;
    }

</style>