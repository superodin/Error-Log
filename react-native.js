

rm -rf node_modules && npm install
1.mobx状态库的使用  同级组件之间通信 设计es7的装饰器   
@inject  插入  
@observer 观察者模式 负责监视组件数据  
@observable 声明监视数据    
@action 行为  改变数据的方法要包裹在其中

2.webview组件插入html代码，将获取的代码片段插入完整h5中，设置图片宽度能防止溢屏   将页面高度document.body.clientHeight
放入document.title中  然后用onNavigationStateChange函数将高度传给RN   
P.S  尝试在h5页面用postMessage将高度传给RN  RN用onMessage获取所传参数     但是发送失败    还需验证

3.faltList组件的下拉刷新   onRefresh实现下拉刷新列表   必须要设置加载图标refreshing（布尔值）   

0827

react-native-image-crop-picker 编译报错要添加 maven 源
mainactitiyjava native 代码
原生的代码按照androidstudio的方式集成即可   并在build.gradle内配置加载项     
react-native link xxxx  是RN集成原生插件的方法
首先 install 然后 link 会自动进行设置加载项和路径  remove后 之前的插入代码不会一同删除
要手动删除  避免加载两次插件报错

0829
今天将项目的RN版本·从0.49升级到0.56，使用git升级模块，首先全局安装 npm install -g react-native-git-upgrade，然后 
直接运行 react-native-git-upgrade，就可RN升级到最新稳定版本。
主要原理是利用Git工具计算新旧版本文件间的差异并生成补丁，然后在用户的项目文件上应用补丁。

Unable to resolve module `AccessibilityInfo`  0.56的官方BUG    解决方法降级到0.55.4

Cannot read property 'bindings' of null 
babel-preset-react-native版本过低造成，React Native 0.56.0 需要 babel-preset-react-native@5.0.0 版本

:react-native-image-crop-picker    要在project下的build.gradle下添加maven源 
maven { 
            url "https://jitpack.io" 
        }

0830
引用本地图片的名字不能带中文和 -

0910
要做字体的从左至右的滚动效果，通过设置setState会影响页面性能造成卡顿，需要直接操作组件进行局部刷新，要用 setNativeProps + 定时器实现，利用
let i = 0;
    this.timer = setInterval(() => {
      i = i - 2;
      if (i < -2000) {
        i = 0;
      }
      this.text.setNativeProps({ style: { marginLeft: i } });
    }, 80); 
做到从字体轮播，注意调整间隔时间很重要，而且要在组件卸载时 componentWillUnmount 清除定时器

还有引入第三房字体，要在根目录下新建 assets/fonts/xxx.ttf,然后在packjson设置字体引入的路径 
"rnpm": { "assets": [ "./assets/fonts" ] }，然后运行react-native link 链接到原生代码中
P.S. 将字体直接引入到原生文件夹中,android/app/src/main/assets/fonts/xxx.ttf,好像不会起作用
PP.S.（会起作用，但是字体文件的名称不能更改，fontFamily引用必须和字体文件的内部属性名称一致） 

 
不同机型的适配还是有区别的，6.0英寸以下的手机适配不好，需要注意，尤其是图片，最好使用resizeMode={'cover'}   留白最小

react-native-http-cache error
ios： /node_modules/react-native-http-cache/ios/RCTHttpCache/RCTHttpCache.m 下做如下更改

#import "RCTImageLoader.h" -> #import "React/RCTImageLoader.h"

#import "RCTBridge.h" -> #import "React/RCTBridge.h"

android： /node_modules/react-native-http-cache/android/src/main/java/cn/reactnative/httpcache/HttpCacheModule.java 下做如下更改

getMainDiskStorageCache 替换为-> getMainFileCache

getSmallImageDiskStorageCache 替换为-> getSmallImageFileCache

Image组件
resizeMethod和resizeMode 两种属性可以一起使用   缩小图片很好用
resizeMethod={"resize"}
resizeMode = {"stretch"}

1031
ScrollView组件加上flexDirection: "row" 样式后无法垂直滚动

1101
1.react this.setState({})不能保证为同步，可使用回调实现同步，this.setState({},[callback])异步还是同步判断如下：

是在React库控制之内时，它就会以异步的方式来执行，否则以同步的方式执行。

但大部份的使用情况下，我们都是使用了React库中的组件，例如View、Text、Image等等，

它们都是React库中人造的组件与事件，是处于React库的控制之下，在这个情况下，

setState就会以异步的方式执行。一般理解为this.state的值会在DOM中渲染，其他的情况比如取token,作为接口的参数的你setState是同步的

2.react-navigation 导航器库    

3.数组方法
   求和    arr.reduce(function(total,num){return toatl+num})
   push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度（谨记谨记，返回为长度）。
   pop() 移出最后一个元素 ，返回移出的元素（谨记谨记，返回为删除的元素）

1108
编译报错 Could not find method implementation()
把build.gradle中的dependencies中的
implementation改为compile即可
原因：3.0的依赖改变书写方式，如从3.0改为2.+需要做此改动

1109
reactnative 实现横向自动换行
flexWrap: "wrap",
flexDirection: "row"

react-native log-android

报错exposed beyond app through Intent.getData()，两种原因
1.版本不支持 
尽量保持android:targetSdkVersion版本在24以下
buiild.gradle文件的 targetSdkVersion = 23

2.权限问题 
同样修改AndroidManifest.xml文件，添加<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
这个主要影响Android 8.x版本

1128
Unable to resolve module './createNavigationContainer'  react navigation报错   缓存原因
运行npm start -- --reset-cache

1214
获取当前组件高度 findNodeHandle方法是在React中定义，可以找到组件实例的reactTag（执行在JS端），类似获取当前组件
UIManager.measure(handle, (x, y, width, height, pageX, pageY) =>{}）
获取组件信息  x、y:为视图的相对位置。width、height：为视图的宽度和高度。pageX、pageY为视图在屏幕上的绝对位置  

1218
作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象

1225
Android的implements 和 extends
extend  x类通过extend y类  添加y类方法、变量，或者覆盖y类的方法
implements  则表示接口 子类实现父类中定义而未实现的类  并且不能覆盖父类中的方法
https://blog.csdn.net/lhf_tiger/article/details/16864233

0111
js中return false;一般是用来取消默认动作的,所以可以用return false;来取消a标签的跳转。
但是上述例子还会跳转界面，因为onclick="a();"会执行a()函数，a()的返回值对与onclick是无效的，所以会执行a()并跳转链接。
解决方法:   onclick="return a();"

webview组件
onNavigationStateChange ：官方文档是这么写的Function that is invoked when the WebView loading starts or ends
console log:这个输出是刚进入webview这个页面的输出 
{ target: 809,
  canGoBack: false,
  loading: false,
  title: '',
  canGoForward: false,
  navigationType: 'other',
  url: 'about:blank' }
当点击webview中的一个跳转按钮会输出如下：


{ target: 809,
  
canGoBack: false,
  
loading: false,
 
 title: 'tab2',
  
canGoForward: false,
 
 navigationType: 'click',
 
 url: 'a.html' }//这个a.html就是我们刚才点击的链接要访问的地址

onMessage：
/* onMessage log*/
 { target: 808,
  canGoBack: false,
  data: '123',
  loading: false,
  title: 'tab2',
  canGoForward: false,
  url: 'about:blank' }

https://blog.csdn.net/u011690583/article/details/68922118

0211
引用handlebars,报错 Module `fs` does not exist in the Haste module map
fs是node的内置模块，不能用于rn
简单来说，就是这个handlebars并不能直接用于rn
删除node_module中该模块

0212
mustache ->  js模板引擎
Mustache.render("Hello,{{name}}",{name,"Jack"})
返回 Hello,Jack
双花括号{{}}为mustache的占位符，其中为插入的参数值
通常的解决方案是将模板放在script标签中
<script type="text/x-mustache" id="template">

<p>Hello, {{name}}</p> 

</script>  

P.S.  给“script”一个浏览器无法理解的“type”属性，浏览器就会忽略该Script，不将它作为JavaScript，也不会执行它

可以访问script标签来实现向模板传参
var temp = $("#template").html();  
Mustache.render(temp { name: "Jack" }); 
返回   <p>Hello, Jack</p>  

循环遍历参数
{{#people}}
   {{name}}
{{/people}}

{people:[{name,'Jack'},{name,'Tom'}]}

P.S.  ( github中已star )

0321 
app打包apk后白屏，可能没有设置权限，要在代码里申请权限
PermissionsAndroid 可以访问Android M(也就是6.0)开始提供的权限模型。
有一些权限写在AndroidManifest.xml就可以在安装时自动获得，但有一些“危险”的权限则需要弹出提示框供用户选择

0322
Modal内图片放大手势无法实现，原因可能是手势冲突，将图片组件放入新的页面内可解决

0323
 Multiple dex files define Lcom/pgyersdk/R$xml;
文件冲突

0325
teaset 里面的 checkbox 组件不指定改变checked方法会变成只能单选，用子组件包裹之后引入就可以了

0402
TextInput 要设置 multiline = {true} 这个属性才能实现换行

0403
map遍历中去给数组赋值   子元素点击操作会导致赋值操作重新进行一遍

0411
flatlist 父元素没有设置高度的话会导致 onEndReached 函数频繁触发

0425 
rn-fetch-bolb 组件 的app安装是利用原生的actionViewIntent   7.0之后android
需要添加intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);到源代码中

0426
移动报建适配：
我的材料 react-native-scrollable-tab-view 组件不能显示的问题，没有设置宽高；
react-native-spinkit 不能正常显示  用RN ActivityIndicator组件替换；
图片路径不能用{uri:参数}显示，因为的数据没有图片，要做判断返回uri对象或者require路径，不能只用uri，

0520
flatlist Invariant Violation: Tried to get frame for out of range index NaN
flatlist 数据源不是数组
flatlist 的renderItem返回的是对象   

0522
对数据进行操作先判断该数据存在不存在

0528
1.promise.race（[promiseA,promiseB]） 竞赛对象,哪个promise先处理完成就返回哪个promise的resolve或reject
let a = new Promise((resolve,reject)=>{}).then(res=>{res为resovle的值}).catch(err=>{console.log(err为reject的值)})

2.在Promise.all(()=>{})内进行for循环，才会使所有循环都进行完毕后返回一个数组。
Promise.all()会以一个 promises 数组为输入，并且返回一个新的 promise。这个新的 promise 会在数组中所有的 promises 都成功返回后才返回。他是异步版的 for 循环。

3.then()函数一定要返回 return
  return 另一个 promise
  return 一个同步的值 (或者 undefined)
  throw 一个同步异常
  
4.Promise.resolve()  Promise.reject()
  new Promise((resolve,reject)=>{ resolve() })的语法糖





