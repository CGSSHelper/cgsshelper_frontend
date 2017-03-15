/* 连打活动表 */
//均为测定值
var medleyLPTable = [20, 30, 40, 50];
var medleyExpTable = [116, 143, 158, 179];
var medleyPTTable = [
  [97, 98, 100, 101, 102, 104, 105, 106, 108, 109, 110, 112, 113, 114, 116, 117, 118, 120, 121, 123, 128, 135, 141, 144],
  [159, 161, 163, 165, 168, 170, 172, 174, 176, 179, 180, 183, 185, 188, 189, 192, 194, 196, 199, 200, 209, 222, 234, 239],
  [229, 232, 236, 239, 242, 245, 248, 252, 255, 258, 261, 264, 268, 271, 274, 277, 280, 284, 287, 290, 303, 320, 336, 343],
  [311, 316, 320, 324, 328, 333, 337, 341, 346, 350, 355, 359, 363, 368, 372, 376, 380, 385, 389, 393, 410, 433, 452, 461]
];
var encorePTTable = [
  [27, 27, 29, 30, 32],
  [46, 46, 48, 50, 53],
  [63, 66, 70, 73, 76],
  [89, 89, 94, 98, 103],
  [99, 99, 105, 109, 114]
];

/* Party活动表 */
var partyLPTable = [10, 12, 15, 18];
var partyPTTable = [0, 0, 115, 150];
var partyExpTable = [39, 47, 53, 60];

/* 普通歌曲表 */
var normalLPTable = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var normalExpTable = [35, 42, 46, 46, 49, 49, 53, 56, 56, 63];
var normalItemTable = [
  [25, 24, 23, 22, 22],
  [28, 27, 26, 25, 25],
  [31, 30, 28, 27, 27],
  [34, 33, 31, 30, 30],
  [37, 36, 35, 34, 34],
  [40, 38, 36, 34, 34],
  [44, 42, 40, 37, 37],
  [47, 45, 43, 40, 40],
  [50, 48, 45, 43, 43],
  [53, 51, 48, 46, 46]
];

/* 道具活动表 */
var eventLPTable = [75, 90, 120, 150];
var eventExpTable = [42, 46, 53, 63];
// 部分为推定值
var eventPTTable = [
  [130, 124, 117, 111, 111],
  [170, 162, 153, 145, 145],
  [240, 228, 216, 204, 204],
  [320, 304, 288, 272, 272]
];

function isLvUp(Lv, Exp) {
  var nextExp = getExpByLv(Lv);
  return Exp >= nextExp;
}

function isExpRight(Lv, Exp) {
  var nextExp = getExpByLv(Lv);
  return Exp <= nextExp;
}

function isLPRight(Lv, istLP) {
  var sollLP = getLPbyLV(Lv);
  return istLP <= sollLP;
}

//升级所需Exp
function getExpByLv(Lv) {
  if (Lv < 50) {
    return 10 + Lv * 20;
  } else if (Lv < 100) {
    return 500 + Lv * 20;
  } else if (Lv < 150) {
    return 1000 + Lv * 20;
  } else if (Lv < 240) {
    return 1500 + 700 * Math.round(Lv/10 - 15) + Lv * 20;
  } else if (Lv < 249) {
    return 7800 + Lv * 20;
  } else if (Lv == 250) {
    return 7800 + (Lv-1) * 20;
  } else if (Lv < 300) {
    return 8480 + 700 * Math.round(Lv - 1/10 - 25) + Lv * 20;
  }else {
    return Infinity;
  }
}

function getLPbyLV(Lv) {
  var lp;
  //可以考虑改成加lp减Lv的循环模式
  if (Lv <= 19) {
    lp = 40 + Math.floor(Lv / 2);
  } else if (Lv <= 49) {
    lp = 50 + Math.floor((Lv - 20) / 3);
  } else if (Lv <= 89) {
    lp = 60 + Math.floor((Lv - 50) / 4);
  } else if (Lv <= 139) {
    lp = 70 + Math.floor((Lv - 90) / 5);
  } else {
    lp = 80 + Math.floor((Lv - 140) / 10);
  }
  return lp;
}

/** @Function    获得道具活动计算结果
 *  @ReturnVal   计算结果（数组/JSON）
 *  @Params      restTime    活动剩余时间（秒）
 *               wasteTime   每天浪费时间
 *               normalArgs  普通曲参数（[0]=体力，[1]=分数）
 *               eventArgs   活动曲参数（[0]=体力，[1]=分数，[2]=倍数）
 *               Lv,Exp      等级和经验（现有）
 *               hasLP       目前体力
 *               wantPT      目标活动pt
 *               hasPT       已有活动pt
 *               hasItem     已有活动道具
 *               hasLPArgs   持有瓶子量（[0]=30, [1]=20, [2]=10）
 **/
var calc_1 = function(args) {
  //数据预处理
  var restTime = parseInt(args.restTime),
    wasteTime = parseInt(args.wasteTime),
    normalArgs = [parseInt(args.normalLP), parseInt(args.normalScore)],
    eventArgs = [parseInt(args.useItem), parseInt(args.eventScore), parseInt(args.useMulti)],
    Lv = parseInt(args.userInfo.myLevel),
    Exp = parseInt(args.userInfo.myExp),
    hasLP = parseInt(args.userInfo.hasLP),
    wantPT = parseInt(args.userInfo.wantEventPt),
    hasPT = parseInt(args.userInfo.hasEventPt),
    hasItem = parseInt(args.userInfo.hasItem),
    hasLPArgs = [parseInt(args.userInfo.hasLP30), parseInt(args.userInfo.hasLP20), parseInt(args.userInfo.hasLP10)];
  //判断输入有效性
  if (!isExpRight(Lv, Exp) && !isLPRight(Lv, hasLP)) {
    return "Invalid Input";
  }
  var LPTime = 300;
  var PlayTime = 180;
  var normalTimes = 0,
    eventTimes = 0,
    useLP = 0,
    useLC = 0,
    totalTime;
  /* 一系列预设值 */
  var minusLP = normalLPTable[normalArgs[0]]; //普通曲消耗体力
  var normalItem = normalItemTable[normalArgs[0]][normalArgs[1]]; //普通曲获得道具
  var normalExp = normalExpTable[normalArgs[0]]; //普通曲获得经验
  var eventPT = eventPTTable[eventArgs[0]][eventArgs[1]] * eventArgs[2]; //活动曲获得PT
  var minusItem = eventLPTable[eventArgs[0]] * eventArgs[2]; //活动曲消耗道具
  var eventExp = eventExpTable[eventArgs[0]]; //活动曲获得道具
  var LpHalf = -1;//半点Lp
  restTime = restTime - wasteTime * 3600;
  while(hasPT < wantPT)
  {
    //TODO 等体力或打曲子避免浪费 (即将升级时
    if(isLvUp(Lv,Exp))//LvUp
    {
      Exp -= getExpByLv(Lv);
      hasLP = getLPbyLV(++Lv); // - PlayTime / LPTime;
    }
    else if (hasItem >= minusItem)
    {
      // 活动曲,当有道具而且不需要急着清体力时
      hasItem -= minusItem;
      hasPT += eventPT;
      Exp += eventExp;
      eventTimes++;
      restTime -= PlayTime;
      LpHalf ++;
      if(LpHalf)
      {
        LpHalf = -1;
        hasLP ++;
      }
    }
    else if (hasLP >= minusLP)
    {
      //普通曲
      hasLP -= minusLP;
      hasItem += normalItem;
      hasPT += normalItem;
      Exp += normalExp;
      normalTimes++;
      restTime -= minusLP*LPTime;
      LpHalf ++;
      if(LpHalf)
      {
        LpHalf = -1;
        hasLP ++;
      }
    }
    else
    {
      if(restTime === 0)//开氪
      {
        if (hasLPArgs[0] > 0)
        {
          hasLPArgs[0] -= 1;
          useLP += 30;
          hasLP += 30;
        }
        else if (hasLPArgs[1] > 0)
        {
          hasLPArgs[1] -= 1;
          useLP += 20;
          hasLP += 20;
        }
        else if (hasLPArgs[2] > 0)
        {
          hasLPArgs[2] -= 1;
          useLP += 10;
          hasLP += 10;
        }
        else
        {
          useLC++;
          hasLP += getLPbyLV(Lv);
        }
      }
      else//还有时间
      {
        restTime -= (getLPbyLV(Lv)-hasLP)*LPTime;
        //体力不用恢复满即可升级
        if(restTime <= 0)
        {
          restTime += (getLPbyLV(Lv)-hasLP)*LPTime;
          hasLP = Math.round(restTime/LPTime);
          restTime = 0;
          //console.log('剩余时间已用完，开始投入道具');
        }
        else
        {
          hasLP = getLPbyLV(Lv);
        }
      }
    }
  }
  useLC *= 50;
  totalTime = (normalTimes + eventTimes) * PlayTime;
  var return_args = {
    normalTimes: normalTimes,
    eventTimes: eventTimes,
    useLP: useLP,
    useLC: useLC,
    totalTime: totalTime,
    hasPT: hasPT,
    hasItem: hasItem,
    Lv: Lv,
    Exp: Exp,
    totalExp: getExpByLv(Lv),
    isWarn: totalTime >= parseInt(args.restTime)
  };

  return return_args;
};

/** @Function    获得连打计算结果
 *  @ReturnVal   计算结果（数组/JSON）
 *  @Params      restTime    活动剩余时间（秒）
 *               unusedLP    每天浪费体力
 *               medleyArgs  普通曲参数（[0]=难度，[1]=分数等级）
 *               encoreArgs  活动曲参数（[0]=难度，[1]=分数等级,[2]=失败概率）
 *               hakoyureLv  欢呼等级（ハコユレLv）
 *               Lv,Exp      等级和经验（现有）
 *               hasLP       目前体力
 *               wantPT      目标活动pt
 *               hasPT       已有活动pt
 *               hasLPArgs   持有瓶子量（[0]=30, [1]=20, [2]=10）
 **/
var calc_3 = function(args) {
  //数据预处理
  var restTime = parseInt(args.restTime),
    wasteTime = parseInt(args.wasteTime),
    medleyArgs = [parseInt(args.medleyLevel)],
    encoreArgs = [parseInt(args.encoreLevel), parseInt(args.encoreScore), parseInt(args.encoreFail)],
    hakoyureLv = parseInt(args.hakoyureLevel),
    Lv = parseInt(args.userInfo.myLevel),
    Exp = parseInt(args.userInfo.myExp),
    hasLP = parseInt(args.userInfo.hasLP),
    wantPT = parseInt(args.userInfo.wantEventPt),
    hasPT = parseInt(args.userInfo.hasEventPt),
    hasLPArgs = [parseInt(args.userInfo.hasLP30), parseInt(args.userInfo.hasLP20), parseInt(args.userInfo.hasLP10)];
  //判断输入有效性
  if (!isExpRight(Lv, Exp) && !isLPRight(Lv, hasLP)) {
    return "Invalid Input";
  }
  //初始化变量
  var LPTime = 300, PlayTime = 180 * 4, medleyTimes = 0,
    useLP = 0, useLC = 0, totalTime, failTimes = 0;
  /* 一系列预设值 */
  var minusLP = medleyLPTable[medleyArgs[0]]; //普通曲消耗体力
  var medleyExp = medleyExpTable[medleyArgs[0]]; //普通曲获得经验
  //活动获得PT
  var medleyPT = medleyPTTable[medleyArgs[0]][hakoyureLv - 1];
  var encorePT = encorePTTable[encoreArgs[0]][encoreArgs[1]];
  var eventPT = medleyPT + encorePT;
  var LpHalf = -1;
  //注意restTime输入时间为秒，wasteTime为小时
  restTime = restTime - wasteTime * 3600;
  while(hasPT < wantPT)
  {
    if(hasLP >= minusLP)//打 3+1(0)
    {
      hasLP -= minusLP;
      Exp += medleyExp;
      //restTime -= PlayTime;
      medleyTimes++;
      var a = Math.random();
      if(hakoyureLv >= 17 && a >= encoreArgs[2]/100)
      {// 3+1
        hasLP += 2;
        restTime -= PlayTime*4;
        hasPT += eventPT;
      }
      else
      {// 3+0
        a < encoreArgs[2]/100 ? failTimes++ : null;
        hasLP += 1;
        restTime -= PlayTime*3;
        LpHalf ++;
        hasPT += medleyPT;
        if(LpHalf)
        {
          LpHalf = -1;
          hasLP ++;
        }
      }
    }
    else
    {
      if(restTime === 0)//开氪
      {
        if (hasLPArgs[0] > 0)
        {
          hasLPArgs[0] -= 1;
          useLP += 30;
          hasLP += 30;
        }
        else if (hasLPArgs[1] > 0)
        {
          hasLPArgs[1] -= 1;
          useLP += 20;
          hasLP += 20;
        }
        else if (hasLPArgs[2] > 0)
        {
          hasLPArgs[2] -= 1;
          useLP += 10;
          hasLP += 10;
        }
        else
        {
          useLC++;
          hasLP += getLPbyLV(Lv);
        }
      }
      else//还有时间
      {
        restTime -= (getLPbyLV(Lv)-hasLP)*LPTime;
        //体力不用恢复满即可升级
        if(restTime <= 0)
        {
          restTime += (getLPbyLV(Lv)-hasLP)*LPTime;
          hasLP = Math.round(restTime/LPTime);
          restTime = 0;
        }
        else
        {
          hasLP += getLPbyLV(Lv);
        }
      }
    }
    while(isLvUp(Lv,Exp))//LvUp
    {
      Exp -= getExpByLv(Lv);
      hasLP = getLPbyLV(++Lv);
    }
  }
  useLC *= 50;
  totalTime = medleyTimes * PlayTime;
  var return_args = {
    medleyTimes: medleyTimes,
    useLP: useLP,
    useLC: useLC,
    totalTime: totalTime,
    failTimes: failTimes,
    hasPT: hasPT,
    Lv: Lv,
    Exp: Exp,
    LP: hasLP,
    totalExp: getExpByLv(Lv),
    totalLP: getLPbyLV(Lv)
  };

  return return_args;
};

/** @Function    获得道具活动计算结果
 *  @ReturnVal   计算结果（数组/JSON）
 *  @Params      restTime    活动剩余时间（秒）
 *               wasteTime   每天浪费时间
 *               eventArgs   活动曲参数（[0]=Level）
 *               Lv,Exp      等级和经验（现有）
 *               hasLP       目前体力
 *               wantPT      目标活动pt
 *               hasPT       已有活动pt
 *               hasItem     已有活动道具
 *               hasLPArgs   持有瓶子量（[0]=30, [1]=20, [2]=10）
 **/
var calc_4 = function(args) {
  //数据预处理
  var restTime = parseInt(args.restTime),
    wasteTime = parseInt(args.wasteTime),
    eventArgs = [parseInt(args.partyLevel)],
    Lv = parseInt(args.userInfo.myLevel),
    Exp = parseInt(args.userInfo.myExp),
    hasLP = parseInt(args.userInfo.hasLP),
    wantPT = parseInt(args.userInfo.wantEventPt),
    hasPT = parseInt(args.userInfo.hasEventPt),
    hasLPArgs = [parseInt(args.userInfo.hasLP30), parseInt(args.userInfo.hasLP20), parseInt(args.userInfo.hasLP10)];
  //判断输入有效性
  if (!isExpRight(Lv, Exp) && !isLPRight(Lv, hasLP)) {
    return "Invalid Input";
  }
  var LPTime = 300;
  var PlayTime = 180;
  var eventTimes = 0,
    useLP = 0,
    useLC = 0,
    totalTime;
  /* 一系列预设值 */
  var minusLP = partyLPTable[eventArgs[0]]; //普通曲消耗体力
  var eventPT = partyPTTable[eventArgs[0]]; //活动曲获得PT
  var eventExp = partyExpTable[eventArgs[0]]; //活动曲获得道具
  var LpHalf = -1;//半点Lp
  restTime = restTime - wasteTime * 3600;
  while(hasPT < wantPT)
  {
    //TODO 等体力或打曲子避免浪费 (即将升级时
    if(isLvUp(Lv,Exp))//LvUp
    {
      Exp -= getExpByLv(Lv);
      hasLP = getLPbyLV(++Lv); // - PlayTime / LPTime;
    }
    else if (hasLP >= minusLP)
    {
      //if still can play
      hasLP -= minusLP;
      hasPT += eventPT;
      Exp += eventExp;
      eventTimes++;
      restTime -= minusLP*LPTime;
      LpHalf ++;
      if(LpHalf)
      {
        LpHalf = -1;
        hasLP ++;
      }
    }
    else
    {
      if(restTime === 0)//开氪
      {
        if (hasLPArgs[0] > 0)
        {
          hasLPArgs[0] -= 1;
          useLP += 30;
          hasLP += 30;
        }
        else if (hasLPArgs[1] > 0)
        {
          hasLPArgs[1] -= 1;
          useLP += 20;
          hasLP += 20;
        }
        else if (hasLPArgs[2] > 0)
        {
          hasLPArgs[2] -= 1;
          useLP += 10;
          hasLP += 10;
        }
        else
        {
          useLC++;
          hasLP += getLPbyLV(Lv);
        }
      }
      else//还有时间
      {
        restTime -= (getLPbyLV(Lv)-hasLP)*LPTime;
        //体力不用恢复满即可升级
        if(restTime <= 0)
        {
          restTime += (getLPbyLV(Lv)-hasLP)*LPTime;
          hasLP = Math.round(restTime/LPTime);
          restTime = 0;
          //console.log('剩余时间已用完，开始投入道具');
        }
        else
        {
          hasLP = getLPbyLV(Lv);
        }
      }
    }
  }
  useLC *= 50;
  totalTime = eventTimes * PlayTime;
  var return_args = {
    eventTimes: eventTimes,
    useLP: useLP,
    useLC: useLC,
    totalTime: totalTime,
    hasPT: hasPT,
    Lv: Lv,
    Exp: Exp,
    totalExp: getExpByLv(Lv),
    isWarn: totalTime >= parseInt(args.restTime)
  };

  return {
    args: return_args
  };
};

export  {
  calc_1 as calcAtapon,
  calc_3 as calcMedley,
  calc_4 as calcParty
};
