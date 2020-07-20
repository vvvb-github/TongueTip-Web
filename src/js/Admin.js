import axios from "axios";

export default {
    accept(vue,i) {
        //通过审核，checkList是拿到的审核列表，i是被你询问审核的下标
        axios
            .get(vue.SERVICE_PATH+"status.json",vue.checkList[i].m_checkID)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                    vue.checkList.splice(i,1)//直接前端去掉这个审核
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    reject(vue,i) {
        //不通过审核
        axios
            .get(vue.SERVICE_PATH+"status.json",vue.checkList[i].m_checkID)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                    vue.checkList.splice(i,1)//直接前端去掉这个审核
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    mounted(vue) {
        //审核ID，审核图片url，审核的userID
        axios
            .get(vue.SERVICE_PATH+"checkList.json")
            .then(function(response)
            {
                vue.checkList = response["data"]["checkList"];
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
}