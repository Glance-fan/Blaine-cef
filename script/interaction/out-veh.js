function onOVMOjob() {
  onOVMOnone();
  document.getElementById('ov-job').classList.add('interaction-selected');
}

function onOVMOgas() {
  onOVMOnone();
  document.getElementById('ov-gas').classList.add('interaction-selected');
}

function onOVMOdoors() {
  onOVMOnone();
  document.getElementById('ov-doors-section').style.display = "block";
  document.getElementById('ov-doors-circle').style.display = "block";
  document.getElementById('ov-doors').classList.add('interaction-selected');
}

function onOVMOdopen() {
  if (!document.getElementById('ov-doors').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-d-open').classList.add('interaction-selected');
}

function onOVMOdclose() {
  if (!document.getElementById('ov-doors').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-d-close').classList.add('interaction-selected');
}

function onOVMOseat() {
  onOVMOnone();
  document.getElementById("ov-extra-sections").style.zIndex = "4";
  document.getElementById('ov-seat-section').style.display = "block";
  document.getElementById('ov-seat-circle').style.display = "block";
  document.getElementById('ov-seat').classList.add('interaction-selected');
}

function onOVMOsone() {
  if (!document.getElementById('ov-seat').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-s-one').classList.add('interaction-selected');
}

function onOVMOstwo() {
  if (!document.getElementById('ov-seat').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-s-two').classList.add('interaction-selected');
}

function onOVMOsthree() {
  if (!document.getElementById('ov-seat').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-s-three').classList.add('interaction-selected');
}

function onOVMOsfour() {
  if (!document.getElementById('ov-seat').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-s-four').classList.add('interaction-selected');
}

function onOVMOstrunk() {
  if (!document.getElementById('ov-seat').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-s-trunk').classList.add('interaction-selected');
}

function onOVMOtrunk() {
  onOVMOnone();
  document.getElementById('ov-trunk-section').style.display = "block";
  document.getElementById('ov-trunk-circle').style.display = "block";
  document.getElementById('ov-trunk').classList.add('interaction-selected');
}

function onOVMOtlook() {
  if (!document.getElementById('ov-trunk').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-t-look').classList.add('interaction-selected');
}

function onOVMOtopen() {
  if (!document.getElementById('ov-trunk').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-t-open').classList.add('interaction-selected');
}

function onOVMOtclose() {
  if (!document.getElementById('ov-trunk').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-t-close').classList.add('interaction-selected');
}

function onOVMOhood() {
  onOVMOnone();
  document.getElementById('ov-hood-section').style.display = "block";
  document.getElementById('ov-hood-circle').style.display = "block";
  document.getElementById('ov-hood').classList.add('interaction-selected');
}

function onOVMOhlook() {
  if (!document.getElementById('ov-hood').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-h-look').classList.add('interaction-selected');
}

function onOVMOhopen() {
  if (!document.getElementById('ov-hood').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-h-open').classList.add('interaction-selected');
}

function onOVMOhclose() {
  if (!document.getElementById('ov-hood').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-h-close').classList.add('interaction-selected');
}

function onOVMOpush() {
  onOVMOnone();
  document.getElementById('ov-push').classList.add('interaction-selected');
}

function onOVMOother() {
  onOVMOnone();
  document.getElementById('ov-other-section').style.display = "block";
  document.getElementById('ov-other-circle').style.display = "block";
  document.getElementById('ov-other').classList.add('interaction-selected');
}

function onOVMOofix() {
  if (!document.getElementById('ov-other').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-o-fix').classList.add('interaction-selected');
}

function onOVMOoputnp() {
  if (!document.getElementById('ov-other').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-o-putnp').classList.add('interaction-selected');
}

function onOVMOoremnp() {
  if (!document.getElementById('ov-other').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-o-remnp').classList.add('interaction-selected');
}

function onOVMOojunkyard() {
  if (!document.getElementById('ov-other').classList.contains('interaction-selected')) return;
  sectionOVDefault();
  document.getElementById('ov-o-junkyard').classList.add('interaction-selected');
}

function onOVMOpark() {
  onOVMOnone();
  document.getElementById('ov-park').classList.add('interaction-selected');
}

function onOVMOvehdoc() {
  onOVMOnone();
  document.getElementById('ov-vehdoc').classList.add('interaction-selected');
}

function onOVMOnone() {
  sectionOVDefault();
  document.getElementById("ov-extra-sections").style.zIndex = "1";

  arr = inter_main['out_veh_main'];
  for (var index = 0; index < arr.length; index++)
    document.getElementById('ov-' + arr[index]).classList.remove('interaction-selected');

  document.getElementById('ov-doors-circle').style.display = "none";
  document.getElementById('ov-doors-section').style.display = "none";

  document.getElementById('ov-seat-circle').style.display = "none";
  document.getElementById('ov-seat-section').style.display = "none";

  document.getElementById('ov-trunk-circle').style.display = "none";
  document.getElementById('ov-trunk-section').style.display = "none";

  document.getElementById('ov-hood-circle').style.display = "none";
  document.getElementById('ov-hood-section').style.display = "none";

  document.getElementById('ov-other-circle').style.display = "none";
  document.getElementById('ov-other-section').style.display = "none";
}

function sectionOVDefault() {
  arr = inter_sections['out_veh_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('ov-' + arr[index]).classList.remove('interaction-selected');

  arr = inter_extra_sections['out_veh_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('ov-' + arr[index]).classList.remove('interaction-selected');
}

function rectOVMO() {
  document.getElementById("ov-interaction").style.zIndex = "2";
}

function circleOVMO() {
  document.getElementById("ov-interaction").style.zIndex = "5";
}

function sendOVAction(active) {
  if (!ovinteract_tmpl) return;
  if ((active == out_veh_cur['d-open'] || active == out_veh_cur['d-close']) && document.getElementById('ov-doors-circle').style.display == 'none') return;
  if ((active == out_veh_cur['s-one'] || active == out_veh_cur['s-two'] || active == out_veh_cur['s-three'] || active == out_veh_cur['s-four'] || active == out_veh_cur['s-trunk']) && document.getElementById('ov-seat-circle').style.display == 'none') return;
  if ((active == out_veh_cur['t-look'] || active == out_veh_cur['t-open'] || active == out_veh_cur['t-close']) && document.getElementById('ov-trunk-circle').style.display == 'none') return;
  if ((active == out_veh_cur['h-look'] || active == out_veh_cur['h-open'] || active == out_veh_cur['h-close']) && document.getElementById('ov-hood-circle').style.display == 'none') return;
  if ((active == out_veh_cur['o-fix'] || active == out_veh_cur['o-putnp'] || active == out_veh_cur['o-remnp'] || active == out_veh_cur['o-junkyard']) && document.getElementById('ov-other-circle').style.display == 'none') return;

  mp.trigger('Interaction::OutVehicleSelect', active);
}