const {
    withNativeWind: withNativeWind
} = require("nativewind/metro");

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName === "hono/client") {
        return {
            type: "sourceFile",
            filePath: path.resolve(workspaceRoot, "node_modules/hono/dist/client/index.js"),
        };
    }
    return context.resolveRequest(context, moduleName, platform);
};
// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.extraNodeModules = {
    '@repo/backend': path.resolve(workspaceRoot, 'packages/backend/src/hc')
};
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, {
    input: "./src/global.css"
});
