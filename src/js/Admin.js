import axios from "axios";

export default {
    accept(vue,i) {//@API 19
        //通过审核，checkList是拿到的审核列表，i是被你询问审核的下标
        axios.get(vue.SERVICE_PATH+'/admin/accept',{params:{checkID:vue.checkList[i].checkID}})
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$message.success('已通过该注册审核')
                    vue.checkList.splice(i,1)
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    reject(vue,i) {//@API 20
        //不通过审核
        axios.get(vue.SERVICE_PATH+'/admin/reject',{params:{checkID:vue.checkList[i].checkID}})
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$message.warning('已驳回该注册审核')
                    vue.checkList.splice(i,1)
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    mounted(vue) {//@API 18
        //审核ID，审核图片url，审核的userID
        axios.get(vue.SERVICE_PATH+'/admin/get')
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.checkList = data.checkList
                    vue.$store.state.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
}