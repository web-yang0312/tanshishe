// 功能   要实现IE低版本里面适配getClass
function getClass(classname,obj){
	obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}
		else{			
			var objs=obj.getElementsByTagName("*");
			var arr=[];
			for(i=0;i<objs.length;i++){
                if (getmoreClass(classname,objs[i])){ 
				     arr.push(objs[i])
			   }
			}
			return arr;
		}
		
	}

 function getmoreClass(classname,obj){
 	var classStr=obj.className;
 	var classArr=classStr.split(" ");
 	for(var i=0;i<classArr.length;i++){
 		if(classArr[i]==classname){
 			return true;
 		}
 		return false;
 	}
 }




function $(val,obj){
    if(typeof val=="string"){
         var obj=obj||document;
            val.replace(/^\s*|\s*$/g,"");
        if(val.charAt(0)=="#"){
            return document.getElementById(val.slice(1));
        }else if(val.charAt(0)=="."){
            return getClass(val.slice(1),obj)
        }else if(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/.test(val)){
            return obj.getElementsByTagName(val)
        } else if(/^<[a-zA-Z][a-zA-Z0-9]{0,9}>$/.test(val)){
            return document.createElement(val.slice(1,-1))
        }
  
    }else if(typeof val=="function"){
        window.onload=function(){
            val();
        }
    }
}




// 实现 currentStyle在ff不兼容
function getStyle(obj,style){
	//ie支持
	if(obj.currentStyle){
		return obj.currentStyle[style];
		// ff支持
	}else if(getComputedStyle(obj,null)){
		return getComputedStyle(obj,null)[style]
	}
}



// 实现IE不支持textContent
function getText(obj,val){
	if (val!=undefined) {
      if(obj.textContent){
		  return obj.textContent=val;
	    }else{
		    return obj.innerText=val;
	    }  
	}else{
	if(obj.textContent){
		return obj.textContent;
	}else{
		return obj.innerText;
	}
}
}

// 取节点
function getChilds(obj,type){
   var type=type||"no"
   var kids=obj.childNodes;
   var arr=[];
   for(var i=0;i<kids.length;i++){
   	if(type=="no"){
   		if(kids[i].nodeType=="1"){
   			arr.push(kids[i]);
   		}
   	}else if(type=="yes"){
   		if(kids[i].nodeType=="1"||kids[i].nodeType=="3"&&kids[i].nodeValue.replace(/^\s*|\*$/g,"")){
   			arr.push(kids[i]);
   		}
   	}
   }
   return arr;	
}


// 取第一个节点
function getFirst(obj,type){
	var type=type||"no";
	return getChilds(obj,type)[0];
}


function getLast(obj,type){
	var type=type||"no"	
	var index=getChilds(obj,type)
	return index[index.length-1]
}


// 获取第n个节点
function getNub(obj,n,type){
	type=type||"no";
	var childs=getChilds(obj,type)[0]
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];
}

// 获取下一个兄弟节点
function getNext(obj,type){
	var type=type||"no"
	var next=obj.nextSibling;
	if(type==null){
		return false;
	}
	if(type=="no"){
        while(next.nodeType=="3"||next.nodeType=="8"){
        	next=next.nextSibling;
        	if(next=null){
        		return false;
        	}
        } 
        return next
	}else if(type=="yes"){
  	     while(next.nodeType==3&&next.nodeValue.replace(/^\s*\s*$/g,"")||next.nodeType==8){
        	next=next.nextSibling;
        	if(next==null){
        		return false;
        	}
        } 
        return next

  	}
}


// 获取上一个兄弟节点
function getPrevious(obj,type){
	var type=type||"no"
	var previous=obj.previousSibling;
	if(type==null){
		return false;
	}
	if(type=="no"){
        while(previous.nodeType=="3"||previous.nodeType=="8"){
        	previous=previous.previousSibling;
        	if(previous==null){
        		return false;
        	}
        } 
        return previous
	}else if(type=="yes"){
  	     while(previous.nodeType==3&&previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType==8){
        	previous=previous.previousSibling;
        	if(previous==null){
        		return false;
        	}
        } 
        return previous

  	}
}



// 插入到某个对象之前
function insertBefore(obj,beforeobj){
     var parent=beforeobj.parentNode;
     parent.insertBefore(obj,beforeobj)    
}
// 插入到某个对象之后
function insertAfter(obj,afterobj){
   var parent=afterobj.parentNode;
   // 要文本选yes，获取下一个兄弟节点
   var next=getNext(afterobj,"yes")
   // 此处的!next=next==false
   if(!next){
   	 parent.appendChild(obj);
   }else{
   	 parent.insertBefore(obj,next);
   }
                                                                                                       
}


// 添加事件
function addEvent(obj,event,fun){
    if(obj.attachEvent){
         return obj.attachEvent("on"+event,fun)
    }else if(obj.addEventListener){
         return obj.addEventListener(event,fun,false)
    }
}

// 删除事件
function removeEvent(obj,event,fun){
    if(obj.detachEvent){
         return obj.detachEvent("on"+event,fun)
    }else if(obj.removeEventListener){
         return obj.removeEventListener(event,fun,false)
    }
}


// 鼠标滚动事件
function mouseWheel(obj,down,up){
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFun)
    }else{
      obj.addEventListener("mouseWheel",scrollFun,false)
      obj.addEventListener("DOMMouseWheel",scrollFun,false)

    }
    function scrollFun(e){
      var e=e||window.event;
      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue=false;
      }
      var nub=e.wheelDelta||e.detail
      if(nub==120||nub==-3){
        //call改变this指针，指向obj
       up.call(obj)
      }else if(nub==-120||nub==3){
         down.call(obj)
      }
    }
}
// 拖拽
function Drag(obj){
     this.obj=obj;
     this.ox=0;
     this.oy=0;
     this.cx=0;
     this.cy=0;
     this.left=0;
     this.top=0;
     this.cw=document.documentElement.clientWidth;
     this.ch=document.documentElement.clientHeight;
     this.ow=this.obj.offsetWidth;
     this.oh=this.obj.offsetHeight;
}
Drag.prototype={
    Drag:function(){
        this.down();
    },
    down:function(){
          var that=this;
        that.obj.onmousedown=function(e){
            var e=e||window.event;
            that.ox=e.offsetX;
            that.oy=e.offsetY;
            that.move();
            that.up();
        }
        
    },
    move:function(){
        var that=this;
        document.onmousemove=function(e){
            var e=e||window.event;
            that.cx=e.clientX;
            that.cy=e.clientY;
            that.left=that.cx-that.ox;
            that.top=that.cy-that.oy;
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue=false;
            }
            if(that.left>=that.cw-that.ow){
                that.left=that.cw-that.ow;
            }
            if(that.left<=0){
                that.left=0;
            }
            if(that.top>=that.ch-that.oh){
                that.top=that.ch-that.oh;
            }
            if(that.top<=0){
                that.top=0;
            }
            that.obj.style.left=that.left+"px";
            that.obj.style.top=that.top+"px";
        }
        
    },
    up:function(){
       document.onmouseup=function(){
        document.onmousemove=null;
       }

    }
}
// 鼠标滚轮事件
function mouseWheel(obj,down,up){
  if(obj.attachEvent){
    document.attachEvent("onmousewheel",scorllfun)
  }else{
    document.addEventListener("DOMMouseScroll",scorllfun,false);
    document.addEventListener("mousewheel",scorllfun,false);

  }
  function scorllfun(e){
    var e=e||window.event;
    var nub=e.wheelDelta||e.detail;
    if(nub==120||nub==-3){
        up.call(obj);
    }
    if(nub==-120||nub==3){
        down.call(obj);
    }
  }
}
//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
    if(parent.contains){
        return parent.contains(child) && parent!=child;
    }else{
        return (parent.compareDocumentPosition(child)===20);
    }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}

//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
  if(parent.contains){
    return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
  if(getEvent(e).type=="mouseover"){
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
  }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
  }
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
  if(overfun){
    obj.onmouseover=function  (e) {
      if(checkHover(e,obj)){
        overfun.call(obj,[e]);
      }
    }
  }
  if(outfun){
    obj.onmouseout=function  (e) {
      if(checkHover(e,obj)){
        outfun.call(obj,[e]);
      }
    }
  }
}
function getEvent (e) {
  return e||window.event;
}
