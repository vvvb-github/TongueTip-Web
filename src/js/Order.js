import axios from "axios";
import Qs from 'qs';

export default {
    mounted(vue){//@API 15
        axios.get(vue.SERVICE_PATH+'/order/userOrder',{params:{userID:vue.$store.state.userInfo.userID}})
            .then(res=>{
                console.log(res)
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
    pay(vue,oid){
        // order = {
        //     date: '07/20/19:54',
        //     dishName: vue.$store.state.dishInfo.dishName,
        //     number: form.num,
        //     price: form.total_price,
        //     dishID: '',
        //     orderID: '0001',
        //     image: vue.$store.state.dishInfo.picPathList[0],
        //     PS: form.backup
        // }
        vue.$store.state.loading = vue.$loading({
            lock: true,
            text: '正在生成支付二维码...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        let order = null
        for (let i=0;i<vue.$store.state.orderInfo.length;i++) {
            if (vue.$store.state.orderInfo[i].orderID === oid) {
                order = vue.$store.state.orderInfo[i]
                break;
            }
        }
        let data = {
            price: order.price,
            dishName: order.dishName,
            orderID: order.orderID,
            dishID: order.dishID,
            PS: order.PS,
            userID: vue.$store.state.userInfo.userID,
            number: order.number
        }
        console.log(data)
        axios.post(vue.SERVICE_PATH+'/pay/codeurl',Qs.stringify(data))
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    console.log(res)
                    vue.$store.commit('setPayCode',data.url)
                    vue.$store.state.loading.close()
                    vue.timer = setInterval(()=>{
                        axios.get(vue.SERVICE_PATH+'/pay/state',{params:{orderID:oid}})
                            .then(res=>{
                                if(res.data.status === 0){
                                    vue.$message.error('服务器错误！')
                                }else{
                                    if(res.data.state === 0){
                                        vue.$message.success('支付成功！')
                                        clearInterval(vue.timer)
                                        vue.$store.commit('deleteOrder',oid)
                                        vue.payShow = false
                                    }
                                }
                            })
                            .catch(err=>{
                                console.log(err)
                                vue.$message.error('服务器错误！')
                            })
                    },2000)
                    vue.payShow = true
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    }
}