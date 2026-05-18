import { buildDesignSystem } from './components';
import { buildAllScreens } from './screens';
import { loadFonts } from './utils';

figma.showUI(__html__, { width: 320, height: 420 });

figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type !== 'generate') return;

  try {
    await loadFonts();

    const page = figma.currentPage;
    page.name = 'KAMYA — Mobile UI Kit';

    // Design System page section
    const dsFrame = figma.createFrame();
    buildDesignSystem(dsFrame);
    dsFrame.x = 0;
    dsFrame.y = 0;
    page.appendChild(dsFrame);

    // Mobile screens — grid layout
    const screens = buildAllScreens();
    const COLS = 6;
    const GAP_X = 48;
    const GAP_Y = 48;
    const START_X = 1300;
    const START_Y = 0;

    screens.forEach((screen, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      screen.x = START_X + col * (390 + GAP_X);
      screen.y = START_Y + row * (844 + GAP_Y);
      page.appendChild(screen);
    });

    // Prototype flow labels
    const flowNote = figma.createFrame();
    flowNote.name = '📋 Prototype Flow Notes';
    flowNote.resize(500, 400);
    flowNote.x = 0;
    flowNote.y = 2500;
    flowNote.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.08, b: 0.18 } }];
    const noteText = figma.createText();
    noteText.fontName = { family: 'Inter', style: 'Regular' };
    noteText.characters = `KAMYA — Reference-backed UI Kit

REFERENCE SCREENS (client PNG artwork):
01 Splash, 02-05 Onboarding, 06 Login, 07 Signup,
05 Home (full), 05b Home Astrologer, 06 Drawer

STYLED SCREENS (match reference design system):
Astrologers, Chat, Kundali, Horoscope, Tarot, Journal,
Store, Profile, Notifications, Forum, Admin

Prototype: Splash → Onboarding → Login/Signup → Home
Bottom Nav: Home | Astrologer | Find Love | Forum | Profile`;
    noteText.fontSize = 12;
    noteText.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.88, b: 0.83 } }];
    noteText.resize(460, 360);
    noteText.x = 20;
    noteText.y = 20;
    flowNote.appendChild(noteText);
    page.appendChild(flowNote);

    figma.viewport.scrollAndZoomIntoView([dsFrame, ...screens]);
    figma.ui.postMessage({
      type: 'done',
      text: `Created ${screens.length} screens + design system. Ready for handoff!`,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    figma.ui.postMessage({ type: 'error', text: err });
  }
};
