<template>
    <div style="width: 100%;height: 100%">
        <background :show-head="true">
            <div class="container-dish-page">
                <el-card id="el-card-info" :body-style="{width: '90%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}">
                    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
                        商家信息<el-button @click="dialogShow=true" type="primary" circle icon="el-icon-edit"
                                       v-if="this.$store.state.userInfo.userType==2"></el-button>
                    </div>
                    <div id="host-info">
                        <div style="width: 100%;height: 230px">
                            <img :src="this.$store.state.hostInfo.picPath" style="width: 260px;height: 230px;object-fit: fill"/>
                        </div>
                        <div style="width: 100%;display: flex;flex-direction: column;margin-top: 5%">
                            <span style="font-size: large;color: red">{{this.$store.state.hostInfo.hostName}}</span>
                            <el-rate
                                    v-model="star"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                                    id="stars"
                            v-if="star>0">
                            </el-rate>
                            <span v-else style="color: black;font-family: 'Microsoft YaHei';font-size: large">暂无评分</span>
                            <span>联系方式：{{this.$store.state.hostInfo.phone}}</span>
                            <span>地点：{{this.$store.state.hostInfo.location}}</span>
                            <p>简介：{{this.$store.state.hostInfo.introduction}}</p>
                        </div>
                    </div>
                </el-card>
                <el-card id="el-card-dish" :body-style="{height:'100%'}">
                    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
                        全部菜品<el-button @click="addShow=true" type="primary"
                                       v-if="this.$store.state.userInfo.userType==2">新增菜品+</el-button>
                    </div>
                    <ul :infinite-scroll-disabled="false" style="overflow: auto;width: 950px;height: 500px"
                    v-if="dishList.length>0">
                        <el-card :body-style="{padding:'10px',height:'100%'}" shadow="hover" style="width: 900px;height: 150px;margin-bottom: 20px"
                        v-for="dish in dishList" :key="dish.dishID">
                            <dish_item :info="dish" style="width: 100%;height: 130px"/>
                        </el-card>
                    </ul>
                    <span v-else style="color: black;font-family: 'Microsoft YaHei';font-size: large">暂无菜品哦</span>
                </el-card>
            </div>
        </background>
        <el-dialog title="商家信息" :visible="dialogShow" :show-close="false">
            <el-form :model="host_form" :rules="rules" ref="host_form">
                <el-form-item label="商家名称" :label-width="formLabelWidth" prop="hostName">
                    <el-input v-model="host_form.hostName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="host_form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地点" :label-width="formLabelWidth" prop="location">
                    <el-input v-model="host_form.location" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input
                            type="textarea"
                            :rows="3"
                            v-model="host_form.introduction">
                    </el-input>
                </el-form-item>
                <el-form-item label="样图" :label-width="formLabelWidth">
                    <el-upload :action="this.$store.state.imgUrl" :auto-upload="false" :limit="1" ref="upload-change-host"
                               :on-exceed="handleExceed" :before-upload="handleBefore"
                    :on-success="handleSuccess" :on-error="handleError">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShow=false">取 消</el-button>
                <el-button type="primary" @click="changeInfo">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="商家信息" :visible="addShow" :show-close="false">
            <el-form :model="add_form" :rules="add_rules" ref="add_form">
                <el-form-item label="菜品名称" :label-width="formLabelWidth" prop="dishName">
                    <el-input v-model="add_form.dishName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="add_form.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" :label-width="formLabelWidth" prop="introduction">
                    <el-input
                            type="textarea"
                            :rows="3"
                            v-model="add_form.introduction">
                    </el-input>
                </el-form-item>
                <el-form-item label="样图" :label-width="formLabelWidth">
                    <el-upload :action="this.$store.state.imgUrl" :auto-upload="false" :limit="5" ref="upload-add-dish"
                               :on-exceed="handleExceed" :before-upload="handleBefore"
                    :on-success="handleSuccess2" :on-error="handleError2">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addShow=false">取 消</el-button>
                <el-button type="primary" @click="addDish">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Background from "@/components/background";
    import JS from "@/JS";
    import dish_item from "@/components/dish_item";
    export default {
        name: "Dishes",
        components: {dish_item, Background},
        data() {
            return {
                star: this.$store.state.hostInfo.star,
                num: 0,
                dishList: [],
                dialogShow: false,
                formLabelWidth: '120px',
                host_form: {
                    hostName: this.$store.state.hostInfo.hostName,
                    phone: this.$store.state.hostInfo.phone,
                    location: this.$store.state.hostInfo.location,
                    introduction: this.$store.state.hostInfo.introduction,
                    picPath: '',
                },
                rules: {
                    hostName: [
                        { required: true, message: '请输入商家名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 8, max: 11, message: '请输入正确电话号码', trigger: 'blur' }
                    ],
                    location: [
                        { required: true, message: '请输入地点', trigger: 'blur' },
                        { max: 100, message: '地点过长！', trigger: 'blur' }
                    ],
                    introduction: [
                        { required: true, message: '请输入简介', trigger: 'blur' },
                        { max: 500, message: '简介过长！', trigger: 'blur' }
                    ]
                },
                addShow: false,
                add_form: {
                    dishName: '',
                    price: 0.0,
                    introduction: '',
                    picPathList: [],
                },
                add_rules: {
                    dishName: [
                        { required: true, message: '请输入菜品名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    introduction: [
                        { required: true, message: '请输入简介', trigger: 'blur' },
                        { max: 500, message: '简介过长！', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            changeInfo() {
                this.$refs['host_form'].validate((valid) => {
                    if (valid) {
                        if(this.$refs['upload-change-host'].$children[0].fileList.length > 0) {
                            this.$refs['upload-change-host'].submit()
                        }else {
                            JS.dishes.changeHostInfo(this, this.host_form)
                        }
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            addDish() {
                this.$refs['add_form'].validate((valid) => {
                    if (valid) {
                        if(this.$refs['upload-add-dish'].$children[0].fileList.length===0){
                            this.$message.error('请上传至少一张菜品样图')
                            return false
                        }
                        this.num = this.$refs['upload-add-dish'].$children[0].fileList.length
                        this.$refs['upload-add-dish'].submit()
                        // JS.dishes.addDish(this,this.add_form)//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false
                    }
                });
            },
            handleExceed() {
                this.$message.error('图片数量过多！')
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
                if(res.status == 1){
                    this.host_form.picPath = res.url
                    JS.dishes.changeHostInfo(this,this.host_form)
                }else{
                    console.log(res)
                    this.$message.error('图片上传出错！')
                }
            },
            handleError(err){
                console.log(err)
                this.$message.error('图片上传出错！')
            },
            handleSuccess2(res) {
                if(res.status === 1){
                    this.add_form.picPathList.push(res.url)
                    if(this.num === this.add_form.picPathList.length){
                        JS.dishes.addDish(this,this.add_form)
                    }
                }else{
                    console.log(res)
                    this.$message.error('图片上传出错！')
                }
            },
            handleError2(err){
                console.log(err)
                this.$message.error('图片上传出错！')
            }
        },
        created() {
            this.loading = this.$loading({
                lock: true,
                text: '拼命加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            JS.dishes.mounted(this)
        }
    }
</script>

<style scoped>
    .container-dish-page{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    #el-card-info{
        background: rgba(255,255,255,0.7);
        width: 20%;
    }
    #el-card-dish{
        width: 70%;
        height: 630px;
        background: rgba(255,255,255,0.7);
    }
    #host-info{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
</style>