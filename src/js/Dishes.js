import axios from "axios";
import Qs from 'qs';

export default {
    mounted(vue){//@API 9
        //要这家店的菜品数据
        axios.get(vue.SERVICE_PATH+'/dish/get',{params:{hostID:vue.$store.state.hostInfo.hostID}})
            .then(res=>{
                console.log(res)
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    for(let i=0;i<data.dishList.length;i++){
                        data.dishList[i].picPath = data.dishList[i].picPath.split('+')[0]
                    }
                    vue.dishList = data.dishList
                    vue.$store.state.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    changeHostInfo(vue,form){//@API 8
        // form: {
        //     hostName: '',
        //     phone: '',
        //     location: '',
        //     introduction: ''
        //     picPath:''
        // },
        let data = {
            hostID: vue.$store.state.hostInfo.hostID,
            hostName: form.hostName,
            phone: form.phone,
            location: form.location,
            introduction: form.introduction,
            picPath: form.picPath
        }
        axios.post(vue.SERVICE_PATH+'/home/edit',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$store.commit('setHostName',form.hostName)
                    vue.$store.commit('setHostPhone',form.phone)
                    vue.$store.commit('setHostLocation',form.location)
                    vue.$store.commit('setHostIntroduction',form.introduction)
                    if(form.picPath!=='')
                        vue.$store.commit('setHostIcon',form.picPath)
                    vue.$message.success('修改成功！')
                    vue.dialogShow = false
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    addDish(vue,form){//@API 10
        // add_form: {
        //     dishName: '',
        //     price: 0.0,
        //     introduction: '',
        //     picPathList: [],菜品样图列表，不超过5张
        // },
        let data = {
            hostID: vue.$store.state.hostInfo.hostID,
            dishName: form.dishName,
            price: form.price,
            introduction: form.introduction,
            picPathList: form.picPathList.join('+')
        }
        axios.post(vue.SERVICE_PATH+'/dish/add',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$message.success('添加菜品成功！')
                    this.mounted(vue)
                    vue.addShow = false
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    }
}