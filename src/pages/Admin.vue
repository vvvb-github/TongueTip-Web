<template>
    <div class="container-admin">
        <el-card :body-style="{width:'100%',height:'100%'}" style="width: 800px;height: 650px;background: rgba(255,255,255,0.7)">
            <div slot="header" style="width: 100%;display: flex;justify-content: space-around;align-items: center">
                <span>注册审核</span>
                <el-button type="text" @click="exit">退出</el-button>
            </div>
            <ul style="overflow: auto;width: 680px;height: 500px">
                <el-card :body-style="bodyStyle" style="width: 650px;height: 320px;margin-top: 5px" shadow="hover"
                         v-for="(item,index) in checkList" :key="item.m_checkID">
                    <img :src="item.m_picPath" style="width: 300px;height: 260px;object-fit: fill"/>
                    <div style="width: 300px;height: 260px;display: flex;flex-direction: column;align-items: center;justify-content: center">
                        <el-button class="btn" type="success" @click="accept(index)">通过</el-button>
                        <el-button class="btn" type="danger" @click="reject(index)">拒绝</el-button>
                    </div>
                </el-card>
            </ul>
        </el-card>
    </div>
</template>

<script>
    import JS from "@/JS";

    export default {
        name: "Admin",
        data() {
            return {
                bodyStyle: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px'
                },
                checkList: [],
            }
        },
        created() {
            JS.admin.mounted(this)
        },
        methods: {
            accept(id) {
                JS.admin.accept(this,id)
            },
            reject(id) {
                JS.admin.reject(this,id)
            },
            exit() {
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>
    .container-admin{
        background-color: dodgerblue;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn{
        margin: 0;
    }
</style>