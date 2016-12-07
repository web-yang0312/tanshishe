$(function(){
	var box=$(".box")[0];
	for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
        	var div=$("<div>")
        	div.id=i+"-"+j;
        	box.appendChild(div);
        }
	}
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	for(var i=0;i<she.length;i++){
		var obj=$("#"+she[i].x+"-"+she[i].y);
		obj.className="she";
	}
	function getFood(){
		var x=Math.floor(Math.random()*20);
		var y=Math.floor(Math.random()*20);
		var obj=$("#"+x+"-"+y);
		obj.className="food";
		return{x:x,y:y}
	}
   	var food=getFood();
	function panduan(a,b){
		for(var i=0;i<she.length;i++){
			if(she[i].x==a&&she[i].y==b){
				return true;
			}
			
		}
		return false;
	}
	var fangxiang="you";
	function run(){
		var a;
		var b;
		// var fangxiang=she[she.length-1].y+1
		var jiutou=she[she.length-1];
		if(fangxiang=="you"){
			var newtou=$("#"+jiutou.x+"-"+(jiutou.y+1));
			if(newtou==null||panduan(jiutou.x,jiutou.y+1)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newtou.className="she";
			she.push({x:jiutou.x,y:jiutou.y+1})
			a=jiutou.x;
			b=jiutou.y+1;
		}else if(fangxiang=="zuo"){
			var newtou=$("#"+jiutou.x+"-"+(jiutou.y-1));
			if(newtou==null||panduan(jiutou.x,jiutou.y-1)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newtou.className="she";
			she.push({x:jiutou.x,y:jiutou.y-1})
			a=jiutou.x;
			b=jiutou.y-1;
		}else if(fangxiang=="shang"){
			var newtou=$("#"+(jiutou.x-1)+"-"+jiutou.y);
			if(newtou==null||panduan(jiutou.x-1,jiutou.y)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newtou.className="she";
			she.push({x:jiutou.x-1,y:jiutou.y})
			a=jiutou.x-1;
			b=jiutou.y;
		}else if(fangxiang=="xia"){
			var newtou=$("#"+(jiutou.x+1)+"-"+jiutou.y);
			if(newtou==null||panduan(jiutou.x+1,jiutou.y)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newtou.className="she";
			she.push({x:jiutou.x+1,y:jiutou.y})
			a=jiutou.x+1;
			b=jiutou.y;
		}
		
		if(food.x==a&&food.y==b){
			food=getFood();
		}else{
			var shewei=$("#"+she[0].x+"-"+she[0].y);
			shewei.className="";
			she.shift();
		}
		
	}
	var t=setInterval(run,200)
	// 键盘事件上下左右动
	document.onkeydown=function(e){
		var e=e||window.event;
		var nub=e.keyCode;
		if(nub==37){
			if(fangxiang=="you"){
				return;
			}
			fangxiang="zuo";
		}else if(nub==38){
				if(fangxiang=="xia"){
					return;
				}
				fangxiang="shang";
		}else if(nub==39){
				if(fangxiang=="zuo"){
					return;
				}
				fangxiang="you";
		}else if(nub==40){
				if(fangxiang=="shang"){
					return;
				}
				fangxiang="xia";
		}
	}
	$(".shuaxin").onclick=function(){
		window.history.go(0)
	}
	$(".zanting").onclick=function(){
		clearInterval(t);
	}
	$(".tuichu").onclick=function(){
		window.opener=null;
		window.open('','_self');
		window.close();
	}
})