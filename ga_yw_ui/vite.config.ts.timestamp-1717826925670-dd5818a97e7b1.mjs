// vite.config.ts
import { loadEnv, defineConfig } from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import vue from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/unocss.ts
import UnoCss from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unocss/dist/vite.mjs";
var unocss_default = () => {
  return UnoCss({
    hmrTopLevelAwait: false
    // unocss默认是true，低版本浏览器是不支持的，启动后会报错
  });
};

// vite/plugins/auto-import.ts
import AutoImport from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "E:\\new_zzkj\\zz-oa\\ry-vue-plus5.2\\plus-ui-ts\\vite\\plugins";
var auto_import_default = (path3) => {
  return AutoImport({
    // 自动导入 Vue 相关函数
    imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
    eslintrc: {
      enabled: false,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true
    },
    resolvers: [
      // 自动导入 Element Plus 相关函数ElMessage, ElMessageBox... (带样式)
      ElementPlusResolver(),
      IconsResolver({
        prefix: "Icon"
      })
    ],
    vueTemplate: true,
    // 是否在 vue 模板中自动导入
    dts: path3.resolve(path3.resolve(__vite_injected_original_dirname, "../../src"), "types", "auto-imports.d.ts")
  });
};

// vite/plugins/components.ts
import Components from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver as ElementPlusResolver2 } from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver2 from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname2 = "E:\\new_zzkj\\zz-oa\\ry-vue-plus5.2\\plus-ui-ts\\vite\\plugins";
var components_default = (path3) => {
  return Components({
    resolvers: [
      // 自动导入 Element Plus 组件
      ElementPlusResolver2(),
      // 自动注册图标组件
      IconsResolver2({
        enabledCollections: ["ep"]
      })
    ],
    dts: path3.resolve(path3.resolve(__vite_injected_original_dirname2, "../../src"), "types", "components.d.ts")
  });
};

// vite/plugins/icons.ts
import Icons from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-icons/dist/vite.js";
var icons_default = () => {
  return Icons({
    // 自动安装图标库
    autoInstall: true
  });
};

// vite/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname3 = "E:\\new_zzkj\\zz-oa\\ry-vue-plus5.2\\plus-ui-ts\\vite\\plugins";
var svg_icon_default = (path3, isBuild) => {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path3.resolve(path3.resolve(__vite_injected_original_dirname3, "../../src"), "assets/icons/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
};

// vite/plugins/compression.ts
import compression from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/vite-plugin-compression/dist/index.mjs";
var compression_default = (env) => {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
};

// vite/plugins/setup-extend.ts
import setupExtend from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var setup_extend_default = () => {
  return setupExtend({});
};

// vite/plugins/i18n.ts
import VueI18nPlugin from "file:///E:/new_zzkj/zz-oa/ry-vue-plus5.2/plus-ui-ts/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname4 = "E:\\new_zzkj\\zz-oa\\ry-vue-plus5.2\\plus-ui-ts\\vite\\plugins";
var i18n_default = (path3) => {
  return VueI18nPlugin({
    include: [path3.resolve(__vite_injected_original_dirname4, "../../src/lang/**.json")]
  });
};

// vite/plugins/index.ts
import path from "path";
var plugins_default = (viteEnv, isBuild = false) => {
  const vitePlugins = [];
  vitePlugins.push(vue());
  vitePlugins.push(unocss_default());
  vitePlugins.push(auto_import_default(path));
  vitePlugins.push(components_default(path));
  vitePlugins.push(compression_default(viteEnv));
  vitePlugins.push(icons_default());
  vitePlugins.push(svg_icon_default(path, isBuild));
  vitePlugins.push(setup_extend_default());
  vitePlugins.push(i18n_default(path));
  return vitePlugins;
};

// vite.config.ts
import path2 from "path";
var __vite_injected_original_dirname5 = "E:\\new_zzkj\\zz-oa\\ry-vue-plus5.2\\plus-ui-ts";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        "~": path2.resolve(__vite_injected_original_dirname5, "./"),
        "@": path2.resolve(__vite_injected_original_dirname5, "./src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    plugins: plugins_default(env, command === "build"),
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true,
          rewrite: (path3) => path3.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        },
        ["/profile"]: {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    // 预编译
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "@vueuse/core",
        "path-to-regexp",
        "echarts",
        "vue-i18n",
        "@vueup/vue-quill",
        "bpmn-js/lib/Viewer",
        "bpmn-js/lib/Modeler.js",
        "bpmn-js-properties-panel",
        "min-dash",
        "diagram-js/lib/navigation/movecanvas",
        "diagram-js/lib/navigation/zoomscroll",
        "bpmn-js/lib/features/palette/PaletteProvider",
        "bpmn-js/lib/features/context-pad/ContextPadProvider",
        "diagram-js/lib/draw/BaseRenderer",
        "tiny-svg",
        "image-conversion",
        "element-plus/es/components/text/style/css",
        "element-plus/es/components/collapse-item/style/css",
        "element-plus/es/components/collapse/style/css",
        "element-plus/es/components/space/style/css",
        "element-plus/es/components/container/style/css",
        "element-plus/es/components/aside/style/css",
        "element-plus/es/components/main/style/css",
        "element-plus/es/components/header/style/css",
        "element-plus/es/components/button-group/style/css",
        "element-plus/es/components/radio-button/style/css",
        "element-plus/es/components/checkbox-group/style/css",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "element-plus/es/components/checkbox/style/css",
        "element-plus/es/components/date-picker/style/css",
        "element-plus/es/components/transfer/style/css",
        "element-plus/es/components/tabs/style/css",
        "element-plus/es/components/image/style/css",
        "element-plus/es/components/tab-pane/style/css"
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy91bm9jc3MudHMiLCAidml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzIiwgInZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzIiwgInZpdGUvcGx1Z2lucy9pY29ucy50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiLCAidml0ZS9wbHVnaW5zL2kxOG4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9uZXdfenprai96ei1vYS9yeS12dWUtcGx1czUuMi9wbHVzLXVpLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZywgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuaW1wb3J0IGNyZWF0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnO1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xuICByZXR1cm4ge1xuICAgIC8vIFx1OTBFOFx1N0Y3Mlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTQ4Q1x1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUwQlx1NzY4NFVSTFx1MzAwMlxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3ZpdGUgXHU0RjFBXHU1MDQ3XHU4QkJFXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU2NjJGXHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU4REVGXHU1Rjg0XHU0RTBBXG4gICAgLy8gXHU0RjhCXHU1OTgyIGh0dHBzOi8vd3d3LnJ1b3lpLnZpcC9cdTMwMDJcdTU5ODJcdTY3OUNcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTRFMEFcdUZGMENcdTRGNjBcdTVDMzFcdTk3MDBcdTg5ODFcdTc1MjhcdThGRDlcdTRFMkFcdTkwMDlcdTk4NzlcdTYzMDdcdTVCOUFcdThGRDlcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTMwMDJcdTRGOEJcdTU5ODJcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjggaHR0cHM6Ly93d3cucnVveWkudmlwL2FkbWluL1x1RkYwQ1x1NTIxOVx1OEJCRVx1N0Y2RSBiYXNlVXJsIFx1NEUzQSAvYWRtaW4vXHUzMDAyXG4gICAgYmFzZTogZW52LlZJVEVfQVBQX0NPTlRFWFRfUEFUSCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnfic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgICB9LFxuICAgICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy52dWUnXVxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jcmVzb2x2ZS1leHRlbnNpb25zXG4gICAgcGx1Z2luczogY3JlYXRlUGx1Z2lucyhlbnYsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcG9ydDogTnVtYmVyKGVudi5WSVRFX0FQUF9QT1JUKSxcbiAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoJ14nICsgZW52LlZJVEVfQVBQX0JBU0VfQVBJKSwgJycpXG4gICAgICAgIH0sXG4gICAgICAgIFsnL3Byb2ZpbGUnXToge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBvc3Rjc3NQbHVnaW46ICdpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWwnLFxuICAgICAgICAgICAgQXRSdWxlOiB7XG4gICAgICAgICAgICAgIGNoYXJzZXQ6IChhdFJ1bGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXRSdWxlLm5hbWUgPT09ICdjaGFyc2V0Jykge1xuICAgICAgICAgICAgICAgICAgYXRSdWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gXHU5ODg0XHU3RjE2XHU4QkQxXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdwaW5pYScsXG4gICAgICAgICdheGlvcycsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAncGF0aC10by1yZWdleHAnLFxuICAgICAgICAnZWNoYXJ0cycsXG4gICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICdAdnVldXAvdnVlLXF1aWxsJyxcbiAgICAgICAgJ2JwbW4tanMvbGliL1ZpZXdlcicsXG4gICAgICAgICdicG1uLWpzL2xpYi9Nb2RlbGVyLmpzJyxcbiAgICAgICAgJ2JwbW4tanMtcHJvcGVydGllcy1wYW5lbCcsXG4gICAgICAgICdtaW4tZGFzaCcsXG4gICAgICAgICdkaWFncmFtLWpzL2xpYi9uYXZpZ2F0aW9uL21vdmVjYW52YXMnLFxuICAgICAgICAnZGlhZ3JhbS1qcy9saWIvbmF2aWdhdGlvbi96b29tc2Nyb2xsJyxcbiAgICAgICAgJ2JwbW4tanMvbGliL2ZlYXR1cmVzL3BhbGV0dGUvUGFsZXR0ZVByb3ZpZGVyJyxcbiAgICAgICAgJ2JwbW4tanMvbGliL2ZlYXR1cmVzL2NvbnRleHQtcGFkL0NvbnRleHRQYWRQcm92aWRlcicsXG4gICAgICAgICdkaWFncmFtLWpzL2xpYi9kcmF3L0Jhc2VSZW5kZXJlcicsXG4gICAgICAgICd0aW55LXN2ZycsXG4gICAgICAgICdpbWFnZS1jb252ZXJzaW9uJyxcblxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGV4dC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY29sbGFwc2UtaXRlbS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY29sbGFwc2Uvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3NwYWNlL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb250YWluZXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2FzaWRlL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tYWluL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9oZWFkZXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi1ncm91cC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tYnV0dG9uL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC1ncm91cC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS1pdGVtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9idXR0b24vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2lucHV0L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N3aXRjaC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdXBsb2FkL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZW51L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2wvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ljb24vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Jvdy9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFnL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kaWFsb2cvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2xvYWRpbmcvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby1ncm91cC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcG9wb3Zlci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2Nyb2xsYmFyL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90b29sdGlwL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24taXRlbS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3ViLW1lbnUvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUtaXRlbS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGl2aWRlci9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2FyZC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbGluay9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi1pdGVtL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJsZS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS1zZWxlY3Qvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlLWNvbHVtbi9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2VsZWN0L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9vcHRpb24vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2FsZXJ0L3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvc3R5bGUvY3NzJyxcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyYW5zZmVyL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJzL3N0eWxlL2NzcycsXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbWFnZS9zdHlsZS9jc3MnLFxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFiLXBhbmUvc3R5bGUvY3NzJ1xuICAgICAgXVxuICAgIH1cbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbmV3X3p6a2pcXFxcenotb2FcXFxccnktdnVlLXBsdXM1LjJcXFxccGx1cy11aS10c1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IGNyZWF0ZVVub0NzcyBmcm9tICcuL3Vub2Nzcyc7XG5pbXBvcnQgY3JlYXRlQXV0b0ltcG9ydCBmcm9tICcuL2F1dG8taW1wb3J0JztcbmltcG9ydCBjcmVhdGVDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgY3JlYXRlSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gZnJvbSAnLi9zdmctaWNvbic7XG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbic7XG5pbXBvcnQgY3JlYXRlU2V0dXBFeHRlbmQgZnJvbSAnLi9zZXR1cC1leHRlbmQnO1xuaW1wb3J0IGNyZWF0ZUkxOG4gZnJvbSAnLi9pMThuJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCAodml0ZUVudjogYW55LCBpc0J1aWxkID0gZmFsc2UpOiBbXSA9PiB7XG4gIGNvbnN0IHZpdGVQbHVnaW5zOiBhbnkgPSBbXTtcbiAgdml0ZVBsdWdpbnMucHVzaCh2dWUoKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlVW5vQ3NzKCkpO1xuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQocGF0aCkpO1xuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXBvbmVudHMocGF0aCkpO1xuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXByZXNzaW9uKHZpdGVFbnYpKTtcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVJY29ucygpKTtcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTdmdJY29uc1BsdWdpbihwYXRoLCBpc0J1aWxkKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU2V0dXBFeHRlbmQoKSk7XG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlSTE4bihwYXRoKSk7XG4gIHJldHVybiB2aXRlUGx1Z2lucztcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG5ld196emtqXFxcXHp6LW9hXFxcXHJ5LXZ1ZS1wbHVzNS4yXFxcXHBsdXMtdWktdHNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFx1bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL3Vub2Nzcy50c1wiO2ltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHJldHVybiBVbm9Dc3Moe1xuICAgIGhtclRvcExldmVsQXdhaXQ6IGZhbHNlIC8vIHVub2Nzc1x1OUVEOFx1OEJBNFx1NjYyRnRydWVcdUZGMENcdTRGNEVcdTcyNDhcdTY3MkNcdTZENEZcdTg5QzhcdTU2NjhcdTY2MkZcdTRFMERcdTY1MkZcdTYzMDFcdTc2ODRcdUZGMENcdTU0MkZcdTUyQThcdTU0MEVcdTRGMUFcdTYyQTVcdTk1MTlcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbmV3X3p6a2pcXFxcenotb2FcXFxccnktdnVlLXBsdXM1LjJcXFxccGx1cy11aS10c1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzXCI7aW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSkgPT4ge1xuICByZXR1cm4gQXV0b0ltcG9ydCh7XG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbiAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ0B2dWV1c2UvY29yZScsICdwaW5pYSddLFxuICAgIGVzbGludHJjOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXG4gICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICByZXNvbHZlcnM6IFtcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcbiAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICBwcmVmaXg6ICdJY29uJ1xuICAgICAgfSlcbiAgICBdLFxuICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTU3MjggdnVlIFx1NkEyMVx1Njc3Rlx1NEUyRFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMnKSwgJ3R5cGVzJywgJ2F1dG8taW1wb3J0cy5kLnRzJylcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbmV3X3p6a2pcXFxcenotb2FcXFxccnktdnVlLXBsdXM1LjJcXFxccGx1cy11aS10c1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcG9uZW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbmV3X3p6a2ovenotb2EvcnktdnVlLXBsdXM1LjIvcGx1cy11aS10cy92aXRlL3BsdWdpbnMvY29tcG9uZW50cy50c1wiO2ltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IChwYXRoOiBhbnkpID0+IHtcbiAgcmV0dXJuIENvbXBvbmVudHMoe1xuICAgIHJlc29sdmVyczogW1xuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcbiAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddXG4gICAgICB9KVxuICAgIF0sXG4gICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAndHlwZXMnLCAnY29tcG9uZW50cy5kLnRzJylcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbmV3X3p6a2pcXFxcenotb2FcXFxccnktdnVlLXBsdXM1LjJcXFxccGx1cy11aS10c1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaWNvbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL2ljb25zLnRzXCI7aW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHJldHVybiBJY29ucyh7XG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1Qjg5XHU4OEM1XHU1NkZFXHU2ODA3XHU1RTkzXG4gICAgYXV0b0luc3RhbGw6IHRydWVcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcbmV3X3p6a2pcXFxcenotb2FcXFxccnktdnVlLXBsdXM1LjJcXFxccGx1cy11aS10c1xcXFx2aXRlXFxcXHBsdWdpbnNcXFxcc3ZnLWljb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL3N2Zy1pY29uLnRzXCI7aW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSwgaXNCdWlsZDogYm9vbGVhbikgPT4ge1xuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMnKSwgJ2Fzc2V0cy9pY29ucy9zdmcnKV0sXG4gICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZFxuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG5ld196emtqXFxcXHp6LW9hXFxcXHJ5LXZ1ZS1wbHVzNS4yXFxcXHBsdXMtdWktdHNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovbmV3X3p6a2ovenotb2EvcnktdnVlLXBsdXM1LjIvcGx1cy11aS10cy92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCAoZW52OiBhbnkpID0+IHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTIH0gPSBlbnY7XG4gIGNvbnN0IHBsdWdpbjogYW55W10gPSBbXTtcbiAgaWYgKFZJVEVfQlVJTERfQ09NUFJFU1MpIHtcbiAgICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KCcsJyk7XG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnZ3ppcCcpKSB7XG4gICAgICAvLyBodHRwOi8vZG9jLnJ1b3lpLnZpcC9ydW95aS12dWUvb3RoZXIvZmFxLmh0bWwjXHU0RjdGXHU3NTI4Z3ppcFx1ODlFM1x1NTM4Qlx1N0YyOVx1OTc1OVx1NjAwMVx1NjU4N1x1NEVGNlxuICAgICAgcGx1Z2luLnB1c2goXG4gICAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgICBleHQ6ICcuZ3onLFxuICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xuICAgICAgcGx1Z2luLnB1c2goXG4gICAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgICBleHQ6ICcuYnInLFxuICAgICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBsdWdpbjtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG5ld196emtqXFxcXHp6LW9hXFxcXHJ5LXZ1ZS1wbHVzNS4yXFxcXHBsdXMtdWktdHNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzZXR1cC1leHRlbmQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L25ld196emtqL3p6LW9hL3J5LXZ1ZS1wbHVzNS4yL3BsdXMtdWktdHMvdml0ZS9wbHVnaW5zL3NldHVwLWV4dGVuZC50c1wiO2ltcG9ydCBzZXR1cEV4dGVuZCBmcm9tICd1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgcmV0dXJuIHNldHVwRXh0ZW5kKHt9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG5ld196emtqXFxcXHp6LW9hXFxcXHJ5LXZ1ZS1wbHVzNS4yXFxcXHBsdXMtdWktdHNcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxuZXdfenpralxcXFx6ei1vYVxcXFxyeS12dWUtcGx1czUuMlxcXFxwbHVzLXVpLXRzXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9uZXdfenprai96ei1vYS9yeS12dWUtcGx1czUuMi9wbHVzLXVpLXRzL3ZpdGUvcGx1Z2lucy9pMThuLnRzXCI7aW1wb3J0IFZ1ZUkxOG5QbHVnaW4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSc7XG5leHBvcnQgZGVmYXVsdCAocGF0aDogYW55KSA9PiB7XG4gIHJldHVybiBWdWVJMThuUGx1Z2luKHtcbiAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9sYW5nLyoqLmpzb24nKV1cbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VCxTQUFnQyxTQUFTLG9CQUFvQjs7O0FDQTlCLE9BQU8sU0FBUzs7O0FDQWQsT0FBTyxZQUFZO0FBRWpYLElBQU8saUJBQVEsTUFBTTtBQUNuQixTQUFPLE9BQU87QUFBQSxJQUNaLGtCQUFrQjtBQUFBO0FBQUEsRUFDcEIsQ0FBQztBQUNIOzs7QUNOd1csT0FBTyxnQkFBZ0I7QUFDL1gsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxtQkFBbUI7QUFGMUIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxDQUFDQSxVQUFjO0FBQzVCLFNBQU8sV0FBVztBQUFBO0FBQUEsSUFFaEIsU0FBUyxDQUFDLE9BQU8sY0FBYyxnQkFBZ0IsT0FBTztBQUFBLElBQ3RELFVBQVU7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUEsSUFDQSxXQUFXO0FBQUE7QUFBQSxNQUVULG9CQUFvQjtBQUFBLE1BQ3BCLGNBQWM7QUFBQSxRQUNaLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxhQUFhO0FBQUE7QUFBQSxJQUNiLEtBQUtBLE1BQUssUUFBUUEsTUFBSyxRQUFRLGtDQUFXLFdBQVcsR0FBRyxTQUFTLG1CQUFtQjtBQUFBLEVBQ3RGLENBQUM7QUFDSDs7O0FDdkJzVyxPQUFPLGdCQUFnQjtBQUM3WCxTQUFTLHVCQUFBQyw0QkFBMkI7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LGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBRUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAiRWxlbWVudFBsdXNSZXNvbHZlciIsICJJY29uc1Jlc29sdmVyIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiRWxlbWVudFBsdXNSZXNvbHZlciIsICJJY29uc1Jlc29sdmVyIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
