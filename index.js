const streamDeckApi = require('stream-deck-api');
const DcsBiosApi = require('dcs-bios-api');
const path = require('path');
const play = require('audio-play');
const load = require('audio-loader');

const IMAGE_FOLDER = './images/';

var api = new DcsBiosApi({ logLevel: 'INFO' });
var streamDeck = streamDeckApi.getStreamDeck();
api.startListening();

var buttonPressPromise = load(path.resolve('./sounds/button-press.wav'));

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
    3: { type: 'page', page: 'PVI', image: 'pvi-800.png' },

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

    6: { type: 'ledButton', button: 'PVI_SELF_COOR_BTN', led: 'PVI_SELF_COOR_LED', upImage: 'btnSELF-off.png', downImage: 'btnSELF-on.png' },
    7: { type: 'ledButton', button: 'PVI_DTA_DH_BTN', led: 'PVI_DTA_DH_LED', upImage: 'btnDTA-off.png', downImage: 'btnDTA-on.png' },
    8: { type: 'ledButton', button: 'PVI_WIND_HDG_SPEED_BTN', led: 'PVI_WIND_HDG_SPEED_LED', upImage: 'btnWIND-off.png', downImage: 'btnWIND-on.png' },
    9: { type: 'ledButton', button: 'PVI_THDG_TIME_RANGE_BTN', led: 'PVI_THDG_TIME_RANGE_LED', upImage: 'btnTHEAD-off.png', downImage: 'btnTHEAD-on.png' },
    10: { type: 'ledButton', button: 'PVI_BEARING_RANGE_BTN', led: 'PVI_BEARING_RANGE_LED', upImage: 'btnHEAD-off.png', downImage: 'btnHEAD-on.png' },


    11: { type: 'button', button: 'ABRIS_BTN_1', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    12: { type: 'button', button: 'ABRIS_BTN_2', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    13: { type: 'button', button: 'ABRIS_BTN_3', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    14: { type: 'button', button: 'ABRIS_BTN_4', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' },
    15: { type: 'button', button: 'ABRIS_BTN_5', upImage: 'abris_button_off.png', downImage: 'abris_button_on.png' }
  },

  PVI: {
    1: { type: 'page', page: 'MAIN', image: 'main-page.png' },
    2: { type: 'button', button: 'PVI_1', upImage: 'btn1.png', downImage: 'btn1p.png' },
    3: { type: 'button', button: 'PVI_2', upImage: 'btn2.png', downImage: 'btn2p.png' },
    4: { type: 'button', button: 'PVI_3', upImage: 'btn3.png', downImage: 'btn3p.png' },
    5: { type: 'custom', fn: createPviSelectedWaypointIndicator.bind(this, 5) },

    6: { type: 'page', page: 'PVI_SELECTION', image: 'wpt-type.png' },
    7: { type: 'button', button: 'PVI_4', upImage: 'btn4.png', downImage: 'btn4p.png' },
    8: { type: 'button', button: 'PVI_5', upImage: 'btn5.png', downImage: 'btn5p.png' },
    9: { type: 'button', button: 'PVI_6', upImage: 'btn6.png', downImage: 'btn6p.png' },
    10: { type: 'ledButton', button: 'PVI_RESET_BTN', led: 'PVI_RESET_LED', upImage: 'btnRESET-off.png', downImage: 'btnRESET-on.png' },

    11: { type: 'button', button: 'PVI_0', upImage: 'btn0.png', downImage: 'btn0p.png' },
    12: { type: 'button', button: 'PVI_7', upImage: 'btn7.png', downImage: 'btn7p.png' },
    13: { type: 'button', button: 'PVI_8', upImage: 'btn8.png', downImage: 'btn8p.png' },
    14: { type: 'button', button: 'PVI_9', upImage: 'btn9.png', downImage: 'btn9p.png' },
    15: { type: 'ledButton', button: 'PVI_ENTER_BTN', led: 'PVI_ENTER_LED', upImage: 'btnENTER-off.png', downImage: 'btnENTER-on.png' }
  },

  PVI_SELECTION: {
    1: { type: 'page', page: 'PVI', image: 'pvi-800.png' },
    2: { type: 'pageWithAction', button: 'PVI_WAYPOINTS_BTN', page: 'PVI', upImage: 'btnWPT-off.png', downImage: 'btnWPT-on.png' },
    7: { type: 'pageWithAction', button: 'PVI_AIRFIELDS_BTN', page: 'PVI', upImage: 'btnAIR-off.png', downImage: 'btnAIR-on.png' },
    11: { type: 'pageWithAction', button: 'PVI_FIXPOINTS_BTN', page: 'PVI', upImage: 'btnFIX-off.png', downImage: 'btnFIX-on.png' },
    12: { type: 'pageWithAction', button: 'PVI_TARGETS_BTN', page: 'PVI', upImage: 'btnNAV-off.png', downImage: 'btnNAV-on.png' }
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
      config.buttonNumber = i;

      switch (config.type) {
        case 'ledButton':
          createToggleLedButton(config);
          break;
        case 'button':
          createMomentaryButton(config.button, config.upImage, config.downImage, i);
          break;
        case 'page':
          createPageButton(config.page, config.image, i);
          break;
        case 'pageWithAction':
          createMomentaryPageButton(config.button, config.page, config.upImage, config.downImage, i);
          break;
        case 'custom':
          config.fn();
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

function createToggleLedButton({ button, led, upImage, downImage, buttonNumber, previousImage }) {
  if (!previousImage) {
    previousImage = path.resolve(upImage);
  }

  var upImagePath = path.resolve(IMAGE_FOLDER + upImage);
  var downImagePath = path.resolve(IMAGE_FOLDER + downImage);

  streamDeck.drawImageFile(upImagePath, buttonNumber);

  api.on(led, (value) => {
    streamDeck.drawImageFile((value ? downImagePath : upImagePath), buttonNumber);
  });

  streamDeck.on(`down:${buttonNumber}`, () => {
    api.sendMessage(`${button} 1\n`);
  });

  streamDeck.on(`up:${buttonNumber}`, () => {
    api.sendMessage(`${button} 0\n`);
  });
}

function createPageButton(page, image, buttonNumber) {
  var imagePath = path.join(IMAGE_FOLDER, image);
  streamDeck.drawImageFile(imagePath, buttonNumber);

  streamDeck.on(`down:${buttonNumber}`, () => {
    buttonPressPromise.then(play);
    displayPage(pages[page]);
  });
}

function createMomentaryPageButton(buttonIdentifier, page, upImage, downImage, buttonNumber) {
  createMomentaryButton(buttonIdentifier, upImage, downImage, buttonNumber);

  streamDeck.on(`up:${buttonNumber}`, () => {
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

function createPviSelectedWaypointIndicator(buttonNumber) {
  var drawImageFile = (value, imageName) => {
    if (value) {
      streamDeck.drawImageFile(path.resolve(IMAGE_FOLDER + imageName), buttonNumber);
    }
    else if (!value && currentSelection == imageName) {
      streamDeck.drawColor(0x000000, buttonNumber);
      currentSelection = undefined;
    }
    else {
      currentSelection = imageName;
    }
  };

  var currentSelection;

  if (api.getControlValue('Ka-50', 'PVI-800 Control Panel', 'PVI_WAYPOINTS_LED')) {
    drawImageFile(buttonNumber, 'btnWPT-on.png');
    currentSelection = 'btnWPT-on.png';
  }
  else if (api.getControlValue('Ka-50', 'PVI-800 Control Panel', 'PVI_AIRFIELDS_LED')) {
    drawImageFile(buttonNumber, 'btnAIR-on.png');
    currentSelection = 'btnAIR-on.png';
  }
  else if (api.getControlValue('Ka-50', 'PVI-800 Control Panel', 'PVI_FIXPOINTS_LED')) {
    drawImageFile(buttonNumber, 'btnFIX-on.png');
    currentSelection = 'btnFIX-on.png';
  }
  else if (api.getControlValue('Ka-50', 'PVI-800 Control Panel', 'PVI_TARGETS_LED')) {
    drawImageFile(buttonNumber, 'btnNAV-on.png');
    currentSelection = 'btnNAV-on.png';
  }

  api.on('PVI_WAYPOINTS_LED', (value) => {
    drawImageFile(value, 'btnWPT-on.png');
  });

  api.on('PVI_AIRFIELDS_LED', (value) => {
    drawImageFile(value, 'btnAIR-on.png');
  });

  api.on('PVI_FIXPOINTS_LED', (value) => {
    drawImageFile(value, 'btnFIX-on.png');
  });

  api.on('PVI_TARGETS_LED', (value) => {
    drawImageFile(value, 'btnNAV-on.png');
  });
}
