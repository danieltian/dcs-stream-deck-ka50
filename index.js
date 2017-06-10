const streamDeckApi = require('stream-deck-api');
const DcsBiosApi = require('dcs-bios-api');
const path = require('path');

const IMAGE_FOLDER = './images/';

var api = new DcsBiosApi({ logLevel: 'INFO' });
var streamDeck = streamDeckApi.getStreamDeck();
api.startListening();

process.on('SIGINT', () => {
  streamDeck.reset();
  api.stopListening();
  process.exit();
});

streamDeck.reset();

var pages = {
  MAIN: {
    1: { type: 'page', page: 'DATALINK', image: 'data-link.png' },
    2: { type: 'page', page: 'ABRIS', image: 'pvi-abris.png' },

    6: { type: 'ledButton', button: 'AP_BANK_HOLD_BTN', led: 'AP_BANK_HOLD_LED', upImage: 'AP_B_off.png', downImage: 'AP_B_on.png' },
    7: { type: 'ledButton', button: 'AP_PITCH_HOLD_BTN', led: 'AP_PITCH_HOLD_LED', upImage: 'AP_P_off.png', downImage: 'AP_P_on.png' },
    8: { type: 'ledButton', button: 'AP_HDG_HOLD_BTN', led: 'AP_HDG_HOLD_LED', upImage: 'AP_H_off.png', downImage: 'AP_H_on.png' },
    10: { type: 'ledButton', button: 'WEAPONS_AUTO_TURN_BTN', led: 'WEAPONS_AUTO_TURN_LED', upImage: 'WEAP_auto_turn_off.png', downImage: 'WEAP_auto_turn_on.png' },

    11: { type: 'ledButton', button: 'AP_ALT_HOLD_BTN', led: 'AP_ALT_HOLD_LED', upImage: 'AP_A_off.png', downImage: 'AP_A_on.png' },
    12: { type: 'ledButton', button: 'AP_FD_BTN', led: 'AP_FD_LED', upImage: 'AP_FD_off.png', downImage: 'AP_FD_on.png' },
    13: { type: 'ledButton', button: 'SC_MASTER_CAUTION_BTN', led: 'SC_MASTER_CAUTION_LED', upImage: 'master-caution-off.png', downImage: 'master-caution-on.png' },
    14: { type: 'ledButton', button: 'SC_ROTOR_RPM_BTN', led: 'SC_ROTOR_RPM_LED', upImage: 'Rotor-caution-off.png', downImage: 'Rotor-caution-on.png' },
    15: { type: 'ledButton', button: 'WEAPONS_GROUND_TARGET_BTN', led: 'WEAPONS_GROUND_TARGET_LED', upImage: 'WEAP_mov_gnd_off.png', downImage: 'WEAP_mov_gnd_on.png' }
  },

  DATALINK: {
    1: { type: 'page', page: 'MAIN', image: 'main-page.png' },
    2: { type: 'ledButton', button: 'DLNK_TARGET_VEHICLE_BTN', led: 'DLNK_TARGET_VEHICLE_LED', upImage: 'DL_vehicles_off.png', downImage: 'DL_vehicles_on.png' },
    3: { type: 'ledButton', button: 'DLNK_TARGET_SAM_BTN', led: 'DLNK_TARGET_SAM_LED', upImage: 'DL_sam_off.png', downImage: 'DL_sam_on.png' },
    4: { type: 'ledButton', button: 'DLNK_TARGET_OTHER_BTN', led: 'DLNK_TARGET_OTHER_LED', upImage: 'DL_others_off.png', downImage: 'DL_others_on.png' },
    5: { type: 'ledButton', button: 'DLNK_TARGET_POINT_BTN', led: 'DLNK_TARGET_POINT_LED', upImage: 'DL_point_off.png', downImage: 'DL_point_on.png' },

    6: { type: 'ledButton', button: 'DLNK_WINGMAN_1_BTN', led: 'DLNK_WINGMAN_1_LED', upImage: 'DL_1_off.png', downImage: 'DL_1_on.png' },
    7: { type: 'ledButton', button: 'DLNK_WINGMAN_2_BTN', led: 'DLNK_WINGMAN_2_LED', upImage: 'DL_2_off.png', downImage: 'DL_2_on.png' },
    8: { type: 'ledButton', button: 'DLNK_WINGMAN_3_BTN', led: 'DLNK_WINGMAN_3_LED', upImage: 'DL_3_off.png', downImage: 'DL_3_on.png' },
    9: { type: 'ledButton', button: 'DLNK_WINGMAN_4_BTN', led: 'DLNK_WINGMAN_4_LED', upImage: 'DL_4_off.png', downImage: 'DL_4_on.png' },
    10: { type: 'ledButton', button: 'DLNK_WINGMAN_ALL_BTN', led: 'DLNK_WINGMAN_ALL_LED', upImage: 'DL_to_all_off.png', downImage: 'DL_to_all_on.png' },

    13: { type: 'ledButton', button: 'DLNK_ERASE_BTN', led: 'DLNK_ERASE_LED', upImage: 'DL_clear_off.png', downImage: 'DL_clear_on.png' },
    14: { type: 'ledButton', button: 'DLNK_ESCAPE_BTN', led: 'DLNK_ESCAPE_LED', upImage: 'DL_ingress_off.png', downImage: 'DL_ingress_on.png' },
    15: { type: 'ledButton', button: 'DLNK_SEND_BTN', led: 'DLNK_SEND_LED', upImage: 'DL_send_mem_off.png', downImage: 'DL_send_mem_on.png' }
  },

  ABRIS: {
    1: { type: 'page', page: 'MAIN', image: 'main-page.png' },
    11: { type: 'button', button: 'ABRIS_BTN_1', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    12: { type: 'button', button: 'ABRIS_BTN_2', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    13: { type: 'button', button: 'ABRIS_BTN_3', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    14: { type: 'button', button: 'ABRIS_BTN_4', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    15: { type: 'button', button: 'ABRIS_BTN_5', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' }
  }
};

displayPage(pages.MAIN);

function displayPage(page) {
  streamDeck.removeButtonListeners();
  api.removeControlListeners();

  for (let i = 1; i <= 15; i++) {
    var config = page[i];

    if (!config) {
      streamDeck.drawColor(0x000000, i);
    }
    else {
      switch (config.type) {
        case 'ledButton':
          createToggleLedButton(config.button, config.led, config.upImage, config.downImage, i);
          break;
        case 'button':
          createMomentaryButton(config.button, config.upImage, config.downImage, i);
          break;
        case 'page':
          createPageButton(config.page, config.image, i);
          break;
      }
    }
  }
}

function createToggleButton(buttonIdentifier, releasedImagePath, pressedImagePath, buttonNumber) {
  streamDeck.fillImageFromFile(buttonNumber, releasedImagePath);

  api.on(buttonIdentifier, (value) => {
    if (value) {
      streamDeck.fillImageFromFile(buttonNumber, path.resolve(pressedImagePath));
    }
    else {
      streamDeck.fillImageFromFile(buttonNumber, path.resolve(releasedImagePath));
    }
  });

  streamDeck.on('down', (keyIndex) => {
    if (keyIndex == buttonNumber) {
      api.sendMessage(`${buttonIdentifier} 1\n`);
    }
  });

  streamDeck.on('up', (keyIndex) => {
    if (keyIndex == buttonNumber) {
      api.sendMessage(`${buttonIdentifier} 0\n`);
    }
  });
}

function createToggleLedButton(buttonIdentifier, ledIdentifier, upImage, downImage, buttonNumber) {
  var upImagePath = path.resolve(IMAGE_FOLDER + upImage);
  var downImagePath = path.resolve(IMAGE_FOLDER + downImage);
  streamDeck.drawImageFile(upImagePath, buttonNumber);

  api.on(ledIdentifier, (value) => {
    streamDeck.drawImageFile((value ? downImagePath : upImagePath), buttonNumber);
  });

  streamDeck.on(`down:${buttonNumber}`, () => {
    api.sendMessage(`${buttonIdentifier} 1\n`);
  });

  streamDeck.on(`up:${buttonNumber}`, () => {
    api.sendMessage(`${buttonIdentifier} 0\n`);
  });
}

function createPageButton(page, image, buttonNumber) {
  var imagePath = path.join(IMAGE_FOLDER, image);
  streamDeck.drawImageFile(imagePath, buttonNumber);

  streamDeck.on(`down:${buttonNumber}`, () => {
    displayPage(pages[page]);
  });
}

function createMomentaryButton(buttonIdentifier, upImage, downImage, buttonNumber) {
  var upImagePath = path.resolve(IMAGE_FOLDER + upImage);
  var downImagePath = path.resolve(IMAGE_FOLDER + downImage);
  streamDeck.drawImageFile(upImagePath, buttonNumber);

  streamDeck.on(`down:${buttonNumber}`, () => {
    api.sendMessage(`${buttonIdentifier} 1\n`);
    streamDeck.drawImageFile(downImagePath, buttonNumber);
  });

  streamDeck.on(`up:${buttonNumber}`, () => {
    api.sendMessage(`${buttonIdentifier} 0\n`);
    streamDeck.drawImageFile(upImagePath, buttonNumber);
  });
}
