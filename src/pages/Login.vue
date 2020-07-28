<template>
    <background :show-head="false">
        <el-card :body-style="bodyStyle" class="container" v-if="lg">
            <img class="shejian" src="../assets/shejian.png"/>
            <login_form class="form"></login_form>
            <div>
                <el-button :disabled="true" type="text" style="color: black">忘记密码？</el-button>
                <el-button type="text" @click="findPass">点击找回</el-button>
            </div>
        </el-card>
        <el-card v-else class="container" :body-style="bodyStyle">
            <img class="shejian" src="../assets/shejian.png"/>
            <el-form :rules="rules" ref="fd-form" :model="form">
                <el-form-item class="item" label="用户类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="1">顾客</el-radio>
                        <el-radio :label="2">商家</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="f-item" prop="phone">
                    <el-input v-model="form.phone" maxlength="11" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item class="f-item" prop="password">
                    <el-input v-model="form.password" maxlength="20" placeholder="请输入新密码" show-password></el-input>
                </el-form-item>
                <el-form-item class="f-item" prop="repeatPassword">
                    <el-input v-model="form.repeatPassword" maxlength="20" placeholder="请确认密码" show-password></el-input>
                </el-form-item>
                <el-form-item class="f-item">
                    <el-input maxlength="6" placeholder="请输入验证码" v-model="userCode"></el-input>
                    <el-button type="text" :disabled="form.phone.length<11" @click="check">发送验证</el-button>
                </el-form-item>
            </el-form>
            <div style="width: 200px;display: flex;justify-content: space-around">
                <div class="btn"><el-button type="primary" round @click="submitForm('fd-form')">确定</el-button></div>
                <div class="btn"><el-button round @click="resetForm('fd-form')">重置</el-button></div>
            </div>
            <div style="display: flex;justify-content: center;align-items: center">
                <el-button type="text" :disabled="true" style="color: black">已有帐号？</el-button>
                <el-button type="text" @click="lg=true">点击登录</el-button>
            </div>
        </el-card>
    </background>
</template>

<script>
    import login_form from "@/components/login_form";
    import Background from "@/components/background";
    import JS from "@/JS";

    export default {
        name: "Login",
        components: {
            Background,
            login_form
        },
        data() {
            return {
                bodyStyle: {
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'column',
                    padding: '0'
                },
                lg: true,
                userCode: '',
                code: '0000000',
                form: {
                    phone: '',
                    password: '',
                    repeatPassword: '',
                    type: 1
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度必须在6到20', trigger: 'blur' }
                    ],
                    repeatPassword: [
                        { required: true, validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'));
                                } else if (value !== this.form.password) {
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
            findPass() {
                this.lg = false
            },
            check() {
                let code = ''
                for (let i=0;i<6;++i){
                    code += Math.floor(Math.random()*10)
                }
                this.code = code
                this.$message.warning(this.code)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.code!=this.userCode){
                            this.$message.error("验证码错误！")
                        }else{
                            JS.profile.findPass(this,this.form)
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
        }
    }
</script>

<style scoped>
    .container{
        width: 70%;
        height: 88%;
        background: rgba(255,255,255,0.7);
        margin-top: 3%;
    }
    .form{
        width: 50%;
        margin-top: 50px;
    }
    .shejian{
        width: 300px;
        height: 200px;
        object-fit: fill;
    }
    .f-item{
        width: 250px;
    }
</style>