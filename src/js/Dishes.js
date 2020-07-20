import axios from "axios";

export default {
    mounted(vue){
        //要这家店的菜品数据
        axios
            .get(vue.SERVICE_PATH+"dishes.json",vue.$store.state.hostInfo.m_hostID)
            .then(function(response)
            {
                vue.dishList = response["data"]["dishList"];
                vue.getRequest(0);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    changeHostInfo(vue,form){
        // form: {
        //     hostName: '',
        //     phone: '',
        //     location: '',
        //     introduction: ''
        //     picPath:''
        // },
        axios
            .get(vue.SERVICE_PATH+"status.json",form)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                {
                    vue.$store.commit('setHostName',form.hostName);
                    vue.$store.commit('setHostPhone',form.phone);
                    vue.$store.commit('setHostLocation',form.location);
                    vue.$store.commit('setHostIntroduction',form.introduction);
                    if (form.picPath!="")
                        vue.$store.commit('setHostIcon',form.picPath);
                }
                vue.getRequest(status);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    addDish(vue,form){
        // add_form: {
        //     dishName: '',
        //     price: 0.0,
        //     introduction: '',
        //     picPathList: [],菜品样图列表，不超过5张
        // },
        axios
            .get(vue.SERVICE_PATH+"status.json",form)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                    vue.$router.replace('dishes');
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
}