<template>
    <div id="Index">
        <div class="top">
            <ul>
                <a href="/wanfu"><li>全部</li></a>
                <a href="?j=1"><li>九教室</li></a>
                <a href="?j=2"><li>十教室</li></a>
                <a href="?j=3"><li>关闭</li></a>
                <a href="javascript:void(0);" class="openUser" ><li>新增</li></a>
            </ul>
        </div>
        <div class="main">
            <table>
                <tr>
                    <td>序号</td>
                    <td>姓名</td>
                    <td>班级</td>
                    <td>电话</td>
                    <td>课次</td>
                    <td>教室</td>
                    <td>签到情况</td>
                </tr>

                <tr v-for="(item,index) in list">
                    <td>{{index+1}}</td>
                    <td class="xufei" @click="add(item.id,item.username)">{{item.username}}
                        <b v-show="item.z1===1">1</b>
                        <b v-show="item.z2===1">2</b>
                        <b v-show="item.z3===1">3</b>
                        <b v-show="item.z4===1">4</b>
                        <b v-show="item.z5===1">5</b>

                    </td>

                    <td>{{item.classname}}
                    </td>
                    <td><a href="tel:{$vo.tel}">{{item.tel}}</a> <b v-if="item.can==0">餐</b></td>
                    <td>{{item.num}}</td>
                    <td class="jiao" data-id="{$vo.id}" data-name="item.username">{{item.jiaoshi}}</td>
                    <td>
                        <input v-show="item.qiandao===0" type="button" class="qian" value="未签到" data-id="item.id">
                        <input v-show="item.qiandao===1" type="button" class="wei red" value="已签到" data-id="item.id">
                    </td>
                </tr>

            </table>
        </div>

        <div class="f_div" style="height: 260px;" v-show="divB">
            <span></span>
            <ul>
                <li>九教室</li>
                <li>十教室</li>
                <li>十一教室</li>
                <li>关闭</li>
                <p style="
    font-size: 30px;
    width: 100%;
    text-align: center;
    margin-top: 15px;
    float: left;
    line-height: 40px;
"><a href="javascript:void(0);" class="close" >关闭</a> </p>

            </ul>
        </div>
        <div class="f_div_user user" v-show="divA">
            <ul>
                <li><span>姓名：</span><input type="text" class="username"></li>
                <li><span>电话：</span><input type="tel" class="tel"></li>
                <li><span>班级：</span><input type="number" class="classname"></li>
                <!--<li><span>课时：</span><input type="number"></li>-->
                <!--<li><span>金额：</span><input type="number"></li>-->
                <!--<li style="height: 140px;"><span>晚辅：</span>-->
                <!--<label><input type="checkbox"><b>周一</b></label>-->
                <!--<label><input type="checkbox"><b>周二</b></label>-->
                <!--<label><input type="checkbox"><b>周三</b></label>-->
                <!--<label><input type="checkbox"><b>周四</b></label>-->
                <!--<label><input type="checkbox"><b>周五</b></label>-->
                <!--</li>-->
                <!--<li><span>晚餐：</span>-->
                <!--<select>-->
                <!--<option>是</option>-->
                <!--<option>否</option>-->
                <!--</select>-->
                <!--</li>-->
                <!--<li><span>教室：</span>-->
                <!--<select>-->
                <!--<option>八教室</option>-->
                <!--<option>九教室</option>-->
                <!--<option>十教室</option>-->
                <!--</select>-->
                <!--</li>-->
                <!--<li><span>类型：</span>-->
                <!--<select>-->
                <!--<option>试课</option>-->
                <!--<option>缴费</option>-->
                <!--</select>-->
                <!--</li>-->
                <li style="border: none"><a href="javascript:void(0);" class="butUser">提交</a> <a href="javascript:void(0);" class="close" >关闭</a> </li>
            </ul>
        </div>

        <div class="f_div_user" v-show="divC">
            <ul>
                <li><span>姓名：</span><span class="u">{{username}}</span></li>
                <li><span>课时：</span><input type="number" value="0" class="xu_ke"></li>
                <li><span>金额：</span><input type="number" value="0" class="xu_jin"></li>
                <li style="border: none"><a href="javascript:void(0);" class="but_xu">提交</a> <a href="javascript:void(0);" class="close"  @click="close">关闭</a> </li>
            </ul>
        </div>
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
                divA:false,
                divB:false,
                divC:false,
                username:'',
            }
        },
        mounted(){
            let that = this;
            that.checkLogin();

        },
        methods:{
            checkLogin(){
                let that = this;
                that.$jsonp(that.Url +"wanfu/login/list", {
                    username: that.name,
                    password: that.tel
                }).then(function (res) {
                    console.log(res.detail);
                    if(res.detail==="登录成功"){
                        that.list = res.list;
                    }else{
                        that.$router.push('/login')
                    }
                });

            },
            add(id,username){
                let that = this;
                console.log(id);
                that.divC =true;
                that.username =username;
                console.log(that.divC);
            },
            close(){
                let that = this;
                that.divA = that.divB = that.divC =false;
            }
        }
    };
</script>