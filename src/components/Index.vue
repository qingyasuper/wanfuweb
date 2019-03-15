<template>
    <div id="Index">
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                name: '',
                tel: '',
                list:[],
            }
        },
        mounted(){
            let that = this;
            that.checkLogin();

        },
        methods:{
            checkLogin(){
                let that = this;
                that.$jsonp(that.Url +"wanfu/login/list").then(function (res) {
                    console.log(res.detail);
                    if(res.detail==="登录成功"){
                        that.list = res.list;
                        that.$router.push('/user')
                    }else{
                        that.$router.push('/login')
                    }
                });

            }
        }
    };
</script>