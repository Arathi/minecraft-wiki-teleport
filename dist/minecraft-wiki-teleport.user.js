// ==UserScript==
// @name         Minecraft Wiki Teleport
// @namespace    com.undsf.tmus.mcwikitp
// @version      1.0.0
// @author       monkey
// @description  废弃Fandom上的Minecraft Wiki，从我做起！
// @icon         https://zh.minecraft.wiki/favicon.ico
// @match        https://minecraft.fandom.com/zh/wiki/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.29/dist/vue.global.prod.js
// @grant        unsafeWindow
// ==/UserScript==

(function (vue) {
  'use strict';

  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const _hoisted_1$1 = { class: "wds-dropdown" };
  const _hoisted_2$1 = { class: "wds-tabs__tab-label wds-dropdown__toggle first-level-item" };
  const _hoisted_3$1 = { href: "#" };
  const _hoisted_4 = /* @__PURE__ */ vue.createElementVNode("svg", { class: "wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" }, [
    /* @__PURE__ */ vue.createElementVNode("use", { "xlink:href": "#wds-icons-dropdown-tiny" })
  ], -1);
  const _hoisted_5 = { class: "wds-is-not-scrollable wds-dropdown__content" };
  const _hoisted_6 = { class: "wds-list wds-is-linked" };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "dropdown",
    props: {
      title: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("li", _hoisted_1$1, [
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createElementVNode("a", _hoisted_3$1, vue.toDisplayString(_ctx.title), 1),
            _hoisted_4
          ]),
          vue.createElementVNode("div", _hoisted_5, [
            vue.createElementVNode("ul", _hoisted_6, [
              vue.renderSlot(_ctx.$slots, "default")
            ])
          ])
        ]);
      };
    }
  });
  const _hoisted_1 = ["href"];
  const _hoisted_2 = ["href"];
  const _hoisted_3 = ["href"];
  const ORIGIN_PREFIX = "/zh/wiki/";
  const TARGET_PREFIX = "https://zh.minecraft.wiki";
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const page = vue.ref();
      const target = vue.computed(() => {
        let path = "";
        if (page.value !== void 0) {
          path = `/w/${page.value}`;
        }
        return `${TARGET_PREFIX}${path}`;
      });
      function parsePage() {
        const url = new URL(_unsafeWindow.location.href);
        const path = url.pathname;
        console.info(`当前路径：`, path);
        page.value = path.substring(ORIGIN_PREFIX.length);
        console.info(`当前页面：`, page.value);
      }
      vue.onMounted(() => {
        console.info("App已挂载");
        parsePage();
        _unsafeWindow.onkeydown = (event) => {
          console.info("按下按键：", event);
          if (event.key === "n") {
            location.href = target.value;
          }
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: ".page-side-tools" }, [
            vue.createElementVNode("a", {
              class: "page-side-tool",
              href: target.value,
              "aria-label": "前往新Wiki",
              "data-wds-tooltip": "前往新Wiki",
              "data-wds-tooltip-position": "right"
            }, " 新 ", 8, _hoisted_1)
          ])),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "header.fandom-community-header > nav.fandom-community-header__local-navigation > ul.wds-tabs" }, [
            vue.createVNode(_sfc_main$1, { title: "新Wiki" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("li", null, [
                  vue.createElementVNode("a", { href: TARGET_PREFIX }, "首页")
                ]),
                vue.createElementVNode("li", null, [
                  vue.createElementVNode("a", { href: target.value }, "当前页面", 8, _hoisted_2)
                ])
              ]),
              _: 1
            })
          ])),
          (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "div.fandom-sticky-header > nav.fandom-community-header__local-navigation > ul.wds-tabs" }, [
            vue.createVNode(_sfc_main$1, { title: "新Wiki" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("li", null, [
                  vue.createElementVNode("a", { href: TARGET_PREFIX }, "首页")
                ]),
                vue.createElementVNode("li", null, [
                  vue.createElementVNode("a", { href: target.value }, "当前页面", 8, _hoisted_3)
                ])
              ]),
              _: 1
            })
          ]))
        ], 64);
      };
    }
  });
  const root = document.createElement("div");
  root.id = "mcwikitp";
  document.body.append(root);
  const app = vue.createApp(_sfc_main);
  app.mount(root);

})(Vue);