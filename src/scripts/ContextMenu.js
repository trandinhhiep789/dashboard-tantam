

function ContextMenu(opts)
{
    
    var container = null;

    this.setLatLng = function (latlng)
    {
        this.latlng = latlng;
        return this;
    };

    this.setLatLng = function (latlng)
    {
        this.latlng = latlng;
        return this;
    };

    this.setContent = function (content)
    {
        container = content;
        return this;
    };

    this.close = function ()
    {
        vbd.DomUtil.remove(container);
    };

    this.openOn = function (map)
    {
        if (!map || !(map instanceof vbd.Map)) {
            console.log('obj is null or not vbd.Map');
            return;
        }

        
        var pt = map.latlngToContainerPoint(this.latlng);
        

        var pEl = map.getContainer();
        vbd.DomUtil.add(container, pEl);

        var clientWidth = container.clientWidth;
        var clientHeight = container.clientHeight;

        if ((pt.x + clientWidth) > pEl.clientWidth) {
            pt.x -= clientWidth;
        }

        if ((pt.y + clientHeight) > pEl.clientHeight) {
            pt.y -= clientHeight;
        }
        vbd.DomUtil.setPosition(container, pt);
    };
    
}