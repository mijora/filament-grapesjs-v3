document.addEventListener("alpine:init",()=>{Alpine.data("grapesjs",({state:o,statePath:h,readOnly:g,tools:r,minHeight:c,container:n,uploadUrl:t})=>({instance:null,state:o,tools:r,init(){let d={},a=(this.state??"").split("<---!!! STYLE !!!--->");this.instance=grapesjs.init({height:c+"px",container:n||".filament-grapesjs .grapesjs-wrapper",showOffsets:!0,fromElement:!1,noticeOnUnload:!1,storageManager:!1,components:a[0],style:a[1],script:a[2],assetManager:{upload:t,uploadName:"files",assets:[],autoAdd:!1},plugins:["grapesjs-tailwind","grapesjs-preset-webpage","gjs-blocks-basic","grapesjs-plugin-forms","grapesjs-navbar","grapesjs-custom-code"]});let l=this.instance.AssetManager;this.instance.on("asset:remove",e=>{fetch(t,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({src:e.getSrc()})}).then(s=>{if(!s.ok)throw new Error("Failed to delete the asset on the server");console.log(`Asset deleted successfully: ${assetSrc}`)}).catch(s=>{console.error("Error deleting asset:",s)})}),this.instance.on("run:open-assets",function(){fetch(t).then(e=>e.json()).then(e=>{l.add(e.data)}).catch(e=>console.error("Error fetching assets:",e))}),this.instance.on("update",e=>{var s=this.instance.getHtml({cleanId:!0}),i=s.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);i?s=i[1]:s=this.instance.getHtml(),this.state=s+"<---!!! STYLE !!!--->"+this.instance.getCss()+"<---!!! STYLE !!!--->"+this.instance.getJs()})}}))});
