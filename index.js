//Script created by homebrew#1450
//You will need to rotate your .obj(s) 90° around the 'x' axis so that it is pointing downwards. No, I do not know why. Just a thing you have to do
//It might take a while to load all of the polygons and will *literally* run at 1fps if you try to import any .obj that has any face count that is even remotely high.
//Easily runnable in VS Code Live Server

//these variables are required to interact with the embedded calculator.
var elt = document.getElementById('calculator');
var Calc = Desmos.GraphingCalculator(elt);

function setExpression(exp, hexcolor) {
    Calc.setExpression({
        latex: exp,
        color: hexcolor,
        lineOpacity: "l_{ineopacity}",
        fillOpacity: "f_{illopacity}"
    })
}

function setSlider(exp, minimum, maximum, stepvalue) {
    Calc.setExpression({
        latex: exp,
        min: minimum,
        max: maximum,
        step: stepvalue
    })
}
var tmpState= Calc.getState();
//try adding items to the expression list to see how they are structured. Their data will appear in the array `tmpState.expressions.list`
console.log(tmpState.expressions.list);
//make sure the id is different for each expression
var firstnotetext = `Generated using Desmodels. Created by Nathan Hobbs.
Desmodels is a javascript that imports .obj files.`
tmpState.expressions.list.push({type:"text",id:"2",text:firstnotetext});
Calc.setState(tmpState);
Calc.removeExpression({id:1})


//required variables and functions
setExpression(String.raw`c_{toc}\left(x_{0},y_{0},z_{0}\right)=c\left(\arctan\left(y_{0},x_{0}\right),\sqrt{x_{0}^{2}+y_{0}^{2}},z_{0}\right)`)
setExpression(String.raw`c\left(\theta,r,h\right)=\left(\frac{d}{d-z\left(\theta,r,h\right)}r\cos\left(a+\theta\right),\frac{d}{d-z\left(\theta,r,h\right)}\left(r\sin\left(a_{2}\right)\sin\left(a+\theta\right)+h\cos\left(a_{2}\right)\right)\left\{d-z\left(\theta,r,h\right)>0\right\}\right)`)
setExpression(String.raw`z\left(\theta,r,h\right)=\cos\left(a_{2}\right)r\sin\left(a+\theta\right)-\sin\left(a_{2}\right)h`)
setSlider("a_2 = -0.3", "-5", "5")
setSlider("a = 3.4", "-5", "5")
setSlider("d = 3", "5", "25")
setSlider("l_{ineopacity} = 0.1", "0", "1")
setSlider("f_{illopacity} = 0", "0", "1")

//the magic                    !CHANGE "TORUS.TXT" TO WHATEVER YOU WANT, AS LONG IS ITS A WAVEFRONT FILE!
fetch('http://localhost:5500/models/torus.txt')
  .then(response => response.text())
  .then((data) => {
    var lines = data.split("\r\n")
    var facelist = []
    var vertices = []
    
    //holy shit this sucks
    for (var i = 0; i < lines.length; i++) {
        if (lines[i][0] == "v") {
            if (lines[i][1] != "t") { 
                if (lines[i][1] != "n") { 
                    if (lines[i][1] != "p") { 
                        vertices[vertices.length] = lines[i].slice(2,lines[i].length)
                    }
                }
            }
        }
    }

    for (var i = 0; i < lines.length; i++) {
        if (lines[i][0] == "f") {
            facelist[facelist.length] = lines[i].slice(2,lines[i].length)
        }
    }

    var preformatfaces = []

    for (var i = 0; i < facelist.length; i++) {
        preformatfaces[preformatfaces.length] = facelist[i].split(" ")
    }

    for (var i = 0; i < preformatfaces.length; i++) {
        var verts = []
        for (var n = 0; n < preformatfaces[i].length; n++) {
            verts[verts.length] = preformatfaces[i][n].split("/")[0]
            console.log(verts)
        }
        if (verts.length == 3) {
            setExpression("\\operatorname{polygon}\\left(c_{toc}\\left("+vertices[verts[0]-1].split(" ").join(",")+"\\right),c_{toc}\\left("+vertices[verts[1]-1].split(" ").join(",")+"\\right),c_{toc}\\left("+vertices[verts[2]-1].split(" ").join(",")+"\\right)\\right)","#000000")
        } else {
            setExpression("\\operatorname{polygon}\\left(c_{toc}\\left("+vertices[verts[0]-1].split(" ").join(",")+"\\right),c_{toc}\\left("+vertices[verts[1]-1].split(" ").join(",")+"\\right),c_{toc}\\left("+vertices[verts[2]-1].split(" ").join(",")+"\\right),c_{toc}\\left("+vertices[verts[3]-1].split(" ").join(",")+"\\right)\\right)","#000000")
        }
    }
  })



  
