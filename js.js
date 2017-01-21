var toucimage={
  toucfunc:function(jsons){
    if (!(!jsons.imgsrc || !jsons.imagename || !jsons. Imagenum)) {
       // var demo=jsons.imgsrc+jsons.imagename+'1.'+jsons.format;
       var demo='src='+jsons.imgsrc+jsons.imagename+'1.'+jsons.format;
        $(jsons.toucharea).append("<img "+demo+" align="+jsons.align+" />")
        for (var i =1; i<jsons.Imagenum; i++) {
        var loadimg=jsons.imgsrc+jsons.imagename+ i +'.'+jsons.format;
        $(jsons.toucharea).append('<img '+demo+' style="display:none;">')
        }
    }//预处理图片
    var bd=$(jsons.toucharea).get(0),indeximage=1;
      switch(jsons.speed){
        case "快":
          var speed=10;
        break;
        case "中":
          var  speed=20;
        break;
        case "慢":
          var speed=30;
        break;
      };
    if(!navigator.userAgent.match(/(iPhone|iPad|Android|ios)/i)){  //判断是否移动设备
      var maskingid=jsons.toucharea.substr(1)+'_masking';
      $(jsons.toucharea).prepend('<div id='+maskingid+'></div>');
       $('#'+maskingid).css({
        "position":"absolute",
        "top":'0',
        "left":'0',
        "width":'100%',
        "height":'100%',
        "z-index":'100'
       })
      // var e=e ||event||event.srcElement ? event.srcElement : event.target;
      bd.onmousedown=function(e){
        tartdown = {x:e.clientX,y:e.clientY};
        document['onmousemove']=function(e){
          tartmove= {x:e.clientX-tartdown.x,y:e.clientY-tartdown.y};
          isonmouse = Math.abs(tartmove.x) < Math.abs(tartmove.y) ? 1:0;
           $(jsons.toucharea+" img").attr("src",jsons.imgsrc+jsons.imagename+indeximage+'.'+jsons.format);
         if (isonmouse==0 && tartmove.x>0) {
            if (Math.abs(tartmove.x) >speed && indeximage<jsons.Imagenum) {
              return  indeximage+=1;
            }
         }else if (isonmouse==0 && tartmove.x<0) {
            if (!(indeximage==1)) {
              if (Math.abs(tartmove.x) >speed  && indeximage>0) {
                 return indeximage-=1;
              }
            }
         }
        }
      }
      document.onmouseup=function(e){
        document['onmousemove']=null;
      }
    }else {
      bd.addEventListener('touchstart',touch,false);
      bd.addEventListener('touchmove',touch,false);
      bd.addEventListener('touchend',touch,false);
      function touch (event){
        var touch = event.changedTouches[0];
        event.preventDefault();
        switch(event.type){
          case "touchstart":
           startPos = {x:touch.pageX,y:touch.pageY};
           break;
          case "touchmove":
          if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
           movePos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
           isScrolling = Math.abs(movePos.x) < Math.abs(movePos.y) ? 1:0;
              $(jsons.toucharea+" img").attr("src",jsons.imgsrc+jsons.imagename+indeximage+'.'+jsons.format);
            if (isScrolling ==0 && Number(movePos.x) > 0) {
              if (Math.abs(movePos.x) >speed &&indeximage<jsons.Imagenum) {
                return  indeximage+=1;
              }
            }else if (isScrolling ==0 && Number(movePos.x) < 0) {
              if (!(indeximage==1)) {
                if (Math.abs(movePos.x) >speed  && indeximage>0) {
                   return indeximage-=1;
                }
              }
            }
           break;
        }
      };
    }
  }
}
