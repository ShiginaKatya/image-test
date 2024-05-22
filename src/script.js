import { filterKernel } from './filter.js';


document.addEventListener('DOMContentLoaded', () => {  
    

    let callBackButton = document.getElementById('callback-button');
    let closeButton = document.getElementById('close-button');
    let resetButton = document.getElementById('reset-button');
    let modal1 = document.getElementById('modal-1');
    let subButton = document.getElementById('sub');
    let scaleButton = document.getElementById('scale-button');
    let curvesButton = document.getElementById('curves-button');
    let curvesDialog = document.getElementById('curves-dialog');
    let filterButton = document.getElementById('filter-button');
    let filterDialog = document.getElementById('filter-dialog');
    let closeFilter = document.getElementById('close-filter')
    let closeCurves = document.getElementById('close-curves')
    let scaleDialog = document.getElementById('scale-dialog');
    let closeDialog = document.getElementById('close-dialog');
    let saveButton = document.getElementById('save-button');
    let numWidth = document.getElementById('numWidth');
    let numHeight = document.getElementById('numHeight');
    let selectMe = document.getElementById('measure');
    let keyCheck = document.getElementById('key');
    let confirmButton = document.getElementById('confirm');
    let scaleForm = document.getElementById('scale-form')
    let scaleRange = document.getElementById('scale');
    let closeColor = document.getElementById('color-close-button')
    let pippeteMenu = document.getElementById('pippete')
    let pippeteButton = document.getElementById('pip')
    let handButton = document.getElementById('hand')
    let contBlock = document.getElementById('container')
    let firstX = document.getElementById('first-in-x')
    let secondX = document.getElementById('second-in-x')
    let firstY = document.getElementById('first-out-y')
    let secondY = document.getElementById('second-out-y')
    let changeButton = document.getElementById('change-button')
    let confirmCurves = document.getElementById('confirm-curves')
    let cancelCurves = document.getElementById('cancel-curves')
    let previewCheck = document.getElementById('preview')



    callBackButton.addEventListener("click", (e) =>{
        e.preventDefault();
        modal1.classList.add('modal_active');

    })


    closeButton.addEventListener("click", (e) =>{
        e.preventDefault();
        modal1.classList.remove('modal_active');
    })
    let p = 1
    pippeteButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (p == 1){
            document.querySelector('.pippete-color').style.display = 'block'
            document.querySelector('.pip').style.backgroundColor = 'gray'
            p = 0
        }
        else {
            p = 1
            document.querySelector('.pippete-color').style.display = 'none'
            document.querySelector('.pip').style.backgroundColor = '#F0F0F0'
        }
        
        
    })
    let h = 1
    handButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (h == 1){

            handButton.classList.add('active-button')
            if ((canvas.clientHeight > window.screen.availHeight - 81)||(canvas.clientWidth> window.screen.availWidth - 81)){
                document.querySelector('.container').style.overflow = 'scroll'
            }
            document.querySelector('.hand').style.backgroundColor = 'gray' 
            let pos = {marginTop: 0, marginLeft: 0}
            canvas.style.marginTop = pos.top + 'px';
            canvas.style.marginLeft = pos.left + 'px';
            let obj = {
                'ArrowDown': ['marginTop', 5], 
                'ArrowUp': ['marginTop', -5], 
                'ArrowRight': ['marginLeft', 5], 
                'ArrowLeft': ['marginLeft', -5],
            }
            addEventListener('keydown', function(e) {
                if (handButton.classList.contains('active-button')){
                    let key = obj[e.key];
                    if(key){ // key[0] == 'top' или 'left'
                            pos[ key[0] ] = pos[ key[0] ] + key[1];
                            if (key[0] == 'marginTop'){
                                if (Math.abs(pos[ key[0] ]) < (window.screen.availHeight / 2)){
                                    canvas.style[ key[0] ] = pos[ key[0] ] + 'px';
                                } 
                            }
                            if (key[0] == 'marginLeft'){
                                if (Math.abs(pos[ key[0] ]) < (window.screen.availWidth /2)){
                                    canvas.style[ key[0] ] = pos[ key[0] ] + 'px';
                                }
                            }
                            
                        } 
                } 
                    
            }); 
            h = 0   
        }
        else {
            handButton.classList.remove('active-button')
            h = 1
            document.querySelector('.container').style.overflow = 'hidden'
            document.querySelector('.hand').style.backgroundColor = '#F0F0F0'
        }

    })

    closeColor.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.pippete-color').style.display = 'none'
        document.querySelector('.pip').style.backgroundColor = '#F0F0F0'
    })

    const imgForm = document.querySelector("#image-form");
    imgForm.addEventListener("submit", showFile)
    let img = ''

    function showFile(e) {
        e.preventDefault();
        modal1.classList.remove('modal_active');
        // imgForm.reset()
        numHeight.value = ''
        numWidth.value = ''
        scaleRange.value = 100
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        document.querySelector('.scale-size').textContent = ``
        const fd = new FormData(e.target);
        const fdEntries = [...fd.entries()];
        imgForm.reset()
        img = new Image()
        
        let file
        let ob
            
        if (fdEntries[0][1].name !== '') {
            file = fdEntries[0][1];
            let objectURL = URL.createObjectURL(file);
            ob = objectURL

         }
        if (fdEntries[1][1] !== '' ){
            file = fdEntries[1][1]
            ob=file
 
        }   
        img.crossOrigin = "Anonymous";
        img.src = ob

        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");
    
         img.onload = update   

      
    }
    const canvas = document.getElementById("image");
    canvas.addEventListener('pointermove', (e) => {
        const ctx = canvas.getContext("2d");
        const x = e.offsetX;
        const y = e.offsetY;
        const img_data = ctx.getImageData(x, y, 1, 1);//ImageData
        const pix = img_data.data;
        const red = pix[0];
        const green = pix[1];
        const blue = pix[2];
        const alpha = pix[3];
            
        document.querySelector('.rgb').textContent = `R: ${red}, G: ${green}, B: ${blue}`;
        document.querySelector('.color-real').style.backgroundColor = `rgba(${pix.join(',')})`
        document.querySelector('.coordinate').textContent = `X: ${x.toFixed(0)}, Y: ${y.toFixed(0)}`;

    })

    let li1
    let li2
    let red 
    let green
    let blue
    let X
    let Y
    let Z, L, a, bl, pix, x_cor, y_cor
    canvas.addEventListener('click', (e) => {
        if (e.shiftKey) return;
        colorCoordinate(e)
        li1 = (0.2126 * r + 0.7152 * g + 0.0722 * b ) + 0.05
        contrastCalc()
        document.querySelector('.R-1').textContent = `${red}`;
        document.querySelector('.G-1').textContent = `${green}`;
        document.querySelector('.B-1').textContent = `${blue}`;
        document.querySelector('.X-1').textContent = `${X.toFixed(1)}`;
        document.querySelector('.Y-1').textContent = `${Y.toFixed(1)}`;
        document.querySelector('.Z-1').textContent = `${Z.toFixed(1)}`;
        document.querySelector('.L-1').textContent = `${L.toFixed(1)}`;
        document.querySelector('.A-1').textContent = `${a.toFixed(1)}`;
        document.querySelector('.Bl-1').textContent = `${bl.toFixed(1)}`;
        document.querySelector('.color-real-1').style.backgroundColor = `rgba(${pix.join(',')})`
        document.querySelector('.coordinate-1').textContent = `X: ${x_cor.toFixed(0)}, Y: ${y_cor.toFixed(0)}`;
    })
    canvas.addEventListener('click', (e) => {
        if (!e.shiftKey) return;
        colorCoordinate(e)
        li2 = (0.2126 * r + 0.7152 * g + 0.0722 * b ) + 0.05
        contrastCalc()
        document.querySelector('.R-2').textContent = `${red}`;
        document.querySelector('.G-2').textContent = `${green}`;
        document.querySelector('.B-2').textContent = `${blue}`;
        document.querySelector('.X-2').textContent = `${X.toFixed(1)}`;
        document.querySelector('.Y-2').textContent = `${Y.toFixed(1)}`;
        document.querySelector('.Z-2').textContent = `${Z.toFixed(1)}`;
        document.querySelector('.L-2').textContent = `${L.toFixed(1)}`;
        document.querySelector('.A-2').textContent = `${a.toFixed(1)}`;
        document.querySelector('.Bl-2').textContent = `${bl.toFixed(1)}`;
        document.querySelector('.color-real-2').style.backgroundColor = `rgba(${pix.join(',')})`
        document.querySelector('.coordinate-2').textContent = `X: ${x_cor.toFixed(0)}, Y: ${y_cor.toFixed(0)}`;
    })
    
    function colorCoordinate(e){
        const ctx = canvas.getContext("2d");
        let x_cor = e.offsetX;
        let y_cor = e.offsetY;
        const img_data = ctx.getImageData(x_cor, y_cor, 1, 1);//ImageData
        let pix = img_data.data;
        red = pix[0];
        green = pix[1];
        blue = pix[2];
        alpha = pix[3];

        rs = red/255;
        gs = green/255;
        bs = blue/255;

        if (rs <= 0.04045){
            r = rs/12.92
        }
        else {
            r =  ((rs +0.055)/1.055) ** 2.4
        }
        if (gs <= 0.04045){
            g = gs/12.92
        }
        else {
            g =  ((gs +0.055)/1.055) ** 2.4
        }
        if (bs <= 0.04045){
            b = bs/12.92
        }
        else {
            b =  ((bs +0.055)/1.055) ** 2.4
        }
        X = (r * 0.490 + g * 0.310 + b * 0.200) * 100
        Y = (r * 0.177 + g * 0.812 + b * 0.011) * 100
        Z = (r * 0.000 + g * 0.010 + b * 0.990) * 100

        L = 116 * Math.cbrt(Y/99.77)
        a = 500 * (Math.cbrt(X/96.2) - Math.cbrt(Y/99.77))
        bl = 200 * (Math.cbrt(Y/99.77) - Math.cbrt(Z/82.33))
    }
    
    function contrastCalc(){
        if (li1&&li2){
            let k 
            if (li1 >= li2) {
                k = li1/li2
            } 
            else {
                k = li2/li1
            }
            document.querySelector('.contrast').textContent = `${k.toFixed(2)}`;
            if (k >= 4.5) {
                document.querySelector('.contrast_warning').textContent = "Эти цвета контрастны";
            }
            else{
                document.querySelector('.contrast_warning').textContent = "Эти цвета недостаточно контрастны";
            } 
        }
    }
    
    saveButton.addEventListener("click", function(){
        saveButton.setAttribute("href", url);
        saveButton.setAttribute("download", `${url}.jpg`);
    })
    scaleButton.addEventListener("click", function(){
        scaleDialog.showModal();

    })
  
    selectMe.addEventListener("change", changeMe)
    function changeMe(){
        if (selectMe.value == 'px'){
            numWidth.value = widthNew
            numHeight.value = heightNew
        
        }
        if (selectMe.value == '%') {
            numWidth.value = ((widthNew/img.width)*100).toFixed();
            numHeight.value = ((heightNew/img.height)*100).toFixed();
        }
    }
    function selectMeasure(){
        if (selectMe.value == 'px'){
            widthNew = numWidth.value;
            heightNew = numHeight.value;
        }
        if (selectMe.value == '%') {
            widthNew = (numWidth.value/100)*img.width;
            heightNew = (numHeight.value/100)*img.height;
        }
    }
    function updateValues(){
        if (keyCheck.checked){
            if (selectMe.value == 'px'){
                numHeight.value = numWidth.value / (img.width/img.height)
                document.querySelector('.scale-size').textContent = `${(numWidth.value*numHeight.value / 1000000).toFixed(2)} Mpx`
                
            }
            if (selectMe.value == '%'){
                numHeight.value = numWidth.value
                document.querySelector('.scale-size').textContent = `${((numWidth.value/100*img.width)*(numHeight.value/100*img.height) / 1000000).toFixed(2)} Mpx`
            }
        }
    }
    keyCheck.addEventListener('change', updateValues);
    numWidth.addEventListener('input', updateValues);
    numHeight.addEventListener('input', updateValues);
    closeDialog.addEventListener("click", function(){
        scaleDialog.close();
    })
    let widthNew;
    let heightNew;
    let newImg;
    function resizeImage(img){
        const width = img.width;
        const height = img.height;
        widthScale = img.width
        heightScale = img.height
        const src = new Uint32Array(img.data.buffer);
        // imgNew = Image()
        
        // let widthNew;
        // let heightNew;
        if (numHeight.value && numHeight.value){
            selectMeasure()
        
        }
        else{
            widthNew = img.width
            heightNew = img.height
        }
        changeMe()
        // imgNew = Image(widthNew, heightNew)
        // const dst = new Uint32Array(imgNew.data.buffer)
        processCanvas('image', widthNew, heightNew, function(dst) {
            const dx = width / widthNew;
            const dy = height / heightNew;
            for (let y = 0; y < heightNew; y++) {
              let srcY = Math.floor(y * dy);
              for (let x = 0; x < widthNew; x++) {
                let srcX = Math.floor(x * dx);
                dst[y * widthNew + x] = src[srcY * width + srcX];
              }
            }
          });
        }
    function processCanvas(canvasId, width, height, func) {
        const canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const newImg = ctx.createImageData(width, height);
        const dst = new Uint32Array(newImg.data.buffer);
        func(dst);
        ctx.putImageData(newImg, 0, 0);
    }
    function getImageData(el){
        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`;
        return context.getImageData(0, 0, img.width, img.height);

    }

    function getImageDataS(el){
        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");
        return context.getImageData(0, 0, canvas.width, canvas.height);

    }
    
    confirmButton.addEventListener('click', function(){
        if (selectMe.value == 'px'){
            if (numHeight.value > img.height * 3){
                numHeight.value = img.height * 3
            }
            if (numWidth.value > img.width * 3){
                numWidth.value = img.width * 3
            }
        }
        if (selectMe.value == '%'){
            if (numHeight.value > 300){
                numHeight.value = 300
            }
            if (numHeight.value < 10){
                numHeight.value = 10
            }
            if (numWidth.value > 300){
                numWidth.value = 300
            }
            if (numWidth.value < 10){
                numWidth.value = 10
            }
        } 
        scaleDialog.close()
        scaleRange.value = 100
        update()
        document.querySelector('.scale-size').textContent = `${(canvas.width*canvas.height / 1000000).toFixed(2)} Mpx`
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        
    })
    let widthScale
    let heightScale
    let url
    function update(e){
        resizeImage(getImageData(img))
        document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`
        document.querySelector('.img-size').textContent = `${(img.width*img.height / 1000000).toFixed(2)} Mpx`
        canvas.toBlob(function (blob) {
         url = URL.createObjectURL(blob);})
        widthScale = canvas.width
        heightScale = canvas.height
        firstScale()
    }
    function changeScale(){
        const canvas = document.getElementById('image');
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        let scale = scaleRange.value/100
        const ctx = canvas.getContext('2d')
        canvas.width = widthScale * scale;
        canvas.height = heightScale * scale;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        canvas.scrollIntoView({block: "center", inline: "center"});
    }
    
    scaleRange.addEventListener('change', changeScale)
    function firstScale(){
        let scaleHeight = 100;
        let scaleWidth = 100;
        if (canvas.clientHeight > window.screen.availHeight-300){
            const ratio = (canvas.clientHeight) /(window.screen.availHeight-300)
            if (ratio > 1) {
                for (let i=0.1;i<1;i+=0.1){
                    if (ratio*i>1){
                        scaleHeight = (i - 0.1)*100
                        break
                    }

                }
            }
        }
        if (canvas.clientWidth > window.screen.availWidth-100){
            const ratio = (canvas.clientWidth) /(window.screen.availWidth-100)
            if (ratio > 1) {
                for (let i=0.1;i<1;i+=0.1){
                    if (ratio*i>1){
                        scaleHeight = (i - 0.1)*100
                        break
                    }

                }
            }
        }
        if ((scaleHeight != 100 )||(scale != 100)) {
            if (scaleHeight <= scaleWidth){
                scaleRange.value = scaleHeight
            }
            else{
                scaleRange.value = scaleWidth 
            }
            changeScale()
        }
        
    }
    let drc
    let objeL
    let img_store
    
    curvesButton.addEventListener("click", function(){
        curvesDialog.showModal();
        img_store = getImageDataS(img)
        histogramImage(img_store)
       
})  
    let newI 
    function curvesImage(img){
        const canvas = document.getElementById("image");
        const ctx = canvas.getContext("2d");
        const img_dataall = new Uint8Array (img.data.buffer)
        newI = ctx.createImageData(canvas.width, canvas.height);
        drc = newI.data;
        const x1 = firstX.value
        const y1 = firstY.value
        const x2 = secondX.value
        const y2 = secondY.value
        const a = (y2 - y1)/(x2 - x1)
        const b = y1 - a*x1

        for (let i=0; i<img_dataall.length; i=i+4){

            if (img_dataall[i] <= x1){
                img_dataall[i] = y1
            }
            else if (img_dataall[i] >= x2){
                img_dataall[i] = y2
            }
            else {
                img_dataall[i] = a*img_dataall[i] + b
            }
            drc[i] = img_dataall[i]
            if (img_dataall[i + 1] <= x1){
                img_dataall[i + 1] = y1
            }
            else if (img_dataall[i + 1] >= x2){
                img_dataall[i + 1] = y2
            }
            else {
                img_dataall[i + 1] = a*img_dataall[i + 1] + b
            }
            drc[i+1] = img_dataall[i+1]
            if (img_dataall[i + 2] <= x1){
                img_dataall[i + 2] = y1
            }
            else if (img_dataall[i + 2] >= x2){
                img_dataall[i + 2] = y2
            }
            else {
                img_dataall[i + 2] = a*img_dataall[i + 2] + b
            }
            drc[i+2] = img_dataall[i + 2]
            drc[i+3] = img_dataall[i + 3]
            }
        if (previewCheck.checked){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.putImageData(newI, 0, 0)
        }
        else{
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.putImageData(img_store, 0, 0) 
        }
        
            
        
        }   
    
    filterButton.addEventListener("click", function(){
        filterDialog.showModal()
        filterKernel(getImageDataS(img))

    })

    // let radioButtons = document.querySelectorAll('input[type="radio"]');
    // let identityFlag = document.getElementById('identity')
    // let blurFlag = document.getElementById('blur')
    // let sharpenFlag = document.getElementById('sharpen')
    // let gaussFlag = document.getElementById('gaussian')
    // let matrixItems = document.querySelectorAll('#kernel');

    // radioButtons.forEach(radio => {
    // radio.addEventListener('change', function() {
    //     radioButtons.forEach(btn => {
    //     if (btn !== this) {
    //         btn.checked = false;
    //     }
    //     });
    //     let initialMatrix
    //     function setMatrixValues(values) {
    //         values.forEach((value, index) => {
    //           matrixItems[index].value = value;
    //         });
    //       }
    //     if (blurFlag.checked) {
    //         initialMatrix = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    //     };
    //     if (sharpenFlag.checked) {
    //         initialMatrix = [0, -1, 0, -1, 5, -1, 0, -1, 0]
    //     };
    //     if (gaussFlag.checked) {
    //         initialMatrix = [1, 2, 1, 2, 4, 2, 1, 2, 1]
    //     };
    //     setMatrixValues(initialMatrix)
    //     filterKernel(getImageDataS(img))
    // });
    // })

    // function getMatrixValues() {
    //     const matrix = [];
    //     matrixItems.forEach((item, index) => {
    //       matrix.push(parseFloat(item.value) || 0);
    //     });
    //     return matrix;
    //   }
    
    // matrixItems.addEventListener('input', function(){
    //     getMatrixValues()
    // })
    
    




    // function filterKernel(img) {
    //     const canvas = document.getElementById("image");
    //     const ctx = canvas.getContext("2d");
    //     const kernelSize = 3;
    //     const halfSize = Math.floor(kernelSize / 2);
    //     matrixNow = getMatrixValues()
    //     let kernel = [[matrixNow[0], matrixNow[1], matrixNow[2] ], [matrixNow[3], matrixNow[4], matrixNow[5]], [matrixNow[6], matrixNow[7], matrixNow[8]]];
    //     console.log(kernel)
    //     let div = 1;
    //     let offset = 0;
    //     const src = new Uint8ClampedArray(img.data.buffer);
      
    //     console.log(src);
    //     newI = ctx.createImageData(canvas.width, canvas.height);
    //     const dst = new Uint8ClampedArray(newI.data.buffer);
      
    //     for (let y = 0; y < canvas.height; y += 1) {
    //       for (let x = 0; x < canvas.width; x += 1) {
    //         let r = 0, g = 0, b = 0;
    //         for (let sy = 0; sy < kernelSize; sy += 1) {
    //           const yy = Math.min(canvas.height - 1, Math.max(0, y + sy - halfSize));
    //           for (let sx = 0; sx < kernelSize; sx += 1) {
    //             const xx = Math.min(canvas.width - 1, Math.max(0, x + sx - halfSize));
    //             const index = (yy * canvas.width + xx) * 4;
    //             r += src[index] * kernel[sy][sx];
    //             g += src[index + 1] * kernel[sy][sx];
    //             b += src[index + 2] * kernel[sy][sx];
    //           }
    //         }
      
    //         const index = (y * canvas.width + x) * 4;
    //         const a = src[index + 3];
    //         r = Math.min(255, Math.max(0, offset + (r / div)));
    //         g = Math.min(255, Math.max(0, offset + (g / div))) ;
    //         b = Math.min(255, Math.max(0, offset + (b / div))) ;
      
    //         dst[index] = r;
    //         dst[index + 1] = g;
    //         dst[index + 2] = b;
    //         dst[index + 3] = a;
    //       }
    //     }
      
    //     console.log(dst);
    //     // ctx.putImageData(outImg, 0, 0);
    //     previewCheck = document.getElementById('preview-filter')
    //     updatePreview()

    //   }
    previewCheck.addEventListener('change', updatePreview)

    function updatePreview(){
        const canvas = document.getElementById("image");
        const ctx = canvas.getContext("2d");
        if (previewCheck.checked){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.putImageData(newI, 0, 0)
        }
        else{
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.putImageData(img_store, 0, 0) 
        }
    }

    function histogramImage(inImg) {
        const width = inImg.width;
        const height = inImg.height;
        const src = new Uint8Array(inImg.data.buffer);
        let histR = (new Array(256)).fill(0);
        let histG = (new Array(256)).fill(0);
        let histB = (new Array(256)).fill(0);
        for (let i = 0; i < src.length; i=i+4) {
          let r = src[i];
          let g = src[i + 1];
          let b = src[i + 2];

          histR[r]++;
          histG[g]++;
          histB[b]++;
        }
        console.log(histR)
        
        let maxBrightness = 0;
          for (let i = 0; i < 256; i++) {
            if (maxBrightness < histR[i]) {
              maxBrightness = histR[i]
            } else if (maxBrightness < histG[i]) {
              maxBrightness = histG[i]
            } else if (maxBrightness < histB[i]) {
              maxBrightness = histB[i]
            }
          }
        
        
        const canvas = document.getElementById('canvasHistogram');
        const ctx = canvas.getContext('2d');
        let startY = (canvas.height);
        let dx = canvas.width / 256;
        let dy = startY / maxBrightness;
        ctx.lineWidth = dx;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 256; i++) {
          let x = i * dx;
            // Red
            ctx.strokeStyle = "rgba(220,0,0,0.5)";
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, startY - histR[i] * dy);
            ctx.closePath();
            ctx.stroke(); 
            // Green
            ctx.strokeStyle = "rgba(0,210,0,0.5)";
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, startY - histG[i] * dy);
            ctx.closePath();
            ctx.stroke(); 
            // Blue
            ctx.strokeStyle = "rgba(0,0,255,0.5)";
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, startY - histB[i] * dy);
            ctx.closePath();
            ctx.stroke(); 


    
        }
        ctx.beginPath(); 
        ctx.moveTo(0, 256);
        ctx.lineTo(256, 0);
        ctx.stroke(); 
        
      }
    
    firstX.addEventListener('change', updateDiagram )
    firstY.addEventListener('change', updateDiagram )
    secondX.addEventListener('change', updateDiagram )
    secondY.addEventListener('change', updateDiagram )
    function updateDiagram(){
        if (firstX.value < 0) {
            firstX.value = 0
        }
        if (firstX.value > 255) {
            firstX.value = 255
        }
        if (firstY.value < 0) {
            firstY.value = 0
        }
        if (firstY.value > 255) {
            firstY.value = 255
        }
        if (secondX.value < 0) {
            secondX.value = 0
        }
        if (secondX.value > 255) {
            secondX.value = 255
        }
        if (secondY.value < 0) {
            secondY.value = 0
        }
        if (secondY.value > 255) {
            secondY.value = 255
        }
        histogramImage(img_store)
        changeButton.disabled = false
    }

    changeButton.addEventListener('click', updateImage)
    confirmCurves.addEventListener('click', saveUpdate)
    function saveUpdate(){
        curvesDialog.close();
        const canvas = document.getElementById('image');
        const ctx = canvas.getContext('2d');
        ctx.putImageData(newI, 0, 0)
        firstX.value = 0
        firstY.value = 0
        secondX.value = 255
        secondY.value = 255
        let data = canvas.toDataURL()
        img.src = data
        img.onload = update

    }
    cancelCurves.addEventListener('click', cancelDiagram)
    let path
   
    function updateImage(){
        
        curvesImage(getImageDataS(img))
        const canvas = document.getElementById('canvasHistogram');
        const ctx = canvas.getContext('2d');
        const x1 = firstX.value
        const x2 = secondX.value
        const y1 = firstY.value
        const y2 = secondY.value
        

        ctx.strokeStyle = "#000"
        path = new Path2D();
        path.moveTo(0, 256-y1); 
        path.lineTo(x1, 256-y1);
        path.lineTo(x2, 256-y2);
        path.lineTo(256, 256-y2);
        ctx.stroke(path);


        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.arc(x1, 256-y1, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.arc(x2, 256-y2, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        changeButton.disabled = true
    }

    function cancelDiagram(){
        newI = img_store
        histogramImage(img_store)
        update()
        changeButton.disabled = true
        firstX.value = 0
        firstY.value = 0
        secondX.value = 255
        secondY.value = 255

    }



    closeCurves.addEventListener("click", function(){
        curvesDialog.close();
        histogramImage(img_store)
        update()
        firstX.value = 0
        firstY.value = 0
        secondX.value = 255
        secondY.value = 255
    } )

    closeFilter.addEventListener("click", function(){
        filterDialog.close();
    } )


});
