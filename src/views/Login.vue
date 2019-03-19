<template>
    <div id="Login">
        <p>阳光晚辅</p>
        <div class="Login">
            <ul>
                <li><span>姓名：</span><input type="text" class="login_name" v-model="name" placeholder="输入孩子名字"></li>
                <li><span>手机：</span><input type="tel" class="login_tel" v-model="tel" placeholder="输入登记的电话"></li>
                <li style="margin-top: 50px;"><a href="javascript:void(0);" class="login_but" @click="login">登录</a> </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                name: '',
                tel: '',
            }
        },
        methods:{
            login: function (e) {
               // alert(this.name + this.tel);
                let that = this;
                if (that.name === '') {
                    alert('请输入您的账号');
                    return
                }
                if (that.tel === '') {
                    alert('请输入您的手机号');
                    return
                }
                that.$jsonp(that.Url +"wanfu/login", {
                    username: that.name,
                    password: that.tel
                }).then(function (res) {
                    alert(res.detail);
                    if(res.detail==="登录成功"){

                        that.$router.push('/'+res.url);
                    }
                });
            },
        },
    };
</script>

<style scoped>
    p  { width: 100%; font-size: 100px;  margin-top:150px;font-weight: bold; height: 100px; line-height: 100px; display: block; text-align: center;}
    .Login { display: block; width: 600px; font-size: 24px; padding: 20px; margin-top: 100px;}
    .Login ul li { width: 80%; margin-left: 10%; height: 80px; line-height: 80px; margin-bottom: 20px; }
    .Login table { font-size: 20px; line-height: 60px; width: 100%; text-align: center;}
    .Login input { padding: 3px;  border: 1px solid #ddd; width: 340px;height: 60px; text-indent: 20px;font-size: 40px;}
    .Login span {font-size: 40px;}
    a.login_but {display: block;  width: 100%; height: 60px; line-height: 60px; text-align: center;color:#fff; background: red;}
</style>