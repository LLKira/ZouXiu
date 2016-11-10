
angular.module('ZXIUApp',['ionic','controllers'])

        .config(['$stateProvider', '$ionicConfigProvider', function ($stateProvider,$ionicConfigProvider) {

            //安卓下tab选项卡  一直在底部
            $ionicConfigProvider.platform.android.tabs.position("bottom");
            $ionicConfigProvider.tabs.style('standard');
            //安卓下头部的导航条标题一直居中
            $ionicConfigProvider.navBar.alignTitle('center');

            $stateProvider
                    .state('tabs',{
                        url:'/tabs',
                        templateUrl:'template/tabs.html',
                        abstract:true
                    })

                    //首页
                    .state('tabs.home',{
                        url:'/home',
                        views:{
                            'homeView':{
                                templateUrl:'template/home.html',
                                controller:'homeCtrl'
                            }
                        }
                    })
  ////商品详情
                .state('Details',{
                    url:'/Details',
                    templateUrl:'template/Details.html',
                    //abstract:true
                })
                //商品详情-介绍
                    .state('Details.intro',{
                        url:'/intro/:id',
                        cache:false,
                        views:{
                            'introView':{
                                templateUrl:'template/intro.html',
                                controller:'introCtrl'
                            }
                        }
                    })
                        //商品详情-详情
                    .state('Details.detail',{
                        url:'/detail',
                        cache:false,
                        views:{
                            'detailView':{
                                templateUrl:'template/detail.html',
                                controller:'detailCtrl'
                            }
                        }
                    })
                    //    //商品详情-实拍
                    .state('Details.real',{
                        url:'/real',
                        cache:false,
                        views:{
                            'realView':{
                                templateUrl:'template/real.html',
                                controller:'realCtrl'
                            }
                        }
                    })


                    //分类
                    .state('tabs.sort',{
                        url:'/sort',
                        views:{
                            'sortView':{
                                templateUrl:'template/sort.html',
                                controller:'sortCtrl'
                            }
                        }
                    })


                    //购物车
                    .state('tabs.cart',{
                        url:'/cart',
                        cache:false,
                        views:{
                            'cartView':{
                                templateUrl:'template/cart.html',
                                controller:'cartCtrl'
                            }
                        }
                    })


                    //我的秀
                    .state('tabs.mine',{
                        url:'/mine',
                        cache:false,
                        views:{
                            'mineView':{
                                templateUrl:'template/mine.html',
                                controller:'mineCtrl'
                            }
                        }
                    })

                        //我的秀 ————> 注册
                        .state('tabs.register',{
                            url:'/register',
                            views:{
                                'mineView':{
                                    templateUrl: 'template/register.html',
                                    controller: 'regCtrl'
                                }
                            }
                        })

                        //我的秀 ————> 登录
                        .state('tabs.login',{
                            url:'/login',
                            cache: false,
                            views:{
                                'mineView':{
                                    templateUrl: 'template/login.html',
                                    controller: 'loginCtrl'
                                }
                            }
                        })

                    //更多
                    .state('tabs.more',{
                        url:'/more',
                        views:{
                            'moreView':{
                                templateUrl:'template/more.html',
                                controller:'moreCtrl'
                            }
                        }
                    })
        }])
