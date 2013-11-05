var canvas;
var context2d;
var fractal = {'samples': [], 'drawArrays': [[]], 'iteration': 1};

var mouseDragged = false;
var inputX;
var inputY;

var offsetX;
var offsetY;

var scale = 1.0;

$(document).ready(init);

function init() {
    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');

    canvas.addEventListener('mousewheel', mouseWheel, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mouseup', mouseUp, false);

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    $('#submitBtn').click(submit);
    $('#downBtn').click(iterDown);
    $('#upBtn').click(iterUp);
    $('#goBtn').click(iterGo);
    $('#jsfSaveBtn').click(saveImage);

    $('#jsfTabs a[href="#view"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#jsfTabs a[href="#edit"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#jsfTabs a[href="#examples"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

}

function saveImage() {
    window.open(canvas.toDataURL('image/png'));
}

function resizeCanvas() {
    canvas.width =  $('#canvas').innerWidth();
    canvas.height = $('#canvas').innerWidth() * 10 / 16;
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
    scale = 1.0;
    Draw(offsetX, offsetY);
}

function submit() {
    samples = JSON.parse(document.getElementById('samplesedit').value).samples;
    fractal['samples'] = samples;

    /* Prepare first step */
    fractal['iteration'] = 1;
    $('#iterationEdit').val(1);
    fractal['drawArrays'] = [[]];
    var arr = fractal['drawArrays'][0];
    var arrangedSamples = [];

    if (samples.length > 0) {
        for (var j = 0; j < samples[0].segments.length; j++) {
            arr.push(samples[0].segments[j]);
        }
    }
    for (var i = 0; i < samples.length; ++i) {
        arrangedSamples[samples[i].id] = samples[i];
    }
    fractal['samples'] = arrangedSamples;

    $('#jsfTabs a[href="#view"]').tab('show');

    resizeCanvas();
}

function iterDown() {
    var iter = parseInt($('#iterationEdit').val());
    var orig = fractal['iteration'];
    if (iter != NaN && iter > 1) {
        iterate(--orig);
        fractal['iteration'] = orig;
        Draw(offsetX, offsetY);
    }
    $('#iterationEdit').val(orig);
}

function iterUp() {
    var iter = parseInt($('#iterationEdit').val());
    var orig = fractal['iteration'];
    if (iter != NaN) {
        iterate(++orig);
        fractal['iteration'] = orig;
        Draw(offsetX, offsetY);
    }
    $('#iterationEdit').val(orig);
}

function iterGo() {
    var iter = parseInt($('#iterationEdit').val());
    var orig = fractal['iteration'];
    if (iter != NaN)  {
        orig = iter;
        iterate(orig);
        fractal['iteration'] = orig;
        Draw(offsetX, offsetY);
    }
    $('#iterationEdit').val(orig);
}

function coefs(o, t) {
  //var o = [1, 1, 2, 2]; //опорная линия семпла
  //var t = [-1, -1, -3, -3]; //куда нужно поместить

  var ox = o[2] - o[0];
  var oy = o[3] - o[1];

  var tx = t[2] - t[0];
  var ty = t[3] - t[1];

  var A = (ty * oy + tx * ox)/(ox*ox + oy * oy);
  var B = (ty * ox - tx * oy)/(ox*ox + oy * oy);

  //var C1 = t[0] - o[0] * A + o[1] * B;
  var C2 = t[2] - o[2] * A + o[3] * B;

  //var D1 = t[1] - o[1] * A - o[0] * B;
  var D2 = t[3] - o[3] * A - o[2] * B;

  return [A, B, C2, D2];
}

function iterate(iter) {
    var matrix = [];
    var samples = fractal['samples'];
    var smpl;
    var segments = [];

    for (var i = fractal['drawArrays'].length - 1; i < iter; ++i) {
        var arr = fractal['drawArrays'][i];
        var newarr = [];
        for (var j = 0; j < arr.length; j += 6) {
            if (arr[j+1] != 0) {
                newarr.push(arr[j]);   newarr.push(arr[j+1]-1);
                newarr.push(arr[j+2]); newarr.push(arr[j+3]);
                newarr.push(arr[j+4]); newarr.push(arr[j+5]);
            } else {
                smpl = samples[arr[j]];
                if (smpl == null) continue;
                matrix = coefs(smpl.baseline, arr.slice(j+2, j+6));

                segments = smpl.segments;
                for (var s = 0; s < segments.length; s += 6) {
                    newarr.push(segments[s]);
                    if (segments[s+1] == 0) newarr.push(0);
                    else newarr.push(segments[s+1]-1);
                    newarr.push(segments[s+2] * matrix[0] - segments[s+3] * matrix[1] + matrix[2]);
                    newarr.push(segments[s+2] * matrix[1] + segments[s+3] * matrix[0] + matrix[3]);
                    newarr.push(segments[s+4] * matrix[0] - segments[s+5] * matrix[1] + matrix[2]);
                    newarr.push(segments[s+4] * matrix[1] + segments[s+5] * matrix[0] + matrix[3]);
                }
            }
        }
        fractal['drawArrays'].push(newarr);
    }
}

function line(x1, y1, x2, y2) {
    context2d.beginPath();
    context2d.moveTo(x1, y1);
    context2d.lineTo(x2, y2);
    context2d.stroke();
}

function draw() {
    Draw(offsetX, offsetY);
}

function Draw(offX, offY) {
    context2d.clearRect(0,0,canvas.width,canvas.height);
    context2d.beginPath();

    if (fractal['drawArrays'].length == 0) return;

    var arr = fractal['drawArrays'][fractal['iteration']-1];
    for (var i = 0; i < arr.length; i+=6) {
        line(arr[i+2] * scale + offX, -arr[i+3] * scale + offY, arr[i+4] * scale + offX, -arr[i+5] * scale + offY);
    }
    $('#segmentsLabel').text(arr.length/6);
}

function getX(e) {
    return (e.layerX == null) ? e.offsetX : e.layerX;
}

function getY(e) {
    return (e.layerY == null) ? e.offsetY : e.layerY;
}

function getOffsetX(x) {
    return offsetX + (x - inputX);
}

function getOffsetY(y) {
    return offsetY + (y - inputY);
}

function mouseDown(e) {
    if(e.button === 0) {
        mouseDragged = true;
        inputX = getX(e);
        inputY = getY(e);
    }
}

function mouseUp(e) {
    mouseDragged = false;
    offsetX = getOffsetX(getX(e));
    offsetY = getOffsetY(getY(e));
}

function mouseMove(e) {
    if(mouseDragged) Draw(getOffsetX(getX(e)), getOffsetY(getY(e)));
}

function mouseWheel(e) {
    if(!mouseDragged) {
        var s = 1;
        if(e.wheelDeltaY > 0)
           s =  e.wheelDeltaY/120 * 1.5;

        if(e.wheelDeltaY < 0)
           s = -e.wheelDeltaY/120 / 1.5;

        var x = getX(e);
        var y = getY(e);

        offsetX = (offsetX - x) * s + x;
        offsetY = (offsetY - y) * s + y;
        scale *= s;
        Draw(offsetX, offsetY);
    }
    return false;
}