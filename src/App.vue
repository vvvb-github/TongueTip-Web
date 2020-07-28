<template>
    <div id="app">
        <router-view style="position: absolute;width: 100%;height: 100%"/>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'App',
        created() {
            this.timer = setInterval(()=>{//@API 22
                if(this.$store.state.userInfo.userID != 0){
                    axios.get(this.SERVICE_PATH+'/profile/message',
                        {params:{userID:this.$store.state.userInfo.userID}})
                    .then(res=>{
                        if(res.data.status === 0){
                            this.$message.error('已与服务器断开连接！')
                        }else if(res.data.have === 1){
                            if(this.$store.state.userInfo.userType === 1){
                                this.$message.info('您有新完成的订单！快去领取吧！')
                            }else{
                                this.$message.info('您有新的订单！快去制作吧！')
                            }
                        }
                    })
                }
            },10000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style>
    #app{
        width: 100%;
        height: 100%;
    }
</style>
