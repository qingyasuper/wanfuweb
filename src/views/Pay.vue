<template>
    <div class="pay">
        <div class="top">
            <ul>
                <li style="width: 200px;">金额：{{yue}}元</li>
                <li>记录：{{jilu}}</li>
                <a href="javascript:void(0);" @click="fanhui"> <li>返回</li></a>
            </ul>
            <p>
                总收入：{{shouru}}元      开支：{{kaizhi}}元
            </p>
        </div>
        <div class="main">
            <table>
                <tr>
                    <td>序号</td>
                    <td>姓名</td>
                    <td>金额</td>
                    <td>次数</td>
                    <td>时间</td>
                </tr>
                <tr v-for="(item,index) in list">
                    <td>{{index+1}}</td>
                    <td>{{item.username}}</td>
                    <td v-bind:class="{red:item.money<0}">{{item.money}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.datetime}}</td>
                </tr>

            </table>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Pay",
        data () {
            return {
                yue:0,
                shouru:0,
                kaizhi:0,
                jilu:0,
                list:[],
            }
        },
        mounted(){
            let that = this;
            that.checkLogin();

        },
        methods: {
            checkLogin(t) {
                let that = this;
                that.$jsonp(that.Url + "wanfu/login/paylist").then(function (res) {
                   // console.log(res.type);
                    if(res.type===1){
                        return that.$router.push('/admin');
                    }
                    if(res.type===0){
                        return that.$router.push('/user');
                    }
                    if (res.detail === "登录成功") {
                        that.list = res.data;
                        that.shouru = res.shouru;
                        that.yue = res.yue;
                        that.jilu = res.jilu;
                        that.kaizhi = res.kaizhi;
                        // that.t=res.t;
                    } else {
                        return that.$router.push('/pay')
                    }
                });

            },
            fanhui(){
                let that = this;
                return that.$router.push('/admin')
            }
        }
    }
</script>

<style scoped>
td.red { color:red}
</style>