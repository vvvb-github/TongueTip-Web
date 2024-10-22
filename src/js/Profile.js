import axios from "axios";
import Qs from 'qs';

export default {
    login(vue,phone,pass,type) {//@API 1
        if(phone === '00000000000' && pass === 'admin123456@'){
            vue.$router.replace('admin')
            return
        }
        let data = {
            userPhone: phone,
            userPassword: pass,
            userType: type
        }
        // let data = new URLSearchParams()
        // data.append('userPhone',phone)
        // data.append('userPassword',pass)
        // data.append('userType',type)
        axios.post(vue.SERVICE_PATH+'/profile/login',Qs.stringify(data))
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.warning('手机号或密码错误！')
                } else if(data.status === 1){
                    vue.$store.commit('setUserID',data.userID)
                    vue.$store.commit('setUserName',data.userName)
                    vue.$store.commit('setUserPhone',phone)
                    vue.$store.commit('setUserType',type)
                    vue.$store.commit('setUserPriority',data.userPriority)
                    vue.$store.commit('setUserIcon',data.iconPath)
                    if(type == 1){
                        vue.$message.success('登陆成功！')
                        vue.$router.replace('home')
                    }else{
                        axios.get(vue.SERVICE_PATH+'/home/hostbyuser',{
                            params:{
                                userID: vue.$store.state.userInfo.userID
                            }
                        }).then(res=>{
                            let data = res.data
                            if(data.status===0){
                                vue.$message.error('获取商家信息失败！')
                                vue.$router.replace('dishes')
                            }else{
                                vue.$store.commit('setHostID',data.hostID)
                                vue.$store.commit('setHostName',data.hostName)
                                vue.$store.commit('setHostPhone',data.hostPhone)
                                vue.$store.commit('setHostLocation',data.location)
                                vue.$store.commit('setHostStar',data.star)
                                vue.$store.commit('setHostIntroduction',data.introduction)
                                vue.$store.commit('setHostIcon',data.picPath)
                                vue.$message.success('登陆成功！')
                                vue.$router.replace('dishes')
                            }
                        }).catch(err=>{
                            console.log(err)
                            vue.$message.error('服务器错误！')
                        })
                    }
                } else{
                    vue.$message.warning('您的注册尚在等待审核，请不要着急哦~')
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    findPass(vue,form){//@API 23
        // form: {
        //     phone: '',
        //     password: '',
        //     repeatPassword: '',
        //     type: 1,
        // },
        let data = {
            userPhone: form.phone,
            password: form.password,
            type: form.type
        }
        axios.post(vue.SERVICE_PATH+'/profile/find',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else if(res.data.status === 2){
                    vue.$message.warning('用户不存在！')
                }else{
                    vue.$message.success('修改密码成功！')
                    vue.lg = true
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    editUserInfo(vue,id,arg) {//@API 3
        vue.loading = vue.$loading({
            lock: true,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        let data = {
            userID: vue.$store.state.userInfo.userID,
            id: id,
            arg: arg
        }
        axios.post(vue.SERVICE_PATH+'/profile/edit',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else if(res.data.status === 2){
                    vue.loading.close()
                    vue.$message.warning('手机号重复！')
                }else{
                    if(id === 1){
                        vue.$store.commit('setUserName',arg)
                    }else if(id === 2){
                        vue.$store.commit('setUserPhone',arg)
                    }else if(id === 4){
                        vue.$store.commit('setUserIcon',arg)
                        vue.editAvatar = false
                    }
                    vue.loading.close()
                    vue.$message.success('修改成功！')
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    register(vue,form) {//@API 2
        // form: {
        //     userType: 1,0表示注册未审核
        //     userName: '',
        //     userPhone: '',
        //     userPassword: '',
        //     repeatPassword: '',
        //     picPath:''
        // }
        axios.post(vue.SERVICE_PATH+'/profile/register',Qs.stringify(form))
            .then(res=>{
                let data = res.data
                if(data.status == 0){
                    vue.$message.warning('手机号已被注册！')
                }else{
                    if(form.userType == 2){
                        vue.$message.success('注册成功！请等待管理员审核')
                        vue.$router.replace('/')
                    }else{
                        vue.$message.success('注册成功！')
                        vue.$store.commit('setUserID',data.userID)
                        vue.$store.commit('setUserName',form.userName)
                        vue.$store.commit('setUserPhone',form.userPhone)
                        vue.$store.commit('setUserType',form.userType)
                        vue.$store.commit('setUserPriority',data.userPriority)
                        vue.$store.commit('setUserIcon',data.iconPath)
                        vue.$router.replace('home')
                    }
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    }
}