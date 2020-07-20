<template>
    <div style="width: 100%;height: 100%">
        <background :show-head="true">
            <el-card class="box-card" style="width:80%;height:600px">
                <el-container style="height: 600px">
                    <el-main>
                        <el-tabs v-model="activeName" @tab-click="handleClick" style="background: rgba(255,255,255,0.7)">
                            <el-tab-pane label="已支付" name="first">
                                <el-table
                                        ref="multipleTable"
                                        height="480"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        style="width: 100%;height:430px"
                                        @selection-change="handleSelectionChange"
                                >
                                    <el-table-column prop="date" label="订单列表" width="800px">
                                        <el-collapse v-model="activeNames" @change="handleChange"
                                                     v-for="item in cusOrder" :key="item.orderId">
                                            <el-collapse-item title=" 订单详情" name="1">
                                                <el-card :body-style="{ padding: '20px',display:'flex'}"
                                                >
                                                    <el-card style="width:200px;height:200px" >
                                                        <img :src="item.image" class="image">
                                                    </el-card>
                                                    <el-card style="height:200px;width: 600px" :body-style="{display:'flex',justify:'space-between'}" >
                                                        <div style="margin-left: 0px">
                                                            <div style="margin-top: 0px">{{item.dishName}}</div>
                                                            <div style="margin-top:30px;width: 100px">份数:{{item.number}}份</div>
                                                            <div style="margin-top:70px">总价：{{item.prices}}元</div>
                                                        </div>
                                                        <div style="margin-left:250px">
                                                            <el-button style="margin-top: 133px" type="primary" class="button clearfix">举报</el-button>
                                                        </div>
                                                        <div style="margin-left: 20px">
                                                            <div style="margin-top: 0px" class="time">{{ item.Date }}</div>
                                                            <el-button style="margin-top: 110px" type="primary" class="button clearfix" @click="fucA(item.orderId)">评论</el-button>

                                                        </div>

                                                    </el-card>

                                                </el-card>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>

                            <el-tab-pane label="未处理" name="second">
                                <el-table
                                        ref="multipleTable"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        height="480"
                                        style="width: 100%;height:430px"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column prop="date" label="订单列表" width="800px">
                                        <el-collapse v-model="activeNames" @change="handleChange"
                                                     v-for="item in cusOrderNotPay" :key="item.orderId">
                                            <el-collapse-item title=" 订单详情" name="1">
                                                <el-card :body-style="{ padding: '20px',display:'flex'}"  >
                                                    <el-card style="width:200px;height:200px" >
                                                        <img src="item.image" class="image">
                                                    </el-card>
                                                    <el-card style="height:200px;width: 600px" :body-style="{display:'flex',justify:'space-between'}" >
                                                        <div style="margin-left: 0px">
                                                            <div style="margin-top: 0px">{{item.dishName}}</div>
                                                            <div style="margin-top:30px;width: 100px">份数:{{item.number}}份</div>
                                                            <div style="margin-top:70px">总价：{{item.prices}}元</div>
                                                        </div>
                                                        <div style="margin-left:230px">
                                                            <el-button style="margin-top: 133px" type="primary" class="button clearfix"
                                                                       @click="funcDel()">取消订单</el-button>
                                                        </div>
                                                        <div style="margin-left: 20px">
                                                            <div style="margin-top: 0px" class="time">{{item.Date}}</div>
                                                            <el-button style="margin-top: 110px" type="primary" class="button clearfix"
                                                                       @click="funcPay">支付</el-button>
                                                        </div>

                                                    </el-card>
                                                </el-card>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </el-table-column>
                                </el-table>
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
                <el-button type="primary" @click="changeInfo">确 定</el-button>
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
                tableData: [],
                multipleSelection: [],
                activeName: 'second',
                activeNames: ['1'],
                dialogVisible: false,
                formLabelWidth: '120px',
                comment: {
                    com: '',
                    star: 3,
                    Oid: 0,
                },
                rules: {
                    com: [
                        {required: true, message: '请输入您的评价', trigger: 'blur'},
                        {min: 1, max: 200, message: '长度在1到200个字符', trigger: 'blur'}
                    ],
                    star:[]
                },
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                cusOrder:[
                    {
                        Date:'07/20/20:39',
                        dishName:'汉堡',
                        number:'2',
                        prices:'128',
                        DishId:'',
                        orderId:'0001',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                    {
                        Date:'07/20/19:56',
                        dishName:'辣条',
                        number:'5',
                        prices:'13',
                        DishId:'',
                        orderId:'0002',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                    {
                        Date:'07/20/20:00',
                        dishName:'鸡翅',
                        number:'19',
                        prices:'498',
                        DishId:'',
                        orderId:'0003',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                ],
                cusOrderNotPay:[
                    {
                        Date:'07/20/19:54',
                        dishName:'汉堡',
                        number:'2',
                        prices:'128',
                        DishId:'',
                        orderId:'0001',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                    {
                        Date:'07/20/19:56',
                        dishName:'辣条',
                        number:'5',
                        prices:'13',
                        DishId:'',
                        orderId:'0002',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                    {
                        Date:'07/20/20:00',
                        dishName:'鸡翅',
                        number:'19',
                        prices:'498',
                        DishId:'',
                        orderId:'0003',
                        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
                    },
                ]
            }
        },
        methods: {
            // toggleSelection(rows) {
            //     if (rows) {
            //         rows.forEach(row => {
            //             this.$refs.multipleTable.toggleRowSelection(row);
            //         });
            //     } else {
            //         this.$refs.multipleTable.clearSelection();
            //     }
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleChange(val) {
                console.log(val) ;
            },
            changeInfo() {
                this.$refs['comment'].validate((valid) => {
                    if (valid) {
                        JS.order.comment(this,this.comment);
                        this.dialogVisible=false;
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            fucA(OrderId){
                this.dialogVisible=true;
                this.comment.Oid=OrderId;
            },
            funcDel(OrderId){
                JS.order.deleteOrder(this,OrderId)
            },
            funcPay(OrderId){
                JS.order.pay(this,OrderId)
            }
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
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