const communities = require('./communites');

// Use window object for browser environment
window.COMMUNITY_INDEX = {};
window.communities.forEach(community => {
    window.COMMUNITY_INDEX[community.社群] = community;
});

// 工具方法
window.getCommunityByName = (name) => window.COMMUNITY_INDEX[name];
window.getCommunityFeature = (name) => window.COMMUNITY_INDEX[name]?.特性名;

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
