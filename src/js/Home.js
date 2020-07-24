import axios from "axios";

export default {
    mounted(vue){//@API 5
        //进入主页，获取全部商家信息
        axios.get(vue.SERVICE_PATH+'/home/get')
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.hostList = data.hostList
                    vue.recommendList = data.recommendList
                    vue.rankList = data.rankList
                    vue.hotList = data.hotList
                    vue.$store.state.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    goDish(vue){//@API 6
        //找后端要一下dishID对应的host并存入vue.$store.state.hostInfo
        axios.get(vue.SERVICE_PATH+'home/hostbydish',{params:{dishID:vue.$store.state.dishInfo.dishID}})
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$store.commit('setHostID',data.hostID)
                    vue.$store.commit('setHostName',data.hostName)
                    vue.$store.commit('setHostPhone',data.phone)
                    vue.$store.commit('setHostLocation',data.location)
                    vue.$store.commit('setHostStar',data.star)
                    vue.$store.commit('setHostIcon',data.picPath)
                    vue.$store.commit('setHostIntroduction',data.introduction)
                    vue.$router.replace('detail')
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    search(vue,text){
        console.log(vue,text)
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!搜索功能！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    }
}