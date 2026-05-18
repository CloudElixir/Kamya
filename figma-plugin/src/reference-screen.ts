import { H, W } from './tokens';
import { REF_IMAGES } from './reference-images';
import { createScreenFrame } from './utils';

export async function createReferenceScreen(
  frameName: string,
  imageKey: keyof typeof REF_IMAGES,
  layerName?: string
): Promise<FrameNode> {
  const f = createScreenFrame(frameName);
  const b64 = REF_IMAGES[imageKey];
  if (!b64) {
    throw new Error(`Missing reference image: ${imageKey}`);
  }

  const img = await figma.createImageAsync(b64);
  const bg = figma.createRectangle();
  bg.name = layerName || `Reference/${imageKey}`;
  bg.resize(W, H);
  bg.x = 0;
  bg.y = 0;
  bg.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
  f.appendChild(bg);
  return f;
}
