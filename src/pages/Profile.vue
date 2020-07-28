<template>
    <background :show-head="true">
        <div class="el-card-basic">
            <el-card :body-style="{height: '100%',display: 'flex',flexDirection: 'column',alignItems: 'center'}"
                     style="width: 420px;height: 450px;background: rgba(255,255,255,0.7)" shadow="hover">
                <img :src="this.$store.state.userInfo.iconPath" style="width: 350px;height: 400px;object-fit: cover"/>
            </el-card>
            <el-card :body-style="info_style" style="width: 420px;height: 450px;background: rgba(255,255,255,0.7)" shadow="hover">
                <div class="div-info">
                    <div class="div-text" v-if="editName">
                        <el-input placeholder="请输入如新昵称" v-model="newName" v-if="editName"></el-input>
                        <el-button icon="el-icon-check" type="success" circle @click="edit(1)"></el-button>
                        <el-button icon="el-icon-delete" type="danger" circle @click="abd(1)"></el-button>
                    </div>
                    <div v-else class="div-text">
                        <span style="font-size: xx-large;color: purple;font-family: 'Microsoft YaHei';font-weight: bold">
                            {{this.$store.state.userInfo.userName}}
                        </span>
                        <el-button icon="el-icon-edit" circle type="text" @click="editName=true"></el-button>
                    </div>
                    <div v-if="editPhone" class="div-text">
                        <el-input maxlength="11" placeholder="请输入如新手机号" v-model="newPhone" v-if="editPhone"></el-input>
                        <el-button icon="el-icon-check" type="success" circle @click="edit(2)"></el-button>
                        <el-button icon="el-icon-delete" type="danger" circle @click="abd(2)"></el-button>
                    </div>
                    <div v-else class="div-text">
                        <span class="span-text">手机号：{{this.$store.state.userInfo.userPhone}}</span>
                        <el-button icon="el-icon-edit" circle type="text" @click="editPhone=true"></el-button>
                    </div>
                    <div class="div-text">
                        <span class="span-text">身份：{{this.$store.state.userInfo.userType==1? '顾客':'商家'}}</span>
                    </div>
                    <div class="div-text" v-if="editPass">
                        <el-input maxlength="11" placeholder="请输入如新密码" v-model="newPass" v-if="editPass"></el-input>
                        <el-button icon="el-icon-check" type="success" circle @click="edit(3)"></el-button>
                        <el-button icon="el-icon-delete" type="danger" circle @click="abd(3)"></el-button>
                    </div>
                    <div v-else class="div-text">
                        <span style="cursor: pointer;color: dodgerblue" class="span-text" circle type="text" @click="editPass=true">
                            修改密码
                        </span>
                    </div>
                    <div v-if="editAvatar">
                        <el-upload :action="this.$store.state.imgUrl" list-type="text" :auto-upload="false" :limit="1"
                                   :on-exceed="handleExceed" ref="upload-avatar" :before-upload="handleBefore" :on-success="handleSuccess"
                                   :on-error="handleError">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                        </el-upload>
                        <div style="display: flex;justify-content: space-around;align-items: center;margin-top: 20px">
                            <el-button icon="el-icon-check" type="success" circle @click="edit(4)"></el-button>
                            <el-button icon="el-icon-delete" type="danger" circle @click="abd(4)"></el-button>
                        </div>
                    </div>
                    <div v-else class="div-text">
                        <span style="cursor: pointer;color: dodgerblue" class="span-text" circle type="text" @click="editAvatar=true">
                            修改头像
                        </span>
                    </div>
                </div>
            </el-card>
        </div>
    </background>
</template>

<script>
    import Background from "@/components/background";
    import JS from "@/JS";
    export default {
        name: "Profile",
        components: {Background},
        data() {
            return {
                info_style: {
                    height: '90%',
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10%'
                },
                editName: false,
                newName: this.$store.state.userInfo.userName,
                editPhone: false,
                newPhone: this.$store.state.userInfo.userPhone,
                editPass: false,
                newPass: '',
                editAvatar: false,
                newAvatar: '',
            }
        },
        methods: {
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
            handleSuccess(res){
                if(res.status === 1){
                    this.newAvatar = res.url
                    JS.profile.editUserInfo(this,4,this.newAvatar)
                }else{
                    console.log(res)
                    this.$message.error('图片上传出错！')
                }
            },
            handleError(err){
                console.log(err)
                this.$message.error('图片上传出错！')
            },
            edit(id){
                if(id == 1){
                    JS.profile.editUserInfo(this,1,this.newName)
                    this.editName = false
                }else if(id === 2){
                    JS.profile.editUserInfo(this,2,this.newPhone)
                    this.editPhone = false
                }else if(id === 3){
                    JS.profile.editUserInfo(this,3,this.newPass)
                    this.editPass = false
                }else{
                    if(this.$refs['upload-avatar'].$children[0].fileList.length==0){
                        this.$message.error('请上传头像！')
                    }else{
                        this.$refs['upload-avatar'].submit()
                    }
                }
            },
            abd(id){
                if(id == 1){
                    this.newName = this.$store.state.userInfo.userName
                    this.editName = false
                }else if(id === 2){
                    this.newPhone = this.$store.state.userInfo.userPhone
                    this.editPhone = false
                }else if(id === 3){
                    this.newPass = ''
                    this.editPass = false
                }else{
                    this.newAvatar = ''
                    this.editAvatar = false
                }
            }
        }
    }
</script>

<style scoped>
    .el-card-basic{
        width: 70%;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .div-info{
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 5%;
    }
    .span-text{
        font-family: "Microsoft YaHei";
        font-size: larger;
    }
    .div-text{
        width: 250px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: flex-start;
    }
</style>