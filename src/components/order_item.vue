<template>
    <div style="display: flex;">
        <img :src="order.picPath.split('+')[0]" style="width: 200px;height: 160px;object-fit: fill"/>
        <div style="width: 350px;height: 160px;display: flex;margin-left: 20px;flex-direction: column;justify-content: space-between">
            <span style="font-weight: bold;font-size: x-large;font-family: 'Microsoft YaHei';color: orangered">
                {{order.dishName}}
                <span style="color: purple;font-family: 'Microsoft YaHei';font-weight: bold;font-size: large">
                    X{{order.number}}
                </span>
            </span>
            <span style="color: #e60000;font-size: larger;font-weight: bold;font-family: 'Microsoft YaHei'">
                总价：{{order.prices}}
            </span>
            <span style="font-size: medium;font-family: 'Microsoft YaHei'">
                订单号：{{order.orderID}}
            </span>
            <span style="font-size: medium;font-family: 'Microsoft YaHei'">
                下单时间：{{order.date}}
            </span>
        </div>
        <div style="width: 250px;height: 160px">
            <p>
                <span style="font-family: 'Microsoft YaHei';font-weight: bold;color: dodgerblue">备注：</span>
                {{order.PS}}
            </p>
        </div>
        <div style="width: 200px;height: 160px;display: flex;justify-content: center;align-items: center">
            <el-button type="success" @click="changed" v-if="order.orderStatus==0">完成订单</el-button>
            <span v-else style="font-weight: bold;font-family: 'Microsoft YaHei';color: limegreen">已完成</span>
        </div>
    </div>
</template>

<script>

    import JS from "@/JS";

    export default {
        name: "order_item",
        data() {
            return {
                order: this.info
            }
        },
        methods: {
            changed() {
                this.$confirm('确定已完成订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    JS.orders.completed(this,this.order.orderID)
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
</style>