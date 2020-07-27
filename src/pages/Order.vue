<template>
    <div class="container">
        <background style="width: 45%;height: 100%" :show-head="true">
            <el-card class="box-card" style="width:80%;height:630px;background: rgba(255,255,255,0.7)">
                <el-container style="height: 600px">
                    <el-main>
                        <el-tabs v-model="activeName" @tab-click="handleClick">

                            <el-tab-pane label="已支付" name="first">
                                <el-table
                                        ref="multipleTable"
                                        height="480"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        style="width: 100%;height:430px"
                                        @selection-change="handleSelectionChange"
                                        v-if="cusOrder.length>0"
                                        >
                                    <el-table-column prop="date" label="订单列表" width="1000px">
                                        <el-collapse v-model="activeNames" @change="handleChange"
                                                     v-for="item in cusOrder" :key="item.orderID">
                                            <el-collapse-item title=" 订单详情" name="1">
                                                <el-card :body-style="{ padding: '20px',display:'flex'}"
                                                >

                                                    <el-card style="width:200px;height:200px" >
                                                        <img :src="item.image.split('+')[0]" class="image">
                                                    </el-card>
                                                    <el-card style="height:200px;width: 800px" :body-style="{display:'flex',justify:'space-between'}" >
                                                        <div style="margin-left: 0px">
                                                            <div style="margin-top: 0px">{{item.dishName}}</div>
                                                            <div style="margin-top:30px;width: 100px">份数:{{item.number}}份</div>
                                                            <div style="margin-top:70px">总价：{{item.price}}元</div>
                                                        </div>
                                                        <div style="margin-left:250px">
                                                            <el-button style="margin-top: 133px" type="primary" class="button clearfix">举报</el-button>
                                                        </div>
                                                        <div style="margin-left: 20px">
                                                            <div style="margin-top: 0px" class="time">{{ item.date }}</div>
                                                            <el-button style="margin-top: 110px" type="primary" class="button clearfix" @click="fucA(item.orderID,item.dishID)"
                                                            :disabled="item.state!=1">
                                                                {{btnText(item.state)}}
                                                            </el-button>
                                                        </div>
                                                    </el-card>
                                                </el-card>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-table-column>
                                </el-table>
                                <span v-else style="color: black;font-size: large;font-family: 'Microsoft YaHei'">
                                    暂无订单
                                </span>
                            </el-tab-pane>

                            <el-tab-pane label="未处理" name="second">
                                <el-table
                                        ref="multipleTable"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        height="480"
                                        style="width: 100%;height:430px"
                                        @selection-change="handleSelectionChange"
                                v-if="cusOrderNotPay.length>0">
                                    <el-table-column prop="date" label="订单列表" width="1000px">
                                        <el-collapse v-model="activeNames" @change="handleChange"
                                                     v-for="item in cusOrderNotPay" :key="item.orderID">
                                            <el-collapse-item title=" 订单详情" name="1">
                                                <el-card :body-style="{ padding: '20px',display:'flex'}"  >
                                                    <el-card style="width:200px;height:200px" >
                                                        <img :src="item.image" class="image">
                                                    </el-card>
                                                    <el-card style="height:200px;width: 800px" :body-style="{display:'flex',justify:'space-between'}" >
                                                        <div style="margin-left: 0px">
                                                            <div style="margin-top: 0px">{{item.dishName}}</div>
                                                            <div style="margin-top:30px;width: 100px">份数:{{item.number}}份</div>
                                                            <div style="margin-top:70px">总价：{{item.price}}元</div>
                                                        </div>
                                                        <div style="margin-left:230px">
                                                            <el-button style="margin-top: 133px" type="primary" class="button clearfix"
                                                            @click="funcDel(item.orderID)">取消订单</el-button>
                                                        </div>
                                                        <div style="margin-left: 20px">
                                                            <div style="margin-top: 0px" class="time">{{item.date}}</div>
                                                            <el-button style="margin-top: 110px" type="primary" class="button clearfix"
                                                            @click="funcPay(item.orderID)">支付</el-button>
                                                        </div>

                                                    </el-card>
                                                </el-card>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-table-column>
                                </el-table>
                                <span v-else style="color: black;font-size: large;font-family: 'Microsoft YaHei'">
                                    暂无订单
                                </span>
                            </el-tab-pane>
                        </el-tabs>
                    </el-main>
                </el-container>
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
        <el-dialog title="微信支付" :visible="payShow">
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleChange(val)
            {
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
            funcPay(OrderId){
                JS.order.pay(this,OrderId);
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

    .time {
        font-size: 13px;
        color: #999;
    }

    .button {

    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }



</style>