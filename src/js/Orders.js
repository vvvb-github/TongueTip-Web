import axios from "axios";

export default {
    mounted(vue){//@API 16
        axios.get(vue.SERVICE_PATH+'/order/hostOrder',{params:{hostID:vue.$store.state.hostInfo.hostID}})
            .then(res=>{
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.hostOrders = data.hostOrders
                    vue.$store.state.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    completed(vue,orderID) {//@API 17
        axios.get(vue.SERVICE_PATH+'/order/change',
            {params:{
                    orderID: orderID,
                    newState: 1
                }}).then(res=>{
                    if(res.data.status === 0){
                        vue.$message.error('服务器错误！')
                    }else{
                        vue.$message.success('已完成订单！')
                        vue.$router.replace('orders')
                    }
        }).catch(err=>{
            console.log(err)
            vue.$message.error('服务器错误！')
        })
    }
}