<template>
    <div id="Index">
        <div class="top">
            <ul>
                <a href="javascript:void(0);"  @click="checkLogin(0)" ><li v-bind:class="{li:t===0}">全部</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(1)" ><li v-bind:class="{li:t===1}">九教室</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(2)" ><li v-bind:class="{li:t===2}">十教室</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(3)" ><li v-bind:class="{li:t===3}">关闭</li></a>
                <a href="javascript:void(0);"  @click="checkLogin(4)" ><li v-bind:class="{li:t===4}">老师</li></a>
                <a href="javascript:void(0);" v-show="type===2" @click="pay"><li>财务</li></a>
                <a href="javascript:void(0);" v-show="type===2"  @click="openAdd"><li>新增</li></a>
                <a href="javascript:void(0);" @click="out"><li>退出</li></a>
            </ul>
            <p> 晚辅：{{yingdao}}人 签到：{{shidao}}人  就餐：{{jiucan}}人   </p>
        </div>
        <div class="main">
            <table>
                <tr>
                    <td>序号</td>
                    <td>姓名</td>
                    <td>班级</td>
                    <td>电话</td>
                    <td>积分</td>
                    <td>课次</td>
                    <td>教室</td>
                    <td>签到情况</td>
                </tr>

                <tr v-for="(item,index) in list">
                    <td @click="jia(item.id)">{{index+1}}</td>
                    <td class="xufei" @click="add(item.id,item.username)">{{item.username}}
                        <b v-show="item.z1===1">1</b>
                        <b v-show="item.z2===1">2</b>
                        <b v-show="item.z3===1">3</b>
                        <b v-show="item.z4===1">4</b>
                        <b v-show="item.z5===1">5</b>

                    </td>

                    <td>{{item.classname}}
                    </td>
                    <td><a :href="'tel:' + item.tel">拨打</a> <b v-if="item.can==0">餐</b></td>
                    <td @click="jf(item.id,item.username)">{{item.jifen}}</td>
                    <td>{{item.num}}</td>
                    <td class="jiao"  @click="openClass(item.id,item.username)">{{item.jiaoshi}}</td>
                    <td>
                        <a v-show="item.qiandao===0" type="button" class="qian"  @click="qian(item.id,item.jiaoshi)">未签到</a>
                        <a v-show="item.qiandao===1" type="button" class="wei red"  @click="qiandel(item.id)">已签到</a>
                        <a v-show="item.qiandao===2" type="button" class="wei qing"  @click="jiadel(item.id)">请假</a>
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

        <div class="f_div_user" v-show="divD" style="height: 600px;">
            <ul>
                <li><span>姓名：</span><span class="u">{{username}}</span></li>
                <li><span>课内：</span><input type="number" value="0" class="xu_ke" v-model="kn"></li>
                <li><span>课外：</span><input type="number" value="0" class="xu_jin" v-model="kw"></li>
                <li><span>每日：</span><input type="number" value="0" class="xu_jin" v-model="mr"></li>
                <li><span>额外：</span><input type="number" value="0" class="xu_jin" v-model="ew"></li>
                <li style="border: none"><a href="javascript:void(0);" class="but_xu" @click="addjf()">提交</a> <a href="javascript:void(0);" class="close"  @click="close">关闭</a> </li>
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
                divD:false,
                username:'',
                t:0,
                classname:"",
                num:0,
                money:0,
                yingdao:0,
                shidao:0,
                jiucan:0,
                type:0,
                kn:10,
                kw:5,
                mr:5,
                ew:0,
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
                that.$jsonp(that.Url +"wanfu/login/listinfo", {
                    t: that.t
                }).then(function (res) {
                    if(res.detail==="登录成功"){
                        that.list = res.list;
                        that.type = res.type;
                        that.yingdao=res.yingdao;
                        that.shidao=res.shidao;
                        that.jiucan=res.jiucan;
                       // that.t=res.t;
                    }else{
                        that.$router.push('/login')
                    }
                });

            },
            jf(id,usermane){  //打开积分
                let that = this;
                that.divD =true;
                that.id =id;
                that.username =usermane;
            },
            addjf(){  //增加积分
                let that = this;

                that.$jsonp(that.Url +"wanfu/login/jifen", {
                    userid:that.id,
                    kn:that.kn,
                    kw:that.kw,
                    mr:that.mr,
                    ew:that.ew
                }).then(function (res) {
                    if(res.detail==="增加积分成功"){

                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                       alert(res.detail);
                    }
                    that.divA =that.divB =that.divC =that.divD =false;
                });
            },
            add(id,usermane){  //打开增加课时
                let that = this;
                if(that.type<2){
                    return false;
                }
                that.divC =true;
                that.id =id;
                that.username =usermane;
                that.num = that.money =0;
            },
            addKe(){  //增加课时
                let that = this;
                if( that.num===0 || that.money===0){
                    alert("不能为0");
                    that.divA =that.divB =that.divC =false;
                    return
                }
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
                if(that.username==="" || that.tel==="" || that.classname===""){
                    alert("不能为空");
                    that.divA =that.divB =that.divC =false;
                    return
                }
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
               // console.log(jiaoshi);
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
                that.divA = that.divB = that.divC =that.divD =false;
            },
            jia(id){
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/jia", {
                    id:id
                }).then(function (res) {
                    if(res.detail==="请假成功"){
                        console.log(res.detail);
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                       // that.$router.push('/login')
                    }
                });
            },
        jiadel(id){
            let that = this;
            that.$jsonp(that.Url +"wanfu/index/jiadel", {
                id:id
            }).then(function (res) {
                if(res.detail==="请假删除成功"){
                    // console.log(res.detail);
                    that.checkLogin(that.t);
                    //that.list = res.list;
                }else{
                    // that.$router.push('/login')
                }
            });
        },
            qian(id,jiaoshi){
                let that = this;
                that.$jsonp(that.Url +"wanfu/index/qian", {
                    id:id,
                    jiaoshi:jiaoshi
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
                       // console.log(res.detail);
                        that.checkLogin(that.t);
                        //that.list = res.list;
                    }else{
                       // that.$router.push('/login')
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
            pay(){
                let that = this;
                            that.$router.push('/pay');

            },
        }
    };
</script>