<template>
    <background :show-head="false">
        <el-card :body-style="bodyStyle" class="container">
            <div class="image">
                <img id="shejian" src="../assets/shejian.png"/>
            </div>
            <login_form class="form"></login_form>
        </el-card>
    </background>
</template>

<script>
    import login_form from "@/components/login_form";
    import Background from "@/components/background";

    export default {
        name: "Login",
        components: {
            Background,
            login_form,
        },
        data() {
            return {
                bodyStyle: {
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'column',
                    padding: '0'
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 60%;
        height: 85%;
        background: rgba(255,255,255,0.7);
        margin-top: 3%;
    }
    .form{
        width: 50%;
    }
    .image{
        height: 35%;
        margin-bottom: 6%;
    }
    #shejian{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
</style>