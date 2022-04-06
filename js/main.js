'use strict';

function min(l) {
    let lowest = Infinity
    for (let e of l) {
        if (e < lowest) lowest = e;
    }
    return lowest
}

let canvas = document.getElementById('art')
let ctx = canvas.getContext('2d')
let inp = document.getElementById("imup")
let im;
let sl = document.getElementById("myRange")
let width, height;
let img;

function randint(a, b) {
    return Math.round(Math.random() * (b - a)) + a
}

inp.addEventListener('change', () => {
    document.getElementById("preview").textContent = ''
    let url = URL.createObjectURL(inp.files[0])
    let newImg = document.createElement('img')
    newImg.src = url;
    newImg.id = 'previewImg';
    document.getElementById('preview').appendChild(newImg)
    document.getElementById("preview").style.display = 'block'
    console.log(url)
    console.log('hdjehdjshdksdhj')
    
    
})

sl.addEventListener('input', () => {
    document.getElementById("val").innerHTML = sl.value
    console.log(sl.value)
    img = document.getElementById("previewImg")
    width = img.naturalWidth
    height = img.naturalHeight
    canvas.width = width
    canvas.height = height
    canvas.style.width = '400px'
    console.log(img.naturalWidth, img.naturalHeight)
    ctx.filter = `blur(${sl.value}px)`
    ctx.drawImage(img, 0, 0)
})

function processImg() {
    let colors = [0, 1, 3, 7, 15, 31, 63, 127, 191, 223, 239, 247, 251, 253, 254, 255];
    
    img = document.getElementById("previewImg")
    width = img.naturalWidth
    height = img.naturalHeight
    canvas.width = width
    canvas.height = height
    canvas.style.width = '400px'
    console.log(img.naturalWidth, img.naturalHeight)
    
    ctx.filter = `blur(${sl.value}px)`
    ctx.drawImage(img, 0, 0)
    im = ctx.getImageData(0, 0, width, height)
    let prg = document.getElementById('convProg')
    console.log('loop')
    // Convert the 1D array into a 2D one for easier access
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let p = (x + width * y) * 4
            let r = im.data[p]
            let g = im.data[p + 1]
            let b = im.data[p + 2]
            let rdiff = [];
            let gdiff = [];
            let bdiff = [];
            for (let x of colors) {
                rdiff.push(Math.abs(r - x))
                gdiff.push(Math.abs(g - x))
                bdiff.push(Math.abs(b - x))
                
            }
            
            let rsnap = colors[rdiff.indexOf(min(rdiff))] + randint(-10, 10)
            let gsnap = colors[gdiff.indexOf(min(gdiff))] + randint(-10, 10)
            let bsnap = colors[bdiff.indexOf(min(bdiff))] + randint(-10, 10)
            im.data[p] = rsnap
            im.data[p + 1] = gsnap
            im.data[p + 2] = bsnap
            // console.log(r, g, b, rsnap, bsnap, gsnap)
        }
        prg.innerHTML = `${(y / height)}`
        
        
    }
    ctx.putImageData(im, 0, 0)
    
}