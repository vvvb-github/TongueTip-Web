<template>
    <div class="container-order">
        <div class="allinfo">
        <div id="pic-order">
            <img id="pic" :src="orderInfo.picPath.split('+')[0]"/>
        </div>
        <div class="textinfo">
            <div class="info-order">
                <div class="ordertext">
                    <span id="ordertext" style="font-weight: bold;font-family: 'Microsoft YaHei'">菜品：</span>
                    <span style="font-weight: bold;color: orangered;font-family: 'Microsoft YaHei'">{{orderInfo.dishName}}</span>
                    <span style="font-weight: bold;font-family: 'Microsoft YaHei';color: purple">x{{orderInfo.number}}</span>
                </div>
                <div class="orderprice">
                    <span style="font-weight: bold;font-family: 'Microsoft YaHei';color: #e60000">
                        总价：{{orderInfo.prices}}
                    </span>
                </div>
                <div class="orderstatus">
                    <span class="orderstatus-span" :style="{color:(orderInfo.orderStatus===0?'rgb(255,0,0)':'green')}">
                        状态：{{orderInfo.orderStatus==0?"未完成":"已完成"}}
                    </span>
                </div>
            </div>
            <div class="userinfo-order">
                <div class="userps">
                    <span style="font-weight: bold;font-family: 'Microsoft YaHei';color: blue">
                        编号：{{orderInfo.orderID}}
                    </span>
                    <p>
                        <span style="font-weight: bold;font-family: 'Microsoft YaHei'">备注：</span>
                        {{orderInfo.PS}}
                    </p>
                </div>
                <div class="ordertime">
                    <span style="font-family: 'Microsoft YaHei';font-weight: bold;color: #ffa819">
                        下单时间：{{orderInfo.date}}
                    </span>
                </div>
            </div>
        </div>
        </div>
        <div class="keybutton">
            <el-button @click="changed" v-if="orderInfo.orderStatus===0"  round id="keybut" type="primary">完成订单</el-button>
        </div>
    </div>
</template>

<script>

    import JS from "@/JS";

    export default {
        name: "order_item",
        data() {
            return {
                orderInfo: this.info
            }
        },
        methods: {
            changed() {
                this.$confirm('确定已完成订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    JS.orders.completed(this,this.orderInfo.orderID)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        props: {
            info: Object
        }
    }
</script>

<style scoped>
    .container-order{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family:'微软雅黑 Light';
    }
    .allinfo{
        width:90%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #pic-order{
        width:200px;
        height:150px;
    }
    #pic{
        width: 100%;
        height: 95%;
        border-radius: 20px;
    }
    .textinfo{
        display: flex;
        flex-direction: column;
        width: 100%;
        height:100%;
    }
    .info-order{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 90%;
        margin-left: 5%;
    }
    .userinfo-order{
        width:100%;
        display: flex;
        flex-direction: column;
        margin-left: 5%;
        margin-top:1%;
    }
    .userps{
        margin-top: 1%;
    }
    .ordertext{
        width:200px;
        display: flex;
        flex-direction: row;
        margin-right: 5%;
    }
    .orderprice{
        width: 20%;
        margin-right: 5%;
        display: flex;
        flex-direction: row;
        color:orangered;
    }
    .ordertime{
        margin-top: 2%;
        width:100%;
        display: flex;
        flex-direction: row;
        color:darkorange;
    }
    .orderstatus{
        width:20%;
        margin-right: 5%;
        display: flex;
        flex-direction: row;
    }
    .keybutton{
        width:20%;
    }
    #keybut{
        margin-left: 20%;
    }
    .orderstatus-span{
        font-family: "Microsoft YaHei";
        font-weight: bold;
    }
</style>