import axios from "axios";
import Qs from 'qs';

export default {
    mounted(vue){//@API 15
        axios.get(vue.SERVICE_PATH+'/order/userOrder',{params:{userID:vue.$store.state.userInfo.userID}})
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.cusOrder = data.cusOrder
                    vue.$store.state.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    comment(vue,form){//@API 13
        // form: {
        //     com: '',
        //     star: 3,
        //     Oid:'0',
        // },
        let data = {
            userID: vue.$store.state.userInfo.userID,
            comment: form.com,
            star: form.star,
            dishID: vue.$store.state.dishInfo.dishID
        }
        axios.post(vue.SERVICE_PATH+'/dish/addcomment',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误')
                }else{
                    vue.$message.success('评价成功！')
                    vue.dialogVisible = false
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    deleteOrder(vue,orderID){
        vue.$store.commit('deleteOrder',orderID);
    },
    pay(vue){
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!支付！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        console.log(vue)
    }
}