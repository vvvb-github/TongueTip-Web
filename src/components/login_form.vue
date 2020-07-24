<template>
    <div class="container-form">
        <el-input class="item" v-model="phone" placeholder="请输入手机号" maxlength="11" show-word-limit /><br/>
        <el-input class="item" v-model="password" placeholder="请输入密码" show-password/><br/>
        <el-radio-group v-model="type">
            <el-radio :label="1">顾客</el-radio>
            <el-radio :label="2">商家</el-radio>
        </el-radio-group>
        <div class="item">
            <el-button class="item-c" style="color: black" type="text" disabled>还没注册？</el-button>
            <el-button class="item-c" type="text" @click="register">点击注册</el-button>
        </div>
        <div class="item" style="margin-top: 1%">
            <div class="btn-container">
                <el-button id="button-login" class="item-c" type="primary" round @click="login">登录</el-button>
            </div>
            <div class="btn-container">
                <el-button class="item-c" round @click="clear">重置</el-button>
            </div>
        </div>
        <el-alert v-if="error_phone!=''" type="error" center :title="error_phone" show-icon :closable="false" effect="dark"/>
        <el-alert v-if="error_pass!=''" type="error" center :title="error_pass" show-icon :closable="false" effect="dark"/>
    </div>
</template>

<script>
    import JS from "@/JS";

    export default {
        name: "login_form",
        data: function () {
            return {
                phone: '',
                password: '',
                error_phone: false,
                error_pass: false,
                visibility: false,
                type: 1
            }
        },
        methods: {
            login() {
                let isValid = true
                this.error_phone = ''
                this.error_pass = ''
                if(this.phone.length != 11) {
                    this.$message.error("请输入正确的手机号！")
                    isValid = false
                }
                if(this.password.length > 20){
                    this.error_pass = "密码长度过长！"
                    isValid = false
                }
                if(this.password.length < 6){
                    this.$message.error("密码长度过短！")
                    isValid = false
                }
                if (isValid) {
                    this.error_phone = false
                    this.error_pass = false
                    //login
                    JS.profile.login(this,this.phone,this.password,this.type)
                }
            },
            register() {
                this.$router.replace('register')
            },
            clear() {
                this.phone = ''
                this.password = ''
                this.error_phone = ''
                this.error_pass = ''
            },
        },
    }
</script>

<style scoped>
    .container-form{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .item{
        display: flex;
        width: 50%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .btn-container{
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: center;
    }
</style>