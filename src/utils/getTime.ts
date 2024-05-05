export default ()=>{
    let message = ""
    let time = new Date().getHours()
    if(time<9){
        message = '早上'
    }else if(time<=12){
        message = '上午'
    }else if(time<=18){
        message = '下午'
    }else{
        message = '晚上'
    }

   return message

}