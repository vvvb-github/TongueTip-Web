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
                    vue.loading.close()
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
        //     Did:0,
        // },
        let data = {
            userID: vue.$store.state.userInfo.userID,
            comment: form.com,
            star: form.star,
            dishID: form.Did,
            orderID: form.Oid
        }
        axios.post(vue.SERVICE_PATH+'/dish/addcomment',Qs.stringify(data))
            .then(res=>{
                console.log(res)
                if(res.data.status === 0){
                    vue.$message.error('服务器错误')
                }else{
                    this.mounted(vue)
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
        vue.loading = vue.$loading({
            lock: true,
            text: '正在生成支付二维码...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        let data = {
            price: [],
            orderID: [],
            dishID: [],
            PS: [],
            number: [],
            userID: vue.$store.state.userInfo.userID,
            cnt: 0
        }
        for(let i=0;i<vue.$store.state.orderInfo.length;i++){
            let order = vue.$store.state.orderInfo[i]
            data.price.push(order.price)
            data.dishID.push(order.dishID)
            data.orderID.push(order.orderID)
            data.PS.push(order.PS)
            data.number.push(order.number)
            data.cnt += 1
        }
        axios.post(vue.SERVICE_PATH+'/pay/codeurl',data)
            .then(res=>{
            console.log(res)
            if(res.data.status === 0){
                vue.$message.error('服务器错误！')
            }else{
                vue.$store.commit('setPayCode',res.data.url)
                vue.loading.close()
                vue.payShow = true
                vue.timer = setInterval(()=>{
                    axios.get(vue.SERVICE_PATH+'/pay/state',{params:{userID:vue.$store.state.userInfo.userID}})
                        .then(res=>{
                            if(res.data.status === 0){
                                vue.$message.error('服务器错误！')
                            }else if(res.data.cnt === 0){
                                clearInterval(vue.timer)
                                vue.$store.commit('clearOrder')
                                vue.payShow = false
                                vue.$router.go(0)
                                vue.$message.success('下单成功！请耐心等待店家制作...')
                            }
                        })
                },2000)
            }
        })
    }
}