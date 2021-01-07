(function() {
    "use strict";

    function hideTooltip(evt) {
        tooltip.setAttributeNS(null, 'visibility', 'hidden');
    }

    function showTooltip(evt) {
        var el = evt.target;
        if (el.id && el.className.baseVal && el.className.baseVal.split(' ').indexOf('area') >= 0) {
            if (container.getAttribute('data-cabin-id') !== el.id) {
                renderTooltip(el);
            }
            var svgBound = svg.getBoundingClientRect();
            var tooltipBound = container.getBoundingClientRect();
            wrapper.setAttributeNS(null, 'height', tooltipBound.height + 5);

            var CTM = svg.getScreenCTM();
            var x = (evt.clientX - CTM.e) / CTM.a;
            var y = (evt.clientY - CTM.f + 30) / CTM.d;

            if (y + tooltipBound.height  > svgBound.height) {
                y = (evt.clientY - CTM.f - tooltipBound.height - 10) / CTM.d;
            }
            if (x + tooltipBound.width > svgBound.width) {
                x = (evt.clientX - CTM.e - tooltipBound.width + 10) / CTM.a;
            }
            tooltip.setAttributeNS(null, 'transform', 'translate(' + x + ' ' + y + ')');
            tooltip.setAttributeNS(null, 'visibility', 'visible');
        }
    }

    function renderTooltip(el) {
        var title = el.getAttribute('data-title') ? '<div class="cb-title">' + el.getAttribute('data-title') + "</div>" : '';
        var catDesc = el.getAttribute('data-desc-id') ? svg.getElementById(el.getAttribute('data-desc-id')) : null;
        catDesc = (catDesc && catDesc.innerHTML) ? '<div class="ct-desc">' + catDesc.innerHTML + '</div>' : '';
        var cabDesc = el.getAttribute('data-desc') ? '<div class="cb-desc">' + el.getAttribute('data-desc') + '</div>' : '';
        var note = el.getAttribute('data-note') ? '<div class="cb-note">' + el.getAttribute('data-note') + '</div>' : '';
        var status = '';
        if (el.getAttribute('data-status-text')) {
            status = '<div class="cb-status">' + el.getAttribute('data-status-text') + '.</div>';
        } else if (el.getAttribute('data-status-id')) {
            status = svg.getElementById(el.getAttribute('data-status-id'));
            status = (status && status.innerHTML) ? '<div class="cb-status">' + status.innerHTML + '.</div>' : '';
        }
        container.innerHTML = title + catDesc + cabDesc + note + status;
        container.setAttribute('data-cabin-id', el.id);
    }

    var svg = document.getElementById('svg-dp');
    var dp = svg.getElementById('deckplan');
    var tooltip = svg.getElementById('area-tooltip');
    var wrapper = tooltip.querySelector('foreignObject');
    var container = wrapper.querySelector('div');
    dp.addEventListener('mousemove', showTooltip);
    dp.addEventListener('mouseout', hideTooltip);
}());