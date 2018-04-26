console.log("page video started");
var somePatch = "changeInnerHtml('" +
 '<p> here should be some video:</p>' + "<div style=\"height:250px; width:300px; background-color:#CECECE; margin:10\" id=\"video_box\">video box</div>" +
 "');";
var somePatch = somePatch + "createNativeBoxByID(\"video_box\",\"VideoBox\",{src:\"http://techslides.com/demos/sample-videos/small.webm\"});"
halberd.bridge.postPatch(somePatch)