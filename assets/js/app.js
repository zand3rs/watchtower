// Main App
// ----------------------------------------------------------------------------
$(function() {

  // Dashboard
  // ---------------------------------------------------------------------------
  if ($("#dashboard-graph").length && dashboardGraphData) {
    // Polar Area graph for log types
    var ctx = $("#dashboard-graph")[0].getContext("2d");
    var dashboardChart = new Chart(ctx).PolarArea(dashboardGraphData);
  }

});