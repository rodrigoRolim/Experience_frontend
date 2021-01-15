import rtfToHTML from '@iarna/rtf-to-html'

let ConversorOfRtf = (rtf) => {
  return new Promise((resolve, reject) => {
  rtfToHTML.fromString(rtf, (err, html) => {
    if (err) {
      reject(err)
    }
    resolve(html)
  })
})}

export default ConversorOfRtf;

