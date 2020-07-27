<template>
    <div class="container">
        <background :show-head="true" class="container-bg">
            <el-card class="infinite-list-wrapper"
                     :body-style="{display:'flex',flexDirection:'column',alignItems:'center'}">
                <div slot="header">订单管理</div>
                <ul class="list" :infinite-scroll-disabled="false" v-if="hostOrders.length>0">
                    <div v-for="item in hostOrders" class="list-item" :key="item.orderID">
                        <el-card class="ordercard">
                            <order_item class="orderitem" :info="item"/>
                        </el-card>
                    </div>
                </ul>
                <span v-else style="font-family: 'Microsoft YaHei';font-size: large;color: black">暂无订单哦</span>
            </el-card>
        </background>
    </div>
</template>

<script>
    import JS from "@/JS";
    import background from "@/components/background";
    import order_item from "@/components/order_item";
    export default {
        name: "Orders",
        components:{
            order_item,
            background,
        },
        data(){
            return{
                hostOrders:[],
            }
        },
        methods: {
        },
        created() {
            this.loading = this.$loading({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            JS.orders.mounted(this);
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        width:100%;
        height:100%;
    }
    .container-bg{
        width:100%;
        height:100%;
    }
    .list-item{
        width: 100%;
    }
    .infinite-list-wrapper{
        overflow:auto;
        width: 1200px;
        height: 630px;
        background: rgba(255,255,255,0.7);
    }
    .list{
        width:100%;
        margin-top: 1%;
        justify-content: center;
        overflow: auto;
    }
    .ordercard{
        width:1100px;
        margin-top: 5px;
    }
    .orderitem{
        width:100%;
    }
</style>