// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AppStorage, Category} from "../libraries/LibAppStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CategoriesFacet {
    AppStorage internal s;

    event CategoryCreated(uint id, string name, string hash);

    using Counters for Counters.Counter;
    Counters.Counter internal _categoryIds;

    function createCategory(string memory _name, string memory _hash, uint _percent, string[] memory _related, uint _time, bool _subscribe) external {
        require(_percent < 100000);
        require (_time + 300 > block.timestamp);
        _categoryIds.increment();
        uint categoryId = _categoryIds.current();
        Category storage category = s.idToCategory[categoryId];
        category.id = categoryId;
        category.name = _name;
        category.catId = _hash;
        category.timeCreated = _time;
        category.blockTime = block.timestamp;
        for (uint i = 0; i < _related.length; i++) {
            category.tempRelatedCat.push(_related[i]);
        }
        if (_subscribe) {
            category.subscribers.push(msg.sender);
        }
        category.catVotes = _percent;
        s.idToCategory[categoryId] = category;
        s.hashToCategory[_hash] = category;
        emit CategoryCreated(categoryId, _name, _hash);
    }

    function fetchCategory(string memory hash) external view returns(Category memory) {
        return s.hashToCategory[hash];
    }

    function fetchCategoryName(string memory hash) external view returns(string memory) {
        return s.hashToCategory[hash].name;
    }
 
    function fetchCategories() external view returns (Category[] memory) {
        uint itemCount = _categoryIds.current();
        Category[] memory categories = new Category[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Category storage currentItem = s.idToCategory[currentId];
            categories[i] = currentItem;
        }
        return categories;
    }
}
