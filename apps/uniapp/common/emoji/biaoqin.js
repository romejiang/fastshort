const emojiList = [
  { url: '0@2x.gif', alt: '[惊讶]' },
  { url: '1@2x.gif', alt: '[撇嘴]' },
  { url: '2@2x.gif', alt: '[色]' },
  { url: '3@2x.gif', alt: '[啊这]' },
  { url: '4@2x.gif', alt: '[得意]' },
  { url: '5@2x.gif', alt: '[流泪]' },
  { url: '6@2x.gif', alt: '[害羞]' },
  { url: '7@2x.gif', alt: '[闭嘴]' },
  { url: '8@2x.gif', alt: '[睡]' },
  { url: '9@2x.gif', alt: '[大哭]' },
  { url: '10@2x.gif', alt: '[尴尬]' },
  { url: '11@2x.gif', alt: '[发怒]' },
  { url: '12@2x.gif', alt: '[调皮]' },
  { url: '13@2x.gif', alt: '[呲牙]' },
  { url: '14@2x.gif', alt: '[微笑]' },
  { url: '15@2x.gif', alt: '[难过]' },
  { url: '16@2x.gif', alt: '[酷]' },
  { url: '18@2x.gif', alt: '[抓狂]' },
  { url: '19@2x.gif', alt: '[吐]' },
  { url: '20@2x.gif', alt: '[偷笑]' },
  { url: '21@2x.gif', alt: '[可爱]' },
  { url: '22@2x.gif', alt: '[白眼]' },
  { url: '23@2x.gif', alt: '[傲慢]' },
  { url: '24@2x.gif', alt: '[饥饿]' },
  { url: '25@2x.gif', alt: '[困]' },
  { url: '26@2x.gif', alt: '[惊恐]' },
  { url: '27@2x.gif', alt: '[流汗]' },
  { url: '28@2x.gif', alt: '[憨笑]' },
  { url: '29@2x.gif', alt: '[悠闲]' },
  { url: '30@2x.gif', alt: '[奋斗]' },
  { url: '31@2x.gif', alt: '[咒骂]' },
  { url: '32@2x.gif', alt: '[疑问]' },
  { url: '33@2x.gif', alt: '[嘘]' },
  { url: '34@2x.gif', alt: '[晕]' },
  { url: '35@2x.gif', alt: '[折磨]' },
  { url: '36@2x.gif', alt: '[衰]' },
  { url: '37@2x.gif', alt: '[骷髅]' },
  { url: '38@2x.gif', alt: '[敲打]' },
  { url: '39@2x.gif', alt: '[再见]' },
  { url: '46@2x.gif', alt: '[猪头]' },
  { url: '49@2x.gif', alt: '[抱抱]' },
  { url: '53@2x.gif', alt: '[生日]' },
  { url: '54@2x.gif', alt: '[闪电]' },
  { url: '55@2x.gif', alt: '[炸弹]' },
  { url: '56@2x.gif', alt: '[刀]' },
  { url: '57@2x.gif', alt: '[足球]' },
  { url: '59@2x.gif', alt: '[便便]' },
  { url: '60@2x.gif', alt: '[咖啡]' },
  { url: '61@2x.gif', alt: '[饭]' },
  { url: '62@2x.gif', alt: '[药]' },
  { url: '63@2x.gif', alt: '[玫瑰]' },
  { url: '64@2x.gif', alt: '[凋谢]' },
  { url: '66@2x.gif', alt: '[爱心]' },
  { url: '67@2x.gif', alt: '[心碎]' },
  { url: '69@2x.gif', alt: '[礼物]' },
  { url: '72@2x.gif', alt: '[信封]' },
  { url: '74@2x.gif', alt: '[太阳]' },
  { url: '75@2x.gif', alt: '[月亮]' },
  { url: '76@2x.gif', alt: '[赞]' },
  { url: '77@2x.gif', alt: '[踩]' },
  { url: '78@2x.gif', alt: '[握手]' },
  { url: '79@2x.gif', alt: '[胜利]' },
  { url: '89@2x.gif', alt: '[西瓜]' },
  { url: '90@2x.gif', alt: '[下雨]' },
  { url: '91@2x.gif', alt: '[多云]' },
  { url: '96@2x.gif', alt: '[冷汗]' },
  { url: '97@2x.gif', alt: '[擦汗]' },
  { url: '98@2x.gif', alt: '[抠鼻]' },
  { url: '99@2x.gif', alt: '[鼓掌]' },
  { url: '100@2x.gif', alt: '[嗅大了]' },
  { url: '101@2x.gif', alt: '[坏笑]' },
  { url: '102@2x.gif', alt: '[右哼哼]' },
  { url: '103@2x.gif', alt: '[左哼哼]' },
  { url: '104@2x.gif', alt: '[哈欠]' },
  { url: '105@2x.gif', alt: '[鄙视]' },
  { url: '106@2x.gif', alt: '[委屈]' },
  { url: '107@2x.gif', alt: '[快哭了]' },
  { url: '108@2x.gif', alt: '[阴险]' },
  { url: '109@2x.gif', alt: '[亲亲]' },
  { url: '110@2x.gif', alt: '[吓]' },
  { url: '111@2x.gif', alt: '[可怜]' },
  { url: '112@2x.gif', alt: '[菜刀]' },
  { url: '113@2x.gif', alt: '[啤酒]' },
  { url: '114@2x.gif', alt: '[篮球]' },
  { url: '115@2x.gif', alt: '[乒乓]' },
  { url: '116@2x.gif', alt: '[示爱]' },
  { url: '117@2x.gif', alt: '[瓢虫]' },
  { url: '118@2x.gif', alt: '[抱拳]' },
  { url: '119@2x.gif', alt: '[勾引]' },
  { url: '120@2x.gif', alt: '[拳头]' },
  { url: '121@2x.gif', alt: '[差劲]' },
  { url: '122@2x.gif', alt: '[爱你]' },
  { url: '123@2x.gif', alt: '[NO]' },
  { url: '124@2x.gif', alt: '[OK]' },
  { url: '136@2x.gif', alt: '[双喜]' },
  { url: '137@2x.gif', alt: '[鞭炮]' },
  { url: '138@2x.gif', alt: '[灯笼]' },
  { url: '139@2x.gif', alt: '[麻将]' },
  { url: '140@2x.gif', alt: '[唱歌]' },
  { url: '141@2x.gif', alt: '[包包]' },
  { url: '142@2x.gif', alt: '[信]' },
  { url: '143@2x.gif', alt: '[象棋]' },
  { url: '144@2x.gif', alt: '[礼物]' },
  { url: '145@2x.gif', alt: '[祈祷]' },
  { url: '146@2x.gif', alt: '[爆筋]' },
  { url: '147@2x.gif', alt: '[棒棒糖]' },
  { url: '148@2x.gif', alt: '[喝奶]' },
  { url: '149@2x.gif', alt: '[吃面]' },
  { url: '150@2x.gif', alt: '[香蕉]' },
  { url: '151@2x.gif', alt: '[飞机]' },
  { url: '152@2x.gif', alt: '[汽车]' },
  { url: '153@2x.gif', alt: '[高铁]' },
  { url: '154@2x.gif', alt: '[动车]' },
  { url: '155@2x.gif', alt: '[动车头]' },
  { url: '156@2x.gif', alt: '[多云]' },
  { url: '157@2x.gif', alt: '[下雨]' },
  { url: '158@2x.gif', alt: '[钞票]' },
  { url: '159@2x.gif', alt: '[熊猫]' },
  { url: '160@2x.gif', alt: '[电灯泡]' },
  { url: '161@2x.gif', alt: '[七彩]' },
  { url: '162@2x.gif', alt: '[闹钟]' },
  { url: '163@2x.gif', alt: '[雨伞]' },
  { url: '164@2x.gif', alt: '[气球]' },
  { url: '165@2x.gif', alt: '[钻戒]' },
  { url: '166@2x.gif', alt: '[座椅]' },
  { url: '167@2x.gif', alt: '[纸巾]' },
  { url: '168@2x.gif', alt: '[药丸]' },
  { url: '169@2x.gif', alt: '[手枪]' },
  { url: '170@2x.gif', alt: '[青蛙]' },
  { url: '171@2x.gif', alt: '[热汤]' },
  { url: '172@2x.gif', alt: '[眨眼睛]' },
  { url: '173@2x.gif', alt: '[泪奔]' },
  { url: '174@2x.gif', alt: '[无奈]' },
  { url: '175@2x.gif', alt: '[卖萌]' },
  { url: '176@2x.gif', alt: '[小纠结]' },
  { url: '177@2x.gif', alt: '[喷血]' },
  { url: '178@2x.gif', alt: '[斜眼笑]' },
  { url: '179@2x.gif', alt: '[高傲]' },
  { url: '180@2x.gif', alt: '[惊喜]' },
  { url: '181@2x.gif', alt: '[骚扰]' },
  { url: '182@2x.gif', alt: '[笑哭]' },
  { url: '183@2x.gif', alt: '[我最美]' },
  { url: '184@2x.gif', alt: '[河蟹]' },
  { url: '185@2x.gif', alt: '[羊驼]' },
  { url: '186@2x.gif', alt: '[板栗]' },
  { url: '187@2x.gif', alt: '[幽灵]' },
  { url: '188@2x.gif', alt: '[鸡蛋]' },
  { url: '189@2x.gif', alt: '[魔方]' },
  { url: '190@2x.gif', alt: '[转花圈]' },
  { url: '191@2x.gif', alt: '[搓澡]' },
  { url: '192@2x.gif', alt: '[红包]' },
  { url: '200@2x.gif', alt: '[拜托]' },
  { url: '201@2x.gif', alt: '[点赞]' },
  { url: '202@2x.gif', alt: '[无聊]' },
  { url: '203@2x.gif', alt: '[托脸]' },
  { url: '204@2x.gif', alt: '[吃]' },
  { url: '205@2x.gif', alt: '[送花]' },
  { url: '206@2x.gif', alt: '[害怕]' },
  { url: '207@2x.gif', alt: '[花痴]' },
  { url: '208@2x.gif', alt: '[小样儿]' },
  { url: '210@2x.gif', alt: '[飙泪]' },
  { url: '211@2x.gif', alt: '[我不看]' },
  { url: '212@2x.gif', alt: '[托腮]' },
  { url: '245@2x.gif', alt: '[加油必胜]' },
  { url: '246@2x.gif', alt: '[抱抱]' },
  { url: '247@2x.gif', alt: '[白条]' },
  { url: '260@2x.gif', alt: '[白条]' },
  { url: '261@2x.gif', alt: '[搬砖中]' },
  { url: '262@2x.gif', alt: '[脑壳疼]' },
  { url: '263@2x.gif', alt: '[沧桑]' },
  { url: '264@2x.gif', alt: '[捂脸]' },
  { url: '265@2x.gif', alt: '[辣眼睛]' },
  { url: '266@2x.gif', alt: '[哦呦]' },
  { url: '267@2x.gif', alt: '[头秃]' },
  { url: '268@2x.gif', alt: '[问号脸]' },
  { url: '269@2x.gif', alt: '[暗中观察]' },
  { url: '270@2x.gif', alt: '[emm]' },
  { url: '271@2x.gif', alt: '[吃瓜]' },
  { url: '272@2x.gif', alt: '[呵呵哒]' },
  { url: '273@2x.gif', alt: '[白条]' },
  { url: '274@2x.gif', alt: '[白条]' },
  { url: 'newemoji_002.gif', alt: '[好的]' },
  { url: 'newemoji_003.gif', alt: '[白眼]' },
  { url: 'newemoji_004.gif', alt: '[鬼脸]' },
  { url: 'newemoji_005.gif', alt: '[马赛克]' },
  { url: 'newemoji_006.gif', alt: '[喝茶]' },
  { url: 'newemoji_007.gif', alt: '[摸鱼]' },
  { url: 'newemoji_008.gif', alt: '[大笑]' },
  { url: 'newemoji_009.gif', alt: '[请滚]' },
  { url: 'newemoji_010.gif', alt: '[睁眼]' },
  { url: 'newemoji_011.gif', alt: '[儿子乖]' },
  { url: 'newemoji_012.gif', alt: '[脸疼]' },
  { url: 'newemoji_013.gif', alt: '[考虑]' },
  { url: 'newemoji_014.gif', alt: '[惊掉下巴]' },
  { url: 'newemoji_015.gif', alt: '[遮眼]' },
  { url: 'newemoji_016.gif', alt: '[比爱心]' },
  { url: 'newemoji_017.gif', alt: '[喝彩]' }
]
export default emojiList
// const emojiList = [
// 	{"url":"0@2x.png","alt":"[惊讶]"},{"url":"1@2x.png","alt":"[撇嘴]"},{"url":"2@2x.png","alt":"[色]"},{"url":"3@2x.png","alt":"[啊这]"},{"url":"4@2x.png","alt":"[得意]"},{"url":"5@2x.png","alt":"[流泪]"},{"url":"6@2x.png","alt":"[害羞]"},
// 	{"url":"7@2x.png","alt":"[闭嘴]"},{"url":"8@2x.png","alt":"[睡]"},{"url":"9@2x.png","alt":"[大哭]"},{"url":"10@2x.png","alt":"[尴尬]"},{"url":"11@2x.png","alt":"[发怒]"},{"url":"12@2x.png","alt":"[调皮]"},{"url":"13@2x.png","alt":"[呲牙]"},
// 	{"url":"14@2x.png","alt":"[微笑]"},{"url":"15@2x.png","alt":"[难过]"},{"url":"16@2x.png","alt":"[酷]"},{"url":"18@2x.png","alt":"[抓狂]"},{"url":"19@2x.png","alt":"[吐]"},{"url":"20@2x.png","alt":"[偷笑]"},{"url":"21@2x.png","alt":"[可爱]"},
// 	{"url":"22@2x.png","alt":"[白眼]"},{"url":"23@2x.png","alt":"[傲慢]"},{"url":"24@2x.png","alt":"[饥饿]"},{"url":"25@2x.png","alt":"[困]"},{"url":"26@2x.png","alt":"[惊恐]"},{"url":"27@2x.png","alt":"[流汗]"},{"url":"28@2x.png","alt":"[憨笑]"},
// 	{"url":"29@2x.png","alt":"[悠闲]"},{"url":"30@2x.png","alt":"[奋斗]"},{"url":"31@2x.png","alt":"[咒骂]"},{"url":"32@2x.png","alt":"[疑问]"},{"url":"33@2x.png","alt":"[嘘]"},{"url":"34@2x.png","alt":"[晕]"},{"url":"35@2x.png","alt":"[折磨]"},
// 	{"url":"36@2x.png","alt":"[衰]"},{"url":"37@2x.png","alt":"[骷髅]"},{"url":"38@2x.png","alt":"[敲打]"},{"url":"39@2x.png","alt":"[再见]"},{"url":"46@2x.png","alt":"[猪头]"},{"url":"49@2x.png","alt":"[抱抱]"},{"url":"53@2x.png","alt":"[生日]"},
// 	{"url":"54@2x.png","alt":"[闪电]"},{"url":"55@2x.png","alt":"[炸弹]"},{"url":"56@2x.png","alt":"[刀]"},{"url":"57@2x.png","alt":"[足球]"},{"url":"59@2x.png","alt":"[便便]"},{"url":"60@2x.png","alt":"[咖啡]"},{"url":"61@2x.png","alt":"[饭]"},
// 	{"url":"62@2x.png","alt":"[药]"},{"url":"63@2x.png","alt":"[玫瑰]"},{"url":"64@2x.png","alt":"[凋谢]"},{"url":"66@2x.png","alt":"[爱心]"},{"url":"67@2x.png","alt":"[心碎]"},{"url":"69@2x.png","alt":"[礼物]"},{"url":"72@2x.png","alt":"[信封]"},
// 	{"url":"74@2x.png","alt":"[太阳]"},{"url":"75@2x.png","alt":"[月亮]"},{"url":"76@2x.png","alt":"[赞]"},{"url":"77@2x.png","alt":"[踩]"},{"url":"78@2x.png","alt":"[握手]"},{"url":"79@2x.png","alt":"[胜利]"},{"url":"89@2x.png","alt":"[西瓜]"},
// 	{"url":"90@2x.png","alt":"[下雨]"},{"url":"91@2x.png","alt":"[多云]"},{"url":"96@2x.png","alt":"[冷汗]"},{"url":"97@2x.png","alt":"[擦汗]"},{"url":"98@2x.png","alt":"[抠鼻]"},{"url":"99@2x.png","alt":"[鼓掌]"},{"url":"100@2x.png","alt":"[嗅大了]"},
// 	{"url":"101@2x.png","alt":"[坏笑]"},{"url":"102@2x.png","alt":"[右哼哼]"},{"url":"103@2x.png","alt":"[左哼哼]"},{"url":"104@2x.png","alt":"[哈欠]"},{"url":"105@2x.png","alt":"[鄙视]"},{"url":"106@2x.png","alt":"[委屈]"},{"url":"107@2x.png","alt":"[快哭了]"},
// 	{"url":"108@2x.png","alt":"[阴险]"},{"url":"109@2x.png","alt":"[亲亲]"},{"url":"110@2x.png","alt":"[吓]"},{"url":"111@2x.png","alt":"[可怜]"},{"url":"112@2x.png","alt":"[菜刀]"},{"url":"113@2x.png","alt":"[啤酒]"},{"url":"114@2x.png","alt":"[篮球]"},
// 	{"url":"115@2x.png","alt":"[乒乓]"},{"url":"116@2x.png","alt":"[示爱]"},{"url":"117@2x.png","alt":"[瓢虫]"},{"url":"118@2x.png","alt":"[抱拳]"},{"url":"119@2x.png","alt":"[勾引]"},{"url":"120@2x.png","alt":"[拳头]"},{"url":"121@2x.png","alt":"[差劲]"},
// 	{"url":"122@2x.png","alt":"[爱你]"},{"url":"123@2x.png","alt":"[NO]"},{"url":"124@2x.png","alt":"[OK]"},{"url":"136@2x.png","alt":"[双喜]"},{"url":"137@2x.png","alt":"[鞭炮]"},{"url":"138@2x.png","alt":"[灯笼]"},{"url":"139@2x.png","alt":"[麻将]"},
// 	{"url":"140@2x.png","alt":"[唱歌]"},{"url":"141@2x.png","alt":"[包包]"},{"url":"142@2x.png","alt":"[信]"},{"url":"143@2x.png","alt":"[象棋]"},{"url":"144@2x.png","alt":"[礼物]"},{"url":"145@2x.png","alt":"[祈祷]"},{"url":"146@2x.png","alt":"[爆筋]"},
// 	{"url":"147@2x.png","alt":"[棒棒糖]"},{"url":"148@2x.png","alt":"[喝奶]"},{"url":"149@2x.png","alt":"[吃面]"},{"url":"150@2x.png","alt":"[香蕉]"},{"url":"151@2x.png","alt":"[飞机]"},{"url":"152@2x.png","alt":"[汽车]"},{"url":"153@2x.png","alt":"[高铁]"},
// 	{"url":"154@2x.png","alt":"[动车]"},{"url":"155@2x.png","alt":"[动车头]"},{"url":"156@2x.png","alt":"[多云]"},{"url":"157@2x.png","alt":"[下雨]"},{"url":"158@2x.png","alt":"[钞票]"},{"url":"159@2x.png","alt":"[熊猫]"},{"url":"160@2x.png","alt":"[电灯泡]"},
// 	{"url":"161@2x.png","alt":"[七彩]"},{"url":"162@2x.png","alt":"[闹钟]"},{"url":"163@2x.png","alt":"[雨伞]"},{"url":"164@2x.png","alt":"[气球]"},{"url":"165@2x.png","alt":"[钻戒]"},{"url":"166@2x.png","alt":"[座椅]"},{"url":"167@2x.png","alt":"[纸巾]"},
// 	{"url":"168@2x.png","alt":"[药丸]"},{"url":"169@2x.png","alt":"[手枪]"},{"url":"170@2x.png","alt":"[青蛙]"},{"url":"171@2x.png","alt":"[热汤]"},{"url":"172@2x.png","alt":"[眨眼睛]"},{"url":"173@2x.png","alt":"[泪奔]"},{"url":"174@2x.png","alt":"[无奈]"},
// 	{"url":"175@2x.png","alt":"[卖萌]"},{"url":"176@2x.png","alt":"[小纠结]"},{"url":"177@2x.png","alt":"[喷血]"},{"url":"178@2x.png","alt":"[斜眼笑]"},{"url":"179@2x.png","alt":"[高傲]"},{"url":"180@2x.png","alt":"[惊喜]"},{"url":"181@2x.png","alt":"[骚扰]"},
// 	{"url":"182@2x.png","alt":"[笑哭]"},{"url":"183@2x.png","alt":"[我最美]"},{"url":"184@2x.png","alt":"[河蟹]"},{"url":"185@2x.png","alt":"[羊驼]"},{"url":"186@2x.png","alt":"[板栗]"},{"url":"187@2x.png","alt":"[幽灵]"},{"url":"188@2x.png","alt":"[鸡蛋]"},
// 	{"url":"189@2x.png","alt":"[魔方]"},{"url":"190@2x.png","alt":"[转花圈]"},{"url":"191@2x.png","alt":"[搓澡]"},{"url":"192@2x.png","alt":"[红包]"},{"url":"200@2x.png","alt":"[拜托]"},{"url":"201@2x.png","alt":"[点赞]"},{"url":"202@2x.png","alt":"[无聊]"},
// 	{"url":"203@2x.png","alt":"[托脸]"},{"url":"204@2x.png","alt":"[吃]"},{"url":"205@2x.png","alt":"[送花]"},{"url":"206@2x.png","alt":"[害怕]"},{"url":"207@2x.png","alt":"[花痴]"},{"url":"208@2x.png","alt":"[小样儿]"},{"url":"210@2x.png","alt":"[飙泪]"},
// 	{"url":"211@2x.png","alt":"[我不看]"},{"url":"212@2x.png","alt":"[托腮]"},{"url":"245@2x.png","alt":"[加油必胜]"},{"url":"246@2x.png","alt":"[抱抱]"},{"url":"247@2x.png","alt":"[白条]"},{"url":"260@2x.png","alt":"[白条]"},{"url":"261@2x.png","alt":"[搬砖中]"},
// 	{"url":"262@2x.png","alt":"[脑壳疼]"},{"url":"263@2x.png","alt":"[沧桑]"},{"url":"264@2x.png","alt":"[捂脸]"},{"url":"265@2x.png","alt":"[辣眼睛]"},{"url":"266@2x.png","alt":"[哦呦]"},{"url":"267@2x.png","alt":"[头秃]"},{"url":"268@2x.png","alt":"[问号脸]"},
// 	{"url":"269@2x.png","alt":"[暗中观察]"},{"url":"270@2x.png","alt":"[emm]"},{"url":"271@2x.png","alt":"[吃瓜]"},{"url":"272@2x.png","alt":"[呵呵哒]"},{"url":"273@2x.png","alt":"[白条]"},{"url":"274@2x.png","alt":"[白条]"},{"url":"newemoji_002.png","alt":"[好的]"},
// 	{"url":"newemoji_003.png","alt":"[白眼]"},{"url":"newemoji_004.png","alt":"[鬼脸]"},{"url":"newemoji_005.png","alt":"[马赛克]"},{"url":"newemoji_006.png","alt":"[喝茶]"},{"url":"newemoji_007.png","alt":"[摸鱼]"},{"url":"newemoji_008.png","alt":"[大笑]"},{"url":"newemoji_009.png","alt":"[请滚]"},
// 	{"url":"newemoji_010.png","alt":"[睁眼]"},{"url":"newemoji_011.png","alt":"[儿子乖]"},{"url":"newemoji_012.png","alt":"[脸疼]"},{"url":"newemoji_013.png","alt":"[考虑]"},{"url":"newemoji_014.png","alt":"[惊掉下巴]"},{"url":"newemoji_015.png","alt":"[遮眼]"},{"url":"newemoji_016.png","alt":"[比爱心]"},
// 	{"url":"newemoji_017.png","alt":"[喝彩]"}
// ]
// export default emojiList;
