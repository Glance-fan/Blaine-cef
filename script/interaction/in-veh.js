function onIVMOjob() {
  onIVMOnone();
  document.getElementById('iv-job').classList.add('interaction-selected');
}

function onIVMOgas() {
  onIVMOnone();
  document.getElementById('iv-gas').classList.add('interaction-selected');
}

function onIVMOdoors() {
  onIVMOnone();
  document.getElementById('iv-doors-section').style.display = "block";
  document.getElementById('iv-doors-circle').style.display = "block";
  document.getElementById('iv-doors').classList.add('interaction-selected');
}

function onIVMOdopen() {
  if (!document.getElementById('iv-doors').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-d-open').classList.add('interaction-selected');
}

function onIVMOdclose() {
  if (!document.getElementById('iv-doors').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-d-close').classList.add('interaction-selected');
}

function onIVMOseat() {
  onIVMOnone();
  document.getElementById("iv-extra-sections").style.zIndex = "4";
  document.getElementById('iv-seat-section').style.display = "block";
  document.getElementById('iv-seat-circle').style.display = "block";
  document.getElementById('iv-seat').classList.add('interaction-selected');
}

function onIVMOsone() {
  if (!document.getElementById('iv-seat').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-s-one').classList.add('interaction-selected');
}

function onIVMOstwo() {
  if (!document.getElementById('iv-seat').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-s-two').classList.add('interaction-selected');
}

function onIVMOsthree() {
  if (!document.getElementById('iv-seat').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-s-three').classList.add('interaction-selected');
}

function onIVMOsfour() {
  if (!document.getElementById('iv-seat').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-s-four').classList.add('interaction-selected');
}

function onIVMOstrunk() {
  if (!document.getElementById('iv-seat').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-s-trunk').classList.add('interaction-selected');
}

function onIVMOtrunk() {
  onIVMOnone();
  document.getElementById('iv-trunk-section').style.display = "block";
  document.getElementById('iv-trunk-circle').style.display = "block";
  document.getElementById('iv-trunk').classList.add('interaction-selected');
}

function onIVMOtlook() {
  if (!document.getElementById('iv-trunk').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-t-look').classList.add('interaction-selected');
}

function onIVMOtopen() {
  if (!document.getElementById('iv-trunk').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-t-open').classList.add('interaction-selected');
}

function onIVMOtclose() {
  if (!document.getElementById('iv-trunk').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-t-close').classList.add('interaction-selected');
}

function onIVMOhood() {
  onIVMOnone();
  document.getElementById('iv-hood-section').style.display = "block";
  document.getElementById('iv-hood-circle').style.display = "block";
  document.getElementById('iv-hood').classList.add('interaction-selected');
}

function onIVMOhlook() {
  if (!document.getElementById('iv-hood').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-h-look').classList.add('interaction-selected');
}

function onIVMOhopen() {
  if (!document.getElementById('iv-hood').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-h-open').classList.add('interaction-selected');
}

function onIVMOhclose() {
  if (!document.getElementById('iv-hood').classList.contains('interaction-selected')) return;
  sectionIVDefault();
  document.getElementById('iv-h-close').classList.add('interaction-selected');
}

function onIVMOmusic() {
  onIVMOnone();
  document.getElementById('iv-music').classList.add('interaction-selected');
}

function onIVMOpassengers() {
  onIVMOnone();
  document.getElementById('iv-passengers').classList.add('interaction-selected');
}

function onIVMOpark() {
  onIVMOnone();
  document.getElementById('iv-park').classList.add('interaction-selected');
}

function onIVMOvehdoc() {
  onIVMOnone();
  document.getElementById('iv-vehdoc').classList.add('interaction-selected');
}

function onIVMOnone() {
  sectionIVDefault();
  document.getElementById("iv-extra-sections").style.zIndex = "1";

  arr = inter_main['in_veh_main'];
  for (var index = 0; index < arr.length; index++)
    document.getElementById('iv-' + arr[index]).classList.remove('interaction-selected');

  document.getElementById('iv-doors-circle').style.display = "none";
  document.getElementById('iv-doors-section').style.display = "none";

  document.getElementById('iv-seat-circle').style.display = "none";
  document.getElementById('iv-seat-section').style.display = "none";

  document.getElementById('iv-trunk-circle').style.display = "none";
  document.getElementById('iv-trunk-section').style.display = "none";

  document.getElementById('iv-hood-circle').style.display = "none";
  document.getElementById('iv-hood-section').style.display = "none";

}

function sectionIVDefault() {
  arr = inter_sections['in_veh_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('iv-' + arr[index]).classList.remove('interaction-selected');

  arr = inter_extra_sections['in_veh_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('iv-' + arr[index]).classList.remove('interaction-selected');
}

function rectIVMO() {
  document.getElementById("iv-interaction").style.zIndex = "2";
}

function circleIVMO() {
  document.getElementById("iv-interaction").style.zIndex = "5";
}

function sendIVAction(active) {
  if (!ivinteract_tmpl) return;
  if ((active == in_veh_cur['d-open'] || active == in_veh_cur['d-close']) && document.getElementById('iv-doors-circle').style.display == 'none') return;
  if ((active == in_veh_cur['s-one'] || active == in_veh_cur['s-two'] || active == in_veh_cur['s-three'] || active == in_veh_cur['s-four'] || active == in_veh_cur['s-trunk']) && document.getElementById('iv-seat-circle').style.display == 'none') return;
  if ((active == in_veh_cur['t-look'] || active == in_veh_cur['t-open'] || active == in_veh_cur['t-close']) && document.getElementById('iv-trunk-circle').style.display == 'none') return;
  if ((active == in_veh_cur['h-look'] || active == in_veh_cur['h-open'] || active == in_veh_cur['h-close']) && document.getElementById('iv-hood-circle').style.display == 'none') return;

  mp.trigger('Interaction::InVehicleSelect', active);
}