// vite.config.ts
import { loadEnv, defineConfig } from "file:///D:/work/zzkj_oa_ui/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import vue from "file:///D:/work/zzkj_oa_ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/unocss.ts
import UnoCss from "file:///D:/work/zzkj_oa_ui/node_modules/unocss/dist/vite.mjs";
var unocss_default = () => {
  return UnoCss({
    hmrTopLevelAwait: false
    // unocss默认是true，低版本浏览器是不支持的，启动后会报错
  });
};

// vite/plugins/auto-import.ts
import AutoImport from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "D:\\work\\zzkj_oa_ui\\vite\\plugins";
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
import Components from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver as ElementPlusResolver2 } from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver2 from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname2 = "D:\\work\\zzkj_oa_ui\\vite\\plugins";
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
import Icons from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-icons/dist/vite.js";
var icons_default = () => {
  return Icons({
    // 自动安装图标库
    autoInstall: true
  });
};

// vite/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///D:/work/zzkj_oa_ui/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname3 = "D:\\work\\zzkj_oa_ui\\vite\\plugins";
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
import compression from "file:///D:/work/zzkj_oa_ui/node_modules/vite-plugin-compression/dist/index.mjs";
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
import setupExtend from "file:///D:/work/zzkj_oa_ui/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var setup_extend_default = () => {
  return setupExtend({});
};

// vite/plugins/i18n.ts
import VueI18nPlugin from "file:///D:/work/zzkj_oa_ui/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname4 = "D:\\work\\zzkj_oa_ui\\vite\\plugins";
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
var __vite_injected_original_dirname5 = "D:\\work\\zzkj_oa_ui";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy91bm9jc3MudHMiLCAidml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzIiwgInZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzIiwgInZpdGUvcGx1Z2lucy9pY29ucy50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiLCAidml0ZS9wbHVnaW5zL2kxOG4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXHp6a2pfb2FfdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcenpral9vYV91aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay96emtqX29hX3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZywgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuXHJcbmltcG9ydCBjcmVhdGVQbHVnaW5zIGZyb20gJy4vdml0ZS9wbHVnaW5zJztcclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTkwRThcdTdGNzJcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTU0OENcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMEJcdTc2ODRVUkxcdTMwMDJcclxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3ZpdGUgXHU0RjFBXHU1MDQ3XHU4QkJFXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU2NjJGXHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU4REVGXHU1Rjg0XHU0RTBBXHJcbiAgICAvLyBcdTRGOEJcdTU5ODIgaHR0cHM6Ly93d3cucnVveWkudmlwL1x1MzAwMlx1NTk4Mlx1Njc5Q1x1NUU5NFx1NzUyOFx1ODhBQlx1OTBFOFx1N0Y3Mlx1NTcyOFx1NEUwMFx1NEUyQVx1NUI1MFx1OERFRlx1NUY4NFx1NEUwQVx1RkYwQ1x1NEY2MFx1NUMzMVx1OTcwMFx1ODk4MVx1NzUyOFx1OEZEOVx1NEUyQVx1OTAwOVx1OTg3OVx1NjMwN1x1NUI5QVx1OEZEOVx1NEUyQVx1NUI1MFx1OERFRlx1NUY4NFx1MzAwMlx1NEY4Qlx1NTk4Mlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEY2MFx1NzY4NFx1NUU5NFx1NzUyOFx1ODhBQlx1OTBFOFx1N0Y3Mlx1NTcyOCBodHRwczovL3d3dy5ydW95aS52aXAvYWRtaW4vXHVGRjBDXHU1MjE5XHU4QkJFXHU3RjZFIGJhc2VVcmwgXHU0RTNBIC9hZG1pbi9cdTMwMDJcclxuICAgIGJhc2U6IGVudi5WSVRFX0FQUF9DT05URVhUX1BBVEgsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJ11cclxuICAgIH0sXHJcbiAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNyZXNvbHZlLWV4dGVuc2lvbnNcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9BUFBfUE9SVCksXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFtlbnYuVklURV9BUFBfQkFTRV9BUEldOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgd3M6IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoJ14nICsgZW52LlZJVEVfQVBQX0JBU0VfQVBJKSwgJycpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBbJy9wcm9maWxlJ106IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICB3czogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvc3Rjc3NQbHVnaW46ICdpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWwnLFxyXG4gICAgICAgICAgICBBdFJ1bGU6IHtcclxuICAgICAgICAgICAgICBjaGFyc2V0OiAoYXRSdWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXRSdWxlLm5hbWUgPT09ICdjaGFyc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gXHU5ODg0XHU3RjE2XHU4QkQxXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICd2dWUnLFxyXG4gICAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAgICAncGluaWEnLFxyXG4gICAgICAgICdheGlvcycsXHJcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgICAgJ3BhdGgtdG8tcmVnZXhwJyxcclxuICAgICAgICAnZWNoYXJ0cycsXHJcbiAgICAgICAgJ3Z1ZS1pMThuJyxcclxuICAgICAgICAnQHZ1ZXVwL3Z1ZS1xdWlsbCcsXHJcbiAgICAgICAgJ2JwbW4tanMvbGliL1ZpZXdlcicsXHJcbiAgICAgICAgJ2JwbW4tanMvbGliL01vZGVsZXIuanMnLFxyXG4gICAgICAgICdicG1uLWpzLXByb3BlcnRpZXMtcGFuZWwnLFxyXG4gICAgICAgICdtaW4tZGFzaCcsXHJcbiAgICAgICAgJ2RpYWdyYW0tanMvbGliL25hdmlnYXRpb24vbW92ZWNhbnZhcycsXHJcbiAgICAgICAgJ2RpYWdyYW0tanMvbGliL25hdmlnYXRpb24vem9vbXNjcm9sbCcsXHJcbiAgICAgICAgJ2JwbW4tanMvbGliL2ZlYXR1cmVzL3BhbGV0dGUvUGFsZXR0ZVByb3ZpZGVyJyxcclxuICAgICAgICAnYnBtbi1qcy9saWIvZmVhdHVyZXMvY29udGV4dC1wYWQvQ29udGV4dFBhZFByb3ZpZGVyJyxcclxuICAgICAgICAnZGlhZ3JhbS1qcy9saWIvZHJhdy9CYXNlUmVuZGVyZXInLFxyXG4gICAgICAgICd0aW55LXN2ZycsXHJcbiAgICAgICAgJ2ltYWdlLWNvbnZlcnNpb24nLFxyXG5cclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGV4dC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS1pdGVtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbGxhcHNlL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3NwYWNlL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbnRhaW5lci9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9hc2lkZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tYWluL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2hlYWRlci9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9idXR0b24tZ3JvdXAvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tYnV0dG9uL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NoZWNrYm94LWdyb3VwL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Zvcm0vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS1pdGVtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3dpdGNoL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3VwbG9hZC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZW51L3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pY29uL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Jvdy9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWcvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGlhbG9nL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2xvYWRpbmcvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcG9wb3Zlci9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zY3JvbGxiYXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdG9vbHRpcC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51L3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duLWl0ZW0vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3ViLW1lbnUvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS1pdGVtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RpdmlkZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2FyZC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9saW5rL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi1pdGVtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUtc2VsZWN0L3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlLWNvbHVtbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3Qvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvb3B0aW9uL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9hbGVydC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kYXRlLXBpY2tlci9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90cmFuc2Zlci9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJzL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2ltYWdlL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYi1wYW5lL3N0eWxlL2NzcydcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcenpral9vYV91aVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcenpral9vYV91aVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvenpral9vYV91aS92aXRlL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBjcmVhdGVVbm9Dc3MgZnJvbSAnLi91bm9jc3MnO1xyXG5pbXBvcnQgY3JlYXRlQXV0b0ltcG9ydCBmcm9tICcuL2F1dG8taW1wb3J0JztcclxuaW1wb3J0IGNyZWF0ZUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJztcclxuaW1wb3J0IGNyZWF0ZUljb25zIGZyb20gJy4vaWNvbnMnO1xyXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gZnJvbSAnLi9zdmctaWNvbic7XHJcbmltcG9ydCBjcmVhdGVDb21wcmVzc2lvbiBmcm9tICcuL2NvbXByZXNzaW9uJztcclxuaW1wb3J0IGNyZWF0ZVNldHVwRXh0ZW5kIGZyb20gJy4vc2V0dXAtZXh0ZW5kJztcclxuaW1wb3J0IGNyZWF0ZUkxOG4gZnJvbSAnLi9pMThuJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAodml0ZUVudjogYW55LCBpc0J1aWxkID0gZmFsc2UpOiBbXSA9PiB7XHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IGFueSA9IFtdO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2godnVlKCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlVW5vQ3NzKCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydChwYXRoKSk7XHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVDb21wb25lbnRzKHBhdGgpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXByZXNzaW9uKHZpdGVFbnYpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUljb25zKCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbnNQbHVnaW4ocGF0aCwgaXNCdWlsZCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU2V0dXBFeHRlbmQoKSk7XHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVJMThuKHBhdGgpKTtcclxuICByZXR1cm4gdml0ZVBsdWdpbnM7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFx1bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvenpral9vYV91aS92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IFVub0NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgcmV0dXJuIFVub0Nzcyh7XHJcbiAgICBobXJUb3BMZXZlbEF3YWl0OiBmYWxzZSAvLyB1bm9jc3NcdTlFRDhcdThCQTRcdTY2MkZ0cnVlXHVGRjBDXHU0RjRFXHU3MjQ4XHU2NzJDXHU2RDRGXHU4OUM4XHU1NjY4XHU2NjJGXHU0RTBEXHU2NTJGXHU2MzAxXHU3Njg0XHVGRjBDXHU1NDJGXHU1MkE4XHU1NDBFXHU0RjFBXHU2MkE1XHU5NTE5XHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvLWltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay96emtqX29hX3VpL3ZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50c1wiO2ltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSkgPT4ge1xyXG4gIHJldHVybiBBdXRvSW1wb3J0KHtcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHJcbiAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ0B2dWV1c2UvY29yZScsICdwaW5pYSddLFxyXG4gICAgZXNsaW50cmM6IHtcclxuICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXHJcbiAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWVcclxuICAgIH0sXHJcbiAgICByZXNvbHZlcnM6IFtcclxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxyXG4gICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgIHByZWZpeDogJ0ljb24nXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTcyOCB2dWUgXHU2QTIxXHU2NzdGXHU0RTJEXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHJcbiAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjJyksICd0eXBlcycsICdhdXRvLWltcG9ydHMuZC50cycpXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wb25lbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL3p6a2pfb2FfdWkvdml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwYXRoOiBhbnkpID0+IHtcclxuICByZXR1cm4gQ29tcG9uZW50cyh7XHJcbiAgICByZXNvbHZlcnM6IFtcclxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcclxuICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ11cclxuICAgICAgfSlcclxuICAgIF0sXHJcbiAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjJyksICd0eXBlcycsICdjb21wb25lbnRzLmQudHMnKVxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcenpral9vYV91aVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcenpral9vYV91aVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaWNvbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvenpral9vYV91aS92aXRlL3BsdWdpbnMvaWNvbnMudHNcIjtpbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgcmV0dXJuIEljb25zKHtcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUI4OVx1ODhDNVx1NTZGRVx1NjgwN1x1NUU5M1xyXG4gICAgYXV0b0luc3RhbGw6IHRydWVcclxuICB9KTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXHp6a2pfb2FfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXHp6a2pfb2FfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL3p6a2pfb2FfdWkvdml0ZS9wbHVnaW5zL3N2Zy1pY29uLnRzXCI7aW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xyXG5leHBvcnQgZGVmYXVsdCAocGF0aDogYW55LCBpc0J1aWxkOiBib29sZWFuKSA9PiB7XHJcbiAgcmV0dXJuIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAnYXNzZXRzL2ljb25zL3N2ZycpXSxcclxuICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay96emtqX29hX3VpL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZW52OiBhbnkpID0+IHtcclxuICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudjtcclxuICBjb25zdCBwbHVnaW46IGFueVtdID0gW107XHJcbiAgaWYgKFZJVEVfQlVJTERfQ09NUFJFU1MpIHtcclxuICAgIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoJywnKTtcclxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xyXG4gICAgICAvLyBodHRwOi8vZG9jLnJ1b3lpLnZpcC9ydW95aS12dWUvb3RoZXIvZmFxLmh0bWwjXHU0RjdGXHU3NTI4Z3ppcFx1ODlFM1x1NTM4Qlx1N0YyOVx1OTc1OVx1NjAwMVx1NjU4N1x1NEVGNlxyXG4gICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICBjb21wcmVzc2lvbih7XHJcbiAgICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgZXh0OiAnLmJyJyxcclxuICAgICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcclxuICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBsdWdpbjtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXHp6a2pfb2FfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXHp6a2pfb2FfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHNldHVwLWV4dGVuZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay96emtqX29hX3VpL3ZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHNcIjtpbXBvcnQgc2V0dXBFeHRlbmQgZnJvbSAndW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzL3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiBzZXR1cEV4dGVuZCh7fSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFx6emtqX29hX3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL3p6a2pfb2FfdWkvdml0ZS9wbHVnaW5zL2kxOG4udHNcIjtpbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJztcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSkgPT4ge1xyXG4gIHJldHVybiBWdWVJMThuUGx1Z2luKHtcclxuICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjL2xhbmcvKiouanNvbicpXVxyXG4gIH0pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThPLFNBQWdDLFNBQVMsb0JBQW9COzs7QUNBOUIsT0FBTyxTQUFTOzs7QUNBZCxPQUFP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Q0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJFbGVtZW50UGx1c1Jlc29sdmVyIiwgIkljb25zUmVzb2x2ZXIiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJFbGVtZW50UGx1c1Jlc29sdmVyIiwgIkljb25zUmVzb2x2ZXIiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
