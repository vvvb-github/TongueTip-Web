<template>
    <background :show-head="false">
        <div class="container-form">
            <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">
                <el-card style="width: 50%;background: rgba(255,255,255,0.7)" :body-style="{width:'100%',height:'100%'}" shadow="hover">
                    <register_form/>
                </el-card>
            </div>
        </div>
    </background>
</template>

<script>
    import register_form from "@/components/register_form";
    import Background from "@/components/background";

    export default {
        name: "Register",
        components: {
            Background,
            register_form
        },
        data() {
            return {
                bodyStyle: {
                    width: '100%',
                    height: '100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }
            }
        }
    }
</script>

<style scoped>
    .container-form{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .head{
        display: flex;
        width: 100%;
        height: 15%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #login{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 5%;
    }
    #line{
        width: 100%;
        height: 0.5%;
        background-color: dimgrey;
    }
</style>