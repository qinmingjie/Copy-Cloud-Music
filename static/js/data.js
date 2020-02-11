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
    let banner = musicData("http://39.107.87.215:8889/banner");
    banner.then(function(data){
        //渲染视图
        let ban = document.querySelector(".banner");
        let par_ban = document.querySelector(".par-ban");
        let prev = document.querySelector(".rev-left");
        let preNext = document.querySelector(".rev-right");
        console.log(data)
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
}