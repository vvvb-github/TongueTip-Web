<template>
    <div class="container-dish" @click="goDetail" style="cursor: pointer">
        <div style="height: 100%;width: 20%;">
            <img :src="dishInfo.picPath" style="width: 150px;height: 130px;object-fit: fill"/>
        </div>
        <div style="height: 100%;width: 17%;margin-left: 5%;display: flex;flex-direction: column;justify-content: space-between;align-items: flex-start">
            <el-button type="text" class="el-button-dish-name">{{dishInfo.dishName}}</el-button>
            <el-rate
                    v-model="dishInfo.star"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    id="stars"
                    v-if="dishInfo.star>0">
            </el-rate>
            <span v-else style="font-size: medium;font-family: 'Microsoft YaHei';color: black">暂无评价</span>
            <span class="span-price">￥ {{dishInfo.price}}</span>
            <span style="font-size: medium;font-family: 'Microsoft YaHei';color: #ffa819">销量：{{dishInfo.sales}}</span>
        </div>
        <div style="width: 20%;height: 90%;margin-left: 5%;display: flex;align-content: center">
            <el-tag :type="colors[Math.floor(5*Math.random())]" class="dish-tags"
                    v-for="text in taglst" :key="text">{{text}}</el-tag>
        </div>
        <div style="width: 40%;height: 100%;">
            <span style="font-size: medium;font-weight: bold;color: dodgerblue">简介</span>
            <p style="font-size: medium">{{dishInfo.introduction}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dish_item",
        data() {
            return {
                dishInfo: this.info,
                colors: [
                    'primary','warning','danger','info','success'
                ],
            }
        },
        props: {
            info: Object
        },
        methods: {
            goDetail() {
                this.$store.commit('setDishID',this.dishInfo.dishID)
                this.$router.replace('detail')
            },
        },
        computed: {
            taglst() {
                if(this.dishInfo.tags === ''){
                    return []
                }else {
                    return this.dishInfo.tags.split('+')
                }
            }
        }
    }
</script>

<style scoped>
    .container-dish{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .span-price{
        font-size: large;
        color: red;
    }
    .el-button-dish-name{
        font-size: large;
        color: orangered;
        font-family: "Microsoft YaHei";
    }
</style>