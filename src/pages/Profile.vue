<template>
    <background :show-head="true">
        <div class="el-card-basic">
            <el-card :body-style="{height: '100%',display: 'flex',flexDirection: 'column',alignItems: 'center'}"
                     style="width: 40%;height: 92%;background: rgba(255,255,255,0.7)" shadow="hover">
                <div style="width: 90%;height: 65%">
                    <img :src="this.$store.state.userInfo.iconPath" style="width: 350px;height: 400px;object-fit: cover"/>
                </div>
                <div style="width: 90%;height: 30%;display: flex;justify-content: center;align-items: center">
                    <span style="color: rebeccapurple;font-size: xx-large;font-family: 'Microsoft YaHei'">{{this.$store.state.userInfo.userName}}</span>
                </div>
            </el-card>
            <el-card :body-style="info_style" style="width: 40%;height: 92%;background: rgba(255,255,255,0.7)" shadow="hover">
                <div class="div-info" v-if="!inEditing">
                    <el-button icon="el-icon-edit" style="background-color: orangered;margin-bottom: 5%"
                               @click="inEditing=true">编辑</el-button>
                    <span class="info-item">手机号：{{this.$store.state.userInfo.userPhone}}</span><br>
                    <span class="info-item">身份：{{this.$store.state.userInfo.userType==1? '顾客':'商家'}}</span>
                    <div style="width: 90%;height: 70%;margin-top: 5%;">
                    </div>
                </div>
                <div class="div-info" v-else>
                    <div style="display: flex;justify-content: center">
                        <el-button icon="el-icon-check" type="success" circle @click="edit_info"></el-button>
                        <el-button icon="el-icon-delete" type="danger" circle @click="inEditing=false;"></el-button>
                    </div>
                    <el-form :model="editInfo" ref="editInfo" :rules="rules">
                        <el-form-item class="edit-item" prop="userName">
                            <el-input placeholder="请输入昵称" v-model="editInfo.userName"></el-input>
                        </el-form-item>
                        <el-form-item class="edit-item" prop="userPhone">
                            <el-input placeholder="请输入手机号" v-model="editInfo.userPhone" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item class="edit-item" prop="userPassword">
                            <el-input placeholder="请设置密码" v-model="editInfo.userPassword" show-password maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="edit-item">
                            <el-upload :action="this.$store.state.imgUrl" :auto-upload="false" :limit="1" ref="upload-add-avatar"
                                       :on-exceed="handleExceed" :before-upload="handleBefore"
                            :on-success="handleSuccess" :on-error="handleError">
                                <el-button size="small" type="primary">点击上传头像</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
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
                inEditing: false,
                editInfo: {
                    userName: '',
                    userPhone: '',
                    userPassword: '',
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
                }
            }
        },
        methods: {
            edit_info() {
                this.$refs['editInfo'].validate((valid) => {
                    if (valid) {
                        if(this.$refs['upload-add-avatar'].$children[0].fileList.length > 0) {
                            this.$refs['upload-add-avatar'].submit()
                        }else {
                            JS.profile.editUserInfo(this, this.editInfo)
                        }
                    }
                    else {
                        this.$message.error('提交出错！')
                        return false;
                    }
                });
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
            handleSuccess(res){
                if(res.status === 1){
                    this.editInfo.picPath = res.url
                    JS.profile.editUserInfo(this,this.editInfo)
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
</style>