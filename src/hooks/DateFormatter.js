export default function DateFormatter(content) {
    content = content.map((e)=>{
      // console.log(e)
      return `${new Date(e.date).getFullYear()}/${singleToDoubleDigit(new Date(e.date).getMonth()+1)}/${singleToDoubleDigit(new Date(e.date).getDate())}/png/${e.image}`}
    )
    // console.log('test digit',content)
    return content;
}

const singleToDoubleDigit = (digit) =>{
if(/^\d$/.test(digit)){
  return `0${digit}`
}
  return digit
}