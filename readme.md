#  [裁判文书网](http://wenshu.court.gov.cn/)


## 劫持xhr  [HifJzoc9](https://cloud.tencent.com/developer/article/1624399)


```javascript
$.post('/',{x:1,y:2})
fetch('/',{method:"POST",body:JSON.stringify({x:1,y:2})})



//劫持fetch
function _$AZ(_$Xq, _$hg) {
    if (typeof _$Xq === _$Gh[6]) {
        var _$Lk = 1;
        if (_$hg && _$hg[_$Gh[360]] == _$Gh[229]) {
            _$Lk |= 2;
        }
        _$Xq = _$Dm(_$Xq, _$Lk);
    }
    return _$C7[_$Gh[32]](this, arguments);
}


//劫持xhr

window.XMLHttpRequest.prototype.open

function _$xF() {
    _$$B();
    arguments[1] = _$wr(arguments[1]);
    return _$W1[_$gP[32]](this, arguments);
}

```

## 反劫持钩子
```javascript

//https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open
code=function(){



    say=(x)=>(...y)=>console.log(x,...y)
    var open = window.XMLHttpRequest.prototype.open;
    var send = window.XMLHttpRequest.prototype.send

    open1=function (...d) {
        console.log('11111',...d)
        window.z=this
        // z.responseURL
        open.call(this,...d)
        //debugger;  ///
        //this.abort()
        //this.onreadystatechange=say('change')   
    };

    send1=function(...d){
        console.log('22222',...d)
        send.call(this,...d)
    }


    window.XMLHttpRequest.prototype.open =open1
    window.XMLHttpRequest.prototype.send=send1


    get=(url="/",d=null)=>{
        var o= new XMLHttpRequest();
        let ev=[
              "loadstart",
              "progress",
              "loadend",
              "load", 
              "error",
              "abort",
              "timeout",
        ]
        for (let i of ev){
            o.addEventListener(i, say(i));
        }

        o.onreadystatechange = function () {
            //if(o.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              console.log(o.responseText)
            //}
        }

        o.open("GET", url);
        o.send(d)
    }




    get('/')

}

load=(t="")=>{
     var script = document.createElement('script');
     script.textContent = '(' + t + ')()'; 
     (document.head || document.documentElement).appendChild(script);
     script.parentNode.removeChild(script);
}

load(code)
//点一下激活断点
//进堆栈一个个看。。



```

## 劫持debugger

```javascript
(function() {
    var a = new Date(); 
    debugger; 
    return new Date() - a > 100;
}())

```

## 反劫持debugger

+  停用断点
+  清除定时器
```javascript

for (var i = 1; i < 99999; i++) {
    window.clearInterval(i);
}
```


## 模拟浏览器window


### window

+ document
+ localStorage
+ sessionStorage
+ Navigator
+ XMLHttpRequest



```javascript
//localStorage
{
	"FSSBB2": "443136:XLYC6n32rYt.bPrikHuHEG",
	"FSSBB3": "443136:15Xz_zlH7XYBZnRfpi.7TA",
	"$_ck": "f8YiM1YiFD4yablSqwT2IG",
	"__#classType": "localStorage",
	"$_fb": "zH_0AJDcd4._TI2gpeQPETIkAJenMqHUzz5Be0tp06SB1JHecflGVkQH5AxUw2of",
	"FSSBB48": "443136:1",
	"$_f0": "2V4ef6XDuUoXp26s6YedvwjmEua",
	"FSSBB18": "443136:KQMnoWdrkt2f8sEP7e7i5a",
	"$_cDro": "0",
	"$_YWTU": "aLHOGpMLvkY21ofajYf9AQCMVfgiZLkD.w5jqacmwQl",
	"$_f1": "8A_iLA29oFZWn5SGKsU1PAPcAoa",
	"FSSBB22": "443136:2477",
	"$listparams": "[{\"key\":\"s8\",\"value\":\"03\"}]", ///
	"wenshuListInfo": "{\"searchItem\":[]}"
}

//sessionStorage
{
	"$_YWTU": "aLHOGpMLvkY21ofajYf9AQCMVfgiZLkD.w5jqacmwQl",
	"$_cDro": "0"
}
//cookie

Object.fromEntries(c.map(x=>[x['Name raw'],x['Content raw']]))

{
  HM4hUBT0dDOn80S: 'x3C0vi96lqVRgkIIT3.pe71Nw6rip_ceZC7Dptn_rilExu2l.KQJ6mYmPdwWKeyA',
  HM4hUBT0dDOnenable: 'true',
  SESSION: 'b8393225-31dc-4c6e-8d6a-3de2a87294c4',
  HM4hUBT0dDOn80T: '4tmLzTaq7X_1fafHZzweI1g.OiL6eHXEXkcbB_c6ogVDn6oCda13wlnB2b7ZY9U0rkJotH3IHrbZA.A84YDo22xbdQ8Zd5X4UG2Kr2jAaRPwrVSNR5VqOLjc2wUPGBg0FfD1.mz84qd3mADTgg5o9H0wu4uE65EsKeJnpSG9bsiIzlu6eMCyfSc.sqczyBghxcrwDih1JEAE7AKqk4OwTlcEN9lvRPLqF.63MEBFImI1W79glX6aOJq8vhuZz2az_UDQ1hT9f3fhtIEGMqsudKBIQGX_k8j9rrdC99yQYl1H8VDcEvfjRyzb0ZFrS1_9s9VYY3rxJ.LfsUslowTqMzZFuMd_HB8OVauQXOL3Fm1SRzA'
}

{
  _gscbrs_15322769: '1',
  Hm_lvt_d59e2ad63d3a37c53453b996cb7f8d4e: '1595296571',
  Hm_lpvt_d59e2ad63d3a37c53453b996cb7f8d4e: '1595296571',
  _gscu_15322769: '952965698s62q216',
  _gscs_15322769: '952965695zzlj616|pv:3'
}

```


```javascript

Navigator=function (){}
Navigator.prototype = {
       "appVersion":"5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
       "appCodeName":"Mozilla",
       "appName":"Netscape",
       "language":"zh-CN",
       "platform":"Win32",
       "productSub":"20030107",
       "product":"Gecko",
       "mimeTypes":[
         {"type":"application/pdf","description":"","enabledPlugin":{"name":"PDF Viewer"}},
         {"type":"application/x-shockwave-flash",suffixes:"swf",
          "description":"Shockwave Flash","enabledPlugin":{"name":"Shockwave Flash","description":"Shockwave Flash 26.0 r0"}}
       ],
       "userAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0" ,
       "languages": ["zh-CN", "zh"],
       "plugins":[
         {"name":"Shockwave Flash","description":"Shockwave Flash 26.0 r0",length:2,filename:"pepflashplayer64_26_0_0_151.dll"}
       ]
};


navigator = new Navigator();

```


