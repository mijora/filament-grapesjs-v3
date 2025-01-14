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
                        // Configure other asset manager settings
                        assets: [], // Initial assets, leave empty for dynamic fetching
                        autoAdd: false, // Prevent auto-adding of uploaded assets
                        // Enable the prefetch on open
                        onOpen: async () => {
                            const response = await fetch(uploadUrl); // Your API endpoint
                            const assets = await response.json(); // Fetch assets as an array
                            editor.AssetManager.add(assets.data); // Add assets dynamically
                        },
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