$(document).ready(function(){
var len=$('body').css('font-size');
len=Number(len.substring(0,2));
//悬浮框
$("#username-left").on('click',function(event){
	//window.alert("1");
	//alert($("#username-suspend"));
	if($("#username-suspend").length==0)
	{
		var d_width=$("#username-left").width();
		var d_height=$("#username-left").height();
		var suspend="<div id='username-suspend' style='display:none;'></div>";
		var d_top =$("#username-left").position().top;
		var d_left=$("#username-left").position().left;
		d_top=d_top-len/2+3+"px";
		d_left=d_left+"px";
		d_width=d_width+len*4+4+"px";
		//window.alert(d_top);
		$("body").append(suspend);
		$("#username-suspend").css({"width":d_width,"top":d_top,"left":d_left});
		var dropmenu="<div class='username-left-use'>"
					+"<a href='#' class='suspend-active'><div>&nbsp;用&nbsp;户&nbsp;名</div></a>"
					+"<a href='#'><div>&nbsp;&nbsp;邮&nbsp;箱&nbsp;&nbsp;</div></a>"
					+"<a href='#'><div>&nbsp;&nbsp;手&nbsp;机&nbsp;&nbsp;</div></a>"
					+"</div>"
		$("#username-suspend").html(dropmenu);

		//添加监听部分
		$("#username-suspend div a").each(function(i,event){
		//window.alert(i);
			$(this).on("click",function(){
				switch(i){
					case 0:str="&nbsp;用&nbsp;户&nbsp;名";
					       u_str_placehold="用户名含5-12位中文 数字 小字字母";
					       p_str_placehold="请输入密码";
					       msgVerifyhide();
					       pwmsgboxShow();
						   break;
					case 1:str="&nbsp;&nbsp;邮&nbsp;箱&nbsp;&nbsp;";
					       u_str_placehold="邮箱名";
					       p_str_placehold="请输入密码";
					       msgVerifyhide();
					       pwmsgboxShow();
					       break;
					case 2:str="&nbsp;&nbsp;手&nbsp;机&nbsp;&nbsp;";
						   u_str_placehold="手机号";
						   p_str_placehold="验证码";
						   msgVerifyShow();
						   pwmsgboxHide();
					       break;
				}
				$("#username-left div span").first().html(str);
				$("#username").attr("placeholder",u_str_placehold);
				$("#password").attr("placeholder",p_str_placehold);
				$("#username-suspend").hide();
							//检测是否用户输入框中存在值
				if(!($("#username").val().length==0)){
					usernameValid();
				}
			})
		})
	}
	$("#username-suspend").fadeIn("fast");
	$("#username-suspend").mouseleave(function(){
		$("#username-suspend").fadeOut('normal');
	})
	
});
	
	//手机端验证码
	//创建验证码框体
	function msgVerifyShow(){
		if($("#msgverify-box").length==0)
		{
			var x;
			var y;
			var v_width;
			var u_position=$('#password').position();
			//window.alert(u_position.left);
			v_left=u_position.left+19*len;
			v_top=u_position.top-len/2;
			v_width=7*len;
			v_hight=2.5*len;
			var verify_str="<div id='msgverify-box' style='display:none;'><span><a href='#'>获取验证码</a></span></div>";
			$("body").append(verify_str);
			$("#msgverify-box").css({"width":v_width,"height":v_hight,"top":v_top,"left":v_left});
			$("#msgverify-box").show();
			//添加点击事件
			$("#msgverify-box span a").on("click",msgVerifyExec);

			
		}
		else
		{
			$("#msgverify-box").show();
		}
	}
	//隐藏
	function msgVerifyhide(){
		if($("#msgverify-box").length>0){
			$("#msgverify-box").hide();
		}
	}
	//强度检测
	function pwmsgboxShow()
	{
		$("#pwmsg-box").css({"display":"block"});
	}
	function pwmsgboxHide()
	{
		$("#pwmsg-box").fadeOut({"display":"none"},1000);
	}
	//执行检验
	function msgVerifyExec(){

	}

	//安全检验模块
	/*
	模块名：
	描  述：
	模块接口：1.用户输入用户名（邮箱/手机位数）
	          2.用户输入密码（验证）
	模块输出：场景1：用户名（邮箱/手机位数）不正确，在输入框右侧提示：正确无提示
			  场景2：用户输入密码时，进度条开始检验强度（检验方法分3种）
	作者：hjj
	版本：v1.0
	*/
	
	var usernameValid=function(){
		//情况分类
		
		//window.alert("1");
		var c_msg_user=$("#username-left div span").html().trim();
		var valid_msg_user=$("#username").val();
		//window.alert(valid_msg_user);
		switch(c_msg_user)
		{
			//1.用户名uid
			case "&nbsp;用&nbsp;户&nbsp;名":var uid_pattern=/^[a-z0-9\u2E80-\u9FFF]{5,12}$/;
							if(!uid_pattern.test(valid_msg_user)){tooltipShow(1);}
							break;
			//2.邮件
			case "&nbsp;&nbsp;邮&nbsp;箱&nbsp;&nbsp;":var mail_pattern=/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
							if(!mail_pattern.test(valid_msg_user)){tooltipShow(2);}
							break;
			//3.手机
			case "&nbsp;&nbsp;手&nbsp;机&nbsp;&nbsp;":var phone_pattern=/^1[34578]\d{9}$/;
							if(!phone_pattern.test(valid_msg_user)){tooltipShow(3);}
							break;
		}
	 };

	 var passwordValid=function(){

	 	var c_msg_user=$("#username-left div span").html().trim();
	 	var valid_msg_pass=$("#password").val();
	 	switch(c_msg_user)
		{
			//1.用户名uid
			case "&nbsp;用&nbsp;户&nbsp;名":
							var uid_pattern=/^[a-z0-9\x20-\x2f]{5,12}$/;
							if(!uid_pattern.test(valid_msg_pass)){
								$(".modal-body").html("<p class='text-danger'><strong>错误！</strong>密码由5-12位中英文数字和特殊字符（!@#-_）组成</p>");
								$("#pass-modal").modal('show');
							}
							else
							{
								//window.alert(valid_msg_pass);
								var one_pattern=/^.*[a-z]{1,}.*$/;
								var tow_pattern=/^.*[0-9]{1,}.*$/;
								var the_pattern=/^.*[\x20-\x2f]{1,}.*$/;
								var tip=0;
								if(one_pattern.test(valid_msg_pass)){
									tip=tip+1;
								}
								if(tow_pattern.test(valid_msg_pass)){
									tip=tip+1;
								}
								if(the_pattern.test(valid_msg_pass)){
									tip=tip+1;
								}
								window.alert(tip);
								switch(tip)
								{
									case 1:animateProgress(0,33);break;
									case 2:animateProgress(0,66);break;
									case 3:animateProgress(0,100);break;
								}
							}
							break;
			//2.邮件
			case "&nbsp;&nbsp;邮&nbsp;箱&nbsp;&nbsp;":
							var mail_pattern=/^[a-z0-9\x20-\x2f]{5,12}$/;
							if(!mail_pattern.test(valid_msg_pass)){
								$(".modal-body").html("<p class='text-danger'><strong>错误！</strong>密码由5-12位中英文数字和特殊字符（!@#-_）组成</p>");
								$("#pass-modal").modal('show');
							}
							else
							{
								var one_pattern=/^.*[a-z]{1,}.*$/;
								var tow_pattern=/^.*[0-9]{1,}.*$/;
								var the_pattern=/^.*[\x20-\x2f]{1,}.*$/;
								var tip=0;
								if(one_pattern.test(valid_msg_pass)){
									tip++;
								}
								if(tow_pattern.test(valid_msg_pass)){
									tip++;
								}
								if(the_pattern.test(valid_msg_pass)){
									tip++;
								}
								window.alert(tip);
								switch(tip)
								{
									case 1:animateProgress(0,33);break;
									case 2:animateProgress(0,66);break;
									case 3:animateProgress(0,100);break;
								}
							}
							break;
			//3.手机
			case "&nbsp;&nbsp;手&nbsp;机&nbsp;&nbsp;":
							var phone_pattern=/^[0-9]{4,6}$/;
							if(!phone_pattern.test(valid_msg_pass)){
								$(".modal-body").html("<p class='text-danger'><strong>错误！</strong>验证码只存在数字</p>");
								$("#pass-modal").modal('show');
							}
							break;
		}
	 }


	 $("#password").on("change",passwordValid);
	 $("#username").on("change",usernameValid);

	//入框右侧提示
	function tooltipShow(str0){
		var msg_worrer;
		if($("#ucheck-box").length==0)
		{
			var tooltip_str="<div id='ucheck-box' style='display:none;'></div>";
			$("body").append(tooltip_str);					
		}
		var t_top;
		var t_left;
		var u_position=$("#username").position();
		t_top=u_position.top;
		//t_left=u_position.left;
		switch(str0)
		{
			case 1:msg_worrer="5-12位中英文数字";t_left=u_position.left+8*len;break;//12
			case 2:msg_worrer="不符合邮件格式";t_left=u_position.left+11*len;break;
			case 3:msg_worrer="不符合手机号格式";t_left=u_position.left+10*len;break;
		}
		$("#ucheck-box").css({"left":t_left,"top":t_top});
		$("#ucheck-box").html(msg_worrer);
		$("#ucheck-box").show("fast").delay(1000).fadeOut(1000);
	}


	//动画效果
	//初33 中66 高34
	function animateProgress(start,end){
		if($("#pwmsg-box .progress .progress-bar-danger").css("width")!="15%")
		{
			$("#pwmsg-box .progress .progress-bar-danger").animate({width:"15%"},300);
		}
		if(end<=33)
		{
			end=end+"%";
			$("#pwmsg-box .progress .progress-bar-danger").animate({width:end},1000);
		}
		else if(end>33&&end<=66)
		{
			end=end-33+"%";
			$("#pwmsg-box .progress .progress-bar-danger").animate({width:"33%"},500,function(){
				$("#pwmsg-box .progress .progress-bar-warning").animate({width:end},500);
			});
		}
		else
		{
			end=end-66+"%";
			$("#pwmsg-box .progress .progress-bar-danger").animate({width:"33%"},300,function(){
				$("#pwmsg-box .progress .progress-bar-warning").animate({width:"33%"},300,function(){
					$("#pwmsg-box .progress .progress-bar-success").animate({width:end},300);
				});
			});
		}
	}
	//提交检验模块
//end ready
})