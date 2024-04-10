
const imageForm = document.querySelector("#imageForm")
// const imageForm1 = document.querySelector("#download")
const imageInputDom = document.querySelector("#imageInput")

const nameInputDom = document.querySelector("#nameInput")

const priceInputDom = document.querySelector("#priceInput")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()

  // const file = imageInputDom.files[0]

  // console.log(file)

 
 
  // const productimage = await imagetoblob(imageInputDom.value)

  // console.log(productimage)
  // const productimage = imageInputDom.value

  // loadXHR("image.jpeg").then(function(blob) {
  //   // here the image is a blob

  //   console.log(blob)
  // })



  const name = nameInputDom.value

  const price = priceInputDom.value

  // await fetch("/products", {
  //   method: "Post",
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   },
  //   body: file
  // })


  // console.log(productimage)

  console.log(name)
  console.log(price)


})

const imagetoblob = async (data)=>{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "");
  xhr.responseType = "arraybuffer";

  xhr.onload = function(error) {
      var blob = new Blob([xhr.response],{type: "image/jpeg"});
      var blobUrl = URL.createObjectURL(blob);
      console.log(blobUrl);
      return blobUrl

      // return blobUrl;
      // document.getElementById("#imageInput").src = blobUrl;
  }
  xhr.send();
 
   
}

// var xhr = new XMLHttpRequest();
// xhr.open("GET","");
// xhr.responseType = "blob";
// xhr.onload = response;
// xhr.send();

// function response(e) {
//   var urlCreator = window.URL || window.webkitURL;
//   var imageUrl = urlCreator.createObjectURL(this.response);
//   document.querySelector("#imageInput").src = imageUrl;
// }

// function loadXHR(url) {

//   return new Promise(function(resolve, reject) {
//       try {
//           var xhr = new XMLHttpRequest();
//           xhr.open("GET", url);
//           xhr.responseType = "blob";
//           xhr.onerror = function() {reject("Network error.")};
//           xhr.onload = function() {
//               if (xhr.status === 200) {resolve(xhr.response)}
//               else {reject("Loading error:" + xhr.statusText)}
//           };
//           xhr.send();
//       }
//       catch(err) {reject(err.message)}
//   });
// }


