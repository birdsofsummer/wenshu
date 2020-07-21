/*
$.WebSite.invoke($mid, "loadData", {
    searchMid : searchMid,
    pageNum : 1
});
*/

random=$.WebSite.random
get_pages=()=>{
    let t=$('.fr.con_right').text()
    let total=+[...t.matchAll(/\d+/g)][0]
    let pages=Math.ceil(total/15)
    console.log('pages',pages)
    return pages
}

//http://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?s8=03
get_list=async (pageNum=1,pageSize=15)=>{
   let ciphertext=cipher()
   let __RequestVerificationToken=random(24)
   let u="http://wenshu.court.gov.cn/website/parse/rest.q4w"
   let queryCondition=[
       {"key":"s8","value":"03"}, //
     //{"key":"s8","value":"02"},
   ]
   let d={
      s8: '03', //
      sortFields: 's50:desc',
      ciphertext: ciphertext,
      pageNum,
      pageSize,
      queryCondition:JSON.stringify(queryCondition),
      cfg: 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@queryDoc',
      __RequestVerificationToken: __RequestVerificationToken,//'43qqTSDkYb8KBbsrsv3jEybE',
   }
   let a=await $.post(u,d)
   if (a.success) {
       let  r=JSON.parse(DES3.decrypt(a.result,a.secretKey))
       console.log('ggggggggg',r)
       return r
   }else{
       console.log('fail')
       return {}
   }
}


const save=(url,i=0,r=[])=>$.post({
    url,
    data:JSON.stringify(r),
})


sleep=(n=1000)=>new Promise((a)=>setTimeout(a,n))

start=async (api_url,to=3)=>{
    let max=get_pages()
    let n=Math.min(to,max)
    for (let i=1;i<=n;i++){
        console.log("%d/%d start" ,i,n)
        let r=await get_list(i)
        save(api_url,i,r)
        console.log("%d/%d end" ,i,n)
        console.log('sleep',i)
        sleep(1000)
    }
    console.log('all done')
}

//save to db
let api_url="https://service-qsqxa5fo-1252957949.gz.apigw.tencentcs.com/release/weixin-token/zzzz"

start(api_url,3)
