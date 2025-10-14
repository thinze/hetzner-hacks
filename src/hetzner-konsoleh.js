// ==UserScript==
// @name         Hetzner konsoleH Hacks
// @namespace    http://tampermonkey.net/
// @version      2025-10-09
// @description  try to take over the world!
// @author       You
// @match        https://konsoleh.hetzner.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hetzner.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log('konsoleH hacks started ...');

    // ---  wait for tellnet-app-shell ---

    function waitForDomElement(selector, callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
                obs.disconnect(); // Beobachtung stoppen
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.querySelector('tellent-app-shell')) {
        console.log('<tellent-app-shell> existiert bereits');
        modifyShadowRoot('tellent-app-shell');
    } else {
        waitForDomElement('tellent-app-shell', function (el) {
            console.log('<tellent-app-shell> wurde nachträglich gefunden:');
            modifyShadowRoot('tellent-app-shell');
        });
    }

    // ---  helper ---

    function getCss() {
        var css = [];

        // cfg CSS
        const colors = {
            ci_red: '#d50c2d',
            ci_white: '#fff',
            color_success: '#37b730',
            color_failed: '#d50c2d',
            color_hover: '#e9e9e9'
        };
        // allgemein
        css.push("body { font-size: 14px; } ");
        // Texte
        css.push("#content h3 { font-size: 1rem; margin-top: 2rem; padding: 0 12px; font-weight: 600;} ");
        css.push("#content .row label { font-weight: 500; } ");
        // custom helper buttons
        css.push(".btn { border: 0; padding: 5px 10px; border-radius: 4px; } ");
        css.push(".btn:hover { cursor: pointer; } ");
        css.push("#btn-go2top { position: fixed; left: 10px; bottom: 50vh; font-size: 14px; background: lightgreen; padding: 5px; } ");
        // Sidebar
        css.push("#sidemenu h3.accordion-header button:hover { background: #color_hover# !important; }");
        css.push("#sidemenu h3.accordion-header .accordion-button:not(.collapsed) { background: #color_hover# !important; }");
        css.push("#sidemenu dl dd { margin: 0; }");
        css.push("#sidemenu dl dd + dt { margin-top: 1em; }");
        css.push("#sidemenu dl dd a { display: inline-block; width: 100%; padding: 2px; }");
        css.push("#sidemenu dl dd a:hover { background: #color_hover#; }");
        // Account Suchfeld
        css.push("#domainlistsearch { padding: 5px !important; } ");
        css.push("#domainlistsearch .col label, #domainlistsearch .col label { min-width: auto !important; } ");
        css.push("#domainlistsearch input[name=search_domainlist] { min-width: 200px; } ");
        css.push("#domainlistsearch .col.text-end button { font-size: 12px; } ");
        css.push("#domainlistsearch .col input, #domainlistsearch .col label, #domainlistsearch .col select { font-size: 14px; padding: 2px 6px; } ");
        css.push("#domainlistsearch .col #resetSearch { padding: 0; top: 2px; } ");
        // Account listing
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 { outline: 1px solid #ci_white#; margin: 1px 0; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button { background: #ci_red#; color: #ci_white#; padding: 0; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button .category-icon { align-self: baseline; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button i.bi { color: #ci_white#; font-size: 24px; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 + .accordion-collapse.show { padding: 8px 0 5px; } ");
        css.push("#product-list h2.accordion-header span.count .badge { background: #ci_white# !important; color: #000 !important; }  ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .row { margin: 0; padding: 2px 0 0; font-size: 14px; } ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .row:hover { background: #color_hover#; } ");
        css.push("#content form[name='domain_listing'] #product-list a.list-group-item div.row div.searchable h4.product-name { border-left: 2px solid #ci_white#; } ");
        css.push("#content form[name='domain_listing'] #product-list a.list-group-item div.row:hover div.searchable h4.product-name { border-color: #color_hover#; } ");
        css.push("#content form[name='domain_listing'] #product-list a#product-active.list-group-item div.row div.searchable h4.product-name { border-color: #ci_red#; } ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .bi.status { font-size: 10px; position: relative; top: -4px; left: 5px; } ");
        // copy2clipboard
        css.push("#content button.clickToCopy:not(.clickToCopyDefaultHidden) { display: inline-block !important; background: none !important; width: auto; width: auto; position: relative; } ");
        css.push("#content button.clickToCopy .bi:hover { color: #ci_red#; } ");
        css.push("#content button.clickToCopy .bi.bi-clipboard-check { color: #color_success#; } ");
        css.push("#content button#clickToCopy_ftppass.show { display: inline-block !important; background: none !important; width: auto; width: auto; position: relative; top: 6px; } ");
        // Content-Boxen
        css.push("#content div.contentpart { padding: 10px 15px; } ");
        css.push("#content div.contentpart .row {  } ");
        css.push("#content div.contentpart .row label { min-width: 17em; } ");
        css.push("#content div.contentpart p { margin: 0; } ");
        css.push("#content div.contentpart table { font-size: 14px !important; } ");
        css.push("#content div.contentpart table td { padding: 3px; } ");
        css.push("#content div.contentpart table tr:hover td:nth-child(2) { background-color: #color_hover#; } ");
        css.push("#content div.contentpart .nav-pills .nav-item .nav-link { padding: 2px 5px; margin-botto: 5px; font-size: 14px; } ");
        css.push("#content div.contentpart ul.nav-pills .nav-link:not(.active) { background-color: #ddd; } ");
        css.push("#content div.contentpart ul.nav-pills .nav-link:hover { background-color: #ci_red#; } ");
        css.push("#content div.contentpart .btn { padding: 2px 5px; font-size: 14px; display: inline-block; margin: 2px 5px; } ");
        // Log view
        css.push("textarea#log { font-family: 'Courier New', Courier, monospace; font-size: 12px !important; line-height: 1.2; } ");
        // Listings
        css.push(".jstree-default .jstree-anchor, .jstree-default .jstree-animated, .jstree-default .jstree-wholerow { transition: none !important; } ");
        css.push("#content #product-list-container .lead { font-size: 1em; } ");
        css.push("#content #product-list-container .accordion-button::after { position: relative; right: 5px; border-color: #fff; filter: invert(1); } ");
        // Forms
        css.push("#content div.contentpart .form-label-control { min-width: 14em; } ");
        css.push("#content div.contentpart .form-select { padding: 2px 5px; font-size: 14px; } ");
        

        css = css.join('');
        Object.entries(colors).forEach((color) => {
            css = css.replaceAll('#' + color[0] + '#', color[1]);
        });
        return css;
    }

    function insertCss(css_id) {
        var style = document.createElement('STYLE');
        if (css_id) {
            style.id = css_id;
        }
        var node = document.createTextNode(getCss());
        style.appendChild(node);
        document.querySelector('head').appendChild(style);
    }

    function insertShadowRootCss(elem) {
        var style = document.createElement('STYLE');
        var node = document.createTextNode(getCss());
        style.appendChild(node);
        elem.appendChild(style);
    }

    function updateCss(css, css_id) {
        var styles = document.querySelector('#' + css_id);
        if (styles) {
            styles.parentNode.removeChild(styles);
        }
        insertCss(css, css_id);
    }

    function insertButton2Top() {
        var btn = document.createElement('BUTTON');
        btn.id = 'btn-go2top';
        btn.classList.add('btn');
        btn.innerText = 'top';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            window.scrollToTop();
        });
    }

    function enableBtnCopy2Clipboard() {
        if (location.pathname.startsWith('/logindata.php')) {
            var eyes = document.querySelectorAll('a .bi.bi-eye');
            if (eyes.length) {
                eyes.forEach(eye => {
                    let a = eye.parentNode;
                    a.classList.add('icon-eye');
                    a.addEventListener('click', function () {
                        setTimeout(() => {
                            var btn = a.closest('.row').querySelector('button#clickToCopy_ftppass');
                            if (btn) {
                                btn.classList.add('show');
                            }
                        }, 100);
                    });
                });
            }

            var btns = document.querySelectorAll('button.clickToCopy, button.clickToCopy_ftppass');
            if (btns.length) {
                btns.forEach(btn => {
                    var icon = document.createElement('i');
                    icon.classList.add('bi', 'bi-clipboard');
                    btn.appendChild(icon);
                    btn.addEventListener('click', function () {
                        var field = btn.closest('.row').querySelector('label + div input');
                        if (field) {
                            var text = field.value;
                            navigator.clipboard.writeText(text).then(function () {
                                var icon = btn.querySelector('.bi');
                                icon.classList.remove('bi-clipboard');
                                icon.classList.add('bi-clipboard-check');
                                setTimeout(() => {
                                    icon.classList.add('bi-clipboard');
                                    icon.classList.remove('bi-clipboard-check');
                                    // btn.querySelector('.bi').classList.remove('bi-clipboard-check').add('bi-clipboard');
                                }, 2000);
                            });
                        }
                    });
                });
            }
        }
    }

    function modifyLogView() {
        // Log View
        const log = document.querySelector('textarea#log');
        if (log) {
            log.setAttribute('spellcheck', 'false');
        }
    }

    // ===================

    insertCss();
    // insertButton2Top();
    enableBtnCopy2Clipboard();
    modifyLogView();
})();
