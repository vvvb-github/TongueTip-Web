import axios from "axios";

export default {
    hostList: [],
    recommendList: [],
    rankList: [],

    mounted(vue){//@API 5
        //进入主页，获取全部商家信息
        axios.get(vue.SERVICE_PATH+'/home/get',{params:{userID:vue.$store.state.userInfo.userID}})
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    this.hostList = data.hostList
                    this.recommendList = data.recommendList
                    this.rankList = data.rankList
                    vue.hostList = this.hostList
                    vue.recommendList = this.recommendList
                    vue.rankList = this.rankList
                    vue.hotList = data.hotList
                    vue.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    goDish(vue){//@API 6
        //找后端要一下dishID对应的host并存入vue.$store.state.hostInfo
        axios.get(vue.SERVICE_PATH+'/home/hostbydish',{params:{dishID:vue.$store.state.dishInfo.dishID}})
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
    getHostByID(vue){//@API 21
        axios.get(vue.SERVICE_PATH+'/home/hostbyid',{params:{hostID:vue.$store.state.hostInfo.hostID}})
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$store.commit('setHostName',data.hostName)
                    vue.$store.commit('setHostPhone',data.phone)
                    vue.$store.commit('setHostLocation',data.location)
                    vue.$store.commit('setHostStar',data.star)
                    vue.$store.commit('setHostIcon',data.picPath)
                    vue.$store.commit('setHostIntroduction',data.introduction)
                    vue.$router.replace('dishes')
                }
            })
    },
    search(vue,text){
        vue.load = vue.$loading({
            lock: true,
            text: '搜索中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        if(text === ''){
            vue.hostList = this.hostList
            vue.rankList = this.rankList
            vue.recommendList = this.recommendList
        }else {
            vue.hostList = []
            vue.recommendList = []
            vue.rankList = []
            for (let i=0;i<this.hostList.length;++i) {
                console.log(this.hostList[i].hostName,text)
                if (this.hostList[i].hostName === text) {
                    vue.hostList.push(this.hostList[i])
                }
            }
            for (let i=0;i<this.recommendList.length;++i) {
                if (this.recommendList[i].hostName === text) {
                    vue.recommendList.push(this.recommendList[i])
                }
            }
            for (let i=0;i<this.rankList.length;++i) {
                if (this.rankList[i].hostName === text) {
                    vue.rankList.push(this.rankList[i])
                }
            }
        }
        console.log(vue.hostList)
        vue.load.close()
    }
}