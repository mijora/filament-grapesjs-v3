document.addEventListener('alpine:init', () => {
    Alpine.data(
        "grapesjs",
        ({ state, statePath, readOnly, tools, minHeight, container, uploadUrl }) => ({
            instance: null,
            state: state,
            tools: tools,
            init() {
                let enabledTools = {};
                const htmlData = (this.state ?? '').split('<---!!! STYLE !!!--->');
                this.instance =  grapesjs.init({
                    height: minHeight + 'px',
                    container: container ? container : ".filament-grapesjs .grapesjs-wrapper",
                    showOffsets: true,
                    fromElement: false,
                    noticeOnUnload: false,
                    storageManager: false,
                    components: htmlData[0],
                    style: htmlData[1],
                    script: htmlData[2],
                    assetManager: {
                        upload: uploadUrl,
                        uploadName: 'files',
                    },
                    plugins: [
                        "grapesjs-tailwind",
                        "grapesjs-preset-webpage",
                        "gjs-blocks-basic",
                        "grapesjs-plugin-forms",
                        //"grapesjs-lory-slider",
                        "grapesjs-navbar",
                        "grapesjs-custom-code",
                    ],
                });
                this.instance.on('update', e => {
                    var content = this.instance.getHtml({
                        cleanId: true
                    });
                    var extract = content.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    if(extract)
                        content = extract[1];
                    else
                        content = this.instance.getHtml();
                    
                    this.state = content + '<---!!! STYLE !!!--->' + this.instance.getCss() + '<---!!! STYLE !!!--->' + this.instance.getJs();
                })
            }
        })
    )
})