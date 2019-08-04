function removeFilter() {
  $('.projects-grid').isotope({ filter: '*' });
  $('.filter-active').removeClass('filter-active');
  $('.all-filter').addClass('filter-active');
}
function filterKotlin() {
  $('.projects-grid').isotope({ filter: '.kotlin' });
  $('.filter-active').removeClass('filter-active');
  $('.kotlin-filter').addClass('filter-active');
}
function filterAndroid() {
  $('.projects-grid').isotope({ filter: '.android' });
  $('.filter-active').removeClass('filter-active');
  $('.android-filter').addClass('filter-active');
}
function filterLibrary() {
  $('.projects-grid').isotope({ filter: '.library' });
  $('.filter-active').removeClass('filter-active');
  $('.library-filter').addClass('filter-active');
}
function filterJava() {
  $('.projects-grid').isotope({ filter: '.java' });
  $('.filter-active').removeClass('filter-active');
  $('.java-filter').addClass('filter-active');
}
function filterArduino() {
  $('.projects-grid').isotope({ filter: '.arduino' });
  $('.filter-active').removeClass('filter-active');
  $('.arduino-filter').addClass('filter-active');
}
function filterUnity() {
  $('.projects-grid').isotope({ filter: '.unity' });
  $('.filter-active').removeClass('filter-active');
  $('.unity-filter').addClass('filter-active');
}
function filterSecurity() {
  $('.projects-grid').isotope({ filter: '.security' });
  $('.filter-active').removeClass('filter-active');
  $('.security-filter').addClass('filter-active');
}
function filterCpp() {
  $('.projects-grid').isotope({ filter: '.cpp' });
  $('.filter-active').removeClass('filter-active');
  $('.cpp-filter').addClass('filter-active');
}

$(window).on("load", function () {
  $('.projects-grid').isotope({
    // options
    itemSelector: '.project-grid-item',
    layoutMode: 'fitRows'
  });
  removeFilter();
});
