

function fillExamplesList() {
    for (var i = 0; i < examples.length; ++i) {
        var item = '<a class="list-group-item" href="#' + examples[i].samples + '">' + examples[i].title + '</a>';
        $('#jsfExamplesList').append(item);
    }
}

function prettySamples(samples) {
    var obj = JSON.parse(samples);
    var out = '{\n"samples": [\n';
    var ident = '  ';

    for (var i = 0; i < obj.samples.length; ++i) {
        out += '{\n\t"id": ' + obj.samples[i].id + ',\n';
        out += '\t"baseline": [' + obj.samples[i].baseline.join(', ') + '],\n';
        out += '\t"segments": \n\t[\n\t\t';

        var maxl = [0,0,0,0,0,0];

        for (var j = 0; j < obj.samples[i].segments.length; ++j) {
            var l = obj.samples[i].segments[j].toString().length;
            if (maxl[j % 6] < l) maxl[j % 6] = l;
        }

        for (var j = 0; j < obj.samples[i].segments.length; ++j) {
            var s = obj.samples[i].segments[j].toString();
            for (var k=s.length; k < maxl[j%6]; ++k) s = ' ' + s;
            out += s;
            if (j < obj.samples[i].segments.length - 1) {
                out +=', ';
                if (j > 0 && ((j+1) % 6) == 0) out += '\n\t\t';
            }
        }

        out += '\n\t]\n}';
        if (i < obj.samples.length -1) out += ',\n';
        else out += '\n';
    }

    out += '\n]\n}\n';
    return out.replace(/\t/g, ident);
}


var examples = [

{
    title: 'Кривая дракона (Dragon curve)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMTAwLDAsMTAwLDBdLCJzZWdtZW50cyI6WzEsMCwtMTAwLDAsMCwxMDAsMSwwLDEwMCwwLDAsMTAwXX1dfQ%3D%3D'
},

{
    title: 'Ковёр Серпинского (Sierpinski carpet)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMTUsMCwxNSwwXSwic2VnbWVudHMiOlsyLDAsNTAsLTUwLC01MCwtNTAsMiwwLC01MCwtNTAsLTUwLDUwLDIsMCwtNTAsNTAsNTAsNTAsMiwwLDUwLDUwLDUwLC01MCwwLC0xLDE1MCwtMTUwLC0xNTAsLTE1MCwwLC0xLC0xNTAsLTE1MCwtMTUwLDE1MCwwLC0xLC0xNTAsMTUwLDE1MCwxNTAsMCwtMSwxNTAsMTUwLDE1MCwtMTUwXX0seyJpZCI6MiwiYmFzZWxpbmUiOlstMTUsMCwxNSwwXSwic2VnbWVudHMiOlswLC0xLC0xNSwwLDE1LDAsMiwwLDUsMTAsLTUsMTAsMiwwLC01LDEwLC01LDIwLDIsMCwtNSwyMCw1LDIwLDIsMCw1LDIwLDUsMTAsMiwwLDM1LDEwLDI1LDEwLDIsMCwyNSwxMCwyNSwyMCwyLDAsMjUsMjAsMzUsMjAsMiwwLDM1LDIwLDM1LDEwXX1dfQ%3D%3D'
},

{
    title: 'Кривая Серпинского (Sierpinski arrowhead curve)',
    samples: 'ewogICAgInNhbXBsZXMiOiBbCnsKICAgICJpZCI6IDIsCiAgICAic2VnbWVudHMiOiBbCgoyLCAwLCAxMCwgMTcuMywgMCwgMCwgCjIsIDAsIDEwLCAxNy4zLCAzMCwgMTcuMywKMiwgMCwgNDAsIDAsIDMwLCAxNy4zCgpdLAogICAgImJhc2VsaW5lIjogWzAgLDAsIDQwLCAwXQp9Cl0KfQ%3D%3D'
},

{
    title: 'Снежинка Коха (Koch snowflake)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMjUsMCwyNSwwXSwic2VnbWVudHMiOlsyLDAsMjUsMCwtMjUsMCwyLDAsLTI1LDAsMCw0MywyLDAsMCw0MywyNSwwXX0seyJpZCI6MiwiYmFzZWxpbmUiOlstNzUsMCw3NSwwXSwic2VnbWVudHMiOlsyLDAsLTc1LDAsLTI1LDAsMiwwLC0yNSwwLDAsNDMsMiwwLDAsNDMsMjUsMCwyLDAsMjUsMCw3NSwwXX1dfQ%3D%3D'
},


{
    title: 'Кривая Коха 85° (Koch curve 85° angle)',
    samples: 'ewogICAgInNhbXBsZXMiOiBbCnsKICAgICJpZCI6IDEsCiAgICAic2VnbWVudHMiOiBbMSwgMCwtMTAwICwwICwtMTAsMCAsCiAgICAgICAgICAgICAgICAgMSwgMCwtMTAgLDAgLDAsOTAsCiAgICAgICAgICAgICAgICAgMSwgMCwwLDkwLCAxMCwwLAogICAgICAgICAgICAgICAgIDEsIDAsMTAsMCwgMTAwLCAwIF0sCiAgICAiYmFzZWxpbmUiOiBbLTEwMCwwLDEwMCwwIF0KfQpdCn0%3D'
},

{
    title: 'Квадратичная кривая Коха (Quadratic Koch curve)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMjAwLDAsMjAwLDBdLCJzZWdtZW50cyI6WzEsMCwtMjAwLDAsLTEwMCwwLDEsMCwtMTAwLDAsLTEwMCwxMDAsMSwwLC0xMDAsMTAwLDAsMTAwLDEsMCwwLDEwMCwwLDAsMSwwLDAsMCwwLC0xMDAsMSwwLDAsLTEwMCwxMDAsLTEwMCwxLDAsMTAwLC0xMDAsMTAwLDAsMSwwLDEwMCwwLDIwMCwwXX1dfQ%3D%3D'
},

{
    title: 'Квадратичная снежинка Коха (Quadratic Koch snowflake)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMTAwLDAsMTAwLDBdLCJzZWdtZW50cyI6WzIsMCwtMTAwLC0xMDAsMTAwLC0xMDAsMiwwLDEwMCwtMTAwLDEwMCwxMDAsMiwwLDEwMCwxMDAsLTEwMCwxMDAsMiwwLC0xMDAsMTAwLC0xMDAsLTEwMF19LHsiaWQiOjIsImJhc2VsaW5lIjpbLTIwMCwwLDIwMCwwXSwic2VnbWVudHMiOlsyLDAsLTIwMCwwLC0xMDAsMCwyLDAsLTEwMCwwLC0xMDAsMTAwLDIsMCwtMTAwLDEwMCwwLDEwMCwyLDAsMCwxMDAsMCwwLDIsMCwwLDAsMCwtMTAwLDIsMCwwLC0xMDAsMTAwLC0xMDAsMiwwLDEwMCwtMTAwLDEwMCwwLDIsMCwxMDAsMCwyMDAsMF19XX0%3D'
},

{
    title: 'Кривая Госпера (Gosper curve)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMTUwLC04Ni42LDEwMCwwXSwic2VnbWVudHMiOlsxLDAsLTE1MCwtODYuNiwtNTAsLTg2LjYsMSwwLDAsMCwtNTAsLTg2LjYsMSwwLC0xMDAsMCwwLDAsMSwwLC0xMDAsMCwtMTUwLDg2LjYsMSwwLC0xNTAsODYuNiwtNTAsODYuNiwxLDAsLTUwLDg2LjYsNTAsODYuNiwxLDAsMTAwLDAsNTAsODYuNl19XX0%3D'
},

{
    title: 'Кривая Гилберта (Hilbert curve)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstNTAsMCw1MCwwXSwic2VnbWVudHMiOlswLDAsLTUwLDAsLTUwLDEwMCwyLDAsLTUwLDEwMCw1MCwxMDAsMCwwLDUwLDEwMCw1MCwwXX0seyJpZCI6MiwiYmFzZWxpbmUiOls1LDI1LDI1LDI1XSwic2VnbWVudHMiOlswLDAsMCwwLDEwLDAsMiwwLDEwLDEwLDEwLDAsMCwwLDEwLDEwLDAsMTAsMywwLDAsMTAsMCwyMCwwLDAsMCwyMCwwLDMwLDIsMCwwLDMwLDEwLDMwLDAsMCwxMCwzMCwxMCwyMCwzLDAsMjAsMjAsMTAsMjAsMCwwLDIwLDIwLDIwLDMwLDIsMCwyMCwzMCwzMCwzMCwwLDAsMzAsMzAsMzAsMjAsMywwLDMwLDIwLDMwLDEwLDAsMCwzMCwxMCwyMCwxMCwyLDAsMjAsMCwyMCwxMCwwLDAsMjAsMCwzMCwwXX0seyJpZCI6MywiYmFzZWxpbmUiOlstNSw1LDE1LDVdLCJzZWdtZW50cyI6WzMsMCwwLDEwLDEwLDEwXX1dfQ%3D%3D'
},

{
    title: 'Кривая Леви (Lévy C curve)',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstMTAwLDAsMTAwLDBdLCJzZWdtZW50cyI6WzEsMCwtMTAwLDAsMCwxMDAsMSwwLDAsMTAwLDEwMCwwXX1dfQ%3D%3D'
},

{
    title: 'Т-фрактал (T-fractal) v1',
    samples: 'ewogICAgInNhbXBsZXMiOiBbCnsKICAgICJpZCI6IDEsCiAgICAic2VnbWVudHMiOiBbMiwgMCwgLTEwMCwgLTEwMCwgLTEwMCAsMTAwLAogICAgICAgICAgICAgICAgIDIsIDAsIC0xMDAsIDEwMCwgMTAwICwxMDAsCiAgICAgICAgICAgICAgICAgMiwgMCwgMTAwLCAxMDAsIDEwMCAsLTEwMCwKICAgICAgICAgICAgICAgICAyLCAwLCAxMDAsIC0xMDAsIC0xMDAgLC0xMDAsCiAgICAgICAgICAgICAgICAgMCwgLTEsIC0yMDAsIC0yMDAsIC0yMDAgLDIwMCwKICAgICAgICAgICAgICAgICAwLCAtMSwgLTIwMCwgMjAwLCAyMDAgLDIwMCwKICAgICAgICAgICAgICAgICAwLCAtMSwgMjAwLCAyMDAsIDIwMCAsLTIwMCwKICAgICAgICAgICAgICAgICAwLCAtMSwgMjAwLCAtMjAwLCAtMjAwICwtMjAwXSwKICAgICJiYXNlbGluZSI6IFswLDAsMCwyMDAgXQp9LAp7CiAgICAiaWQiOiAyLAogICAgInNlZ21lbnRzIjogWzIsIC0xLCAwICwwICwyLDAgLAogICAgICAgICAgICAgICAgIDMsIDAsIDIsIDAsIDIsIDEsCiAgICAgICAgICAgICAgICAgMiwgMCwgMiwgMSwgNCwgMSwKICAgICAgICAgICAgICAgICA0LCAwLCAwLCAwLCAwLCAxLAogICAgICAgICAgICAgICAgIDIsIDAsIC0yLCAxICwwLDFdLAogICAgImJhc2VsaW5lIjogWy0xLDAsMywwIF0KfSwKewogICAgImlkIjogMywKICAgICJzZWdtZW50cyI6IFswLCAtMSwgMCAsMCAsMSwwICwKICAgICAgICAgICAgICAgICAzLCAwLCAxLCAwLCAxLCAxLAogICAgICAgICAgICAgICAgIDIsIDAsIDEsIDEsIDMsIDFdLAogICAgImJhc2VsaW5lIjogWzAsMCwyLDAgXQp9LAp7CiAgICAiaWQiOiA0LAogICAgInNlZ21lbnRzIjogWzAsIC0xLCAwICwwICwxLDAgLAogICAgICAgICAgICAgICAgIDQsIDAsIDEsIDAsIDEsIC0xLAogICAgICAgICAgICAgICAgIDIsIDAsIDMsIC0xLCAxLCAtMV0sCiAgICAiYmFzZWxpbmUiOiBbMCwwLDIsMCBdCn0KCl0KfQ%3D%3D'
},

{
    title: 'Т-фрактал (T-fractal) v2',
    samples: 'ewogICAgInNhbXBsZXMiOiBbCnsKICAgICJpZCI6IDEsCiAgICAic2VnbWVudHMiOiBbMiwgMCwwICwxMDAgLDAsMCAsCiAgICAgICAgICAgICAgICAgMiwgMCwwLDEwMCAsMCwyMDAsCiAgICAgICAgICAgICAgICAgMiwgMCwwLDEwMCwtMTAwLDEwMCwKICAgICAgICAgICAgICAgICAyLCAwLDAsMTAwICwxMDAsMTAwXSwKICAgICJiYXNlbGluZSI6IFswLDAsMCwyMDAgXQp9LAp7CiAgICAiaWQiOiAyLAogICAgInNlZ21lbnRzIjogWzAsIDAsMCAsMTAwICwwLDAgLAogICAgICAgICAgICAgICAgIDIsIDAsMCwxMDAgLDAsMjAwLAogICAgICAgICAgICAgICAgIDIsIDAsMCwxMDAsLTEwMCwxMDAsCiAgICAgICAgICAgICAgICAgMiwgMCwwLDEwMCAsMTAwLDEwMF0sCiAgICAiYmFzZWxpbmUiOiBbMCwwLDAsMjAwIF0KfQoKXQp9'
},

{
    title: 'Vicsek fractal',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlstOTAsMCw5MCwwXSwic2VnbWVudHMiOlsxLDAsLTkwLDAsLTMwLDAsMSwwLC0zMCwwLDMwLDAsMSwwLDMwLDAsOTAsMCwxLDAsMCw5MCwwLDMwLDAsMCwwLDMwLDAsLTMwLDEsMCwwLC0zMCwwLC05MF19XX0%3D'
},

{
    title: 'Monkey tree',
    samples: 'eyJzYW1wbGVzIjpbeyJpZCI6MSwiYmFzZWxpbmUiOlswLDAsMTAzLjkyMywwXSwic2VnbWVudHMiOlsyLDAsMCwwLDE3LjMyLDMwLDIsMCwzNC42NDEsNjAsMTcuMzIsMzAsMSwwLDM0LjY0MSw2MCw2OS4yOCw2MCwyLDAsODYuNiwzMCw2OS4yOCw2MCwyLDAsNjkuMjgsNDAsODYuNiwzMCwyLDAsNjkuMjgsNDAsNTEuOTYsNTAsMSwwLDM0LjY0MSw0MCw1MS45Niw1MCwxLDAsMzQuNjQxLDIwLDM0LjY0MSw0MCwxLDAsMzQuNjQxLDIwLDM0LjY0MSwwLDEsMCw2OS4yOCwwLDM0LjY0MSwwLDEsMCw2OS4yOCwwLDEwMy45MjMsMF19LHsiaWQiOjIsImJhc2VsaW5lIjpbMCwwLDEwMy45MjMsMF0sInNlZ21lbnRzIjpbMSwwLDAsMCwxNy4zMiwtMzAsMSwwLDM0LjY0MSwtNjAsMTcuMzIsLTMwLDIsMCwzNC42NDEsLTYwLDY5LjI4LC02MCwxLDAsODYuNiwtMzAsNjkuMjgsLTYwLDEsMCw2OS4yOCwtNDAsODYuNiwtMzAsMSwwLDY5LjI4LC00MCw1MS45NiwtNTAsMiwwLDM0LjY0MSwtNDAsNTEuOTYsLTUwLDIsMCwzNC42NDEsLTIwLDM0LjY0MSwtNDAsMiwwLDM0LjY0MSwtMjAsMzQuNjQxLDAsMiwwLDY5LjI4LDAsMzQuNjQxLDAsMiwwLDY5LjI4LDAsMTAzLjkyMywwXX1dfQ%3D%3D'
}

];