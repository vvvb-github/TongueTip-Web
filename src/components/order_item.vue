<template>
    <div class="container-order">
        <div class="allinfo">
        <div id="pic-order">
            <img id="pic" :src="orderInfo.m_picPath"/>
        </div>
        <div class="textinfo">
        <div id="info-order">
            <div class="ordertext">
            <span id="ordertext">菜品：{{orderInfo.m_orderText}}x{{orderInfo.m_orderNumber}}</span>
            </div>
            <div class="orderprice">
                <span id="orderprice">总价：{{orderInfo.m_orderPrice}}</span>
            </div>
        <div class="orderID">
            <span id="orderID">编号：{{orderInfo.m_orderID}}</span>
        </div>

        <div class="orderstatus">
            <span id="orderstatus" :style="{color:(orderInfo.m_orderStatus==0?'rgb(255,0,0)':'green')}">状态：{{orderInfo.m_orderStatus==0?"未完成":"已完成"}}</span>
        </div>
        </div>
        <div id="userinfo-order">
            <div class="userps">
                <span id="orderps">备注：{{orderInfo.m_orderPs}}</span>
            </div>
            <div class="ordertime">
                <span id="ordertime">下单时间：{{orderInfo.m_orderTime}}</span>
            </div>
        </div>
    </div>
        </div>
        <div class="keybutton">
            <el-button @click="changed" v-show="orderInfo.m_orderStatus==0"  round id="keybut" >完成订单
            </el-button>
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
                    this.$message({
                        type: 'success',
                        message: '订单已完成!',
                    });
                    JS.orders.completed(this,this.orderInfo.m_orderID)
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
    #info-order{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 90%;
        margin-left: 5%;
        font-size:3
    }
    #userinfo-order{
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
.orderID{
    width: 20%;
    margin-right: 5%;
    display: flex;
    flex-direction: row;
    color:blue;
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
    background-color: orangered;
    color:white;
    margin-left: 20%;
}

</style>