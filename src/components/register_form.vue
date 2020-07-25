<template>
    <el-form :rules="rules" ref="form" :model="form" label-width="40%">
        <el-form-item class="item" label="用户类型" prop="userType">
            <el-radio-group v-model="form.userType">
                <el-radio :label="1">顾客</el-radio>
                <el-radio :label="2">商家</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="item" label="用户昵称" prop="userName">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item class="item" label="密码" prop="userPassword">
            <el-input v-model="form.userPassword" show-password maxlength="20"></el-input>
        </el-form-item>
        <el-form-item class="item" label="确认密码" prop="repeatPassword">
            <el-input v-model="form.repeatPassword" show-password maxlength="20"></el-input>
        </el-form-item>
        <el-form-item class="item" label="手机号码" prop="userPhone">
            <el-input v-model="form.userPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item class="item" label="验证码">
            <el-input maxlength="6" placeholder="请输入验证码" v-model="userCheckCode"></el-input>
            <el-button type="text" :disabled="form.userPhone.length<11" @click="check">发送验证</el-button>
        </el-form-item>
        <el-form-item class="item" label="营业执照" v-if="form.userType==2">
            <el-upload :action="this.$store.state.imgUrl" list-type="text" :auto-upload="false" :limit="1"
            :on-exceed="handleExceed" ref="upload-register" :before-upload="handleBefore" :on-success="handleSuccess"
            :on-error="handleError">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
            </el-upload>
        </el-form-item>
        <div id="btn-container">
            <div class="btn"><el-button type="primary" round @click="submitForm('form')">注册</el-button></div>
            <div class="btn"><el-button round @click="resetForm('form')">重置</el-button></div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center">
            <el-button type="text" :disabled="true" style="color: black">已有帐号？</el-button>
            <el-button type="text" @click="login">点击登录</el-button>
        </div>
    </el-form>
</template>

<script>
    import JS from "@/JS";

    export default {
        name: "register_form",
        data() {
            return {
                checkCode: '0000000',
                userCheckCode: '',
                form: {
                    userType: 1,
                    userName: '',
                    userPhone: '',
                    userPassword: '',
                    repeatPassword: '',
                    picPath: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                    ],
                    userPhone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }
                    ],
                    userPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度必须在6到20', trigger: 'blur' }
                    ],
                    repeatPassword: [
                        { required: true, validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'));
                                } else if (value !== this.form.userPassword) {
                                    callback(new Error('两次输入密码不一致!'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.checkCode!=this.userCheckCode){
                            this.$message.error("验证码错误！")
                        }else if(this.form.userType==2 && this.$refs['upload-register'].$children[0].fileList.length==0){
                            this.$message.error('请上传营业执照！')
                        }else{
                            if(this.form.userType==2) {
                                this.$refs['upload-register'].submit()
                            }else{
                                this.form.picPath = ''
                                JS.profile.register(this,this.form)
                            }
                        }
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            check() {
                let code = ''
                for (let i=0;i<6;++i){
                    code += Math.floor(Math.random()*10)
                }
                this.checkCode = code
                this.$message.warning(this.checkCode)
            },
            handleExceed() {
                this.$message.error('只能上传1张图片！')
            },
            handleBefore(file) {
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
            login(){
                this.$router.replace('/')
            },
            handleSuccess(res){
                if(res.status === 1){
                    this.form.picPath = res.url
                    JS.profile.register(this,this.form)
                }else{
                    console.log(res)
                    this.$message.error('图片上传出错！')
                }
            },
            handleError(err){
                console.log(err)
                this.$message.error('图片上传出错！')
            }
        }
    }
</script>

<style scoped>
    .item{
        width: 80%;
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
    }
    #btn-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>