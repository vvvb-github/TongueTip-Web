<template>
    <div class="container-bg">
        <div id="back">
            <transition v-for="i in imgUrl.length" :key="i" name="el-fade-in-linear">
                <img :src="imgUrl[i-1]" v-show="idx==i-1" style="width: 100%;height: 100%;object-fit: fill"/>
            </transition>
        </div>
        <div id="content">
            <div class="head" v-if="show">
                <div class="head-item" id="user">
                    <el-avatar id="user-icon"
                               size="large"
                               fit="fill"
                               :src="this.$store.state.userInfo.iconPath"
                               style="cursor: pointer" @click="goInfo"/>
                    <el-dropdown id="el-drop-group" @command="handleClick">
                    <span class="el-dropdown-link">
                    {{this.$store.state.userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">个人信息</el-dropdown-item>
                            <el-dropdown-item command="d">返回主页</el-dropdown-item>
                            <el-dropdown-item command="e">{{this.$store.state.userInfo.userType==1? '我的订单':'订单管理'}}</el-dropdown-item>
                            <el-dropdown-item command="b">退出登录</el-dropdown-item>
<!--                            <el-dropdown-item command="c">注销</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="head-item" id="middle">
                    <slot name="head"></slot>
                </div>
                <div class="head-item" id="icon"><img id="img" src="../assets/shejian.png"/> </div>
            </div>
            <hr id="line" v-if="show"/>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "background",
        data() {
            return {
                idx: 0,
                imgUrl: [
                    require('@/assets/0.jpg'),
                    require('@/assets/1.jpg'),
                    require('@/assets/2.jpg')
                ],
                timer: '',
                show: this.showHead
            }
        },
        methods: {
            handleClick(command) {
                switch (command) {
                    case 'a': {
                        this.$router.replace('profile')
                        break
                    }
                    case 'b': {
                        this.$router.replace('/')
                        break
                    }
                    case 'c': {
                        this.$router.replace('/')
                        break
                    }
                    case 'd': {
                        let url = (this.$store.state.userInfo.userType==1? 'home':'dishes')
                        this.$router.replace(url)
                        break
                    }
                    case 'e': {
                        let url = (this.$store.state.userInfo.userType==1? 'order':'orders')
                        this.$router.replace(url)
                    }
                }
            },
            change() {
                this.idx = (this.idx + 1) % 3
            },
            goInfo() {
                this.$router.replace('profile')
            }
        },
        mounted() {
            this.timer = setInterval(this.change,10000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        props: {
            showHead: Boolean
        }
    }
</script>

<style scoped>
    .container-bg{
        width: 100%;
        height: 100%;
    }
    #back{
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
    }
    #content{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        position: absolute;
    }
    .head{
        display: flex;
        width: 100%;
        height: 10%;
        flex-direction: row;
        align-items: center;
        background: rgba(255,255,255,0.9);
    }
    #user{
        width: 15%;
        display: flex;
        height: 100%;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    #middle{
        width: 70%;
        height: 100%;
    }
    #icon{
        width: 15%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
    }
    #img{
        width: 70%;
        height: 100%;
        object-fit: fill;
        margin-right: 10%;
    }
    #line{
        width: 100%;
        height: 0.5%;
        background-color: dimgrey;
        margin-top: 0;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: purple;
        font-size: large;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    #el-drop-group{
        margin-left: 10%;
    }
    #user-icon{
        margin-left: 10%;
    }
    #user-icon{
        width: 5em;
        height: 5em;
    }
</style>