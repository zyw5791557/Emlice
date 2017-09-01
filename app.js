const http = require('http');
const https = require('https');
const fs = require('fs');
// SSL 证书
// 本地测试的时候注释
// const options = {
//     key: fs.readFileSync('../../etc/ssl/214235821190863.key'),
//     cert: fs.readFileSync('../../etc/ssl/214235821190863.pem')
// };

const express = require('express');
const app = express();

// node 解决 history路由问题
const history = require('connect-history-api-fallback');
app.use(history());

// 第三方依赖
const compression = require('compression');
app.use(compression());

// 跨域设置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", "3.2.1")
    // 安全措施 强制浏览器只能发送 HTTPS 请求
    // res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    // 确保浏览器只在 HTTPS 下才发送 cookies
    // res.header("Set-Cookie", "LSID=DQAAAK...Eaem_vYg; Secure")
    // res.header("Content-Type", "charset=utf-8")
    next()
});

app.use(express.static('www'));

// 管理 assets 资源
app.use('/api/assets', express.static('assets'));

// 获取专辑内容
app.use('/api/album', require('./router/album'))

// 获取歌手单曲
app.use('/api/artists', require('./router/artists'))

// 获取歌手专辑列表
app.use('/api/artist/album', require('./router/artist_album'))

//艺术家-信息
app.use("/api/artist/desc", require("./router/artists_desc"))

//艺术家-mv
app.use("/api/artist/mv", require("./router/artists_mv"))



// 获取 banner
app.use('/api/banner', require('./router/banner'))

app.use('/api/check/music', require('./router/check_music'))


app.use('/api/comment/music', require('./router/comment_music'))

app.use('/api/comment/mv', require('./router/comment_mv'))


app.use('/api/comment/album', require('./router/comment_album'))

app.use('/api/comment/playlist', require('./router/comment_playlist'))

//未知 api
app.use('/api/comment/like', require('./router/comment_like'))

app.use('/api/comment/dj', require('./router/comment_dj'))

//签到
app.use("/api/daily_signin", require("./router/daily_signin"))

//djradio detail
app.use("/api/dj/detail", require("./router/dj_detail"))

//dj主播 radio
app.use("/api/dj/program", require("./router/dj_program"))

app.use("/api/dj/program/detail", require("./router/dj_program_detail"))

app.use("/api/dj/sub", require("./router/dj_sub"))

app.use("/api/dj/catelist", require("./router/dj_catelist"))

app.use("/api/dj/hot", require("./router/dj_hot"))

// 精选电台
app.use("/api/dj/recommend", require("./router/dj_recommend"))

//精选电台-分类电台
app.use("/api/dj/recommend/type", require("./router/dj_recommend_type"))

//获取动态
app.use("/api/event", require("./router/event"))

//垃圾桶
app.use("/api/fm_trash", require("./router/fm_trash"))

app.use("/api/follow", require("./router/follow"))

// 喜欢歌曲
app.use("/api/like", require("./router/like"))

app.use("/api/likelist", require("./router/likelist"))

//手机登录
app.use('/api/login/cellphone', require('./router/loginCellphone'))

//邮箱登录
app.use('/api/login', require('./router/login'))

//登录刷新
app.use('/api/login/refresh', require('./router/login_refresh'))

// 不明 api
app.use('/api/log/web', require('./router/logWeb'))

// 获取歌词
app.use('/api/lyric', require('./router/lyric'))

// 获取音乐 url
app.use('/api/music/url', require('./router/musicUrl'))

//最新 mv
app.use("/api/mv/first", require("./router/mv_first"))

//播放 mv
app.use("/api/mv/url", require("./router/mv_url"))

//mv
app.use("/api/mv", require("./router/mv"))

// 私人 FM
app.use("/api/personal_fm", require("./router/personal_fm"))

//推荐歌单
app.use("/api/personalized", require("./router/personalized"))

//推荐dj
app.use("/api/personalized/djprogram", require("./router/personalized_djprogram"))

//推荐新音乐
app.use("/api/personalized/newsong", require("./router/personalized_newsong"))

//独家放送
app.use("/api/personalized/privatecontent", require("./router/personalized_privatecontent"))

//推荐mv
app.use("/api/personalized/mv", require("./router/personalized_mv"))

// 获取歌单内列表
app.use('/api/playlist/detail', require('./router/playlist_detail'))

//收藏单曲到歌单,从歌单删除歌曲 op=del,add;pid=歌单id,tracks=歌曲id
app.use('/api/playlist/tracks', require('./router/playlist_tracks'))

app.use('/api/playlist/hot', require('./router/playlist_hot'))

app.use('/api/playlist/catlist', require('./router/playlist_catlist'))

//推荐节目
app.use("/api/program/recommend", require("./router/program_recommend"))

// 获取每日推荐歌曲
app.use('/api/recommend/songs', require('./router/recommend_songs'))

// 获取每日推荐歌单
app.use('/api/recommend/resource', require('./router/recommend_resource'))

//取消推荐
app.use('/api/recommend/dislike', require('./router/recommend_dislike'))


app.use('/api/resource/like', require('./router/resource_like'))

// 搜索
app.use('/api/search', require('./router/search'))

// 搜索 hot
app.use('/api/search/hot', require('./router/search_hot'))

//搜索 multimatch
app.use('/api/search/multimatch', require('./router/search_multimatch'))

// 搜索 suggest,搜索结果包含单曲,歌手,歌单,mv信息
app.use('/api/search/suggest', require('./router/search_suggest'))

//simi ,相似歌单
app.use("/api/simi/playlist", require("./router/simi_playlist"))

//simi ,相似歌曲
app.use("/api/simi/song", require("./router/simi_song"))

//相似 mv
app.use("/api/simi/mv", require("./router/simi_mv"))

//simi ,相似关注的用户
app.use("/api/simi/user", require("./router/simi_user"))

//相似歌手
app.use("/api/simi/artist", require("./router/simi_artists"))

// 获取音乐详情
app.use('/api/song/detail', require('./router/song_detail'))

// 新碟上架 http://music.163.com/#/discover/album/
app.use('/api/top/album', require('./router/top_album'))

// 热门歌手 http://music.163.com/#/discover/artist/
app.use('/api/top/artists', require('./router/top_artists'))

app.use('/api/top/list', require('./router/top_list'))

app.use('/api/top/mv', require('./router/top_mv'))

//分类歌单
app.use("/api/top/playlist", require("./router/top_playlist"))

//精品歌单
app.use("/api/top/playlist/highquality", require("./router/top_playlist_highquality"))

app.use('/api/top/song', require('./router/top_songs'))

app.use('/api/toplist', require('./router/toplist'))

app.use('/api/toplist/artist', require('./router/toplist_artist'))

app.use('/api/toplist/detail', require('./router/toplist_detail'))

// 获取用户歌单
app.use('/api/user/playlist', require('./router/user_playlist'))

// 获取用户电台
app.use('/api/user/audio', require('./router/user_audio'))

//云盘数据
app.use("/api/user/cloud", require("./router/user_cloud"))

//云盘数据详情? 暂时不要使用
app.use("/api/user/cloud/search", require("./router/user_cloud_search"))
//用户动态
app.use("/api/user/event", require("./router/user_event"))

app.use('/api/user/detail', require('./router/user_detail'))

app.use('/api/user/dj', require('./router/user_dj'))

app.use('/api/user/followeds', require('./router/user_followeds'))

app.use('/api/user/follows', require('./router/user_follows'))

app.use('/api/user/subcount', require('./router/user_subcount'))

app.use("/api/user/record", require("./router/user_playrecord"))


http.createServer(app).listen(3000);
// 本地测试关闭
// https.createServer(options, app).listen(443);

// 302 HTTPS 重定向
// 301 永久性重定向，302 暂时性重定向
// http.createServer(function(req, res) {
//     res.writeHead(302, {
//         'Location': 'https://emlice.top' + req.url
//     });
//     res.end();
// });

module.exports = app
