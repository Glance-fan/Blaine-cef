var inter_draw = 0;
var draw_id = 0;

function drawFullInteraction() {
  new DonutChart(document.getElementById("ov-interaction"), {
    r: 250,
    stroke: 100,
    items: chart_values['1']
  })
  rectCreate(inter_draw);
  inter_draw = 1;
  new DonutChart(document.getElementById("ov-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['05']
  })
  circleCreateOV(inter_draw);
  inter_draw = 2;
  new DonutChart(document.getElementById("ov-extra-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['05']
  })
  circleCreateOV(inter_draw);
  inter_draw = 3;
  var interactionCHAR = new DonutChart(document.getElementById("char-interaction"), {
    r: 250,
    stroke: 100,
    items: chart_values['125']
  })
  rectCreate(inter_draw);
  inter_draw = 4;
  var sectionsCHAR = new DonutChart(document.getElementById("char-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['0625']
  })
  circleCreateChar(inter_draw);
  inter_draw = 5;
  var extra_sectionsCHAR = new DonutChart(document.getElementById("char-extra-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['0625']
  })
  circleCreateChar(inter_draw);
  inter_draw = 6;
  new DonutChart(document.getElementById("iv-interaction"), {
    r: 250,
    stroke: 100,
    items: chart_values['1']
  })
  rectCreate(inter_draw);
  inter_draw = 7;
  new DonutChart(document.getElementById("iv-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['05']
  })
  circleCreateIV(inter_draw);
  inter_draw = 8;
  new DonutChart(document.getElementById("iv-extra-sections"), {
    r: 350,
    stroke: 100,
    items: chart_values['05']
  })
  circleCreateIV(inter_draw);

  drawInteraction(0);
  drawInteraction(1);
  drawInteraction(2);
}

function drawInteraction(opie_index) {
  args = getInterArgs(opie_index);
  drawInterCircles(args);
  drawTextPic(args);
  setInterClicks(args[5], args[6]);
  if (opie_index == 0) setInterMO(args[4], args[5], args[8], args[9])
  else setInterMO(args[4], args[5], args[8])
}

function drawInterCircles(args) {
  circles = args[1]
  for (var index = 0; index < circles[0].length; index++) {
    circle = document.createElement('div');
    circle.id = args[0].split('-')[0][0] + args[0].split('-')[1][0] + '-' + circles[0][index];
    circle.classList.add(circles[0][index]);
    circle.innerHTML = circles[1][index];
    document.getElementById(args[0]).append(circle);
  }

  for (var index = 1; index < circles[0].length - 1; index++) {
    circle = document.getElementById(args[0].split('-')[0][0] + args[0].split('-')[1][0] + '-' + circles[0][index])
    circle.style.display = 'none';

  }

  close_circle = document.getElementById(args[0]).lastElementChild;
  sup_div = document.createElement('div');
  sup_div.classList.add('support-div');
  sup_div.setAttribute('onclick', `${args[6]}close-menu'])`);
  sup_div.setAttribute('onmouseover', `${args[7]}`);
  close_circle.insertBefore(sup_div, close_circle.firstElementChild);
}


function drawTextPic(args) {
  strings = args[2];
  svgs = args[3];
  text_pic = args[4];

  for (var i = 0; i < strings.length; i++) {
    if (Array.isArray(strings[i])) {
      parent = setTextPic(args[6], strings[i][0], svgs[i][0]);
      text_pic.append(parent);

      container = document.createElement('div');
      container.id = strings[i][1];
      container.style.display = 'none';
      for (var j = 2; j < strings[i].length; j++)
        container.append(setTextPic(args[6], strings[i][j], svgs[i][j - 1]))

      text_pic.append(container);
    } else text_pic.append(setTextPic(args[6], strings[i], svgs[i]))
  }
}

function setTextPic(pattern, string, svg) {
  temp = document.createElement('div');
  temp.classList.add(string);
  temp.setAttribute('onclick', `${pattern}${string}'])`);
  temp.innerHTML = svg;
  return temp;
}

function setInterClicks(arr, pattern) {
  for (var index = 1; index < arr.length; index++) {
    document.getElementById(arr[0] + arr[index]).setAttribute('onclick', `${pattern}${arr[index]}'])`)
  }
}

function setInterMO(parent, arr, pattern, extra) {
  if (!!extra) arr = extra;
  for (var index = 1; index < arr.length; index++) {
    if (Array.isArray(arr[index]))
      parent.querySelector('.' + arr[index][0]).setAttribute('onmouseover', `${pattern}${arr[index][1].replace('-', '')}()`)
    else parent.querySelector('.' + arr[index]).setAttribute('onmouseover', `${pattern}${arr[index].replace('-', '')}()`)
  }
}

function DonutChart(parent, spec) {
  var __polar2xy = function (a, r) {
    return {
      x: Math.cos(a * 2 * Math.PI) * r,
      y: -Math.sin(a * 2 * Math.PI) * r,
    }
  }

  var __gen_arc_path = function (cx, cy, r, start, offset) {
    var end = __polar2xy(start + offset, r)
    start = __polar2xy(start, r)
    return [
      "M", cx + start.x, cy + start.y,
      "A", r, r, 0, +(offset > .5), 0, cx + end.x, cy + end.y,
    ].join(" ")
  }

  var __gen_chart_item = function (out, c, r, prev, cur, i, stroke) {
    data = getInterData(inter_draw);
    inter_id = data['id'];
    inter_elem = data['inter_array'][i];
    onmo = data['onmo'] + inter_elem.replace('-', '') + '()';
    out.push(["path", {
      d: __gen_arc_path(c, c, r, prev, cur),
      class: "chart-item-" + inter_elem,
      id: inter_id + inter_elem,
      onmouseover: onmo,
      fill: "transparent",
      "stroke-width": stroke,
    }])
  }

  var __gen_chart = function (chart) {
    var prev = 0,
      out = []
    var c = chart.r,
      r = chart.r - chart.stroke / 2
    for (var i in chart.items) {
      cur = chart.items[i]
      __gen_chart_item(out, c, r, prev, cur.value, i, chart.stroke)
      prev += cur.value
    }
    return out
  }

  var __create_tag_tree = function (elem) {
    var root = document.createElementNS("http://www.w3.org/2000/svg", elem[0])
    var attr = elem[1]
    for (var i in attr) {
      var a = document.createAttribute(i)
      a.value = attr[i]
      root.setAttributeNode(a)
    }
    if (elem.length > 2) {
      var children = elem[2]
      for (var i in children) {
        var c = __create_tag_tree(children[i])
        root.appendChild(c)
      }
    }
    return root
  }

  var correct_orientation = "matrix(0 -1 -1 0 0 0)"

  var __gen_code = function (spec) {
    return __create_tag_tree(
      ["svg", {
        id: idCheck(draw_id),
        transform: correct_orientation,
        class: "chart-donut",
        width: spec.r * 2,
        height: spec.r * 2,
      }, __gen_chart(spec)])
  }

  var __is_dict = function (v) {
    return v && typeof v === "object" && !(v instanceof Array)
  }

  DonutChart.prototype.update = function (spec) {
    for (var i in spec) {
      this.spec[i] = spec[i]
    }

    var code = __gen_code(this.spec)
    if (this.element != undefined) {
      this.element.remove()
    }
    this.element = this.parent.appendChild(code)
  }

  this.parent = parent
  this.spec = spec
  this.update({})
}

function rectCreate(inter_draw) {
  interaction_rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  if (inter_draw == 0) document.getElementById('ov-svg-i').insertBefore(interaction_rect, document.getElementById('ov-svg-i').firstChild);
  else if (inter_draw == 3) document.getElementById('char-svg-i').insertBefore(interaction_rect, document.getElementById('char-svg-i').firstChild);
  else if (inter_draw == 6) document.getElementById('iv-svg-i').insertBefore(interaction_rect, document.getElementById('iv-svg-i').firstChild);
  interaction_rect.setAttributeNS(null, "width", '500');
  interaction_rect.setAttributeNS(null, "height", '500');
  interaction_rect.setAttributeNS(null, "x", '0');
  interaction_rect.setAttributeNS(null, "y", '0');
  interaction_rect.setAttributeNS(null, "fill-opacity", '0');
  if (inter_draw == 0) interaction_rect.setAttributeNS(null, "onmouseover", 'rectOVMO()');
  else if (inter_draw == 3) interaction_rect.setAttributeNS(null, "onmouseover", 'rectCharMO()');
  else if (inter_draw == 6) interaction_rect.setAttributeNS(null, "onmouseover", 'rectIVMO()');
}

function circleCreateChar(inter_draw) {
  sections_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  if (inter_draw == 4) document.getElementById('char-svg-sect').insertBefore(sections_circle, document.getElementById('char-svg-sect').firstChild);
  else document.getElementById('char-svg-extra').insertBefore(sections_circle, document.getElementById('char-svg-extra').firstChild);
  sections_circle.setAttributeNS(null, "cx", '350');
  sections_circle.setAttributeNS(null, "cy", '350');
  sections_circle.setAttributeNS(null, "r", '250');
  sections_circle.setAttributeNS(null, "fill-opacity", '0');
  sections_circle.setAttributeNS(null, "onmouseover", 'circleCharMO()');
}

function circleCreateOV(inter_draw) {
  sections_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  if (inter_draw == 1) document.getElementById('ov-svg-sect').insertBefore(sections_circle, document.getElementById('ov-svg-sect').firstChild);
  else document.getElementById('ov-svg-extra').insertBefore(sections_circle, document.getElementById('ov-svg-extra').firstChild);
  sections_circle.setAttributeNS(null, "cx", '350');
  sections_circle.setAttributeNS(null, "cy", '350');
  sections_circle.setAttributeNS(null, "r", '250');
  sections_circle.setAttributeNS(null, "fill-opacity", '0');
  sections_circle.setAttributeNS(null, "onmouseover", 'circleOVMO()');
}

function circleCreateIV(inter_draw) {
  sections_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  if (inter_draw == 7) document.getElementById('iv-svg-sect').insertBefore(sections_circle, document.getElementById('iv-svg-sect').firstChild);
  else document.getElementById('iv-svg-extra').insertBefore(sections_circle, document.getElementById('iv-svg-extra').firstChild);
  sections_circle.setAttributeNS(null, "cx", '350');
  sections_circle.setAttributeNS(null, "cy", '350');
  sections_circle.setAttributeNS(null, "r", '250');
  sections_circle.setAttributeNS(null, "fill-opacity", '0');
  sections_circle.setAttributeNS(null, "onmouseover", 'circleIVMO()');
}

function getInterData(now_draw) {
  switch (now_draw) {
    case 0:
      return {
        id: 'ov-', inter_array: inter_main['out_veh_main'], onmo: "onOVMO"
      };
    case 1:
      return {
        id: 'ov-', inter_array: inter_sections['out_veh_sections'], onmo: "onOVMO"
      };
    case 2:
      return {
        id: 'ov-', inter_array: inter_extra_sections['out_veh_sections'], onmo: "onOVMO"
      };
    case 3:
      return {
        id: 'ci-', inter_array: inter_main['char_main'], onmo: "onCharMO"
      };
    case 4:
      return {
        id: 'ci-', inter_array: inter_sections['char_sections'], onmo: "onCharMO"
      };
    case 5:
      return {
        id: 'ci-', inter_array: inter_extra_sections['char_sections'], onmo: "onCharMO"
      };
    case 6:
      return {
        id: 'iv-', inter_array: inter_main['in_veh_main'], onmo: "onIVMO"
      };
    case 7:
      return {
        id: 'iv-', inter_array: inter_sections['in_veh_sections'], onmo: "onIVMO"
      };
    case 8:
      return {
        id: 'iv-', inter_array: inter_extra_sections['in_veh_sections'], onmo: "onIVMO"
      };
  }
}

function idCheck() {
  switch (draw_id) {
    case 0:
      draw_id = 1;
      return "ov-svg-i";
    case 1:
      draw_id = 2;
      return "ov-svg-sect";
    case 2:
      draw_id = 3;
      return "ov-svg-extra";
    case 3:
      draw_id = 4;
      return "char-svg-i";
    case 4:
      draw_id = 5;
      return "char-svg-sect";
    case 5:
      draw_id = 6;
      return "char-svg-extra";
    case 6:
      draw_id = 7;
      return "iv-svg-i";
    case 7:
      draw_id = 8;
      return "iv-svg-sect";
    case 8:
      return "iv-svg-extra";
  }
}