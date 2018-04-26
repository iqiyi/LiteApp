console.log("page2 started");
var somePatch = "pageString='page3';";
var somePatch = somePatch +"clickString='hal_bridge.goPage(\"' + pageString + '\")';";
var somePatch = somePatch + "changeInnerHtml('" +
 '<p>click button open page 3 :</p>' + "<button onclick=\"bridge.executeJS(clickString);\">click jump to page 3</button>" + 
 "');";
halberd.bridge.postPatch(somePatch)