import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
			manifest: {
				name: "Notebook",
				short_name: "Notebook",
				description: "Your book to take notes",
				theme_color: "#ffffff",
				icons: [
					{
						src: "vite.svg",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "vite.svg",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
