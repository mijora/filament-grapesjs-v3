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
                    },
                    plugins: [
                        "grapesjs-tailwind",
                        "grapesjs-preset-webpage",
                        "gjs-blocks-basic",
                        "grapesjs-plugin-forms",
                        //"grapesjs-lory-slider",
                        "grapesjs-navbar",
                        "grapesjs-custom-code",
                        //"grapesjs-code-editor",
                        //"grapesjs-component-code-editor",
                        "grapesjs-parser-postcss",
                    ],
                });

                const editor = this.instance
                const statePath = this.state
                window.addEventListener("reload-grapejs", function () {
                    console.log(statePath);
                    console.log(editor);
                });
                
                const panelManager = this.instance.Panels;
                /*
                const newButton = panelManager.addButton('views',{
                    id: 'edit-code',
                    className: 'fa fa-code',
                    command: 'open-code',
                    attributes: { title: 'Open code'},
                    active: false,
                });
                */
                const am = this.instance.AssetManager;
                this.instance.on('asset:remove', (asset) => {
                    fetch(uploadUrl, {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ src: asset.getSrc() }),
                      })
                    .then((response) => {
                        if (!response.ok) {
                        throw new Error('Failed to delete the asset on the server');
                        }
                        console.log(`Asset deleted successfully: ${assetSrc}`);
                    })
                    .catch((error) => {
                        console.error('Error deleting asset:', error);
                    })
                });
                this.instance.on("run:open-assets", function () {
                    fetch(uploadUrl)
                    .then((response) => response.json())
                    .then((assets) => {
                        am.add(assets.data); // Dynamically add assets
                    })
                    .catch((error) => console.error('Error fetching assets:', error));
                });
                this.instance.on('update', e => {
                    console.log('update');
                    var content = this.instance.getHtml({
                        cleanId: true
                    });
                    var extract = content.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    if(extract)
                        content = extract[1];
                    else
                        content = this.instance.getHtml();
                    
                    this.state = content + '<---!!! STYLE !!!--->' + this.instance.getCss() + '<---!!! STYLE !!!--->' + this.instance.getJs();
                });
            }
        })
    )
})