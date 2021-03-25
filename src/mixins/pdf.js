import printJS from 'print-js'
export const pdf = {
  methods: {
    print(options) {
      printJS(options)
    },
    download(name, base64) {
      var arrBuffer = this.base64ToArrayBuffer(base64)
      var newBlob = new Blob([arrBuffer], { type: "application/pdf" })

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }

      var data = window.URL.createObjectURL(newBlob)

      var link = document.createElement('a')
      document.body.appendChild(link)
      link.href = data
      link.download = name+".pdf"

      link.click()
      window.URL.revokeObjectURL(data)
      link.remove()
    },
    downloadPDF(name, pdf) {
      const linkSource = `data:application/pdf;base64,${pdf}`;
      const downloadLink = document.createElement("a");
  
      downloadLink.href = linkSource;
      downloadLink.download = name;
      downloadLink.click();
      downloadLink.remove();
    },
    base64ToArrayBuffer(data) {
      
      var binaryString = window.atob(data);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
      }
      return bytes;
    }
  }
}