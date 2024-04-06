! function() {
    "use strict";

    let aceEditor;

    let Config = {
        theme: 'chrome',
        fontSize: 14, // in px
        wrap: true,
        icon: undefined, // auto set during config
        iconName: 'sourcecode',
        autocomplete: false,
        language: 'html',
        renderer: null,
        parser: null,
        shortcut: true,
        aceCss: null,
        fontFamily: null
    }

    // Get Configurations

    const setConfig = (editor) => {
        // ace theme
        const theme = editor.getParam('supercode_theme');
        if (theme && typeof theme === "string") {
            Config.theme = theme;
        }

        // font size
        const customFontSize = editor.getParam('supercode_font_size');
        if(typeof customFontSize === "number" && customFontSize > 0) {
            Config.fontSize = parseInt(customFontSize);
        }

        // wrap mode
        const wrap = editor.getParam('supercode_wrap');
        if(typeof wrap === "boolean") {
            Config.wrap = wrap;
        }

        // autocomplete mode
        const autocomplete = editor.getParam('supercode_autocomplete');
        if(typeof autocomplete === "boolean") {
            Config.autocomplete = autocomplete;
        }

        // plugin icon name
        const iconName = editor.getParam('supercode_icon');
        if (iconName && typeof iconName === "string") {
            Config.iconName = iconName;
        }

        Config.icon = editor.ui.registry.getAll().icons[Config.iconName];

        if(!Config.icon){
            throw new Error("Supercode Icon name is invalid");
        }

        // set parser (function that converts HTML back to target language)
        const parser = editor.getParam('supercode_parser');
        if(typeof parser === "function") {
            Config.parser = parser;
        }

        // set renderer (function that renders source language to HTML)
        const renderer = editor.getParam('supercode_renderer');
        if(typeof renderer === "function") {
            Config.renderer = renderer;
        }

        // ace language
        const lang = editor.getParam('supercode_lang');
        if (lang && typeof lang === "string") {
            Config.language = lang;
        }

        // keyboard shortcut
        const shortcut = editor.getParam('supercode_shortcut');
        if(typeof shortcut === "boolean") {
            Config.shortcut = shortcut;
        }

        // ace css mode (Can be used to inject CSS and fonts)
        const css = editor.getParam('supercode_css');
        if(typeof css === "string") {
            Config.aceCss = css;
        }

        // ace font family
        const fontFamily = editor.getParam('supercode_font_family');
        if (fontFamily && typeof fontFamily === "string") {
            Config.fontFamily = fontFamily;
        }
    }

    const initDependencies = () => {
        const scripts = [
                        'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6/ace.js', 
                        'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.15.1/beautify-html.min.js'
                        ]

        if(Config.autocomplete){
            scripts.push('https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.6/ext-language_tools.min.js');
        }

        scripts.forEach((scriptUrl) => {
            let element = document.createElement('script');
            element.src = scriptUrl;
            element.type = "text/javascript";
            document.body.appendChild(element);
        })
    }

 
    const buildAceEditor = (view) => {
        // Attach Ace Editor to shadow dom to prevent tinymce css affecting it
        view.attachShadow({mode: 'open'})
        
        if(Config.aceCss){
            const sheet = new CSSStyleSheet()
            sheet.replaceSync(Config.aceCss);
            view.shadowRoot.adoptedStyleSheets.push(sheet);
        }

        view.shadowRoot.innerHTML = `
        <div class="supercode-editor" style="width: 100%; height: 100%; position: absolute; left:0; top:0"></div>`;
        const editorElement = view.shadowRoot.querySelector('.supercode-editor');

        editorElement.style.width = '100%';
        editorElement.style.height = '100%';
        aceEditor = ace.edit(editorElement);
        // https://github.com/josdejong/jsoneditor/issues/742#issuecomment-698449020
        aceEditor.renderer.attachToShadowRoot();

        const options = {};

        if(Config.autocomplete){
            options.enableLiveAutocompletion = true;
        }

        if(Config.fontFamily){
            options.fontFamily = Config.fontFamily;
        }

        aceEditor.setOptions(options);
        aceEditor.setTheme(`ace/theme/${Config.theme}`);
        aceEditor.setFontSize(Config.fontSize);
        aceEditor.setShowPrintMargin(false);
    }

    const setHeader = (view, originalHeader, onSave) => {
        // add a copy of original header to give original header look
        const newHeader = originalHeader.cloneNode(true);
        newHeader.style.position = 'relative';
        const menubar = newHeader.querySelector('.tox-menubar');
        if(menubar){
            menubar.innerHTML = `
                <b style='font-size: 14px; font-weight: bold; padding: 9px;'>Source Code Editor</b>
            `
        }

        // hide all the buttons except supercode button, attach event listener
        let isOverflow = true;
        newHeader.querySelectorAll('.tox-tbtn, .tox-split-button').forEach((btn) => {
            if(btn.getAttribute('data-mce-name') != 'supercode'){
                // remove overflow button to make space for code button
                if(btn.getAttribute('data-mce-name') === 'overflow-button'){
                    btn.style.display = 'none';
                    btn.removeAttribute('data-mce-name')
                    return;
            }
                btn.classList.remove('tox-tbtn--enabled');
                btn.classList.add('tox-tbtn--disabled');
                btn.removeAttribute('data-mce-name');
            }
            else{
                isOverflow = false;
                btn.setAttribute('data-mce-name', 'supercode-toggle')
                btn.classList.add('tox-tbtn--enabled');
                btn.onclick = onSave;
            }
        });

        // in case of overflow, button is inside a floating toolbar
        if(isOverflow){
            const div = document.createElement('div')
            div.classList = 'tox-toolbar__group';
            div.style.position = 'absolute';
            div.style.right = 0;
            div.style.height = '100%';
            const button = document.createElement('button');
            button.classList = 'tox-tbtn tox-tbtn--enabled';
            button.innerHTML = `<span class="tox-icon tox-tbtn__icon-wrap">${Config.icon}</span>`;
            button.onclick = onSave;
            div.append(button);
            newHeader.append(div);
        }

        view.append(newHeader);
    }

    const setMainView = (view, width) => {
        // configure body of view to look similar to tinymce body, adds ace editor

        view.style.width = width+'px';
        view.style.height = '100%';
        view.style.position = 'relative';
        
        buildAceEditor(view);
    }

    const isPluginSupported = (editor) => {
        if(editor.getParam('inline') === true){
            return false;
        }

        return true;
    }

    // on plugin load
    const mainPlugin = function(editor) {
        if(!isPluginSupported(editor)){
            console.error("Supercode Plugin is not supported in inline mode");
            return false;
        }

        let editorWidth = 0, originalHeader, isScreenSizeChanged = true, session;

        setConfig(editor);
        initDependencies();
        
        const onSaveHandler = () => {
            editor.focus();
            editor.undoManager.transact(function() {
            let value = aceEditor.getValue();
            if(Config.renderer){
                value = Config.renderer(value);
            }
            editor.setContent(value);
            });
            editor.selection.setCursorLocation();
            editor.nodeChanged();
            editor.execCommand('ToggleView', false, 'supercode');
        }

        const onKeyDownHandler = (e) => {
            if((e.key === ' ' && e.ctrlKey) || e.key === 'Escape'){
                onSaveHandler();
            }
        };

        const getSourceCode = (value) => {
            if(Config.parser){
                return Config.parser(value);
            }
            return html_beautify(value);
        }

        const CodeView = {
              onShow: (api) => {
                const codeView = api.getContainer();
                codeView.style.padding = 0;
                codeView.style.display = 'flex';
                codeView.style.flexDirection = 'column';

                if(isScreenSizeChanged || codeView.childElementCount === 0){
                    codeView.innerHTML = `<div class="supercode-header"></div><div class="supercode-body no-tox-style" id="no-tox-style"></div>`
                
                    // Ctrl + Space Toggle Shortcut, Escape to Exit Source Code Mode
                    if(Config.shortcut){
                        codeView.addEventListener('keydown', onKeyDownHandler)
                    }
                    // configure header
                    setHeader(codeView.querySelector('.supercode-header'), originalHeader, onSaveHandler);
                    // configure main code view to look same
                    setMainView(codeView.querySelector('.supercode-body '), editorWidth);
                }

                let content = getSourceCode(editor.getContent());
                if(!session){
                    session = ace.createEditSession(content, `ace/mode/${Config.language}`);
                    session.setUseWrapMode(Config.wrap);
                    aceEditor.setSession(session);
                }
                session.setValue(content);
                aceEditor.gotoLine(Infinity);
                aceEditor.focus();
              },
              onHide: () => {
                if(Config.shortcut){
                    removeEventListener('keydown', onKeyDownHandler)
                }
              }
        };

        const startPlugin = function() {
            const container = editor.getContainer();
            isScreenSizeChanged = editorWidth != container.clientWidth;
            editorWidth = container.clientWidth;
            if(isScreenSizeChanged || !originalHeader){
                originalHeader = container.querySelector('.tox-editor-header');
            }
            editor.execCommand('ToggleView', false, 'supercode');
        }

        editor.ui.registry.addView('supercode', CodeView);

        editor.ui.registry.addButton('supercode', {
            icon: Config.iconName,
            tooltip: 'Source Code Editor (Ctrl + space)',
            onAction: startPlugin
        });

        // Ctrl + Space Toggle Shortcut
        if(Config.shortcut){
            editor.shortcuts.add('ctrl+32', 'Toggles Source Code Editing Mode', startPlugin);
        }

        return {
            getMetadata: function () {
                return {
                    name: "Source Code Editor",
                    url: ""
                };
            }
        }
    };

    // On Script Load, the plugin will be loaded
    tinymce.PluginManager.add('supercode', mainPlugin);
}();
