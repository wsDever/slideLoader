# slideLoader
一个移动端通用下拉刷新插件，基于jQuery(zepto)
## 使用方法
  引用jQuery(zepto)

  引用下载dist下js和css文件
  
  依照demo的dom结构进行使用：

	<div class="loader">
		<!-- 加载样式 -->
		<div class="load-cnt">玩儿命加载中...</div> 
		<!-- 触发元素 -->
		<div class="load-bar">
			<div style="height:150px;line-height:150px;">按住下拉试试</div>
		</div>
	</div>
  方法调用：

	$(ele).slideLoader({
		"offset":num,
		"time":num
		},function(){
		// doing something
	});

## 参数
	ele : 触发事件的元素；
	offset : Number,触发事件下拉的距离；
	time : Number,动画执行的时间,单位为秒；

## 测试Demo
  访问[Demo页](https://wsdever.github.io/)

## 说明
  使用场景不同样式不便统一，故此插件无样式绑定，可自行在提供的样式基础上修改。
