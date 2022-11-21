function onCharMOinteract1() {
  onCharMOnone();
  document.getElementById('ci-interact1').classList.add('interaction-selected');
  document.getElementById('ci-interact2').classList.add('interaction-selected');
  document.getElementById('ci-interact-section').style.display = "block";
  document.getElementById('ci-interact-circle').style.display = "block";
}

function onCharMOinteract2() {
  onCharMOnone();
  document.getElementById('ci-interact1').classList.add('interaction-selected');
  document.getElementById('ci-interact2').classList.add('interaction-selected');
  document.getElementById('ci-interact-section').style.display = "block";
  document.getElementById('ci-interact-circle').style.display = "block";
}

function onCharMOicarry() {
  if (!document.getElementById('ci-interact1').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-i-carry').classList.add('interaction-selected');
}

function onCharMOicoin() {
  if (!document.getElementById('ci-interact1').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-i-coin').classList.add('interaction-selected');
}

function onCharMOihandshake() {
  if (!document.getElementById('ci-interact1').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-i-handshake').classList.add('interaction-selected');
}

function onCharMOikiss() {
  if (!document.getElementById('ci-interact1').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-i-kiss').classList.add('interaction-selected');
}

function onCharMOintertrade() {
  onCharMOnone();
  document.getElementById('ci-intertrade').classList.add('interaction-selected');
}

function onCharMOproperty() {
  onCharMOnone();
  document.getElementById('ci-property-circle').style.display = "block";
  document.getElementById('ci-property-section').style.display = "block";
  document.getElementById('ci-property').classList.add('interaction-selected');
}

function onCharMOpsellhouse() {
  if (!document.getElementById('ci-property').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-p-sellhouse').classList.add('interaction-selected');
}

function onCharMOpsellcar() {
  if (!document.getElementById('ci-property').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-p-sellcar').classList.add('interaction-selected');
}

function onCharMOpsellbuis() {
  if (!document.getElementById('ci-property').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-p-sellbuis').classList.add('interaction-selected');
}

function onCharMOpsettle() {
  if (!document.getElementById('ci-property').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-p-settle').classList.add('interaction-selected');
}

function onCharMOmoney() {
  onCharMOnone();
  document.getElementById("char-extra-sections").style.zIndex = "4";
  document.getElementById('ci-money-circle').style.display = "block";
  document.getElementById('ci-money-section').style.display = "block";
  document.getElementById('ci-money').classList.add('interaction-selected');
}

function onCharMOm50() {
  if (!document.getElementById('ci-money').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-m-50').classList.add('interaction-selected');
}

function onCharMOm150() {
  if (!document.getElementById('ci-money').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-m-150').classList.add('interaction-selected');
}

function onCharMOm300() {
  if (!document.getElementById('ci-money').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-m-300').classList.add('interaction-selected');
}

function onCharMOm1000() {
  if (!document.getElementById('ci-money').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-m-1000').classList.add('interaction-selected');
}

function onCharMOheal() {
  onCharMOnone();
  document.getElementById('ci-heal-circle').style.display = "block";
  document.getElementById('ci-heal-section').style.display = "block";
  document.getElementById('ci-heal').classList.add('interaction-selected');
}

function onCharMOhpulse() {
  if (!document.getElementById('ci-heal').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-h-pulse').classList.add('interaction-selected');
}

function onCharMOhbandage() {
  if (!document.getElementById('ci-heal').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-h-bandage').classList.add('interaction-selected');
}

function onCharMOhcure() {
  if (!document.getElementById('ci-heal').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-h-cure').classList.add('interaction-selected');
}

function onCharMOcharjob() {
  onCharMOnone();
  document.getElementById('ci-charjob').classList.add('interaction-selected');
}

function onCharMOdocuments() {
  onCharMOnone();
  document.getElementById("char-extra-sections").style.zIndex = "4";
  document.getElementById('ci-documents-circle').style.display = "block";
  document.getElementById('ci-documents-section').style.display = "block";
  document.getElementById('ci-documents').classList.add('interaction-selected');
}

function onCharMOdvehdoc() {
  if (!document.getElementById('ci-documents').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-d-vehdoc').classList.add('interaction-selected');
}

function onCharMOdmedbook() {
  if (!document.getElementById('ci-documents').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-d-medbook').classList.add('interaction-selected');
}

function onCharMOdlicense() {
  if (!document.getElementById('ci-documents').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-d-license').classList.add('interaction-selected');
}

function onCharMOdpassport() {
  if (!document.getElementById('ci-documents').classList.contains('interaction-selected')) return;
  sectionCharDefault();
  document.getElementById('ci-d-passport').classList.add('interaction-selected');
}

function onCharMOnone() {
  sectionCharDefault();
  document.getElementById("char-extra-sections").style.zIndex = "1";

  arr = inter_main['char_main'];
  for (var index = 0; index < arr.length; index++)
    document.getElementById('ci-' + arr[index]).classList.remove('interaction-selected');

  document.getElementById('ci-interact-circle').style.display = "none";
  document.getElementById('ci-interact-section').style.display = "none";

  document.getElementById('ci-property-circle').style.display = "none";
  document.getElementById('ci-property-section').style.display = "none";

  document.getElementById('ci-money-circle').style.display = "none";
  document.getElementById('ci-money-section').style.display = "none";

  document.getElementById('ci-heal-circle').style.display = "none";
  document.getElementById('ci-heal-section').style.display = "none";

  document.getElementById('ci-documents-circle').style.display = "none";
  document.getElementById('ci-documents-section').style.display = "none";
}

function sectionCharDefault() {
  arr = inter_sections['char_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('ci-' + arr[index]).classList.remove('interaction-selected');

  arr = inter_extra_sections['char_sections'];
  for (var index = 0; index < arr.length; index++)
    if (arr[index] != 'none') document.getElementById('ci-' + arr[index]).classList.remove('interaction-selected');
}

function rectCharMO() {
  document.getElementById("char-interaction").style.zIndex = "2";
}

function circleCharMO() {
  document.getElementById("char-interaction").style.zIndex = "5";
}
var lastActive;
function sendCharAction(active) {
  lastActive = active;
  if (!chinteract_tmpl) return;
  if ((active == char_cur['i-carry'] || active == char_cur['i-coin'] || active == char_cur['i-handshake'] || active == char_cur['i-kiss']) && document.getElementById('ci-interact-circle').style.display == 'none') return;
  if ((active == char_cur['p-sellhouse'] || active == char_cur['p-sellcar'] || active == char_cur['p-sellbuis'] || active == char_cur['p-settle']) && document.getElementById('ci-property-circle').style.display == 'none') return;
  if ((active == char_cur['m-50'] || active == char_cur['m-150'] || active == char_cur['m-300'] || active == char_cur['m-1000']) && document.getElementById('ci-money-circle').style.display == 'none') return;
  if ((active == char_cur['h-pulse'] || active == char_cur['h-bandage'] || active == char_cur['h-cure']) && document.getElementById('ci-heal-circle').style.display == 'none') return;
  if ((active == char_cur['d-veh'] || active == char_cur['d-medbook'] || active == char_cur['d-license'] || active == char_cur['d-passport']) && document.getElementById('ci-documents-circle').style.display == 'none') return;
  mp.trigger('Interaction::PlayerMenuSelect', active);
}