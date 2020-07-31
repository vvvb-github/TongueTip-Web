<template>
    <div class="container">
        <background style="width: 45%;height: 100%;" :show-head="true">
            <el-card style="width: 1200px;height: 630px;background: rgba(255,255,255,0.7)">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="已支付" name="first">
                        <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 1100px;height: 500px;display: flex;flex-wrap: wrap">
                            <el-card style="width: 1070px;height: 200px;margin-bottom: 10px" shadow="hover"
                                     v-for="order in cusOrder" :key="order.orderID">
                                <div style="display: flex;">
                                    <img :src="order.image.split('+')[0]" style="width: 200px;height: 160px;object-fit: fill"/>
                                    <div style="width: 350px;height: 160px;display: flex;margin-left: 20px;
                                    flex-direction: column;justify-content: space-between">
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
                                        <el-button type="primary"
                                                   :disabled="order.state!=1" @click="fucA(order.orderID,order.dishID)">
                                            {{btnText(order.state)}}
                                        </el-button>
                                    </div>
                                </div>
                            </el-card>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="未处理" name="second">
                        <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 1100px;height: 500px;display: flex;flex-wrap: wrap">
                            <el-card style="width: 1070px;height: 200px;margin-bottom: 10px" shadow="hover"
                                     v-for="order in cusOrderNotPay" :key="order.orderID">
                                <div style="display: flex;">
                                    <img :src="order.image.split('+')[0]" style="width: 200px;height: 160px;object-fit: fill"/>
                                    <div style="width: 350px;height: 160px;display: flex;margin-left: 20px;
                                    flex-direction: column;justify-content: space-between">
                                        <span style="font-weight: bold;font-size: x-large;font-family: 'Microsoft YaHei';color: orangered">
                                            {{order.dishName}}
                                            <span style="color: purple;font-family: 'Microsoft YaHei';font-weight: bold;font-size: large">
                                                X{{order.number}}
                                            </span>
                                        </span>
                                        <span style="color: #e60000;font-size: larger;font-weight: bold;font-family: 'Microsoft YaHei'">
                                            总价：{{order.price}}
                                        </span>
                                        <span style="font-size: medium;font-family: 'Microsoft YaHei'">
                                            订单号：{{order.orderID}}
                                        </span>
                                        <span style="font-size: medium;font-family: 'Microsoft YaHei'">
                                            下单时间：{{order.date}}
                                        </span>
                                    </div>
                                    <div style="width: 350px;height: 160px">
                                        <p>
                                            <span style="font-family: 'Microsoft YaHei';font-weight: bold;color: dodgerblue">备注：</span>
                                            {{order.PS}}
                                        </p>
                                    </div>
                                    <div style="width: 100px;height: 160px;
                                    display: flex;flex-direction: column;justify-content: space-around;align-items: center">
                                        <el-button @click="funcDel(order.orderID)" circle icon="el-icon-delete" type="danger"></el-button>
                                    </div>
                                </div>
                            </el-card>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane style="margin-left: 1000px" :disabled="true" v-if="activeName=='second'">
                        <el-button slot="label" type="success" :disabled="cusOrderNotPay.length==0"
                        @click="funcPay">支付</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </background>
        <el-dialog title="评论栏" :visible.sync="dialogVisible">
            <el-form :model="comment" :rules="rules" ref="comment">
                <el-form-item label="评论输入栏" :label-width="formLabelWidth" prop="com">
                    <el-input v-model="comment.com" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="打星" :label-width="formLabelWidth" prop="star">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-rate
                                v-model="comment.star"
                                :colors="colors">
                        </el-rate>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeInfo()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="微信支付" :visible="payShow" width="350px" :show-close="false">
            <img :src="this.$store.state.payCode" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelPay">放弃支付</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Background from "@/components/background";
    import JS from "@/JS";
    export default {
        name: "Order",
        components:{ Background},
        data() {
            return {
                payShow: false,
                tableData: [{}],
                multipleSelection: [],
                activeName: 'second',
                activeNames: ['1'],
                dialogVisible: false,
                formLabelWidth: '120px',
                comment: {
                    com: '',
                    star: 3,
                    Oid:'0',
                    Did: 0,
                },
                rules: {
                    com: [
                        {required: true, message: '请输入您的评价', trigger: 'blur'},
                        {min: 1, max: 200, message: '长度在1到200个字符', trigger: 'blur'}
                    ],
                    star:[]
                },
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                cusOrder:[],
                cusOrderNotPay:this.$store.state.orderInfo,
                timer: null
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleChange(val) {
                console.log(val) ;
            },
            changeInfo() {
                this.$refs['comment'].validate((valid) => {
                    if (valid) {
                        this.loading = this.$loading({
                            lock: true,
                            text: '评论提交中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        JS.order.comment(this,this.comment);
                        this.dialogVisible=false;
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            fucA(OrderId,dishID){
                this.dialogVisible=true;
                this.comment.Oid = OrderId;
                this.comment.Did = dishID;
            },
            funcDel(OrderId){
                JS.order.deleteOrder(this,OrderId);
            },
            funcPay(){
                JS.order.pay(this);
            },
            cancelPay(){
                clearInterval(this.timer)
                this.payShow = false
            },
            btnText(state){
                if(state === 0){
                    return '未完成'
                }else if(state === 1){
                    return '评价'
                }else{
                    return '已评价'
                }
            }
        },
        created() {
            this.loading = this.$loading({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            JS.order.mounted(this);
        },
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
    }
</style>