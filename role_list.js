var u = require("./util");

var attachModeSelections = [
  {
    x: 1913,
    y: 637,
    w: 146,
    h: 146,
  },
  {
    x: 2069,
    y: 637,
    w: 146,
    h: 146,
  },
  {
    x: 2225,
    y: 637,
    w: 146,
    h: 146,
  },
];

var attactModeFindRegion = {
  x: 1916,
  y: 798,
  w: 608,
  h: 140,
};

var roles = [
  {
    name: "ifufo",
    roleImage: "./assets/角色/ifufo.png",
    gild: false,
    meiri: true,
    wuling: true,
    boss: "./assets/boss/怪物/泡泡鱼.png",
    jinhua: false,
    mini: true,
    miniTimes: 3,
    needClearMiniLeft: false,
    preferedMeiriIndex: 1,
    prepareAttactMode: () => {
      while (1) {
        if (
          u.find_image("./assets/attach_mode/attact_mode.png", {
            click: true,
            delay: 1000,
            region: attactModeFindRegion,
          })
        ) {
          break;
        }

        var startPoint = u.getCenter(2384, 798, 140, 140);
        var endPoint = u.getCenter(1916, 798, 140, 140);

        u.move(startPoint, endPoint, 500);
        sleep(500);
      }
    },
    attactBoss: () => {
      if (
        u.find_image("./assets/attach_mode/attach_mode_selected.png", {
          region: attactModeFindRegion,
        })
      ) {
        u.clickWithRect(attachModeSelections[2], 500);
      }
    },
    attactQuick: () => {
      if (
        u.find_image("./assets/attach_mode/attach_mode_selected.png", {
          region: attactModeFindRegion,
        })
      ) {
        u.clickWithRect(attachModeSelections[1], 500);
      }
    },
  },
  {
    name: "4bfr",
    roleImage: "./assets/角色/4bfr.png",
    gild: false,
    meiri: true,
    wuling: true,
    boss: "./assets/boss/怪物/龙.png",
    jinhua: false,
    mini: true,
    miniTimes: 3,
    needClearMiniLeft: false,
    preferedMeiriIndex: 3,
  },
  // {
  //   name: "ocma",
  //   roleImage: "./assets/角色/ocma.png",
  //   gild: false,
  //   meiri: true,
  //   wuling: true,
  //   boss: "./assets/boss/怪物/龙.png",
  //   jinhua: false,
  //   mini: true,
  //   miniTimes: 3,
  //   needClearMiniLeft: false,
  //   preferedMeiriIndex: 3,
  // },
  {
    name: "maolay",
    roleImage: "./assets/角色/maolay.png",
    gild: false,
    meiri: true,
    wuling: true,
    boss: "./assets/boss/怪物/龙.png",
    jinhua: true,
    mini: true,
    miniTimes: 3,
    needClearMiniLeft: false,
    preferedMeiriIndex: 3,
  },
  {
    name: "hawubv",
    roleImage: "./assets/角色/hawubv.png",
    gild: false,
    meiri: true,
    wuling: true,
    boss: "./assets/boss/怪物/龙.png",
    jinhua: true,
    mini: false,
    miniTimes: 3,
    needClearMiniLeft: false,
    preferedMeiriIndex: 3,
  },
];

function setRoles() {
  var options = roles.map((e) => e.name);
  console.log(options);
  var results = dialogs.multiChoice("请选择参赛选手", options);

  if (results.length == 0) {
    return;
  }
  var ret = [];

  results.forEach((value, index, array) => ret.push(roles[value]));

  console.log(ret);
  return ret;
}

module.exports = {
  roles: roles,
  setRoles: setRoles,
};
