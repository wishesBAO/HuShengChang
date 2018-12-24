/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
         it('feed has a url and url is not empty',function(){
            for(var i=0;i<allFeeds.length;i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
         });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('feed has a name and name is not empty',function(){
            for(var i=0;i<allFeeds.length;i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].length).not.toBe(0);
            }
        });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */

        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
         it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('slide-menu should be change status', function() {
            var menuClick =$('.menu-icon-link');
            menuClick.trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuClick.trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });


    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function() {
      var originalTimeout=15000;//10秒中太短，所以设置成了15秒
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
         beforeEach(function(done){
              loadFeed(0, done);
          }, 10000);

          it('loadFeed work', function(done) {
            expect($('.feed .entry').length).not.toBeNull();
            done();
          });

        afterEach(function(){
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function() {
      /* var originalTimeout;
      var contentOne, contentTwe;

        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         
        */
        var text1,//存储2号时候后端服务器发过来的数据包
            text2;//存储0号时候后端服务器发过来的数据包
            beforeEach(function(done)
            {
                  loadFeed(2,function()//收2的数据
                  {
                    text1 = $('.feed').text();//存入
                    console.log("1好了：" + text1);//存好了，易于调试
                    loadFeed(0,function()//收0数据
                    {
                        text2 =$('.feed').text();//存入text2
                        console.log("2好了" + text2);//易于调试
                        done();//异步结束
                });
            });
        });

            it("load container1",function()
            {
                expect(text1).not.toEqual(text2);//是否一致
            
            });
        });
    });
}());