import axios from "axios";

export default {
    login(vue,phone,pass,type) {
        // 用户按下登录
        // 请求，拿数据，如果是商家用户，额外拿一个店铺信息，记得存进Vuex
        var userinfo ={
            "phone":phone,
            "password":pass,
            "type":type
        }
        axios
            .get(vue.SERVICE_PATH+"login.json",userinfo)
            .then(function(response)
            {
                var status = response["data"]["status"];
                var userID = response["data"]["userID"];
                var userName = response["data"]["userName"];
                var userPriority = response["data"]["userPriority"];
                var iconPath = response["data"]["iconPath"];
                vue.$store.commit('setUserID',userID);
                vue.$store.commit('setUserName',userName);
                vue.$store.commit('setUserPriority',userPriority);
                vue.$store.commit('setUserIcon',iconPath);
                vue.$store.commit('setUserPhone',phone);
                vue.$store.commit('setUserType',type);
                if (type==2)
                    axios
                        .get(vue.SERVICE_PATH+"host.json",userID)
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

                        })
                        .catch(function(err)
                        {
                            console.log(err);
                        });
                vue.getRequest(status);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    editUserInfo(vue,newInfo) {
        // newInfo: {
        //     m_userName: '',
        //     m_userPhone: '',
        //     m_userPassword: ',
        //     m_picPath: '' 允许空
        // },
        axios
            .get(vue.SERVICE_PATH+"status.json",newInfo)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                {
                    vue.$store.commit('setUserName',newInfo.m_userName);
                    vue.$store.commit('setUserPhone',newInfo.m_userPhone);
                    if (newInfo.m_picPath!="")
                        vue.$store.commit('setUserIcon',newInfo.m_picPath);
                }
                vue.getRequest(status);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    register(vue,form) {
        // form: {
        //     userType: 1,0表示注册未审核
        //     userName: '',
        //     userPhone: '',
        //     userPassword: '',
        //     repeatPassword: '',
        //     picPath:''
        // }
        axios
            .get(vue.SERVICE_PATH+"register.json",form)
            .then(function(response)
            {
                var User_ID=response["data"]["User_ID"];
                console.log(User_ID);
                if (form.userType==2)
                    form.userType=0;
                vue.$store.commit('setUserID',User_ID);
                vue.$store.commit('setUserType',form.userType);
                vue.$store.commit('setUserName',form.userName);
                vue.$store.commit('setUserPhone',form.userPhone);
                vue.$store.commit('setUserPriority',0);
                vue.getRequest(0);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
}