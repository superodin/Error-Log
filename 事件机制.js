
/*
今天进行同济项目中遇到一个问题，关闭tab页时，会自动跳转显示到下一个tab，而正常应该是vm.showTab应该为undefined。
tab页关闭代码如下：
*/

<div class="tab_btn_custom" ng-repeat="tab in vm.tabs track by $index" ng-init="showItems=[]">
	<button ng-class="{'active':vm.showTab==tab.name}"
			ng-click="vm.changeShowTab(tab)"
			ng-mouseover="showItems[$index]=true"
			ng-mouseout="showItems[$index]=false"
			title="{{tab.title}}">
		{{tab.title||'null'}}
		<span ng-show="showItems[$index]" class="mainMenuBodyRightTabSpan" ng-click="vm.closeChooseTab(tab.name)" title="关闭">
			&times;
		</span>
	</button>
</div>
		
// 是由于忽略了事件冒泡机制导致点击关闭tab页时，触发了父标签button的changeTab函数。所以借此重新复习一下JavaScript的事件机制。

// 1.事件冒泡和捕获。

// 当一个事件发生在具有父元素的元素上时，现代浏览器运行两个不同的阶段 - 捕获阶段和冒泡阶段。 
// 在捕获阶段：

// 浏览器检查元素的最外层祖先<html>，是否在捕获阶段中注册了一个onclick事件处理程序，如果是，则运行它。
// 然后，它移动到<html>中的下一个元素，并执行相同的操作，然后是下一个元素，依此类推，直到到达实际点击的元素。

// 在冒泡阶段，恰恰相反:

// 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个onclick事件处理程序，如果是，则运行它
// 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达<html>元素。

// 在现代浏览器中，默认情况，所有事件处理程序都是在冒泡阶段进行注册。
// 所以在点击span标签冒泡到button标签，先找到span中span.closeChooseTab并执行，然后向上冒泡找到button.changeShowTab函数并执行。

// 用stopPropagation()函数可将事件处理器只在当前事件对象执行，不会沿着冒泡链继续向上执行。

// 2.事件委托

// 事件委托可以就是利用事件冒泡进行事件处理。将事件监听器绑定在父节点上，监听器会会分析子元素冒泡上来的事件，
// 从而确定是哪个子节点触发的事件。

<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>

// 当子元素的事件冒泡到父ul元素时，你可以检查事件对象的target属性，捕获真正被点击的节点元素的引用。

// 找到父元素，添加监听器...
document.getElementById("parent-list").addEventListener("click",function(e) {
	// e.target是被点击的元素!
	// 如果被点击的是li元素
	if(e.target && e.target.nodeName == "LI") {
		// 找到目标，输出ID!
		console.log("List item ",e.target.id.replace("post-")," was clicked!");
	}
});

