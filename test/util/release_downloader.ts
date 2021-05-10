import { existsSync, ReadStream } from "fs";
import haxan from "haxan";
import { platform } from "os";

import { downloadStream } from "./download";

export function resolveExe(base: string): string {
  const plat = platform();
  return plat === "win32" ? base + ".exe" : base;
}

interface IGithubAsset {
  name: string;
  browser_download_url: string;
}

function findAssetForOS(assets: IGithubAsset[]): IGithubAsset | null {
  const plat = platform();
  if (plat === "win32") {
    return assets[assets.findIndex((a) => a.name.includes(".exe"))] || null;
  }
  if (plat === "linux") {
    return assets[assets.findIndex((a) => a.name.includes("linux"))] || null;
  }
  if (plat === "darwin") {
    return assets[assets.findIndex((a) => a.name.includes("mac"))] || null;
  }
  throw new Error(`Unsupported platform: ${platform}`);
}

export async function downloadCorinth(
  path = resolveExe("corinth"),
): Promise<boolean> {
  if (existsSync(path)) {
    return false;
  }

  const releasesResponse = await haxan<{ assets: IGithubAsset[] }[]>(
    "https://api.github.com/repos/dotvirus/corinth/releases",
  ).request();

  if (releasesResponse.ok) {
    const latest = releasesResponse.data[0];
    const asset = findAssetForOS(latest.assets);
    if (!asset) {
      throw new Error("No asset for platform found");
    }
    console.error(`Fetching ${asset.browser_download_url}`);
    const downloadResponse = await haxan<ReadStream>(asset.browser_download_url)
      .type(haxan.ResponseType.Stream)
      .send();
    if (downloadResponse.ok) {
      console.error(`Downloading to ${path}`);
      await downloadStream(downloadResponse.data, path);
      return true;
    } else {
      throw new Error(`Error from GitHub API: ${downloadResponse.status}`);
    }
  } else {
    throw new Error(`Error from GitHub API: ${releasesResponse.status}`);
  }
}
