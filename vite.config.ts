import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
	build: { target: "es2022" },
	plugins: [
		remix({ appDirectory: "src" }),
		tsconfigPaths(),
		AutoImport({
			resolvers: [
				IconsResolver({
					prefix: false,
					enabledCollections: ["mdi"],
					extension: "jsx"
				})
			]
		}),
		Icons({ compiler: "jsx", jsx: "react", scale: 1 })
	]
});
