<template>
    <div>
        <background :show-head="true" style="width: 45%;height: 100%">
            <div style="width: 100%;height: 85%;display: flex;flex-direction: row;justify-content: center">
                <div style="display: flex;width: 35%;height: 100%;flex-direction: column;margin-right: 10px">
                    <el-card style="width: 100%;height: 50%;background: rgba(255,255,255,0.7)"
                             :body-style="{height:'100%'}">
                            <el-carousel style="width: 100%;height: 100%" height="100%"
                                         :interval="4000"  indicator-position="none">
                                <el-carousel-item v-for="item in this.$store.state.dishInfo.picPathList" :key="item">
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
                                    <span id="name" style="color: orangered;font-family: 'Microsoft YaHei';">
                                        {{this.$store.state.dishInfo.dishName}}
                                    </span>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        价格：
                                    </div>
                                    <div id="price">
                                        ￥{{this.$store.state.dishInfo.price}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        销量：
                                    </div>
                                    <div id="sales_num">
                                        {{this.$store.state.dishInfo.sales}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        地点：
                                    </div>
                                    <div id="add">
                                        {{this.$store.state.hostInfo.location}}
                                    </div>
                                </div>
                                <div class="lan">
                                    <div class="left">
                                        电话：
                                    </div>
                                    <div id="phone">
                                        {{this.$store.state.hostInfo.phone}}
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
                                            score-template="{value}"
                                    v-if="total_star>0">
                                    </el-rate>
                                    <span v-else style="color: black;font-family: 'Microsoft YaHei';font-size: medium">暂无评分哦</span>
                                </div>
                                <div class="right">
                                    <el-tag v-if="this.$store.state.dishInfo.tags.length>=1">
                                        {{this.$store.state.dishInfo.tags[0]}}</el-tag>
                                    <el-tag v-if="this.$store.state.dishInfo.tags.length>=2" type="success">
                                        {{this.$store.state.dishInfo.tags[1]}}</el-tag>
                                    <el-tag v-if="this.$store.state.dishInfo.tags.length>=3" type="info">
                                        {{this.$store.state.dishInfo.tags[2]}}</el-tag>
                                    <el-tag v-if="this.$store.state.dishInfo.tags.length>=4" type="warning">
                                        {{this.$store.state.dishInfo.tags[3]}}</el-tag>
                                    <el-tag v-if="this.$store.state.dishInfo.tags.length===5" type="danger">
                                        {{this.$store.state.dishInfo.tags[4]}}</el-tag>
                                </div>
                                <div id="number">
                                    <el-input-number v-model="customer_form.num" @change="handleChange"
                                                     v-if="this.$store.state.userInfo.userType==1"
                                                     :min="1" :max="1000" label="数量"></el-input-number>
                                </div>
                                <div class="buy">
                                    <el-button type="primary" v-if="this.$store.state.userInfo.userType==1"
                                               @click="dialogVisible = true">加入购物车</el-button>
                                    <el-button @click="dialogShow=true" type="primary"
                                               v-else>编辑信息</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <!--评价 改了改了item.ID-->
                <el-card style="width: 45%;height:100%;background: rgba(255,255,255,0.7);margin-left: 10px" :body-style="{height:'100%'}">
                        <span slot="header">用户评价</span>
                        <ul class="list"
                                infinite-scroll-disabled="false"
                                style="overflow:auto;height:95%;"
                        v-if="evaluation.length>0">
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
                                        <span>{{item.Time.replace('T',' ')}}</span>
                                    </div>
                                </div>
                            </el-card>
                        </ul>
                    <span v-else style="color: black;font-family: 'Microsoft YaHei';font-size: large">暂无评论哦</span>
                </el-card>
            </div>
        </background>
        <!--顾客弹窗-->
        <el-dialog
                title="确认订单"
                :visible.sync="dialogVisible"
                width="30%">
            <div style="display: flex;flex-direction: column;align-items: flex-start;margin-left: 100px">
                <el-form :model="customer_form" ref="customer_form">
                <div style="display: flex;flex-direction: row;margin-left: 6px" >
                    <div style="margin-top: 6px">
                        餐品：
                    </div>
                    <div style="font-size: large;margin-top: 1px;">
                        {{this.$store.state.dishInfo.dishName}}
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
                        <el-input type="backup" v-model="customer_form.backup" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :plain="true" @click="orderEffect">下 单</el-button>
            </span>
        </el-dialog>
        <!--商家弹窗-->      <!--这里图片有坑未填-->
        <el-dialog title="编辑餐品信息" :visible="dialogShow" :show-close="false">
            <el-form :model="dish_form" :rules="rules" ref="dish_form">
                <el-form-item label="样图" :label-width="formLabelWidth">
                    <el-upload :action="this.$store.state.imgUrl" :auto-upload="false" :limit="5" ref="upload-change-dish"
                               :on-exceed="handleExceed" :before-upload="handleBefore"
                               :on-success="handleSuccess" :on-error="handleError">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="菜名" :label-width="formLabelWidth" prop="dishName">
                    <el-input v-model="dish_form.dishName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                    <el-input v-model.number="dish_form.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签" :label-width="formLabelWidth" prop="tags"><!--就这样prop嘛-->
                    <div class="right">
                        <el-tag closable @close="handleClose(0)"
                                v-if="dish_form.tags.length>=1">
                            {{dish_form.tags[0]}}</el-tag>
                        <el-tag closable @close="handleClose(1)"
                                v-if="dish_form.tags.length>=2" type="success">
                            {{dish_form.tags[1]}}</el-tag>
                        <el-tag closable @close="handleClose(2)"
                                v-if="dish_form.tags.length>=3" type="info">
                            {{dish_form.tags[2]}}</el-tag>
                        <el-tag closable @close="handleClose(3)"
                                v-if="dish_form.tags.length>=4" type="warning">
                            {{dish_form.tags[3]}}</el-tag>
                        <el-tag closable @close="handleClose(4)"
                                v-if="dish_form.tags.length===5" type="danger">
                            {{dish_form.tags[4]}}</el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-if="inputVisible==false&&dish_form.tags.length<5"
                                   class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShow=false">取 消</el-button>
                <el-button type="primary" @click="changeInfo">确 定</el-button>
            </div>
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
                total_star: this.$store.state.dishInfo.star,
                dish_form: {
                    picPathList:[],//菜的图片，还不知道怎么弄
                    dishName: '',
                    price:null,
                    tags:this.$store.state.dishInfo.tags,
                },
                customer_form:{
                    num:1,
                    backup:'',
                    total_price:0
                },//填填
                evaluation:[],      //所有人评价
                value_user:null,
                count: 1000,
                dialogVisible: false,
                inputVisible: false,
                dialogShow:false,
                formLabelWidth: '100px',
                inputValue: '',
                rules: {
                    dishName: [
                        { required: true, message: '请输入菜名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                },
                num: 0,
            }
        },
        methods: {
            open2() {
                this.$message({
                    message: '下单成功啦，美味准备中...',
                    type: 'success'
                });
            },
            handleChange(value) {
                console.log(value);
            },
            handleClose(tag) {
                this.dish_form.tags.splice(tag, 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dish_form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //changeDishInfo!!!!!!!!!，这个是商家编辑按钮
            changeInfo() {
                this.$refs['dish_form'].validate((valid) => {
                    if (valid) {
                        this.num = this.$refs['upload-change-dish'].$children[0].fileList.length
                        if(this.num > 0) {
                            this.$refs['upload-change-dish'].submit()
                        }else{
                            this.dish_form.picPathList = []
                            JS.detail.changeDishInfo(this,this.dish_form)
                        }
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            //customerInfo!!!!!!!!!!，这个是顾客下单按钮
            orderEffect(){
                this.customer_form.total_price=this.$store.state.dishInfo.price*this.customer_form.num;
                this.$refs['customer_form'].validate((valid) => {
                    if (valid) {
                        JS.detail.customerOrder(this,this.customer_form);
                        this.dialogVisible = false;
                        this.open2();
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            handleExceed() {
                this.$message.error('只能上传5张图片！')
            },
            handleBefore(file) {
                console.log('before')
                console.log(file)
                let extend = file.name.substring(file.name.lastIndexOf('.')+1)
                let fileSize = file.size/1024
                if(extend!='jpg' && extend!='png'){
                    this.$message.error('请上传jpg或png格式图片！')
                    return false
                }
                if(fileSize>500){
                    this.$message.error('图片超过500KB！')
                    return false
                }
            },
            handleSuccess(res){
                if(res.status === 1){
                    this.dish_form.picPathList.push(res.url)
                    if(this.num === this.dish_form.picPathList.length){
                        JS.detail.changeDishInfo(this,this.dish_form)
                    }
                }else{
                    console.log(res)
                    this.$message.error('图片上传出错！')
                }
            },
            handleError(err){
                console.log(err)
                this.$message.error('图片上传出错！')
            },
        },
        created() {
            this.loading = this.$loading({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            JS.detail.mounted(this);
        },
        computed: {
            noMore() {
                return this.count >= 5
            },
            disabled() {
                return this.loading || this.noMore
            },
            total_price(){
                    return this.$store.state.dishInfo.price*this.customer_form.num
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
        width: 500px;
        height: 270px;
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: flex-end;
    }

</style>