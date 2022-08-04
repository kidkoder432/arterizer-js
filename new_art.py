from PIL import Image

im = Image.open('large.jpg')

def sumofdiff(a, b):
    return sum(a) - sum(b)

def get_dominant_colors(pil_img, palette_size=16):

    # Resize image to speed up processing
    img = pil_img.copy()
    img.thumbnail((100, 100))

    # Reduce colors (uses k-means internally)
    paletted = img.convert('P', palette=Image.ADAPTIVE, colors=palette_size)

    # Find the color that occurs most often
    palette = paletted.getpalette()
    color_counts = sorted(paletted.getcolors(), reverse=True)
    palette_index = [color_counts[x][1] for x in range(palette_size)]
    dominant_colors = [palette[idx*3:idx*3+3] for idx in palette_index]

    return dominant_colors
    
domcolors = get_dominant_colors(im, 4)
print(domcolors[:10])

r = [x[0] for x in domcolors]
g = [x[1] for x in domcolors]
b = [x[2] for x in domcolors]


artified = Image.new('RGB', im.size)
newW, newH = im.size


for y in range(newH):
    print(round((y+1)/newH*100, 1), '%', end='\r')
    for x in range(newW):
        
        pr, pg, pb = im.getpixel((x, y))
        
        rdiff = [abs(x - pr) for x in r]
        gdiff = [abs(x - pg) for x in g]
        bdiff = [abs(x - pb) for x in b]
        
        artified.putpixel((x, y),
            (
                r[rdiff.index(min(rdiff))],
                g[gdiff.index(min(gdiff))],
                b[bdiff.index(min(bdiff))]
            )
        )

        # errors = [sumofdiff(im.getpixel((x, y)), clr) for clr in domcolors]
        # snapIdx = errors.index(sorted(errors)[0])
        # artified.putpixel((x, y), (r[snapIdx], g[snapIdx], b[snapIdx]))
        
artified.save('large_artified.jpg')

