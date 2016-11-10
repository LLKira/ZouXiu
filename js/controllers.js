
angular.module('controllers',['service'])

        .controller('myCtrl',['$location','$rootScope','$ionicPopup',function ($location,$rootScope,$ionicPopup) {
                $location.url('/tabs/home');
            $rootScope.userInfo={};
            //弹窗函数
            $rootScope.popUp= function(title,template,okUrl,noUrl){
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: template
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $location.url(okUrl);
                    } else {
                        $location.url(noUrl);
                    }
                });
            }


        }])

        //首页

        .controller('homeCtrl',['$scope','homeS','$ionicScrollDelegate','$ionicSlideBoxDelegate','$rootScope','cartS',function ($scope,homeS,$ionicScrollDelegate,$ionicSlideBoxDelegate,$rootScope,cartS) {

            console.log("首页控制器");
            homeS.homeData(function (imgs) {
                $scope.Homdatas = imgs;
                $scope.loopImg = [];
                for(var i=0;i<imgs.length;i++){
                    imgs[i].goodsBenUrl =JSON.parse(imgs[i].goodsBenUrl);
                    $scope.loopImg.push(imgs[i].goodsBenUrl[0]);
                }
                $ionicSlideBoxDelegate.loop(true);
                $ionicSlideBoxDelegate.update();
            });
            //获取用户

            $scope.addCar= function () {
                //当前商品
                var nowGoods= this.item.goodsID;
                var goodsID=this.item.goodsID;
                var buyNum=0;

                //如果存在用户名则更新该用户的购物车数据
                if($rootScope.userInfo.userID){
                    //获取购物车数据
                    cartS.carData($rootScope.userInfo.userID);

                    $scope.$on('getCar', function(event,data){
                        $scope.hasGoods =data;
                        //判断购物车内是否有信息
                        if($scope.hasGoods){
                            for(var i=0,len=$scope.hasGoods.length; i<len; i++){
                                //购物车存在该商品
                                if($scope.hasGoods[i].goodsID == nowGoods){
                                    buyNum=parseInt($scope.hasGoods[i].number);
                                    cartS.UpdateData($rootScope.userInfo.userID,goodsID,buyNum);
                                }else{
                                    buyNum=1;
                                    cartS.UpdateData($rootScope.userInfo.userID,goodsID,buyNum);
                                }
                            }
                        }else {
                            buyNum=1;
                            cartS.UpdateData($rootScope.userInfo.userID,goodsID,buyNum);
                            //没有数据
                        }
                    })

                    $scope.$on('ifUpdate', function(event,data){
                        if(data){
                            console.log("购物车信息更新成功");
                            cartS.carData($rootScope.userInfo.userID);
                        }else {
                            console.log('购物车信息更新失败');
                        }})

                }else {
                    //没有用户
                    $rootScope.popUp("您还没有登陆！","确定要登录吗？","/tabs/login","/tabs/home")
                }

            }
            //轮播点击事件
            $scope.clickTo= function (index) {
                $ionicSlideBoxDelegate.slide(index);
            }
            //下拉加载
            var page =0;
            $scope.ifLoad =1;
            $scope.ifshow = false;//底部返回顶部按钮
            $scope.listData=[];
            $scope.$on('ifmore', function (event,data) {
                $scope.ifLoad =data;
                if($scope.ifLoad){
                    $scope.listData=$scope.listData.concat(data);
                    $scope.ifshow = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                ++page;
            });

            $scope.moreActicle= function () {
                 homeS.homeList(page);
            }

            //底部返回顶部按钮
            $scope.backTop= function () {
                $ionicScrollDelegate.scrollTop();
            }

        }])
  //商品详情
        .controller('introCtrl',['$scope','detailS','$ionicSlideBoxDelegate','$stateParams','$interval','$rootScope',function ($scope,detailS,$ionicSlideBoxDelegate,$stateParams,$interval,$rootScope) {
            console.log("商品详情");
            $scope.getID=$stateParams.id;
            detailS.detailList( $scope.getID);

            $scope.$on('detailData', function (event,data) {
               $rootScope.detailData=data[0];

            })
//倒计时
            $interval(function (){
                $scope.a = Date.parse("2016-11-11 00:00:00");
                $scope.b = Date.parse(new Date());
                $scope.date=$scope.a - $scope.b;
                $scope.days = parseInt($scope.date / 1000 / 60 / 60 / 24);
                $scope.hours = parseInt($scope.date / 1000 / 60 / 60 % 24);
                $scope.minutes = parseInt($scope.date / 1000 / 60 % 60);
                $scope.seconds = parseInt($scope.date / 1000 % 60);
            },1000);

        }])


        .controller('detailCtrl',['$scope','detailS','$ionicSlideBoxDelegate','$rootScope',function ($scope,detailS,$ionicSlideBoxDelegate,$rootScope) {

                $scope.detailData = $rootScope.detailData;
                console.log( $scope.detailData);


    }])
        .controller('realCtrl',['$scope','detailS','$ionicSlideBoxDelegate','$rootScope',function ($scope,detailS,$ionicSlideBoxDelegate,$rootScope) {
            //detailS.detailList(goodsId);
            //$scope.$on('detailData',function(event,data){
                //console.log(data);
                $scope.detailData =JSON.parse($rootScope.detailData.goodsBenUrl);
                $ionicSlideBoxDelegate.update();
                console.log( $scope.detailData);

            //})
    }])

        //分类
        .controller('sortCtrl',['$scope','sortS', function ($scope,sortS) {
            sortS.sortData();
            $scope.$on('sortList', function(event,data){
                $scope.sortLists=data;
            });
                $scope.iftrue=true;
            $scope.showAlls= function(){
                $scope.iftrue=!$scope.iftrue;
                $scope.listCanSwipe = true;
            }
        }])


        //购物车
        .controller('cartCtrl',['$scope','cartS', '$location','$rootScope','$ionicPopup',function ($scope,cartS,$location,$rootScope,$ionicPopup) {

            $scope.toHome= function(){
                $location.url('/tabs/home');
            }

            if($rootScope.userInfo.userID){
                //初始化购物车信息
                cartS.carData($rootScope.userInfo.userID);

                $scope.$on('getCar', function(event,data){

                    $scope.hasGoods =data;
                    //判断购物车内是否有信息
                    if($scope.hasGoods){
                        $scope.totalNum=0;
                        $scope.totalPrice=0;
                        $scope.hasGoods = $scope.hasGoods;
                        for(var i=0,len=$scope.hasGoods.length; i<len; i++){
                            //购物总量
                            $scope.totalNum += parseInt($scope.hasGoods[i].number);
                            //购物总价
                            $scope.totalPrice +=($scope.hasGoods[i].number*$scope.hasGoods[i].price);
                        }
                    }else {
                        //没有数据
                        $scope.totalNum=0;
                    }
                })
            }else {
                $scope.totalNum=0;
                //弹窗
                $rootScope.popUp("您还没有登陆!","确定要登录吗?","/tabs/login","/tabs/cart");

            }

            //删除
            $scope.cDel = function(){

                this.item.number=0;

                cartS.UpdateData($rootScope.userInfo.userID,this.item.goodsID,this.item.number);

                $scope.getCartData();

            }

            //获取购物车信息
            $scope.getCartData= function(){
                $scope.$on('ifUpdate', function(event,data){
                    if(data){
                        console.log("购物车信息更新成功");
                        cartS.carData($rootScope.userInfo.userID);
                    }else {
                        console.log('购物车信息更新失败');
                    }
                })
            }

            //减
            $scope.carRed = function(){

                --this.item.number;

                cartS.UpdateData($rootScope.userInfo.userID,this.item.goodsID,this.item.number);

                $scope.getCartData();

            }

            $scope.carAdd = function(){

                ++this.item.number;
                console.log(this.item.number);
                cartS.UpdateData($rootScope.userInfo.userID,this.item.goodsID,this.item.number);

                $scope.getCartData();
            }

            //去购物
            $scope.cargobtn = function(){
                $location.url('/tabs/home')
            }

            //去结算
            $scope.Caraccount = function(){
                $rootScope.popUp('结算','亲，你那么有钱，再去买点咯！！！','/tabs/home','/tabs/cart')
            }
        }])


        //我的秀

        .controller('mineCtrl',['$scope', 'mineS','$rootScope',function ($scope,mineS,$rootScope) {

            if($rootScope.userInfo.userID){
                $scope.userName=$rootScope.userInfo.userID;
            }else {
            }

        }])

            //我的秀 ————> 注册
            .controller('regCtrl', ['$scope', 'mineS', '$location', function($scope,mineS,$location){
                $scope.userInfo = {};

                $scope.submit = function(){
                    //是否存在输入账号密码
                    if($scope.userInfo.username && $scope.userInfo.psd){

                        //验证两次密码
                        if($scope.userInfo.psd == $scope.userInfo.repsd){
                            $scope.ifLogin = "register";
                            mineS.regData($scope.userInfo.username,$scope.userInfo.psd,$scope.ifLogin);

                            $scope.$on("regData",function(event,data){
                                console.log(data);
                                if (data == 0) {
                                    alert("用户名重名");
                                    $scope.userInfo.username="";
                                } else if(data == 1){
                                    console.log("注册成功");
                                    $location.url('/tabs/login');
                                } else if(data == 2){
                                    alert("数据库报错");
                                }
                            })
                        } else{
                            alert("两次输入密码不一致！");
                            $scope.userInfo.psd = '';
                            $scope.userInfo.repsd = '';
                        }
                    }else{
                        alert("请输入账号密码！");
                    }
                    
                };
                //登录按钮
                $scope.login = function(){
                    $location.url('/tabs/login');
                }
            }])

            //我的秀 ————> 登录
            .controller('loginCtrl', ['$scope','mineS','$location','$rootScope','$ionicPopup',function($scope,mineS,$location,$rootScope,$ionicPopup){


                $scope.userName=$rootScope.userInfo.userID;


                $scope.user={};

                $scope.login= function () {

                    if( $scope.userName){
                        $rootScope.popUp($scope.userName+'已登录','去首页看看?','tabs/home','tabs/login');
                    }else {
                        $scope.iflogin='login';

                        mineS.regData( $scope.user.userName,$scope.user.userPsd,$scope.iflogin);

                        $scope.$on('regData', function (event,data) {

                            if(data == 0){
                                alert('用户名不存在');
                                $scope.user.userName='';
                                $scope.user.userPsd="";
                            }else if(data == 2){
                                alert('用户名密码不符合');
                                $scope.user.userPsd="";
                                return;
                            }else {
                                $rootScope.userInfo=data;
                                //弹窗
                                $rootScope.popUp('登录成功','去往首页？','tabs/home','tabs/mine');

                                $location.url('/tabs/mine');
                            }
                        });
                    }
                }
                //注册按钮
                $scope.reg = function(){
                    $location.url('/tabs/register')
                }
            }])

        //更多
        .controller('moreCtrl',['$scope', 'moreS','$location','$rootScope',function ($scope,moreS,$location,$rootScope) {
             $scope.moreDatas=[{
                name:'常见问题'
            },{
                name:'系统设置'
            },{
                name:'软件更新'
            },{
                name:'扫描二维码'
            }];
            $scope.moreAbout=['我要提意见','关于'];
            $scope.toDL= function(){
                if($rootScope.userInfo.userID){
                    $rootScope.popUp('退出','退出成功',"tabs/home",'tabs/more');
                    $rootScope.userInfo={};
                }else {
                    $rootScope.popUp('未登录','您还没有登录',"tabs/login",'tabs/more');
                }

            }
        }])
