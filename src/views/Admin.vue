<template>
    <div id="Index">
        <div class="top">
            <ul>
                <a href="javascript:void(0);"  @click="checkLogin(0)"><li>全部</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(1)"><li>九教室</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(2)"><li>十教室</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(3)"><li>关闭</li></a>
                <a href="javascript:void(0);" @click="openAdd"><li>新增</li></a>
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
                    <td><a href="tel:{$vo.tel}">拨打</a> <b v-if="item.can==0">餐</b></td>
                    <td>{{item.num}}</td>
                    <td class="jiao"  @click="openClass(item.id,item.username)">{{item.jiaoshi}}</td>
                    <td>
                        <input v-show="item.qiandao===0" type="button" class="qian" value="未签到" @click="qian(item.id)">
                        <input v-show="item.qiandao===1" type="button" class="wei red" value="已签到" @click="qiandel(item.id)">
                    </td>
                </tr>

            </table>
        </div>

        <div class="f_div" style="height: 260px;" v-show="divB">
            <span></span>
            <ul>
                <li @click="editClass('九教室')">九教室</li>
                <li @click="editClass('十教室')">十教室</li>
                <li @click="editClass('关闭')">关闭</li>
                <p style="
    font-size: 30px;
    width: 100%;
    text-align: center;
    margin-top: 15px;
    float: left;
    line-height: 40px;
"><a href="javascript:void(0);" class="close" @click="close">关闭</a> </p>

            </ul>
        </div>
        <div class="f_div_user user" v-show="divA">
            <ul>
                <li><span>姓名：</span><input type="text" class="username" v-model="username"></li>
                <li><span>电话：</span><input type="tel" class="tel" v-model="tel"></li>
                <li><span>班级：</span><input type="number" class="classname" v-model="classname"></li>
                <li style="border: none"><a href="javascript:void(0);" class="butUser" @click="addUser(username,tel,classname)">提交</a> <a href="javascript:void(0);" class="close" @click="close">关闭</a> </li>
            </ul>
        </div>

        <div class="f_div_user" v-show="divC">
            <ul>
                <li><span>姓名：</span><span class="u">{{username}}</span></li>
                <li><span>课时：</span><input type="number" value="0" class="xu_ke" v-model="num"></li>
                <li><span>金额：</span><input type="number" value="0" class="xu_jin" v-model="money"></li>
                <li style="border: none"><a href="javascript:void(0);" class="but_xu" @click="addKe()">提交</a> <a href="javascript:void(0);" class="close"  @click="close">关闭</a> </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                id:'',
                name: '',
                tel: '',
                list:[],
                divA:false,
                divB:false,
                divC:false,
                username:'',
                t:0,
                classname:"",
                num:0,
                money:0,
            }
        },
        mounted(){
            let that = this;
            that.checkLogin(0);

        },
        methods:{
            checkLogin(t){
                let that = this;
                that.t  =t;

                console.log(that.t);
                that.$jsonp(that.Url +"wanfu/login/list", {
                    t: that.t
                }).then(function (res) {
                    console.log(res.detail);
                    if(res.detail==="登录成功"){
                        that.list = res.list;
                    }else{
                        that.$router.push('/login')
                    }
                });

            },
            add(id,usermane){  //打开增加课时
                let that = this;
                that.divC =true;
                that.id =id;
                that.username =usermane;
                that.num = that.money =0;
            },
            addKe(){  //增加课时
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/xu", {
                    userid:that.id,
                    username:that.username,
                    num:that.num,
                    money:that.money
                }).then(function (res) {
                    if(res.detail==="续费成功"){
                        that.divA =that.divB =that.divC =false;
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                        // that.$router.push('/login')
                    }
                });
            },
            addUser(username,tel,classname){  //新增用户
                let that = this;
                that.divC =true;
                that.username =username;
                that.$jsonp(that.Url +"wanfu/index/add", {
                    username:username,
                    tel:tel,
                    classname:classname
                }).then(function (res) {
                    if(res.detail==="新增成功"){
                        that.divA =that.divB =that.divC =false;
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                        // that.$router.push('/login')
                    }
                });
            },
            openAdd(){
                let that = this;
                that.divA =true;
                that.username =that.tel =that.classname ="";

            },
            openClass(id){
                let that = this;
                that.divB =true;
                that.id =id;
            },
            editClass(jiaoshi){
                console.log(jiaoshi);
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/jiao", {
                    id:that.id,
                    jiaoshi:jiaoshi
                }).then(function (res) {
                    if(res.detail==="调整成功"){
                        that.divA =that.divB =that.divC =false;
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                        // that.$router.push('/login')
                    }
                });
            },
            close(){
                let that = this;
                that.divA = that.divB = that.divC =false;
            },
            qian(id){
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/qian", {
                    id:id
                }).then(function (res) {
                    if(res.detail==="签到成功"){
                        console.log(res.detail);
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                       // that.$router.push('/login')
                    }
                });
            },
            qiandel(id){
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/qiandel", {
                    id:id
                }).then(function (res) {
                    if(res.detail==="签到成功"){
                        console.log(res.detail);
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                       // that.$router.push('/login')
                    }
                });
            }
        }
    };
</script>