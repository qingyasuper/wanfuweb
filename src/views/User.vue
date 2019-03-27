<template>
    <div class="User">
        <div class="Top">
            <p>
                <span class="user_name">{{user.classname}}{{user.username}}</span>
                <span class="user_class">【{{user.jiaoshi}}】</span>
            </p>
            <p>
                <span class="user_num" style="color:red;">剩余：{{user.num}}次 <a href="javascript:void(0)" style="margin-left: 50px; color:#1dace5; font-size: 30px;" @click="out">重新登录</a></span>
            </p>
            <p style="height: 40px; line-height: 40px;font-size: 30px;display: block">晚辅：
            <b v-show="user.z1===0">周一</b>
            <b v-show="user.z2===0">、周二</b>
            <b v-show="user.z3===0">、周三</b>
            <b v-show="user.z4===0">、周四</b>
            <b v-show="user.z5===0">、周五</b>
            </p>

        </div>
        <p STYLE="text-align: center">
            <span class="user_num" style="color:red;font-size: 30px;"> 总积分：{{user.jifen}}分</span>
            <span class="user_num" style="color:red;font-size: 30px;"> 积分排名：{{user.top}}名</span>
        </p>
        <div class="conter">
            <table>
                <tr style="background: #ddd; border: 1px solid #eee">
                    <td>序号</td>
                    <td>教室</td>
                    <td>课内</td>
                    <td>课外</td>
                    <td>每日</td>
                    <td>额外</td>
                    <td>签到记录</td>
                    <!--<td>晚辅情况</td>-->
                </tr>
                <tr v-for="(item,index) in list"  v-bind:class="{li:item.jiaoshi==='请假'}">
                    <td>{{index+1}}</td>
                    <td>{{item.jiaoshi}}</td>
                    <td>{{item.kn}}</td>
                    <td>{{item.kw}}</td>
                    <td>{{item.mr}}</td>
                    <td>{{item.ew}}</td>
                    <td>{{item.datetime}}</td>
                </tr>

            </table>
        </div>
    </div>

</template>
<style>
    .li { color:red;}
</style>

<script>
    export default {
        name: "User",
        data () {
            return {
                name: '',
                tel: '',
                list:[],
                user:{},
            }
        },
        mounted(){
            let that = this;
            that.checkLogin();

        },
        methods:{
            checkLogin(){
                let that = this;
                that.$jsonp(that.Url +"wanfu/login/user", {
                    username: that.name,
                    password: that.tel
                }).then(function (res) {
                    console.log(res.detail);
                    if(res.detail==="登录成功"){
                        that.list = res.list;
                        that.user = res.user;
                    }else{
                        that.$router.push('/login')
                    }
                });

            },
            out(){
                let that = this;
                that.$jsonp(that.Url+"wanfu/login/out")
                    .then(function (res) {
                        if(res.detail === "退出成功") {
                            that.$router.push('/login');
                        }
                    });
                },
        },
    }
</script>

<style scoped>
    .User { width: 750px; font-size: 30px; line-height: 40px; }
    .Top { width: 100%; height: 240px;  text-align: center;font-size: 50px; margin-top: 20px; margin-bottom: 20px;}
    .Top p {width: 100%;line-height: 100px;}
    .user_name{}
    .user_num{}
    .user_class{}
    .conter { width: 100%; }
    .conter table { width: 100%; text-align: center;line-height: 60px;}
    .conter table,td {line-height: 60px;}
</style>