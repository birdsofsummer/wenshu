superagent=require("superagent")

const {
    cipher,
}=require("./strToBinary")


parse_form=(d='')=>Object.fromEntries(d.split('&').map(x=>x.split('=').map(x=>decodeURIComponent(x))))

post=(u,q={},d={})=>(superagent.post(u)
                   .set({})
                   .query(q)
                   .send(d)
                   .type('form')
                   .then(x=>x.text)
                   .then(JSON.parse)
                   )

//'43qqTSDkYb8KBbsrsv3jEybE',
get___RequestVerificationToken=()=>random(24) ///$('[name=__RequestVerificationToken]').val()

//http://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?s8=03
// {"code":1,"description":null,"secretKey":"KrNbVVRVkoLAA0hI7dFsJOQl","result":"","success":true}
get_list=async (pageNum=4,pageSize=15)=>{
   let ciphertext=
   let __RequestVerificationToken=get___RequestVerificationToken()

   let u="http://wenshu.court.gov.cn/website/parse/rest.q4w"
   let q={}
   //let q={HifJzoc9:"ssss"} //eval(xhr.prototype.open=...)
   let queryCondition=[
       {"key":"s8","value":"03"},
   ]
   let d={
      s8: '03', //
      sortFields: 's50:desc',
      ciphertext: cipher(),
      pageNum,
      pageSize,
      queryCondition:JSON.stringify(queryCondition),
      cfg: 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@queryDoc',
      __RequestVerificationToken: __RequestVerificationToken,
   }
   let  a=await post(u,q,d)
   if (a.success) {
       let  r=JSON.parse(DES3.decrypt(a.result,a.secretKey))
       console.log(r)
       return r
   }
   return {}
}




