import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        payCode: '',
        loading: null,
        imgUrl: 'http://jiekou.jinshangcheng.com.cn/api/admin/image',
        userInfo: {
            userID: 0,
            userName: '',
            userPhone: '',
            userType: 0,
            userPriority: 0,
            iconPath: ''
        },
        hostInfo: {
            hostID: 0,
            hostName: '',
            phone: '',
            location: '',
            star: 0,
            picPath: '',
            introduction: ''
        },
        dishInfo: {
            dishID: 0,
            picPathList:[],
            dishName:'',
            price:0,
            sales:0,
            star:0,
            tags:[]
        },
        orderInfo: []
    },
    mutations:{
        setUserID(state,payload){
            state.userInfo.userID = payload
        },
        setUserName(state,payload){
            state.userInfo.userName = payload
        },
        setUserPhone(state,payload){
            state.userInfo.userPhone = payload
        },
        setUserType(state,payload){
            state.userInfo.userType = payload
        },
        setUserPriority(state,payload){
            state.userInfo.userPriority = payload
        },
        setUserIcon(state,payload){
            state.userInfo.iconPath = payload
        },
        setHostID(state,payload){
            state.hostInfo.hostID = payload
        },
        setHostName(state,payload){
            state.hostInfo.hostName = payload
        },
        setHostPhone(state,payload){
            state.hostInfo.phone = payload
        },
        setHostLocation(state,payload){
            state.hostInfo.location = payload
        },
        setHostStar(state,payload){
            state.hostInfo.star = payload
        },
        setHostIcon(state,payload){
            state.hostInfo.picPath = payload
        },
        setHostIntroduction(state,payload){
            state.hostInfo.introduction = payload
        },
        setDishID(state,payload){
            state.dishInfo.dishID = payload
        },
        setImgList(state,payload){
            state.dishInfo.picPathList = payload
        },
        setDishName(state,payload){
            state.dishInfo.dishName = payload
        },
        setDishPrice(state,payload){
            state.dishInfo.price = payload
        },
        setDishSales(state,payload){
            state.dishInfo.sales = payload
        },
        setDishStar(state,payload){
            state.dishInfo.star = payload
        },
        setDishTagList(state,payload){
            state.dishInfo.tags = payload
        },
        addOrder(state,payload){
            state.orderInfo.push(payload)
        },
        deleteOrder(state,payload){
            for (let i=0;i<state.orderInfo.length;i++) {
                if (state.orderInfo[i].orderID === payload) {
                    state.orderInfo.splice(i, 1);
                    break;
                }
            }
        },
        setPayCode(state,payload){
            state.payCode = 'http://qr.liantu.com/api.php?text=' + payload
        }
    }
})

export default store