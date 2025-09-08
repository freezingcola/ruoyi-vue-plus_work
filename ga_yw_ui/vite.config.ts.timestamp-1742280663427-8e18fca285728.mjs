// vite.config.ts
import { loadEnv, defineConfig } from "file:///D:/work/ga_yw_ui/node_modules/vite/dist/node/index.js";

// vite/plugins/index.ts
import vue from "file:///D:/work/ga_yw_ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/unocss.ts
import UnoCss from "file:///D:/work/ga_yw_ui/node_modules/unocss/dist/vite.mjs";
var unocss_default = () => {
  return UnoCss({
    hmrTopLevelAwait: false
    // unocss默认是true，低版本浏览器是不支持的，启动后会报错
  });
};

// vite/plugins/auto-import.ts
import AutoImport from "file:///D:/work/ga_yw_ui/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/work/ga_yw_ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver from "file:///D:/work/ga_yw_ui/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname = "D:\\work\\ga_yw_ui\\vite\\plugins";
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
import Components from "file:///D:/work/ga_yw_ui/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver as ElementPlusResolver2 } from "file:///D:/work/ga_yw_ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import IconsResolver2 from "file:///D:/work/ga_yw_ui/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_dirname2 = "D:\\work\\ga_yw_ui\\vite\\plugins";
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
import Icons from "file:///D:/work/ga_yw_ui/node_modules/unplugin-icons/dist/vite.js";
var icons_default = () => {
  return Icons({
    // 自动安装图标库
    autoInstall: true
  });
};

// vite/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///D:/work/ga_yw_ui/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname3 = "D:\\work\\ga_yw_ui\\vite\\plugins";
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
import compression from "file:///D:/work/ga_yw_ui/node_modules/vite-plugin-compression/dist/index.mjs";
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
import setupExtend from "file:///D:/work/ga_yw_ui/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var setup_extend_default = () => {
  return setupExtend({});
};

// vite/plugins/i18n.ts
import VueI18nPlugin from "file:///D:/work/ga_yw_ui/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname4 = "D:\\work\\ga_yw_ui\\vite\\plugins";
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
var __vite_injected_original_dirname5 = "D:\\work\\ga_yw_ui";
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
          target: "http://68.174.65.80:8080",
          // target: 'http://18576368555.gnway.cc/',
          changeOrigin: true,
          ws: true,
          rewrite: (path3) => path3.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        },
        ["/profile"]: {
          target: "http://68.174.65.80:8080",
          // target: 'http://18576368555.gnway.cc/',
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy91bm9jc3MudHMiLCAidml0ZS9wbHVnaW5zL2F1dG8taW1wb3J0LnRzIiwgInZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzIiwgInZpdGUvcGx1Z2lucy9pY29ucy50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiLCAidml0ZS9wbHVnaW5zL2kxOG4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL2dhX3l3X3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZywgQ29uZmlnRW52LCBsb2FkRW52LCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuXHJcbmltcG9ydCBjcmVhdGVQbHVnaW5zIGZyb20gJy4vdml0ZS9wbHVnaW5zJztcclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTkwRThcdTdGNzJcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTU0OENcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMEJcdTc2ODRVUkxcdTMwMDJcclxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ3ZpdGUgXHU0RjFBXHU1MDQ3XHU4QkJFXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU2NjJGXHU4OEFCXHU5MEU4XHU3RjcyXHU1NzI4XHU0RTAwXHU0RTJBXHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU4REVGXHU1Rjg0XHU0RTBBXHJcbiAgICAvLyBcdTRGOEJcdTU5ODIgaHR0cHM6Ly93d3cucnVveWkudmlwL1x1MzAwMlx1NTk4Mlx1Njc5Q1x1NUU5NFx1NzUyOFx1ODhBQlx1OTBFOFx1N0Y3Mlx1NTcyOFx1NEUwMFx1NEUyQVx1NUI1MFx1OERFRlx1NUY4NFx1NEUwQVx1RkYwQ1x1NEY2MFx1NUMzMVx1OTcwMFx1ODk4MVx1NzUyOFx1OEZEOVx1NEUyQVx1OTAwOVx1OTg3OVx1NjMwN1x1NUI5QVx1OEZEOVx1NEUyQVx1NUI1MFx1OERFRlx1NUY4NFx1MzAwMlx1NEY4Qlx1NTk4Mlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NEY2MFx1NzY4NFx1NUU5NFx1NzUyOFx1ODhBQlx1OTBFOFx1N0Y3Mlx1NTcyOCBodHRwczovL3d3dy5ydW95aS52aXAvYWRtaW4vXHVGRjBDXHU1MjE5XHU4QkJFXHU3RjZFIGJhc2VVcmwgXHU0RTNBIC9hZG1pbi9cdTMwMDJcclxuICAgIGJhc2U6IGVudi5WSVRFX0FQUF9DT05URVhUX1BBVEgsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJ11cclxuICAgIH0sXHJcbiAgICAvLyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnLyNyZXNvbHZlLWV4dGVuc2lvbnNcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9BUFBfUE9SVCksXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFtlbnYuVklURV9BUFBfQkFTRV9BUEldOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vNjguMTc0LjY1LjgwOjgwODAnLFxyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovLzE4NTc2MzY4NTU1Lmdud2F5LmNjLycsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBlbnYuVklURV9BUFBfQkFTRV9BUEkpLCAnJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIFsnL3Byb2ZpbGUnXToge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzY4LjE3NC42NS44MDo4MDgwJyxcclxuICAgICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xODU3NjM2ODU1NS5nbndheS5jYy8nLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgd3M6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwb3N0Y3NzUGx1Z2luOiAnaW50ZXJuYWw6Y2hhcnNldC1yZW1vdmFsJyxcclxuICAgICAgICAgICAgQXRSdWxlOiB7XHJcbiAgICAgICAgICAgICAgY2hhcnNldDogKGF0UnVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0UnVsZS5uYW1lID09PSAnY2hhcnNldCcpIHtcclxuICAgICAgICAgICAgICAgICAgYXRSdWxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFx1OTg4NFx1N0YxNlx1OEJEMVxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAndnVlJyxcclxuICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgJ3BpbmlhJyxcclxuICAgICAgICAnYXhpb3MnLFxyXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICAgICdwYXRoLXRvLXJlZ2V4cCcsXHJcbiAgICAgICAgJ2VjaGFydHMnLFxyXG4gICAgICAgICd2dWUtaTE4bicsXHJcbiAgICAgICAgJ0B2dWV1cC92dWUtcXVpbGwnLFxyXG4gICAgICAgICdicG1uLWpzL2xpYi9WaWV3ZXInLFxyXG4gICAgICAgICdicG1uLWpzL2xpYi9Nb2RlbGVyLmpzJyxcclxuICAgICAgICAnYnBtbi1qcy1wcm9wZXJ0aWVzLXBhbmVsJyxcclxuICAgICAgICAnbWluLWRhc2gnLFxyXG4gICAgICAgICdkaWFncmFtLWpzL2xpYi9uYXZpZ2F0aW9uL21vdmVjYW52YXMnLFxyXG4gICAgICAgICdkaWFncmFtLWpzL2xpYi9uYXZpZ2F0aW9uL3pvb21zY3JvbGwnLFxyXG4gICAgICAgICdicG1uLWpzL2xpYi9mZWF0dXJlcy9wYWxldHRlL1BhbGV0dGVQcm92aWRlcicsXHJcbiAgICAgICAgJ2JwbW4tanMvbGliL2ZlYXR1cmVzL2NvbnRleHQtcGFkL0NvbnRleHRQYWRQcm92aWRlcicsXHJcbiAgICAgICAgJ2RpYWdyYW0tanMvbGliL2RyYXcvQmFzZVJlbmRlcmVyJyxcclxuICAgICAgICAndGlueS1zdmcnLFxyXG4gICAgICAgICdpbWFnZS1jb252ZXJzaW9uJyxcclxuXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RleHQvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY29sbGFwc2UtaXRlbS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xsYXBzZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zcGFjZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb250YWluZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYXNpZGUvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWFpbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9oZWFkZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnV0dG9uLWdyb3VwL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvLWJ1dHRvbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jaGVja2JveC1ncm91cC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9mb3JtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Zvcm0taXRlbS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9idXR0b24vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaW5wdXQvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N3aXRjaC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy91cGxvYWQvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2wvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvaWNvbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yb3cvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFnL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RpYWxvZy9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9sb2FkaW5nL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvLWdyb3VwL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3BvcG92ZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2Nyb2xsYmFyL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Rvb2x0aXAvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1pdGVtL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N1Yi1tZW51L3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUtaXRlbS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kaXZpZGVyL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NhcmQvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbGluay9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9icmVhZGNydW1iL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWItaXRlbS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJsZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90cmVlLXNlbGVjdC9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJsZS1jb2x1bW4vc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2VsZWN0L3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL29wdGlvbi9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9wYWdpbmF0aW9uL3N0eWxlL2NzcycsXHJcbiAgICAgICAgJ2VsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYWxlcnQvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2hlY2tib3gvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJhbnNmZXIvc3R5bGUvY3NzJyxcclxuICAgICAgICAnZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFicy9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbWFnZS9zdHlsZS9jc3MnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWItcGFuZS9zdHlsZS9jc3MnXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFxnYV95d191aVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvZ2FfeXdfdWkvdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQgY3JlYXRlVW5vQ3NzIGZyb20gJy4vdW5vY3NzJztcclxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCc7XHJcbmltcG9ydCBjcmVhdGVDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cyc7XHJcbmltcG9ydCBjcmVhdGVJY29ucyBmcm9tICcuL2ljb25zJztcclxuaW1wb3J0IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIGZyb20gJy4vc3ZnLWljb24nO1xyXG5pbXBvcnQgY3JlYXRlQ29tcHJlc3Npb24gZnJvbSAnLi9jb21wcmVzc2lvbic7XHJcbmltcG9ydCBjcmVhdGVTZXR1cEV4dGVuZCBmcm9tICcuL3NldHVwLWV4dGVuZCc7XHJcbmltcG9ydCBjcmVhdGVJMThuIGZyb20gJy4vaTE4bic7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHZpdGVFbnY6IGFueSwgaXNCdWlsZCA9IGZhbHNlKTogW10gPT4ge1xyXG4gIGNvbnN0IHZpdGVQbHVnaW5zOiBhbnkgPSBbXTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKHZ1ZSgpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVVub0NzcygpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUF1dG9JbXBvcnQocGF0aCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQ29tcG9uZW50cyhwYXRoKSk7XHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSk7XHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVJY29ucygpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHBhdGgsIGlzQnVpbGQpKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZVNldHVwRXh0ZW5kKCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlSTE4bihwYXRoKSk7XHJcbiAgcmV0dXJuIHZpdGVQbHVnaW5zO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFx1bm9jc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvZ2FfeXdfdWkvdml0ZS9wbHVnaW5zL3Vub2Nzcy50c1wiO2ltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiBVbm9Dc3Moe1xyXG4gICAgaG1yVG9wTGV2ZWxBd2FpdDogZmFsc2UgLy8gdW5vY3NzXHU5RUQ4XHU4QkE0XHU2NjJGdHJ1ZVx1RkYwQ1x1NEY0RVx1NzI0OFx1NjcyQ1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NjYyRlx1NEUwRFx1NjUyRlx1NjMwMVx1NzY4NFx1RkYwQ1x1NTQyRlx1NTJBOFx1NTQwRVx1NEYxQVx1NjJBNVx1OTUxOVxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxhdXRvLWltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay9nYV95d191aS92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwYXRoOiBhbnkpID0+IHtcclxuICByZXR1cm4gQXV0b0ltcG9ydCh7XHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxyXG4gICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdAdnVldXNlL2NvcmUnLCAncGluaWEnXSxcclxuICAgIGVzbGludHJjOiB7XHJcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLFxyXG4gICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcclxuICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG4gICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICBwcmVmaXg6ICdJY29uJ1xyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTU3MjggdnVlIFx1NkEyMVx1Njc3Rlx1NEUyRFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAndHlwZXMnLCAnYXV0by1pbXBvcnRzLmQudHMnKVxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wb25lbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL2dhX3l3X3VpL3ZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzXCI7aW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocGF0aDogYW55KSA9PiB7XHJcbiAgcmV0dXJuIENvbXBvbmVudHMoe1xyXG4gICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XHJcbiAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcclxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYycpLCAndHlwZXMnLCAnY29tcG9uZW50cy5kLnRzJylcclxuICB9KTtcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFxnYV95d191aVxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaWNvbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmsvZ2FfeXdfdWkvdml0ZS9wbHVnaW5zL2ljb25zLnRzXCI7aW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiBJY29ucyh7XHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCODlcdTg4QzVcdTU2RkVcdTY4MDdcdTVFOTNcclxuICAgIGF1dG9JbnN0YWxsOiB0cnVlXHJcbiAgfSk7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFxnYV95d191aVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL2dhX3l3X3VpL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi50c1wiO2ltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcclxuZXhwb3J0IGRlZmF1bHQgKHBhdGg6IGFueSwgaXNCdWlsZDogYm9vbGVhbikgPT4ge1xyXG4gIHJldHVybiBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMnKSwgJ2Fzc2V0cy9pY29ucy9zdmcnKV0sXHJcbiAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay9nYV95d191aS92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGVudjogYW55KSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTIH0gPSBlbnY7XHJcbiAgY29uc3QgcGx1Z2luOiBhbnlbXSA9IFtdO1xyXG4gIGlmIChWSVRFX0JVSUxEX0NPTVBSRVNTKSB7XHJcbiAgICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KCcsJyk7XHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgICAgLy8gaHR0cDovL2RvYy5ydW95aS52aXAvcnVveWktdnVlL290aGVyL2ZhcS5odG1sI1x1NEY3Rlx1NzUyOGd6aXBcdTg5RTNcdTUzOEJcdTdGMjlcdTk3NTlcdTYwMDFcdTY1ODdcdTRFRjZcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgZXh0OiAnLmd6JyxcclxuICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2Jyb3RsaScpKSB7XHJcbiAgICAgIHBsdWdpbi5wdXNoKFxyXG4gICAgICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgICAgIGV4dDogJy5icicsXHJcbiAgICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW47XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFxnYV95d191aVxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHNldHVwLWV4dGVuZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay9nYV95d191aS92aXRlL3BsdWdpbnMvc2V0dXAtZXh0ZW5kLnRzXCI7aW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICByZXR1cm4gc2V0dXBFeHRlbmQoe30pO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtcXFxcZ2FfeXdfdWlcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3JrXFxcXGdhX3l3X3VpXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3JrL2dhX3l3X3VpL3ZpdGUvcGx1Z2lucy9pMThuLnRzXCI7aW1wb3J0IFZ1ZUkxOG5QbHVnaW4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSc7XHJcbmV4cG9ydCBkZWZhdWx0IChwYXRoOiBhbnkpID0+IHtcclxuICByZXR1cm4gVnVlSTE4blBsdWdpbih7XHJcbiAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9sYW5nLyoqLmpzb24nKV1cclxuICB9KTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdz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O0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgIkVsZW1lbnRQbHVzUmVzb2x2ZXIiLCAiSWNvbnNSZXNvbHZlciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIkVsZW1lbnRQbHVzUmVzb2x2ZXIiLCAiSWNvbnNSZXNvbHZlciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
