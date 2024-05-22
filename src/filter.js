
let radioButtons = document.querySelectorAll('input[type="radio"]');
    let identityFlag = document.getElementById('identity')
    let blurFlag = document.getElementById('blur')
    let sharpenFlag = document.getElementById('sharpen')
    let gaussFlag = document.getElementById('gaussian')
    let matrixItems = document.querySelectorAll('#kernel');

    radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        radioButtons.forEach(btn => {
        if (btn !== this) {
            btn.checked = false;
        }
        });
        let initialMatrix
        function setMatrixValues(values) {
            values.forEach((value, index) => {
              matrixItems[index].value = value;
            });
          }
        if (blurFlag.checked) {
            initialMatrix = [1, 1, 1, 1, 1, 1, 1, 1, 1]
        };
        if (sharpenFlag.checked) {
            initialMatrix = [0, -1, 0, -1, 5, -1, 0, -1, 0]
        };
        if (gaussFlag.checked) {
            initialMatrix = [1, 2, 1, 2, 4, 2, 1, 2, 1]
        };
        setMatrixValues(initialMatrix)
        filterKernel(getImageDataS(img))
    });
    })

function getMatrixValues() {
  const matrix = [];
  matrixItems.forEach((item, index) => {
    matrix.push(parseFloat(item.value) || 0);
  });
  return matrix;
}

export function filterKernel(img) {
    const canvas = document.getElementById("image");
    const ctx = canvas.getContext("2d");
    const kernelSize = 3;
    const halfSize = Math.floor(kernelSize / 2);
    let matrixNow = getMatrixValues()
    
    let kernel = [[matrixNow[0], matrixNow[1], matrixNow[2] ], [matrixNow[3], matrixNow[4], matrixNow[5]], [matrixNow[6], matrixNow[7], matrixNow[8]]];
    console.log(kernel)
    let div = 16;
    let offset = 0;
    const src = new Uint8ClampedArray(img.data.buffer);
  
    console.log(src);
    const outImg = ctx.createImageData(canvas.width, canvas.height);
    const dst = new Uint8ClampedArray(outImg.data.buffer);
  
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        let r = 0, g = 0, b = 0;
        for (let sy = 0; sy < kernelSize; sy += 1) {
          const yy = Math.min(canvas.height - 1, Math.max(0, y + sy - halfSize));
          for (let sx = 0; sx < kernelSize; sx += 1) {
            const xx = Math.min(canvas.width - 1, Math.max(0, x + sx - halfSize));
            const index = (yy * canvas.width + xx) * 4;
            r += src[index] * kernel[sy][sx];
            g += src[index + 1] * kernel[sy][sx];
            b += src[index + 2] * kernel[sy][sx];
          }
        }
  
        const index = (y * canvas.width + x) * 4;
        const a = src[index + 3];
        r = Math.min(255, Math.max(0, offset + (r / div)));
        g = Math.min(255, Math.max(0, offset + (g / div))) ;
        b = Math.min(255, Math.max(0, offset + (b / div))) ;
  
        dst[index] = r;
        dst[index + 1] = g;
        dst[index + 2] = b;
        dst[index + 3] = a;
      }
    }
      

      
    console.log(dst);
    ctx.putImageData(outImg, 0, 0);




}