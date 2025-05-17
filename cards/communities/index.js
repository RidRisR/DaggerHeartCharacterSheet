const communities = require('./communites');

// 按社群分类索引
const COMMUNITY_INDEX = {};
communities.forEach(community => {
    COMMUNITY_INDEX[community.社群] = community;
});

// 工具方法
const getCommunityByName = (name) => COMMUNITY_INDEX[name];
const getCommunityFeature = (name) => COMMUNITY_INDEX[name]?.特性名;

// 导出
module.exports = {
    communities,
    COMMUNITY_INDEX,
    getCommunityByName,
    getCommunityFeature
};
