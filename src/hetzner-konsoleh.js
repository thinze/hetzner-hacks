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
        css.push('.btn { border: 0; padding: 5px 10px; border-radius: 4px; } ');
        css.push('.btn:hover { cursor: pointer; }');
        css.push('#btn-go2top { position: fixed; left: 350px; bottom: 50vh; font-size: 16px; background: lightgreen; padding: 10px; }');

        css = css.join('');
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