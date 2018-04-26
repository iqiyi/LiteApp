console.log("page1 started");
count = 1;
halberd.util.set_interval(
    function(){
        count = count + 1
        var somePatch = "changeInnerHtml('" + "page 1 started patch:" + count +  "');";
        halberd.bridge.postPatch(somePatch)
    },1000);

var somePatch = "changeInnerHtml('" + "page 1 started patch:" + count +  "');";
halberd.bridge.postPatch(somePatch)