import axios from "axios";

export default {
    mounted(vue){
        axios
            .get(vue.SERVICE_PATH+"Detail.json",vue.$store.state.m_dishID)
            .then(function(response)
            {
                console.log(231645);
                vue.img_list = response["data"]["img_list"];
                vue.Dish_name = response["data"]["Dish_name"];
                vue.price = response["data"]["price"];
                vue.sales = response["data"]["sales"];
                vue.total_star = response["data"]["total_star"];
                vue.evaluation = response["data"]["evaluation"];
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
}