var ret = images.requestScreenCapture();
if (!ret) {
  toast("获取截屏权限失败");
  exit();
}

sleep(1000);
var img = images.captureScreen();

while (1) {
  var ruleMatched = false;

  // 有會話，需要快進的時候
  var rule = [
    // 快進箭頭白色區域
    { x: 1208, y: 579, color: "ffffff" },
    { x: 1222, y: 582, color: "ffffff" },
    // 快進箭頭底部，深色區域，用於區別其他場景，防止誤判
    { x: 1216, y: 581, not_color: "ffffff" },
  ];
  passRule(img, rule, function () {
    _click2(1204, 574);
    sleep(1000);
    img = images.captureScreen();
    console.log("会话快进");
    ruleMatched = true;
  });

  // 完成一個對話
  rule = [
    { x: 1025, y: 500, color: colors.rgb(238, 112, 70) },
    { x: 1169, y: 500, color: colors.rgb(238, 112, 70) },
  ];
  passRule(img, rule, function () {
    _click2(1100, 500);
    sleep(1000);
    img = images.captureScreen();
    console.log("完成一个会话");
    ruleMatched = true;
  });

  // 獲得獎勵
  rule = [
    // 彈窗頂部青灰色
    { x: 495, y: 103, color: "415066" },
    // 確認按鈕，橙色
    { x: 534, y: 678, color: "ee7046" },
    { x: 509, y: 669, color: "ee7046" },
  ];
  passRule(img, rule, function () {
    _click2(640, 681);
    sleep(2000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("获得奖励");

    // 領取新任務
    rule = [
      // 任務前的綠色圓點
      { x: 1240, y: 25, color: "ffffff" },
      { x: 1240, y: 37, color: "ffffff" },
      { x: 1240, y: 51, color: "ffffff" },
    ];
    passRule(img, rule, function () {
      _click2(1240, 37);
      sleep(1000);
      _click2(1090, 100);
      sleep(1000);
      _click2(1162, 700);
      sleep(1000);
      img = images.captureScreen();
      ruleMatched = true;
      console.log("领取新任务");
    });
  });

  // 自動分配技能點
  rule = [
    // SP Up， 紅色箭頭
    { x: 653, y: 434, color: colors.rgb(240, 48, 48) },
    // 自動添加，暗紅色按鈕
    { x: 741, y: 428, color: colors.rgb(188, 60, 87) },
  ];
  passRule(img, rule, function () {
    _click2(741, 428);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("自动分配技能点");

    // 自動分配技能點，確認彈窗，只會出現一次
    rule = [
      // 取消按鈕，暗藍色
      { x: 434, y: 572, color: colors.rgb(76, 135, 176) },
      // 確認按鈕，橙色
      { x: 703, y: 562, color: colors.rgb(238, 112, 70) },
    ];
    passRule(img, rule, function () {
      _click2(703, 562);
      sleep(1000);
      img = images.captureScreen();
      ruleMatched = true;
      console.log("技能点分配确认弹窗");
    });
  });

  // 技能點分配提醒，高等級后，無法自動分配，只能取消
  rule = [
    // SP Up， 紅色箭頭
    { x: 653, y: 434, color: "f03030" },
    // 添加灰色按鈕
    { x: 731, y: 476, color: "617a95" },
    // 關閉按鈕中間的 x
    { x: 852, y: 478, color: "ffffff" },
  ];
  passRule(img, rule, function () {
    _click2(852, 478);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("手動分配技能点，關閉");
  });

  // 有新裝備可以穿
  rule = [
    // 穿上按鈕
    { x: 736, y: 475, color: "617a95" },
    { x: 851, y: 474, color: "ffffff" },
  ];
  passRule(img, rule, function () {
    _click2(736, 475);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("穿戴新装备");
  });

  // 廣告1
  rule = [
    // 黃顏色按鈕背景色
    { x: 486, y: 556, color: colors.rgb(236, 192, 2) },
    // 關閉按鈕
    { x: 1135, y: 112, color: colors.rgb(81, 95, 110) },
  ];
  passRule(img, rule, function () {
    _click2(1135, 112);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("关闭广告1");
  });

  // 廣告2
  rule = [
    // 黃顏色按鈕背景色
    { x: 1030, y: 83, color: colors.rgb(236, 192, 2) },
    // 關閉按鈕
    { x: 1031, y: 103, color: colors.rgb(165, 165, 165) },
  ];
  passRule(img, rule, function () {
    _click2(1031, 103);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("关闭广告2");
  });

  // 蘑菇新功能引导
  rule = [
    // 橙色按钮
    { x: 378, y: 398, color: "ee7046" },
    // 關閉按鈕
    { x: 714, y: 204, color: "ffffff" },
  ];
  passRule(img, rule, function () {
    _click2(714, 204);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("关闭蘑菇引导");
  });

  // 經驗獎勵時間提醒
  rule = [
    // 豬身上的暗紅色
    { x: 349, y: 359, color: colors.rgb(90, 32, 24) },
    // 關閉按鈕
    { x: 858, y: 253, color: "ffffff" },
  ];
  passRule(img, rule, function () {
    _click2(858, 253);
    sleep(1000);
    img = images.captureScreen();
    ruleMatched = true;
    console.log("关闭经验奖励时间提醒");
  });

  if (!ruleMatched) {
    sleep(1000);
    var img = images.captureScreen();
  }
}

function passRule(image, rule, callback) {
  var ret = true;

  for (let index = 0; index < rule.length; index++) {
    var e = rule[index];

    if (e.color != null) {
      var colorString;
      if (typeof e.color == "string") {
        colorString = "#ff" + e.color;
      } else {
        colorString = colors.toString(e.color);
      }

      if (!images.detectsColor(image, colorString, e.x * 2.0, e.y * 2.0)) {
        ret = false;
        break;
      }
    } else if (e.not_color != null) {
      var colorString;
      if (typeof e.not_color == "string") {
        colorString = "#ff" + e.not_color;
      } else {
        colorString = colors.toString(e.not_color);
      }

      if (images.detectsColor(image, colorString, e.x * 2.0, e.y * 2.0)) {
        ret = false;
        break;
      }
    }
  }

  if (ret) {
    callback();
  }
}

function _click2(x, y) {
  console.log("click at: x", x, ", y:", y);
  click(x * 2.0, y * 2.0);
}
