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

(function() {
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
        waitForDomElement('tellent-app-shell', function(el) {
            console.log('<tellent-app-shell> wurde nachträglich gefunden:');
            modifyShadowRoot('tellent-app-shell');
        });
    }

    // ---  helper ---

    function getCss() {
        var css = [];

        // cfg CSS
        const hetzner_red = '#d50c2d';
        // Texte
        css.push("#content h3 { font-size: 1rem; margin-top: 2rem; padding: 0 12px; font-weight: 600;} ");
        css.push("#content .row label { font-weight: 500; margin-right: 2em; } ");
        // custom helper buttons
        css.push(".btn { border: 0; padding: 5px 10px; border-radius: 4px; } ");
        css.push(".btn:hover { cursor: pointer; } ");
        css.push("#btn-go2top { position: fixed; left: 10px; bottom: 50vh; font-size: 14px; background: lightgreen; padding: 5px; } ");
        // Account Suchfeld
        css.push("#domainlistsearch { padding: 5px !important; } ");
        css.push("#domainlistsearch .col.text-end button { font-size: 12px; } ");
        css.push("#domainlistsearch .col input, #domainlistsearch .col label, #domainlistsearch .col select { font-size: 14px; padding: 2px 6px; } ");
        css.push("#domainlistsearch .col #resetSearch { padding: 0; top: 2px; } ");
        // Account listing
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 { outline: 1px solid #fff; margin: 1px 0; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button { background: #hetzner_red#; color: #fff; padding: 0; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button .category-icon { align-self: baseline; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 .accordion-button i.bi { color: #fff; font-size: 24px; } ");
        css.push("#content form[name='domain_listing'] #product-list > .accordion-item h2 + .accordion-collapse.show { padding: 8px 0 5px; } ");
        css.push("#product-list h2.accordion-header span.count .badge { background: #fff !important; color: #000 !important; }  ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .row { margin: 0; padding: 2px 0 0; font-size: 14px; } ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .row:hover { background: #eee; } ");
        css.push("#content form[name='domain_listing'] #product-list a.list-group-item div.row div.searchable h4.product-name { border-left: 2px solid #fff; } ");
        css.push("#content form[name='domain_listing'] #product-list a.list-group-item div.row:hover div.searchable h4.product-name { border-color: #eee; } ");
        css.push("#content form[name='domain_listing'] #product-list a#product-active.list-group-item div.row div.searchable h4.product-name { border-color: #hetzner_red#; } ");
        css.push("#content form[name='domain_listing'] #product-list .list-group a .bi.status { font-size: 10px; position: relative; top: -4px; left: 5px; } ");
        // 

        css = css.join('').replaceAll('#hetzner_red#', hetzner_red);
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
        btn.addEventListener('click', function() {
            window.scrollToTop();
        });
    }

    // ===================

    insertCss();
    insertButton2Top();

})();