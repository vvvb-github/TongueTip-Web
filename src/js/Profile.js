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
                console.log(res)
                let data = res.data
                if(data.status === 0){
                    vue.$message.warning('手机号或密码错误！')
                }else{
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
                            let data = res
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
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    editUserInfo(vue,newInfo) {//@API 3
        // newInfo: {
        //     userName: '',
        //     userPhone: '',
        //     userPassword: ',
        //     picPath: '' 允许空
        // },
        let data = {
            userID: vue.$store.state.userInfo.userID,
            userName: newInfo.userName,
            userPhone: newInfo.userPhone,
            userPassword: newInfo.userPassword,
            picPath: newInfo.picPath
        }
        axios.post(vue.SERVICE_PATH+'/profile/edit',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$message.success('修改成功！')
                    if(newInfo.picPath != '') {
                        vue.$store.commit('setUserIcon', newInfo.picPath)
                    }
                    vue.$store.commit('setUserName',newInfo.userName)
                    vue.$store.commit('setUserPhone',newInfo.userPhone)
                    vue.inEditing = false
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
                    vue.$message.error('服务器错误！')
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