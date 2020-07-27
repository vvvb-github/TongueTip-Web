import axios from "axios";
import Qs from 'qs';

export default {
    mounted(vue){//@API 11
        axios.get(vue.SERVICE_PATH+'/dish/detail',{params:{dishID:vue.$store.state.dishInfo.dishID}})
            .then(res=>{
                console.log(res)
                let data = res.data
                if(data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    vue.$store.commit('setImgList',data.imgList.split('+'))
                    console.log('a1')
                    vue.$store.commit('setDishName',data.dishName)
                    vue.$store.commit('setDishPrice',data.price)
                    vue.$store.commit('setDishSales',data.sales)
                    vue.$store.commit('setDishStar',data.star)
                    vue.$store.commit('setDishTagList',data.tagList.split('+'))
                    vue.evaluation = data.evaluations
                    vue.loading.close()
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    changeDishInfo(vue,form) {//@API 12
        // form: {
        //     picPathList:[],
        //     dishName: '',
        //     price:null,
        //     tags:this.$store.state.dishInfo.tags,
        // },
        let data = {
            dishID: vue.$store.state.dishInfo.dishID,
            imgList: form.picPathList.join('+'),
            dishName: form.dishName,
            price: form.price,
            tagList: form.tags.join('+')
        }
        console.log(data)
        axios.post(vue.SERVICE_PATH+'/dish/edit',Qs.stringify(data))
            .then(res=>{
                if(res.data.status === 0){
                    vue.$message.error('服务器错误！')
                }else{
                    if(form.picPathList.length > 0)
                        vue.$store.commit('setImgList',form.picPathList)
                    vue.$store.commit('setDishName',form.dishName)
                    vue.$store.commit('setDishPrice',form.price)
                    vue.$store.commit('setDishTagList',form.tags)
                    vue.dialogShow = false
                    vue.$message.success('修改成功！')
                }
            })
            .catch(err=>{
                console.log(err)
                vue.$message.error('服务器错误！')
            })
    },
    customerOrder(vue,form) {
        // form:{
        //     num:1,
        //     backup:'',
        //     total_price:0
        // },
        let now = new Date().getTime()
        let orderInfo = {
            date: '07/20/19:54',
            dishName: vue.$store.state.dishInfo.dishName,
            number: form.num,
            price: form.total_price,
            dishID: vue.$store.state.dishInfo.dishID,
            orderID: now.toString()+vue.$store.state.userInfo.userID.toString(),
            image: vue.$store.state.dishInfo.picPathList[0],
            PS: form.backup
        }
        vue.$store.commit('addOrder',orderInfo);
    }
}