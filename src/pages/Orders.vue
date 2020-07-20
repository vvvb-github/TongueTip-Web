<template>
    <div class="container">
        <background :show-head="true" class="container-bg">
            <el-card class="infinite-list-wrapper"
                     :body-style="{width:'1200px',display:'flex',flexDirection:'column',alignItems:'center'}">
                <ul class="list" :infinite-scroll-disabled="false">
                    <div v-for="item in hostorders" class="list-item" :key="item.m_orderID">
                        <el-card class="ordercard">
                            <order_item class="orderitem" :info="item"/>
                        </el-card>
                    </div>
                </ul>
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
                hostorders:[],
            }
        },
        methods: {
        },
        created() {
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
        width: 90%;
        height: 630px;
        background: rgba(255,255,255,0.7);
        display: flex;
        justify-content: center;
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