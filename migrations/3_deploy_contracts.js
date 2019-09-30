var Web3 = require('../client/node_modules/web3');

var Rating = artifacts.require("./Rating.sol");


module.exports = function(deployer) {
    const restaurants = []

    restaurants.push(Web3.utils.utf8ToHex('樂軒和牛專門店'))
    restaurants.push(Web3.utils.utf8ToHex('麵香大腸麵線'))
    restaurants.push(Web3.utils.utf8ToHex('銷魂面鋪'))
    restaurants.push(Web3.utils.utf8ToHex('絕品火鍋'))
    restaurants.push(Web3.utils.utf8ToHex('茶六燒肉堂'))
    restaurants.push(Web3.utils.utf8ToHex('屋馬燒肉'))
    restaurants.push(Web3.utils.utf8ToHex('0八韓食 韓式料理'))
    restaurants.push(Web3.utils.utf8ToHex('沐丼 餵飽大食怪'))
    restaurants.push(Web3.utils.utf8ToHex('幸福小館'))
    restaurants.push(Web3.utils.utf8ToHex('小莊壽司'))
    restaurants.push(Web3.utils.utf8ToHex('信兵衛手做丼飯壽司'))
    restaurants.push(Web3.utils.utf8ToHex('大魔 ‧ 大満足鍋物'))
    restaurants.push(Web3.utils.utf8ToHex('大樂鍋'))
    restaurants.push(Web3.utils.utf8ToHex('東海何媽媽冰店'))

    deployer.deploy(Rating, restaurants);
};