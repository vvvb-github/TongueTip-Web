import axios from "axios";

export default {
    mounted(vue){
        axios
            .get(vue.SERVICE_PATH+"Orders.json",vue.$store.state.m_hostID)
            .then(function(response)
            {
                vue.hostorders = response["data"]["hostorders"];
            })
            .catch(function(err)
            {
                console.log(err);
            });
    },
    completed(vue,orderID)
    {
        axios
            .get(vue.SERVICE_PATH+"status.json",orderID)
            .then(function(response)
            {
                var status = response["data"]["status"];
                if (status==1)
                    vue.$router.replace("Orders");
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
}