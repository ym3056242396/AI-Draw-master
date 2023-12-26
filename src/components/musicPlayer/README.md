# meting-js

中文版选项

选项 默认 描述
id(编号) require 歌曲 ID /播放列表 ID /专辑 ID /搜索关键字
server(平台) require 音乐平台：netease，tencent，kugou，xiami，baidu
type（类型） require song，playlist，album，search，artist
auto（支持类种 类） options 音乐链接，支持：netease，tencent，xiami
fixed（固定模式） false 启用固定模式，默认 false
mini（迷你模式） false 启用迷你模式,默认 false
autoplay（自动播放） false 音频自动播放，默认 false
theme(主题颜色) #2980b9 默认#2980b9
loop（循环） all 播放器循环播放，值：“all”，one”，“none”
order(顺序) list 播放器播放顺序，值：“list”，“random”
preload(加载) auto 值：“none”，“metadata”，“'auto”
volume（声量） 0.7 默认音量，请注意播放器会记住用户设置，用户自己设置音量后默认音量将不起作用
mutex（限制） true 防止同时播放多个玩家，在该玩家开始播放时暂停其他玩家
lrc-type（歌词） 0 歌词显示
list-folded（列表折叠） false 指示列表是否应该首先折叠
list-max-height（最大高度） 340px 列出最大高度
storage-name（储存名称） metingjs 存储播放器设置的 localStorage 键
英文版选项

option default description
id require song id / playlist id / album id / search keyword
server require music platform: netease, tencent, kugou, xiami, baidu
type require song, playlist, album, search, artist
auto options music link, support: netease, tencent, xiami
fixed false enable fixed mode
mini false enable mini mode
autoplay false audio autoplay
theme #2980b9 main color
loop all player loop play, values: 'all', 'one', 'none'
order list player play order, values: 'list', 'random'
preload auto values: 'none', 'metadata', 'auto'
volume 0.7 default volume, notice that player will remember user setting, default volume will not work after user set volume themselves
mutex true prevent to play multiple player at the same time, pause other players when this player start play
lrc-type 0 lyric type
list-folded false indicate whether list should folded at first
list-max-height 340px list max height
storage-name metingjs localStorage key that store player setting
————————————————
版权声明：本文为 CSDN 博主「幸愉编程」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Edviv/article/details/106867810
