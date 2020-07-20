import axios from "axios";

export default {
    mounted(vue){
        //进入主页，获取全部商家信息
        var data = {
            "type": 1
        }
        axios
            .get(vue.SERVICE_PATH+"home.json",data)
            .then(function(response)
            {
                vue.hostsList = response["data"]["hostsList"];
                vue.recommendList = response["data"]["recommendList"];
                vue.rankList = response["data"]["rankList"];
                vue.hotList = response["data"]["hotList"];
                vue.getRequest(0);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    goDish(vue){
        //找后端要一下m_dishID对应的host并存入vue.$store.state.hostInfo
        axios
            .get(vue.SERVICE_PATH+"host.json",vue.$store.state.dishInfo.m_dishID)
            .then(function(response)
            {
                var hostID = response["data"]["hostID"];
                var hostName = response["data"]["hostName"];
                var hostPhone = response["data"]["hostPhone"];
                var location = response["data"]["location"];
                var star = response["data"]["star"];
                var picPath = response["data"]["picPath"];
                var introduction = response["data"]["introduction"];
                vue.$store.commit('setHostID',hostID);
                vue.$store.commit('setHostName',hostName);
                vue.$store.commit('setHostPhone',hostPhone);
                vue.$store.commit('setHostLocation',location);
                vue.$store.commit('setHostStar',star);
                vue.$store.commit('setHostIcon',picPath);
                vue.$store.commit('setHostIntroduction',introduction);
                vue.$router.replace('detail');
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    search(vue,text){
        axios
            .get(vue.SERVICE_PATH+"search.json",text)
            .then(function(response)
            {
                console.log(response["data"]["recommendList"]);
                vue.hostsList = response["data"]["hostsList"];
                vue.recommendList = response["data"]["recommendList"];
                vue.rankList = response["data"]["rankList"];
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
}