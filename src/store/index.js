import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        loading: null,
        userInfo: {
            m_userID: 0,
            m_userName: '',
            m_userPhone: '',
            m_userType: 0,
            m_userPriority: 0,
            m_iconPath: ''
        },
        hostInfo: {
            m_hostID: 0,
            m_hostName: '',
            m_phone: '',
            m_location: '',
            m_star: 0,
            m_picPath: '',
            m_introduction: '',
        },
        dishInfo: {
            m_dishID: 0,
        },
    },
    mutations:{
        setUser(state,payload){
            state.userInfo = payload
        },
        setUserID(state,payload){
            state.userInfo.m_userID = payload
        },
        setUserName(state,payload){
            state.userInfo.m_userName = payload
        },
        setUserPhone(state,payload){
            state.userInfo.m_userPhone = payload
        },
        setUserType(state,payload){
            state.userInfo.m_userType = payload
        },
        setUserPriority(state,payload){
            state.userInfo.m_userPriority = payload
        },
        setUserIcon(state,payload){
            state.userInfo.m_iconPath = payload
        },
        setHost(state,payload){
            state.hostInfo = payload
        },
        setHostID(state,payload){
            state.hostInfo.m_hostID = payload
        },
        setHostName(state,payload){
            state.hostInfo.m_hostName = payload
        },
        setHostPhone(state,payload){
            state.hostInfo.m_phone = payload
        },
        setHostLocation(state,payload){
            state.hostInfo.m_location = payload
        },
        setHostStar(state,payload){
            state.hostInfo.m_star = payload
        },
        setHostIcon(state,payload){
            state.hostInfo.m_picPath = payload
        },
        setHostIntroduction(state,payload){
            state.hostInfo.m_introduction = payload
        },
        setDish(state,payload){
            state.dishInfo = payload
        },
        setDishID(state,payload){
            state.dishInfo.m_dishID = payload
        }
    }
})

export default store