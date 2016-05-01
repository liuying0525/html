var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if(winW/winH<desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")";
}
[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;//move时的坐标
    var movePos = moveTouch-this.startY;//移动的距离
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id="";
    })
    if(movePos>0){/*↓*/
        var pos = -winH+movePos;
        this.prevsIndex = (index ==0?oLis.length-1:index-1);//上一张索引
    }else if(movePos<0){/*↑*/
        var  pos = winH+movePos;
        this.prevsIndex = (index == oLis.length-1?0:index+1);//下一张的索引

    }
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";


}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }

}
document.addEventListener("touchmove",function(e){
    console.log(e.target.id);
},false)/**
 * Created by LiuYing on 2016/1/31.
 */



 //音乐播放暂停
 var musicBtn = document.querySelectorAll(".musicBtn");
 var music = document.getElementById("music");
 console.log(music);
 window.setTimeout(function () {
    music.play();//->开始播放:此时需要先加载音频文件
    music.addEventListener("canplay", function () {
        //->canplay:当前可以播放音乐了
        musicBtn.style.display = "block";
        musicBtn.className = "musicMove";
    }, false);
},1000);
 var flag = false;
 [].forEach.call(musicBtn, function (val, i, index) {
    val.addEventListener("click", function () {
        if (flag) {
            [].forEach.call(index, function () {
                arguments[0].className = "musicBtnPlay musicBtn";
            });
            music.play();
            flag = false;
        } else {
            [].forEach.call(index, function () {
                arguments[0].className = "musicBtnPause musicBtn";
            });
            flag = true;
            music.pause();
        }

    });
});
