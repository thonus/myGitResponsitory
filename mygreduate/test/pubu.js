/**
 * Created by Administrator on 2016/9/20.
 */

    /*waterfall对象*/
var waterFall = {
    //所有span瀑布的父元素
    container: document.getElementById("container"),
    columnNumber: 1,
    columnWidth: 210,
    // P_001.jpg ~ P_160.jpg
    rootImage: "http://cued.xunlei.com/demos/publ/img/",
    indexImage: 0,

    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
    detectLeft: 0,

    loadFinish: false,

    // 返回固定格式的图片名，根据索引值来生成图片的名称
    getIndex: function() {
        var index = this.indexImage;
        if (index < 10) {
            index = "00" + index;
        } else if (index < 100) {
            index = "0" + index;
        }
        return index;
    },

    // 是否滚动载入的检测,,,,这个检测到底是检测什么，反正最后，所有的图片都会加载完成
    //难道是检测，如果有行还没有显示的话完成的话，就不继续加载？？？
    appendDetect: function() {
        var start = 0;
        for (start; start < this.columnNumber; start++) {
            //获取存放图片的span
            var eleColumn = document.getElementById("waterFallColumn_" + start);
            //如果这个列存在，而且没有加载完成的话
            if (eleColumn && !this.loadFinish) {
                //当这个span的offsetTop加上它的内容高度，小于文档滚动高度加上文档内容高度（上中距离）的时候，就往流后面添加图片
                //eleColumn.offsetTop + eleColumn.clientHeight 这个加起来的结果不是一直不变的么，哦会变，
                // span并没有设置高度，所以高度会一直扩展，所以这个值是一个span的中下高度
                //所以是span的中下高度，小于文档的中上高度的时候，添加元素
                //eleColumn.offsetTop没有随滚动的变化而变化，eleColumn.clientHeight随着元素的增加而变大（每滚动100增加一次）
                // 每一张添加的图片的高度都要大于100，最高的时候，一列有41张图片
                //this.scrollTop随着滚动而变大（每滚动100增加一次（100）），window.innerHeight窗口不变，就没有变化
                //每滚动一百，添加一张图片，每一张图片假设的高度减去100是a的高度，
                // 那么中下和中上的距离，就是以每100px a 的距离在接近，
                // 当中下的距离大于或者等于上中的距离的时候，就不会再加载了
                if (eleColumn.offsetTop + eleColumn.clientHeight < this.scrollTop + (window.innerHeight || document.documentElement.clientHeight)) {

                    this.append(eleColumn);
                }
            }
        }

        return this;
    },

    // 滚动载入
    append: function(column) {

        //先给加载多少张的标记变量加一
        this.indexImage += 1;
        var html = '', index = this.getIndex(), imgUrl = this.rootImage + "P_" + index + ".jpg";

        // 图片尺寸
        var aEle = document.createElement("a");
        aEle.href = "###";
        aEle.className = "pic_a";
        aEle.innerHTML = '<img src="'+ imgUrl +'" /><strong>'+ index +'</strong>';
        column.appendChild(aEle);

        //如果index大于或者等于160的话，就将加载完的标识变量设为true
        if (index >= 160) {
            //alert("图片加载光光了！");
            this.loadFinish = true;
        }

        return this;
    },

    // 页面加载初始创建，这个创建span的思路，循环逐个创建span，并往span里面添加五个a，
    // A里面动态加载图片所以，先说明一下，这个函数都做了写什么。。。。
    //首先逐个创建span，在span中逐个创建a标签，在最后的添加完图片列的span后，
    // 添加一个标识span，然后再将所有的span添加进入container的文档流中，
    //最后计获取标识列span距离器父元素（即container的offsetleft值），放在变量detectLeft中
    // 最后返回当前对象
    create: function() {
        //这个是用来干什么的，根据浏览器窗口的额宽度和每一列的宽度来计算，一共有多少列
        this.columnNumber = Math.floor(document.body.clientWidth / this.columnWidth);

        //这段代码，用来完成什么逻辑
        var start = 0, htmlColumn = '', self = this;

        //循环创建span
        for (start; start < this.columnNumber; start+=1) {
            //这一段字符串连接操作也是叼叼的（一段字符串中，只有变革引号，其实并不利于阅读，
            // 另外半段引号在另一字符串中）这一段字符串，用来生成span的html代码，
            // 并且附上样式，class和style
            htmlColumn = htmlColumn + '<span id="waterFallColumn_'+ start +'" class="column" style="width:'+ this.columnWidth +'px;">'+
                //此处自执行的函数，用得真是牛逼这个自执行函数返回一个a标签，a标签里面有一个img
                 //这个img的src是以一定的规律，设置进去，也用到了字符串的连接，使用这种方法的话
                 //它的图片的路径，就一定是有规律的但是此处添加了五个a标签，所以span中，
                    //初始添加，五张图片
                function() {
                    var html = '', i = 0;
                    for (i=0; i<5; i+=1) {
                        //要改变当前加载到的图片的索引，记录已经加载了多少张
                        self.indexImage = start + self.columnNumber * i;
                        var index = self.getIndex();
                        html = html + '<a href="###" class="pic_a"><img src="'+ self.rootImage + "P_" + index +'.jpg" /><strong>'+ index +'</strong></a>';
                    }
                    return html;
                }() +
                '</span> ';
        }
        //这个是标识列么，并没有放置任何图片
        htmlColumn += '<span id="waterFallDetect" class="column" style="width:'+ this.columnWidth +'px;"></span>';

        //将图片列和标识列添加进container模块中
        this.container.innerHTML = htmlColumn;

        //设置获取标识span距离左边的位置，用来判断是否需要减少图片列
        this.detectLeft = document.getElementById("waterFallDetect").offsetLeft;
        return this;
    },

    refresh: function() {
        var arrHtml = [], arrTemp = [], htmlAll = '', start = 0, maxLength = 0;
        for (start; start < this.columnNumber; start+=1) {
            var arrColumn = document.getElementById("waterFallColumn_" + start).innerHTML.match(/<a(?:.|\n|\r|\s)*?a>/gi);
            if (arrColumn) {
                maxLength = Math.max(maxLength, arrColumn.length);
                // arrTemp是一个二维数组
                arrTemp.push(arrColumn);
            }
        }

        // 需要重新排序
        var lengthStart, arrStart;
        for (lengthStart = 0; lengthStart<maxLength; lengthStart++) {
            for (arrStart = 0; arrStart<this.columnNumber; arrStart++) {
                if (arrTemp[arrStart][lengthStart]) {
                    arrHtml.push(arrTemp[arrStart][lengthStart]);
                }
            }
        }


        if (arrHtml && arrHtml.length !== 0) {
            // 新栏个数
            this.columnNumber = Math.floor(document.body.clientWidth / this.columnWidth);

            // 计算每列的行数
            // 向下取整
            var line = Math.floor(arrHtml.length / this.columnNumber);

            // 重新组装HTML
            var newStart = 0, htmlColumn = '', self = this;
            for (newStart; newStart < this.columnNumber; newStart+=1) {
                htmlColumn = htmlColumn + '<span id="waterFallColumn_'+ newStart +'" class="column" style="width:'+ this.columnWidth +'px;">'+
                    function() {
                        var html = '', i = 0;
                        for (i=0; i<line; i+=1) {
                            html += arrHtml[newStart + self.columnNumber * i];
                        }
                        // 是否补足余数
                        html = html + (arrHtml[newStart + self.columnNumber * line] || '');

                        return html;
                    }() +
                    '</span> ';
            }
            htmlColumn += '<span id="waterFallDetect" class="column" style="width:'+ this.columnWidth +'px;"></span>';

            this.container.innerHTML = htmlColumn;

            this.detectLeft = document.getElementById("waterFallDetect").offsetLeft;

            // 检测
            this.appendDetect();
        }
        return this;
    },

    // 滚动加载，解析一下这个函数都做了什么，文档滚动加载，一旦检测到文档有滚动，
    // 就获取文档滚动的距离，然后判断，如果加载文档加载完成（后面刷新的），而且此次滚动的距离，
    //大于100的话（基于上一次的滚动距离的差值），则刷新当前滚动距离的标识变量，而且调用
    //函数，判断是否往瀑布流中添加内容，最后返回当前对象
    scroll: function() {
        var self = this;

        //window滚动事件触发函数，
        window.onscroll = function() {
            // 为提高性能，滚动前后距离大于100像素再处理

            //获取滚动的高度，文档根节点的滚动的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            //loadFinish是一个标识符，自定义的标识符，如果而且文档没有加载完成，
            // 而且滚动的距离（基于上一次滚动的距离的差值）的绝对值大于100
            if (!this.loadFinish && Math.abs(scrollTop - self.scrollTop) > 100) {
                //刷新，滚动距离的变量，为当前的滚动距离
                self.scrollTop = scrollTop;
                //调用appendDetect()方法，判断是否往瀑布流的后面加载内容
                self.appendDetect();
            }

        };
        return this;
    },

    // 浏览器窗口大小变换
    resize: function() {
        //为什么要用一个变量来存放this，奥，难道是对象的赋值是一个引用，因为后边调用了函数
        //所以后面的this的上下文会改变，所以需要用一个引用来指向this，保证调用正确的对象
        var self = this;
        //窗口改变的时候触发事件
        window.onresize = function() {
            //获取位置标识span的位置
            var eleDetect = document.getElementById("waterFallDetect"), detectLeft = eleDetect && eleDetect.offsetLeft;
            //如果eleDetect（位置标识span）存在，而且标识span的offsetLeft减去detectLeft的绝对值
            // 大于50的话，则认为布局需要改变，调用refresh函数，对布局进行改变
            //为何此处的判断条件是这样的
            if (detectLeft && Math.abs(detectLeft - self.detectLeft) > 50) {
                // 检测标签偏移异常，认为布局要改变
                self.refresh();
            }
        };
        return this;
    },
    init: function() {
        if (this.container) {
            this.create().scroll().resize();
        }
    }
};
waterFall.init();
