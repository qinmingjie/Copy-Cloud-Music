let cloudMusic = {
    banner:"banner",
    recommend:"recommend",
    newdic:"newdic",
    notice:"notice",
    new_top:"new_top",
    original:"original"
}
// 封装Ajax函数请求git开源api来获取数据
{
    function musicData(url){
        return new Promise(function(resolve,reject){ //promise控制异步
            let xhr = new XMLHttpRequest();
            xhr.open("get",url,true);
            xhr.send()
            xhr.onload = function(){
                return resolve(JSON.parse(xhr.responseText)); //将开源api数据拿到并返回给promise
            }
        }) 
    }

    //banner数据
    cloudMusic.banner = musicData("http://39.107.87.215:8889/banner");
    cloudMusic.banner.then(function(data){
        //渲染视图
        let ban = document.querySelector(".banner");
        let par_ban = document.querySelector(".par-ban");
        let prev = document.querySelector(".rev-left");
        let preNext = document.querySelector(".rev-right");
        // console.log(data)
        //获取图片地址
        let Image = data.banners
        let banImgStr = ""
        let circleStr = ""
        Image.forEach(function(item,index){
            banImgStr += `  
                <img src="${item.imageUrl}" index="${index}" style="z-index:${Image.length - index}">
            `
            circleStr +=`
                <span class="circle" index="${index}"></span>
            `
        });
        ban.innerHTML = `
            <a href="" class="ban-img">
                <img src="${Image[0].imageUrl}" >
            </a>
            <div class="click-circle">
                ${circleStr}
            </div>
        `
        //初始化界面的节点
        let imgList = document.querySelector(".ban-img");
        let circle = document.querySelectorAll(".circle");
        circle[0].classList.add("redcircle");
        //图片位置
        let imgLoc = 0;
        let moveLeft = true;

        //更新视图
        function render(){
            if(moveLeft){
                if(imgLoc>=0 && imgLoc<=Image.length-1){
                    createCricle()
                    imgList.innerHTML = `<img src="${Image[imgLoc].imageUrl}">`;
                }else if(imgLoc=Image.length){
                    imgLoc = 0;
                    createCricle()
                    imgList.innerHTML = `<img src="${Image[imgLoc].imageUrl}">`;
                }
            }else{
                console.log(imgLoc)
               if(imgLoc<0){
                    imgLoc = Image.length-1;
                    createCricle()
                    imgList.innerHTML = `<img src="${Image[imgLoc].imageUrl}">`;
               }else{
                    createCricle()
                    imgList.innerHTML = `<img src="${Image[imgLoc].imageUrl}">`;
               }
            }
        };

        //更新圆点
        function createCricle(){
            //circle
            //清空所有远点样式
            circle.forEach(function(item,index){
                item.classList.remove("redcircle");
                item.onclick = function(){
                    //获取当前点击远点的位置
                    let circleIndex = this.getAttribute("index");
                    imgLoc = circleIndex;
                    render();
                }
            });
            circle[imgLoc].classList.add("redcircle")
        }

        preNext.onclick = function(){
            moveLeft = true;
            imgList.innerHTML = "";
            imgLoc++;
            render();
        };

        prev.onclick = function(){
            clearInterval(outoplay)
            moveLeft = false;
            imgList.innerHTML = "";
            imgLoc--;
            render();
        }

        //设置自动移动
        let outoplay = setInterval(function(){
            preNext.onclick()
        },3000)

        //移出以上删除自动播放
        par_ban.onmousemove = function(){
            clearInterval(outoplay)
        }
        par_ban.onmouseleave = function(){
            console.log(2)
            outoplay = setInterval(function(){
                preNext.onclick()
            },3000)
        }
    })
    
    //推荐歌单数据
    cloudMusic.recommend = musicData("http://39.107.87.215:8889/personalized?limit=8");
    cloudMusic.recommend.then(function(data){
        let str = ""
        let recommendUl = document.querySelector(".rec-mucWrap");
        let newdata = data.result;
        // console.log(data)
        newdata.forEach(function(item,index){
            let read = String(item.playCount).length>4?Math.floor((item.playCount)/10000)+"万":item.playCount
            str += `
            <li>
                <div class="rec-muc">
                    <img src="${item.picUrl}" alt="">
                    <a href="" class="cover" id="${item.id}"></a>
                    <div class="rec-icon">
                        <span class="set-icon"></span>
                        <span class="icon-txt">${read}</span>
                        <a href="" class="p-icon"></a>
                    </div>
                    <p class="rec-mucTxt">
                        <a href="">
                            ${item.name}
                        </a>
                    </p>
                </div>
            </li>
            `
        })
        recommendUl.innerHTML = str;
    })

    //新碟上架数据
    cloudMusic.newdic = musicData("http://39.107.87.215:8889/album/newest");
    cloudMusic.newdic.then(function(data){
        console.log(data)
        let newdicUl = document.querySelector(".newDic-Name")
        let newdata = data.albums;
        let str = ""
        let num = 0;
        let newStr = ""
        newdata.forEach(function(item,index){
            str += `
            <li class="newDicList">
                <div class="newDic-muc">
                    <img src="${item.picUrl}" alt="">
                    <a href="" class="newDic-cover"></a>
                    <a href="" class="newDic-play"></a>
                </div>
                <p class="dictxt"><a href="" class="newDic-name">${item.name}</a></p>
                <p class="dictxt"><a href="" class="newDic-txt">${item.artist.name}</a></p>
            </li>
            `
        })
        newdicUl.innerHTML = str
    })

    //榜单数据
    //飙升榜
    cloudMusic.notice = musicData("http://39.107.87.215:8889/top/list?idx=3");
    cloudMusic.notice.then(function(data){
        let newdata = data.playlist.tracks;
        let lists = document.querySelector(".mucTop");
        let toplog = document.querySelector(".Top-logo")
        let logo = data.playlist.coverImgUrl;
        toplog.innerHTML = `
        <img src="${logo}">
        <a href="" class="notice-cover"></a>
        `
        let str = "";
        console.log(logo)
        let num = 0;
        newdata.forEach(function(item,index){
            if(num<10){
                str +=`
                <li class="notice-list" >
                    <span class="">${index+1}</span>
                    <a href="" class="num-music">${item.name}</a>
                    <div class="num-show"></div>
                </li>
                `
            }
            num++
        })
        lists.innerHTML = str;
    })
    // //新歌榜
    cloudMusic.new_top = musicData("http://39.107.87.215:8889/top/list?idx=0");
    cloudMusic.new_top.then(function(data){
        let newdata = data.playlist.tracks;
        let lists = document.querySelector(".notice-new-top");
        let toplog = document.querySelector(".new-top")
        let logo = data.playlist.coverImgUrl;
        toplog.innerHTML = `
        <img src="${logo}">
        <a href="" class="notice-cover"></a>
        `
        let str = "";
        console.log(logo)
        let num = 0;
        newdata.forEach(function(item,index){
            if(num<10){
                str +=`
                <li class="notice-list " >
                    <span class="">${index+1}</span>
                    <a href="" class="num-music">${item.name}</a>
                    <div class="num-show"></div>
                </li>
                `
            }
            num++
        })
        lists.innerHTML = str;
    })
    // //原创榜
    cloudMusic.original = musicData("http://39.107.87.215:8889/top/list?idx=2");
    cloudMusic.original.then(function(data){
        let newdata = data.playlist.tracks;
        let lists = document.querySelector(".original-top");
        let toplog = document.querySelector(".original")
        let logo = data.playlist.coverImgUrl;
        toplog.innerHTML = `
        <img src="${logo}">
        <a href="" class="notice-cover"></a>
        `
        let str = "";
        console.log(logo)
        let num = 0;
        newdata.forEach(function(item,index){
            if(num<10){
                str +=`
                <li class="notice-list " >
                    <span class="">${index+1}</span>
                    <a href="" class="num-music">${item.name}</a>
                    <div class="num-show"></div>
                </li>
                `
            }
            num++
        })
        lists.innerHTML = str;
    })

}