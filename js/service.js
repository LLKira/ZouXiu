
angular.module('service',[])

        //首页

        .service('homeS',['$http','$ionicSlideBoxDelegate','$rootScope','$ionicSlideBoxDelegate',function ($http,$ionicSlideBoxDelegate,$rootScope,$ionicSlideBoxDelegate) {

            var _this=this;
            _this.list =[];
            $rootScope.moreData =false;
            this.homeData= function (backImg) {
                $http.jsonp('http://datainfo.duapp.com/shopdata/getBanner.php',{
                    params:{
                        callback:"JSON_CALLBACK"
                    }
                }).success(function (res) {
                    backImg(res);
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);

                }).error(function (error) {
                    console.log('请求数据失败！');
                })
            }

            //商品列表数据
            this.homeList = function (page) {
                $http.jsonp(' http://datainfo.duapp.com/shopdata/getGoods.php',{
                    params:{
                        pageCode:page,
                        callback:"JSON_CALLBACK"
                    }
                }).success(function (res) {

                    console.log(res);

                    //_this.list =_this.list.concat(res);

                    $rootScope.$broadcast('ifmore',res);

                }).error(function (err) {
                    console.log('请求数据失败！');
                });
                return this;
            }
        }])


    //商品详情
        .service('detailS',['$http','$rootScope','$ionicSlideBoxDelegate', function ($http,$rootScope,$ionicSlideBoxDelegate) {
            this.detailList = function (goodsId) {
                $http.jsonp(' http://datainfo.duapp.com/shopdata/getGoods.php',{
                    params:{
                        goodsID:goodsId,
                        callback:"JSON_CALLBACK"
                    }
                }).success(function (response) {
                    console.log(999);
                    console.log(response);
                    $rootScope.$broadcast('detailData',response);

                }).error(function (err) {
                    alert('请求数据失败！');
                });
                return this;
            }


    }])


        //分类
        .service('sortS',['$http','$rootScope', function ($http,$rootScope) {
            this.sortData= function(){
                $http.get('http://datainfo.duapp.com/shopdata/getclass.php',{
                }).success(function(res){
                    $rootScope.$broadcast('sortList', res)
                }).error(function(error){
                    console.log(('请求数据失败'));
                })
            };
                return this;
        }])

        //购物车
        .service('cartS',['$http','$rootScope', function ($http,$rootScope) {
            var _this=this;
            //查看
            this.carData=function(userID){

                $http.jsonp('http://datainfo.duapp.com/shopdata/getCar.php',{
                        params:{
                            userID:userID,
                            callback:"JSON_CALLBACK"
                        }
                }).success(function(result){
                    $rootScope.$broadcast('getCar',result);
                    }).error(function(error){
                    console.log('获取购物车数据请求失败');
                })
            }
            //更新
            this.UpdateData=function(userID,goodsID,number){
                $http.get('http://datainfo.duapp.com/shopdata/updatecar.php',{
                    params:{
                        userID:userID,
                        goodsID:goodsID,
                        number:number
                    }
                }).success(function(result){
                        $rootScope.$broadcast('ifUpdate',result);

                    }).error(function(error){
                    console.log('购物车数据更新请求失败');
                })
            };
                 return this;
        }])

        //我的秀
        .service('mineS',['$http', '$rootScope', function ($http,$rootScope) {

            return {
                "mineData": function() {
                    $http.get("http://datainfo.duapp.com/shopdata/getuser.php")
                    .then(function(res){
                        // console.log(res);   //空data，需要先注册用户才能得到数据
                    }, function(error){
                        console.log("请求失败！");
                    })
                },

                "regData": function(userID,userPsd,ifLogin) {
                    $http.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
                        params:{
                            status:ifLogin,
                            userID:userID,
                            password:userPsd
                        }
                    }).then(function(res){
                        console.log(res);
                        $rootScope.$broadcast('regData',res.data);

                    }, function(error){
                        console.log("error");
                    })
                }

            }
        }])


        //更多
        .service('moreS',['$http', function ($http) {

        }])

